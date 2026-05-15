<?php
declare(strict_types=1);

// Openverse SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenverseMakeContext
{
    public static function call(array $ctxmap, ?OpenverseContext $basectx): OpenverseContext
    {
        return new OpenverseContext($ctxmap, $basectx);
    }
}
