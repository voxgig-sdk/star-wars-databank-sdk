# StarWarsDatabank SDK utility: make_context

from projectname_sdk.core.context import StarWarsDatabankContext


def make_context_util(ctxmap, basectx):
    return StarWarsDatabankContext(ctxmap, basectx)
