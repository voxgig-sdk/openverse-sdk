package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/openverse-sdk/go"
	"github.com/voxgig-sdk/openverse-sdk/go/core"

	vs "github.com/voxgig-sdk/openverse-sdk/go/utility/struct"
)

func TestOAuth2TokenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OAuth2Token(nil)
		if ent == nil {
			t.Fatal("expected non-nil OAuth2TokenEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := o_auth2_tokenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "o_auth2_token." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENVERSE_TEST_O_AUTH2_TOKEN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		oAuth2TokenRef01Ent := client.OAuth2Token(nil)
		oAuth2TokenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "o_auth2_token"}), "o_auth2_token_ref01"))

		oAuth2TokenRef01DataResult, err := oAuth2TokenRef01Ent.Create(oAuth2TokenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		oAuth2TokenRef01Data = core.ToMapAny(entityData(oAuth2TokenRef01DataResult))
		if oAuth2TokenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func o_auth2_tokenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "o_auth2_token", "OAuth2TokenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read o_auth2_token test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse o_auth2_token test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"o_auth2_token01", "o_auth2_token02", "o_auth2_token03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OPENVERSE_TEST_O_AUTH2_TOKEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENVERSE_TEST_O_AUTH2_TOKEN_ENTID": idmap,
		"OPENVERSE_TEST_LIVE":      "FALSE",
		"OPENVERSE_TEST_EXPLAIN":   "FALSE",
		"OPENVERSE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["OPENVERSE_TEST_O_AUTH2_TOKEN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENVERSE_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["OPENVERSE_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewOpenverseSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENVERSE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENVERSE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
