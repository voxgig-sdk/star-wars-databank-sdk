<?php
declare(strict_types=1);

// StarWarsDatabank SDK utility: feature_add

class StarWarsDatabankFeatureAdd
{
    public static function call(StarWarsDatabankContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
