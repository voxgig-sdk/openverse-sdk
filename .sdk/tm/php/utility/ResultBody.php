<?php
declare(strict_types=1);

// Openverse SDK utility: result_body

class OpenverseResultBody
{
    public static function call(OpenverseContext $ctx): ?OpenverseResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
