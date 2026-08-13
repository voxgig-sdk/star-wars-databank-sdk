<?php
declare(strict_types=1);

// Creature entity test

require_once __DIR__ . '/../starwarsdatabank_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CreatureEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = StarWarsDatabankSDK::test(null, null);
        $ent = $testsdk->Creature(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "creature" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = StarWarsDatabankSDK::test($seed, null);
        $seen = iterator_to_array($base->Creature(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = StarWarsDatabankConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = StarWarsDatabankSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Creature(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = creature_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "creature." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set STAR_WARS_DATABANK_TEST_CREATURE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $creature_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.creature")));
        $creature_ref01_data = null;
        if (count($creature_ref01_data_raw) > 0) {
            $creature_ref01_data = Helpers::to_map($creature_ref01_data_raw[0][1]);
        }

        // LIST
        $creature_ref01_ent = $client->Creature(null);
        $creature_ref01_match = [];

        $creature_ref01_list_result = $creature_ref01_ent->list($creature_ref01_match, null);
        $this->assertIsArray($creature_ref01_list_result);

        // LOAD
        $creature_ref01_match_dt0 = [
            "id" => $creature_ref01_data["id"],
        ];
        $creature_ref01_data_dt0_loaded = $creature_ref01_ent->load($creature_ref01_match_dt0, null);
        $creature_ref01_data_dt0_load_result = Helpers::to_map(is_object($creature_ref01_data_dt0_loaded) && method_exists($creature_ref01_data_dt0_loaded, 'data_get') ? $creature_ref01_data_dt0_loaded->data_get() : $creature_ref01_data_dt0_loaded);
        $this->assertNotNull($creature_ref01_data_dt0_load_result);
        $this->assertEquals($creature_ref01_data_dt0_load_result["id"], $creature_ref01_data["id"]);

    }
}

function creature_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/creature/CreatureTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = StarWarsDatabankSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["creature01", "creature02", "creature03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("STAR_WARS_DATABANK_TEST_CREATURE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "STAR_WARS_DATABANK_TEST_CREATURE_ENTID" => $idmap,
        "STAR_WARS_DATABANK_TEST_LIVE" => "FALSE",
        "STAR_WARS_DATABANK_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["STAR_WARS_DATABANK_TEST_CREATURE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["STAR_WARS_DATABANK_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new StarWarsDatabankSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["STAR_WARS_DATABANK_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["STAR_WARS_DATABANK_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
