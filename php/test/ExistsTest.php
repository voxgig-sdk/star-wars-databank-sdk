<?php
declare(strict_types=1);

// StarWarsDatabank SDK exists test

require_once __DIR__ . '/../starwarsdatabank_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = StarWarsDatabankSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
