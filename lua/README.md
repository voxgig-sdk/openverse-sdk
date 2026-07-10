# Openverse Lua SDK



The Lua SDK for the Openverse API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Audio()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/openverse-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("openverse_sdk")

local client = sdk.new({
  apikey = os.getenv("OPENVERSE_APIKEY"),
})
```

### 2. List audio records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local audios, err = client:Audio():list()
if err then error(err) end

for _, item in ipairs(audios) do
  print(item["id"], item["attribution"])
end
```

### 3. Load an audio

```lua
local audio, err = client:Audio():load({ id = "example_id" })
if err then error(err) end
print(audio)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Audio():create({ identifier = "example_identifier" })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local audios, err = client:Audio():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Audio():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENVERSE_TEST_LIVE=TRUE
OPENVERSE_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### OpenverseSDK

```lua
local sdk = require("openverse_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenverseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Audio` | `(data) -> AudioEntity` | Create an Audio entity instance. |
| `Image` | `(data) -> ImageEntity` | Create an Image entity instance. |
| `OAuth2Application` | `(data) -> OAuth2ApplicationEntity` | Create an OAuth2Application entity instance. |
| `OAuth2KeyInfo` | `(data) -> OAuth2KeyInfoEntity` | Create an OAuth2KeyInfo entity instance. |
| `OAuth2Token` | `(data) -> OAuth2TokenEntity` | Create an OAuth2Token entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local audio, err = client:Audio():load({ id = "example_id" })
    if err then error(err) end
    -- audio is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Audio

| Field | Description |
| --- | --- |
| `alt_file` |  |
| `attribution` |  |
| `audio_set` |  |
| `bit_rate` |  |
| `category` |  |
| `creator` |  |
| `creator_url` |  |
| `description` |  |
| `detail_url` |  |
| `display_name` |  |
| `duration` |  |
| `fields_matched` |  |
| `filesize` |  |
| `filetype` |  |
| `foreign_landing_url` |  |
| `genre` |  |
| `id` |  |
| `identifier` |  |
| `indexed_on` |  |
| `len` |  |
| `license` |  |
| `license_url` |  |
| `license_version` |  |
| `logo_url` |  |
| `mature` |  |
| `media_count` |  |
| `point` |  |
| `provider` |  |
| `reason` |  |
| `related_url` |  |
| `sample_rate` |  |
| `source` |  |
| `source_name` |  |
| `source_url` |  |
| `tag` |  |
| `thumbnail` |  |
| `title` |  |
| `url` |  |
| `waveform` |  |

Operations: Create, List, Load.

API path: `/v1/audio/{identifier}/report/`

#### Image

| Field | Description |
| --- | --- |
| `attribution` |  |
| `author_name` |  |
| `author_url` |  |
| `category` |  |
| `creator` |  |
| `creator_url` |  |
| `description` |  |
| `detail_url` |  |
| `display_name` |  |
| `fields_matched` |  |
| `filesize` |  |
| `filetype` |  |
| `foreign_landing_url` |  |
| `height` |  |
| `id` |  |
| `identifier` |  |
| `indexed_on` |  |
| `license` |  |
| `license_url` |  |
| `license_version` |  |
| `logo_url` |  |
| `mature` |  |
| `media_count` |  |
| `provider` |  |
| `reason` |  |
| `related_url` |  |
| `source` |  |
| `source_name` |  |
| `source_url` |  |
| `tag` |  |
| `thumbnail` |  |
| `title` |  |
| `type` |  |
| `url` |  |
| `version` |  |
| `width` |  |

Operations: Create, List, Load.

API path: `/v1/images/{identifier}/report/`

#### OAuth2Application

| Field | Description |
| --- | --- |
| `description` |  |
| `email` |  |
| `name` |  |

Operations: Create.

API path: `/v1/auth_tokens/register/`

#### OAuth2KeyInfo

| Field | Description |
| --- | --- |
| `rate_limit_model` |  |
| `requests_this_minute` |  |
| `requests_today` |  |
| `verified` |  |

Operations: Load.

API path: `/v1/rate_limit/`

#### OAuth2Token

| Field | Description |
| --- | --- |
| `access_token` |  |
| `expires_in` |  |
| `scope` |  |
| `token_type` |  |

Operations: Create.

API path: `/v1/auth_tokens/token/`



## Entities


### Audio

Create an instance: `local audio = client:Audio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt_file` | `table` |  |
| `attribution` | `string` |  |
| `audio_set` | `any` |  |
| `bit_rate` | `number` |  |
| `category` | `string` |  |
| `creator` | `string` |  |
| `creator_url` | `string` |  |
| `description` | `string` |  |
| `detail_url` | `string` |  |
| `display_name` | `string` |  |
| `duration` | `number` |  |
| `fields_matched` | `table` |  |
| `filesize` | `number` |  |
| `filetype` | `string` |  |
| `foreign_landing_url` | `string` |  |
| `genre` | `table` |  |
| `id` | `string` |  |
| `identifier` | `string` |  |
| `indexed_on` | `string` |  |
| `len` | `number` |  |
| `license` | `string` |  |
| `license_url` | `string` |  |
| `license_version` | `string` |  |
| `logo_url` | `string` |  |
| `mature` | `boolean` |  |
| `media_count` | `number` |  |
| `point` | `table` |  |
| `provider` | `string` |  |
| `reason` | `any` |  |
| `related_url` | `string` |  |
| `sample_rate` | `number` |  |
| `source` | `string` |  |
| `source_name` | `string` |  |
| `source_url` | `string` |  |
| `tag` | `table` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |
| `waveform` | `string` |  |

#### Example: Load

```lua
local audio, err = client:Audio():load({ id = "audio_id" })
```

#### Example: List

```lua
local audios, err = client:Audio():list()
```

#### Example: Create

```lua
local audio, err = client:Audio():create({
  identifier = "example_identifier", -- string
})
```


### Image

Create an instance: `local image = client:Image(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `string` |  |
| `author_name` | `string` |  |
| `author_url` | `string` |  |
| `category` | `string` |  |
| `creator` | `string` |  |
| `creator_url` | `string` |  |
| `description` | `string` |  |
| `detail_url` | `string` |  |
| `display_name` | `string` |  |
| `fields_matched` | `table` |  |
| `filesize` | `number` |  |
| `filetype` | `string` |  |
| `foreign_landing_url` | `string` |  |
| `height` | `number` |  |
| `id` | `string` |  |
| `identifier` | `string` |  |
| `indexed_on` | `string` |  |
| `license` | `string` |  |
| `license_url` | `string` |  |
| `license_version` | `string` |  |
| `logo_url` | `string` |  |
| `mature` | `boolean` |  |
| `media_count` | `number` |  |
| `provider` | `string` |  |
| `reason` | `any` |  |
| `related_url` | `string` |  |
| `source` | `string` |  |
| `source_name` | `string` |  |
| `source_url` | `string` |  |
| `tag` | `table` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |
| `type` | `any` |  |
| `url` | `string` |  |
| `version` | `any` |  |
| `width` | `number` |  |

#### Example: Load

```lua
local image, err = client:Image():load({ id = "image_id" })
```

#### Example: List

```lua
local images, err = client:Image():list()
```

#### Example: Create

```lua
local image, err = client:Image():create({
  identifier = "example_identifier", -- string
})
```


### OAuth2Application

Create an instance: `local o_auth2_application = client:OAuth2Application(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `email` | `string` |  |
| `name` | `string` |  |

#### Example: Create

```lua
local o_auth2_application, err = client:OAuth2Application():create({
  description = "example_description", -- string
  email = "example_email", -- string
  name = "example_name", -- string
})
```


### OAuth2KeyInfo

Create an instance: `local o_auth2_key_info = client:OAuth2KeyInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate_limit_model` | `string` |  |
| `requests_this_minute` | `number` |  |
| `requests_today` | `number` |  |
| `verified` | `boolean` |  |

#### Example: Load

```lua
local o_auth2_key_info, err = client:OAuth2KeyInfo():load()
```


### OAuth2Token

Create an instance: `local o_auth2_token = client:OAuth2Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `expires_in` | `number` |  |
| `scope` | `string` |  |
| `token_type` | `string` |  |

#### Example: Create

```lua
local o_auth2_token, err = client:OAuth2Token():create({
  access_token = "example_access_token", -- string
  expires_in = 1, -- number
  scope = "example_scope", -- string
  token_type = "example_token_type", -- string
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── openverse_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`openverse_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local audio = client:Audio()
audio:list()

-- audio:data_get() now returns the audio data from the last list
-- audio:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
