<?php
declare(strict_types=1);

// Openverse SDK utility: feature_add

class OpenverseFeatureAdd
{
    public static function call(OpenverseContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
