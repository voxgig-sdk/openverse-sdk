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

func TestImageEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Image(nil)
		if ent == nil {
			t.Fatal("expected non-nil ImageEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := imageBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "image." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENVERSE_TEST_IMAGE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		imageRef01Ent := client.Image(nil)
		imageRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "image"}, setup.data), "image_ref01"))
		imageRef01Data["identifier"] = setup.idmap["identifier01"]

		imageRef01DataResult, err := imageRef01Ent.Create(imageRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		imageRef01Data = core.ToMapAny(imageRef01DataResult)
		if imageRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if imageRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		imageRef01Match := map[string]any{}

		imageRef01ListResult, err := imageRef01Ent.List(imageRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		imageRef01List, imageRef01ListOk := imageRef01ListResult.([]any)
		if !imageRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", imageRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(imageRef01List), map[string]any{"id": imageRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		imageRef01MatchDt0 := map[string]any{
			"id": imageRef01Data["id"],
		}
		imageRef01DataDt0Loaded, err := imageRef01Ent.Load(imageRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		imageRef01DataDt0LoadResult := core.ToMapAny(imageRef01DataDt0Loaded)
		if imageRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if imageRef01DataDt0LoadResult["id"] != imageRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func imageBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "image", "ImageTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read image test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse image test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"image01", "image02", "image03", "identifier01"},
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
	entidEnvRaw := os.Getenv("OPENVERSE_TEST_IMAGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENVERSE_TEST_IMAGE_ENTID": idmap,
		"OPENVERSE_TEST_LIVE":      "FALSE",
		"OPENVERSE_TEST_EXPLAIN":   "FALSE",
		"OPENVERSE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENVERSE_TEST_IMAGE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENVERSE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OPENVERSE_APIKEY"],
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
