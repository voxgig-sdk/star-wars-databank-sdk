# StarWarsDatabank SDK utility: feature_add
module StarWarsDatabankUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
