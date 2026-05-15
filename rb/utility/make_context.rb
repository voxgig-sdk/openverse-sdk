# Openverse SDK utility: make_context
require_relative '../core/context'
module OpenverseUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenverseContext.new(ctxmap, basectx)
  }
end
