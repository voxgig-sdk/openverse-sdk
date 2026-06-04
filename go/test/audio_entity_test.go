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

func TestAudioEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Audio(nil)
		if ent == nil {
			t.Fatal("expected non-nil AudioEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := audioBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "audio." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENVERSE_TEST_AUDIO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		audioRef01Ent := client.Audio(nil)
		audioRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "audio"}, setup.data), "audio_ref01"))
		audioRef01Data["identifier"] = setup.idmap["identifier01"]

		audioRef01DataResult, err := audioRef01Ent.Create(audioRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		audioRef01Data = core.ToMapAny(audioRef01DataResult)
		if audioRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if audioRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		audioRef01Match := map[string]any{}

		audioRef01ListResult, err := audioRef01Ent.List(audioRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		audioRef01List, audioRef01ListOk := audioRef01ListResult.([]any)
		if !audioRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", audioRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(audioRef01List), map[string]any{"id": audioRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		audioRef01MatchDt0 := map[string]any{
			"id": audioRef01Data["id"],
		}
		audioRef01DataDt0Loaded, err := audioRef01Ent.Load(audioRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		audioRef01DataDt0LoadResult := core.ToMapAny(audioRef01DataDt0Loaded)
		if audioRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if audioRef01DataDt0LoadResult["id"] != audioRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func audioBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "audio", "AudioTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read audio test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse audio test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"audio01", "audio02", "audio03", "image01", "image02", "image03", "identifier01"},
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
	entidEnvRaw := os.Getenv("OPENVERSE_TEST_AUDIO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENVERSE_TEST_AUDIO_ENTID": idmap,
		"OPENVERSE_TEST_LIVE":      "FALSE",
		"OPENVERSE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["OPENVERSE_TEST_AUDIO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENVERSE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
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
