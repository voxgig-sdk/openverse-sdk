<?php
declare(strict_types=1);

// Openverse SDK utility: prepare_body

class OpenversePrepareBody
{
    public static function call(OpenverseContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
