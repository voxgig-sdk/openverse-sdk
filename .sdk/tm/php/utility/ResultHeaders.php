<?php
declare(strict_types=1);

// Openverse SDK utility: result_headers

class OpenverseResultHeaders
{
    public static function call(OpenverseContext $ctx): ?OpenverseResult
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
