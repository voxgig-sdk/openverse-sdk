# Openverse SDK utility: make_context

from openverse_sdk.core.context import OpenverseContext


def make_context_util(ctxmap, basectx):
    return OpenverseContext(ctxmap, basectx)
