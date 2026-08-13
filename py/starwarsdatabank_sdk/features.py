# StarWarsDatabank SDK feature factory

from starwarsdatabank_sdk.feature.base_feature import StarWarsDatabankBaseFeature
from starwarsdatabank_sdk.feature.test_feature import StarWarsDatabankTestFeature


def _make_feature(name):
    features = {
        "base": lambda: StarWarsDatabankBaseFeature(),
        "test": lambda: StarWarsDatabankTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
