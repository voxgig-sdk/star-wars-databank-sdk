<?php
declare(strict_types=1);

// Organization entity test

require_once __DIR__ . '/../starwarsdatabank_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OrganizationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = StarWarsDatabankSDK::test(null, null);
        $ent = $testsdk->Organization(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = organization_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "organization." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set STARWARSDATABANK_TEST_ORGANIZATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $organization_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.organization")));
        $organization_ref01_data = null;
        if (count($organization_ref01_data_raw) > 0) {
            $organization_ref01_data = Helpers::to_map($organization_ref01_data_raw[0][1]);
        }

        // LIST
        $organization_ref01_ent = $client->Organization(null);
        $organization_ref01_match = [];

        [$organization_ref01_list_result, $err] = $organization_ref01_ent->list($organization_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($organization_ref01_list_result);

        // LOAD
        $organization_ref01_match_dt0 = [
            "id" => $organization_ref01_data["id"],
        ];
        [$organization_ref01_data_dt0_loaded, $err] = $organization_ref01_ent->load($organization_ref01_match_dt0, null);
        $this->assertNull($err);
        $organization_ref01_data_dt0_load_result = Helpers::to_map($organization_ref01_data_dt0_loaded);
        $this->assertNotNull($organization_ref01_data_dt0_load_result);
        $this->assertEquals($organization_ref01_data_dt0_load_result["id"], $organization_ref01_data["id"]);

    }
}

function organization_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/organization/OrganizationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = StarWarsDatabankSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["organization01", "organization02", "organization03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("STARWARSDATABANK_TEST_ORGANIZATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "STARWARSDATABANK_TEST_ORGANIZATION_ENTID" => $idmap,
        "STARWARSDATABANK_TEST_LIVE" => "FALSE",
        "STARWARSDATABANK_TEST_EXPLAIN" => "FALSE",
        "STARWARSDATABANK_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["STARWARSDATABANK_TEST_ORGANIZATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["STARWARSDATABANK_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["STARWARSDATABANK_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new StarWarsDatabankSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["STARWARSDATABANK_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["STARWARSDATABANK_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
