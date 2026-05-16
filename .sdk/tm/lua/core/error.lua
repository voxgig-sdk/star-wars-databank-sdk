-- StarWarsDatabank SDK error

local StarWarsDatabankError = {}
StarWarsDatabankError.__index = StarWarsDatabankError


function StarWarsDatabankError.new(code, msg, ctx)
  local self = setmetatable({}, StarWarsDatabankError)
  self.is_sdk_error = true
  self.sdk = "StarWarsDatabank"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function StarWarsDatabankError:error()
  return self.msg
end


function StarWarsDatabankError:__tostring()
  return self.msg
end


return StarWarsDatabankError
