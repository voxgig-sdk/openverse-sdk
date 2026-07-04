# Audio entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from openverse_sdk import OpenverseSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestAudioEntity:

    def test_should_create_instance(self):
        testsdk = OpenverseSDK.test(None, None)
        ent = testsdk.Audio(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _audio_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "audio." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set OPENVERSE_TEST_AUDIO_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        audio_ref01_ent = client.Audio(None)
        audio_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.audio"), "audio_ref01"))
        audio_ref01_data["identifier"] = setup["idmap"]["identifier01"]

        audio_ref01_data = helpers.to_map(audio_ref01_ent.create(audio_ref01_data, None))
        assert audio_ref01_data is not None
        assert audio_ref01_data["id"] is not None

        # LIST
        audio_ref01_match = {}

        audio_ref01_list_result = audio_ref01_ent.list(audio_ref01_match, None)
        assert isinstance(audio_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(audio_ref01_list_result),
            {"id": audio_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # LOAD
        audio_ref01_match_dt0 = {
            "id": audio_ref01_data["id"],
        }
        audio_ref01_data_dt0_loaded = audio_ref01_ent.load(audio_ref01_match_dt0, None)
        audio_ref01_data_dt0_load_result = helpers.to_map(audio_ref01_data_dt0_loaded)
        assert audio_ref01_data_dt0_load_result is not None
        assert audio_ref01_data_dt0_load_result["id"] == audio_ref01_data["id"]



def _audio_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/audio/AudioTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = OpenverseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["audio01", "audio02", "audio03", "image01", "image02", "image03", "identifier01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "OPENVERSE_TEST_AUDIO_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "OPENVERSE_TEST_AUDIO_ENTID": idmap,
        "OPENVERSE_TEST_LIVE": "FALSE",
        "OPENVERSE_TEST_EXPLAIN": "FALSE",
        "OPENVERSE_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("OPENVERSE_TEST_AUDIO_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("OPENVERSE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("OPENVERSE_APIKEY"),
            },
            extra or {},
        ])
        client = OpenverseSDK(helpers.to_map(merged_opts))

    _live = env.get("OPENVERSE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("OPENVERSE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
