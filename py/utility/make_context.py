# StarWarsDatabank SDK utility: make_context

from core.context import StarWarsDatabankContext


def make_context_util(ctxmap, basectx):
    return StarWarsDatabankContext(ctxmap, basectx)
