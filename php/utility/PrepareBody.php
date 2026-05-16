<?php
declare(strict_types=1);

// StarWarsDatabank SDK utility: prepare_body

class StarWarsDatabankPrepareBody
{
    public static function call(StarWarsDatabankContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
