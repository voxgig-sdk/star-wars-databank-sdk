# StarWarsDatabank SDK exists test

import pytest
from starwarsdatabank_sdk import StarWarsDatabankSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = StarWarsDatabankSDK.test(None, None)
        assert testsdk is not None
