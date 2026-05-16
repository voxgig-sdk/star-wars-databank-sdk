<?php
declare(strict_types=1);

// StarWarsDatabank SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class StarWarsDatabankFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new StarWarsDatabankBaseFeature();
            case "test":
                return new StarWarsDatabankTestFeature();
            default:
                return new StarWarsDatabankBaseFeature();
        }
    }
}
