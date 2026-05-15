# Openverse SDK exists test

require "minitest/autorun"
require_relative "../Openverse_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpenverseSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
