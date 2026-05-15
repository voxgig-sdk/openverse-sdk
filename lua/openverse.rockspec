package = "voxgig-sdk-openverse"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/openverse-sdk.git"
}
description = {
  summary = "Openverse SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["openverse_sdk"] = "openverse_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
