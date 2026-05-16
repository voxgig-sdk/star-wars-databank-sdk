# StarWarsDatabank SDK utility: make_context
require_relative '../core/context'
module StarWarsDatabankUtilities
  MakeContext = ->(ctxmap, basectx) {
    StarWarsDatabankContext.new(ctxmap, basectx)
  }
end
