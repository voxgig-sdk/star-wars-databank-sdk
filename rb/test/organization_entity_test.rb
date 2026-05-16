# Organization entity test

require "minitest/autorun"
require "json"
require_relative "../StarWarsDatabank_sdk"
require_relative "runner"

class OrganizationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = StarWarsDatabankSDK.test(nil, nil)
    ent = testsdk.Organization(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = organization_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "organization." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set STARWARSDATABANK_TEST_ORGANIZATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    organization_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.organization")))
    organization_ref01_data = nil
    if organization_ref01_data_raw.length > 0
      organization_ref01_data = Helpers.to_map(organization_ref01_data_raw[0][1])
    end

    # LIST
    organization_ref01_ent = client.Organization(nil)
    organization_ref01_match = {}

    organization_ref01_list_result, err = organization_ref01_ent.list(organization_ref01_match, nil)
    assert_nil err
    assert organization_ref01_list_result.is_a?(Array)

    # LOAD
    organization_ref01_match_dt0 = {
      "id" => organization_ref01_data["id"],
    }
    organization_ref01_data_dt0_loaded, err = organization_ref01_ent.load(organization_ref01_match_dt0, nil)
    assert_nil err
    organization_ref01_data_dt0_load_result = Helpers.to_map(organization_ref01_data_dt0_loaded)
    assert !organization_ref01_data_dt0_load_result.nil?
    assert_equal organization_ref01_data_dt0_load_result["id"], organization_ref01_data["id"]

  end
end

def organization_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "organization", "OrganizationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = StarWarsDatabankSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["organization01", "organization02", "organization03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["STARWARSDATABANK_TEST_ORGANIZATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "STARWARSDATABANK_TEST_ORGANIZATION_ENTID" => idmap,
    "STARWARSDATABANK_TEST_LIVE" => "FALSE",
    "STARWARSDATABANK_TEST_EXPLAIN" => "FALSE",
    "STARWARSDATABANK_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["STARWARSDATABANK_TEST_ORGANIZATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["STARWARSDATABANK_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["STARWARSDATABANK_APIKEY"],
      },
      extra || {},
    ])
    client = StarWarsDatabankSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["STARWARSDATABANK_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["STARWARSDATABANK_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
