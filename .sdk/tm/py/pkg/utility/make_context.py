# Openverse SDK utility: make_context

from projectname_sdk.core.context import OpenverseContext


def make_context_util(ctxmap, basectx):
    return OpenverseContext(ctxmap, basectx)
