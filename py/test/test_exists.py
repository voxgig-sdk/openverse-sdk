# ProjectName SDK exists test

import pytest
from openverse_sdk import OpenverseSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenverseSDK.test(None, None)
        assert testsdk is not None
