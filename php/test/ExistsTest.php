<?php
declare(strict_types=1);

// Openverse SDK exists test

require_once __DIR__ . '/../openverse_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OpenverseSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
