<?php
declare(strict_types=1);

// StarWarsDatabank SDK utility: result_body

class StarWarsDatabankResultBody
{
    public static function call(StarWarsDatabankContext $ctx): ?StarWarsDatabankResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
