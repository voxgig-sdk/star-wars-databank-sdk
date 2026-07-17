-- StarWarsDatabank SDK exists test

local sdk = require("star-wars-databank_sdk")

describe("StarWarsDatabankSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
