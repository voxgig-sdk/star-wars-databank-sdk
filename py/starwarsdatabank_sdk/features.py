# StarWarsDatabank SDK feature factory

from starwarsdatabank_sdk.feature.base_feature import StarWarsDatabankBaseFeature
from starwarsdatabank_sdk.feature.ratelimit_feature import StarWarsDatabankRatelimitFeature
from starwarsdatabank_sdk.feature.retry_feature import StarWarsDatabankRetryFeature
from starwarsdatabank_sdk.feature.test_feature import StarWarsDatabankTestFeature
from starwarsdatabank_sdk.feature.timeout_feature import StarWarsDatabankTimeoutFeature


_FEATURES = {
    "base": lambda: StarWarsDatabankBaseFeature(),
    "ratelimit": lambda: StarWarsDatabankRatelimitFeature(),
    "retry": lambda: StarWarsDatabankRetryFeature(),
    "test": lambda: StarWarsDatabankTestFeature(),
    "timeout": lambda: StarWarsDatabankTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
