<?php
declare(strict_types=1);

// Audio entity test

require_once __DIR__ . '/../openverse_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AudioEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OpenverseSDK::test(null, null);
        $ent = $testsdk->Audio(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = audio_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "audio." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OPENVERSE_TEST_AUDIO_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $audio_ref01_ent = $client->Audio(null);
        $audio_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.audio"), "audio_ref01"));
        $audio_ref01_data["identifier"] = $setup["idmap"]["identifier01"];

        $audio_ref01_data_result = $audio_ref01_ent->create($audio_ref01_data, null);
        $audio_ref01_data = Helpers::to_map($audio_ref01_data_result);
        $this->assertNotNull($audio_ref01_data);
        $this->assertNotNull($audio_ref01_data["id"]);

        // LIST
        $audio_ref01_match = [];

        $audio_ref01_list_result = $audio_ref01_ent->list($audio_ref01_match, null);
        $this->assertIsArray($audio_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($audio_ref01_list_result),
            ["id" => $audio_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $audio_ref01_match_dt0 = [
            "id" => $audio_ref01_data["id"],
        ];
        $audio_ref01_data_dt0_loaded = $audio_ref01_ent->load($audio_ref01_match_dt0, null);
        $audio_ref01_data_dt0_load_result = Helpers::to_map($audio_ref01_data_dt0_loaded);
        $this->assertNotNull($audio_ref01_data_dt0_load_result);
        $this->assertEquals($audio_ref01_data_dt0_load_result["id"], $audio_ref01_data["id"]);

    }
}

function audio_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/audio/AudioTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OpenverseSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["audio01", "audio02", "audio03", "image01", "image02", "image03", "identifier01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OPENVERSE_TEST_AUDIO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OPENVERSE_TEST_AUDIO_ENTID" => $idmap,
        "OPENVERSE_TEST_LIVE" => "FALSE",
        "OPENVERSE_TEST_EXPLAIN" => "FALSE",
        "OPENVERSE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OPENVERSE_TEST_AUDIO_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["OPENVERSE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["OPENVERSE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new OpenverseSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["OPENVERSE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["OPENVERSE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
