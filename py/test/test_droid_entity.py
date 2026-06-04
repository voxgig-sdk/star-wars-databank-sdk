# Droid entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from starwarsdatabank_sdk import StarWarsDatabankSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestDroidEntity:

    def test_should_create_instance(self):
        testsdk = StarWarsDatabankSDK.test(None, None)
        ent = testsdk.Droid(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _droid_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "droid." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set STARWARSDATABANK_TEST_DROID_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        droid_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.droid")))
        droid_ref01_data = None
        if len(droid_ref01_data_raw) > 0:
            droid_ref01_data = helpers.to_map(droid_ref01_data_raw[0][1])

        # LIST
        droid_ref01_ent = client.Droid(None)
        droid_ref01_match = {}

        droid_ref01_list_result, err = droid_ref01_ent.list(droid_ref01_match, None)
        assert err is None
        assert isinstance(droid_ref01_list_result, list)

        # LOAD
        droid_ref01_match_dt0 = {
            "id": droid_ref01_data["id"],
        }
        droid_ref01_data_dt0_loaded, err = droid_ref01_ent.load(droid_ref01_match_dt0, None)
        assert err is None
        droid_ref01_data_dt0_load_result = helpers.to_map(droid_ref01_data_dt0_loaded)
        assert droid_ref01_data_dt0_load_result is not None
        assert droid_ref01_data_dt0_load_result["id"] == droid_ref01_data["id"]



def _droid_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/droid/DroidTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = StarWarsDatabankSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["droid01", "droid02", "droid03"],
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
        "STARWARSDATABANK_TEST_DROID_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "STARWARSDATABANK_TEST_DROID_ENTID": idmap,
        "STARWARSDATABANK_TEST_LIVE": "FALSE",
        "STARWARSDATABANK_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("STARWARSDATABANK_TEST_DROID_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("STARWARSDATABANK_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = StarWarsDatabankSDK(helpers.to_map(merged_opts))

    _live = env.get("STARWARSDATABANK_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("STARWARSDATABANK_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
