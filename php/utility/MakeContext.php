<?php
declare(strict_types=1);

// StarWarsDatabank SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class StarWarsDatabankMakeContext
{
    public static function call(array $ctxmap, ?StarWarsDatabankContext $basectx): StarWarsDatabankContext
    {
        return new StarWarsDatabankContext($ctxmap, $basectx);
    }
}
