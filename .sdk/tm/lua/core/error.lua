-- Openverse SDK error

local OpenverseError = {}
OpenverseError.__index = OpenverseError


function OpenverseError.new(code, msg, ctx)
  local self = setmetatable({}, OpenverseError)
  self.is_sdk_error = true
  self.sdk = "Openverse"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpenverseError:error()
  return self.msg
end


function OpenverseError:__tostring()
  return self.msg
end


return OpenverseError
