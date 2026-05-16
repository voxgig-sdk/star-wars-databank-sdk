<?php
declare(strict_types=1);

// StarWarsDatabank SDK utility: result_headers

class StarWarsDatabankResultHeaders
{
    public static function call(StarWarsDatabankContext $ctx): ?StarWarsDatabankResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
