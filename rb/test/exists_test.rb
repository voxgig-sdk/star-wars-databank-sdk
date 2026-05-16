# StarWarsDatabank SDK exists test

require "minitest/autorun"
require_relative "../StarWarsDatabank_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = StarWarsDatabankSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
