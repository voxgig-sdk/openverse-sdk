# Openverse SDK utility: feature_add
module OpenverseUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
