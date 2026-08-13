# Openverse SDK feature factory

from openverse_sdk.feature.base_feature import OpenverseBaseFeature
from openverse_sdk.feature.test_feature import OpenverseTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpenverseBaseFeature(),
        "test": lambda: OpenverseTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
