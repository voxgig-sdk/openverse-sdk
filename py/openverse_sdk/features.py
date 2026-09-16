# Openverse SDK feature factory

from openverse_sdk.feature.base_feature import OpenverseBaseFeature
from openverse_sdk.feature.ratelimit_feature import OpenverseRatelimitFeature
from openverse_sdk.feature.retry_feature import OpenverseRetryFeature
from openverse_sdk.feature.test_feature import OpenverseTestFeature
from openverse_sdk.feature.timeout_feature import OpenverseTimeoutFeature


_FEATURES = {
    "base": lambda: OpenverseBaseFeature(),
    "ratelimit": lambda: OpenverseRatelimitFeature(),
    "retry": lambda: OpenverseRetryFeature(),
    "test": lambda: OpenverseTestFeature(),
    "timeout": lambda: OpenverseTimeoutFeature(),
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
