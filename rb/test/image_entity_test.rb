# Image entity test

require "minitest/autorun"
require "json"
require_relative "../Openverse_sdk"
require_relative "runner"

class ImageEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OpenverseSDK.test(nil, nil)
    ent = testsdk.Image(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "image" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = OpenverseSDK.test(seed, nil)
    seen = base.Image(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = OpenverseConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = OpenverseSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Image(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = image_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "image." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OPENVERSE_TEST_IMAGE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    image_ref01_ent = client.Image(nil)
    image_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.image"), "image_ref01"))
    image_ref01_data["identifier"] = setup[:idmap]["identifier01"]

    image_ref01_data_result = image_ref01_ent.create(image_ref01_data, nil)
    image_ref01_data = Helpers.to_map(image_ref01_data_result)
    assert !image_ref01_data.nil?
    assert !image_ref01_data["id"].nil?

    # LIST
    image_ref01_match = {}

    image_ref01_list_result = image_ref01_ent.list(image_ref01_match, nil)
    assert image_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(image_ref01_list_result),
      { "id" => image_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    image_ref01_match_dt0 = {
      "id" => image_ref01_data["id"],
    }
    image_ref01_data_dt0_loaded = image_ref01_ent.load(image_ref01_match_dt0, nil)
    image_ref01_data_dt0_load_result = Helpers.to_map(image_ref01_data_dt0_loaded)
    assert !image_ref01_data_dt0_load_result.nil?
    assert_equal image_ref01_data_dt0_load_result["id"], image_ref01_data["id"]

  end
end

def image_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "image", "ImageTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OpenverseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["image01", "image02", "image03", "identifier01"],
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
  entid_env_raw = ENV["OPENVERSE_TEST_IMAGE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OPENVERSE_TEST_IMAGE_ENTID" => idmap,
    "OPENVERSE_TEST_LIVE" => "FALSE",
    "OPENVERSE_TEST_EXPLAIN" => "FALSE",
    "OPENVERSE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["OPENVERSE_TEST_IMAGE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OPENVERSE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["OPENVERSE_APIKEY"],
      },
      extra || {},
    ])
    client = OpenverseSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OPENVERSE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OPENVERSE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
