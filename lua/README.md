# Openverse Lua SDK

The Lua SDK for the Openverse API. Provides an entity-oriented interface using Lua conventions.


## Install
```bash
luarocks install openverse-sdk
```

If the module is not yet published, add the source directory to
your `LUA_PATH`:

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

### 2. List audios

```lua
local result, err = client:Audio(nil):list(nil, nil)
if err then error(err) end

if type(result) == "table" then
  for _, item in ipairs(result) do
    local d = item:data_get()
    print(d["id"], d["name"])
  end
end
```

### 3. Load a audio

```lua
local result, err = client:Audio(nil):load({ id = "example_id" }, nil)
if err then error(err) end
print(result)
```

### 4. Create, update, and remove

```lua
-- Create
local created, _ = client:Audio(nil):create({ name = "Example" }, nil)

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
local client = sdk.test(nil, nil)

local result, err = client:Openverse(nil):load(
  { id = "test01" }, nil
)
-- result contains mock response data
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
| `Audio` | `(data) -> AudioEntity` | Create a Audio entity instance. |
| `Image` | `(data) -> ImageEntity` | Create a Image entity instance. |
| `OAuth2Application` | `(data) -> OAuth2ApplicationEntity` | Create a OAuth2Application entity instance. |
| `OAuth2KeyInfo` | `(data) -> OAuth2KeyInfoEntity` | Create a OAuth2KeyInfo entity instance. |
| `OAuth2Token` | `(data) -> OAuth2TokenEntity` | Create a OAuth2Token entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`table` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `boolean` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `table` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

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
| `license_url` |  |
| `license_version` |  |
| `licenses` |  |
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
| `license_url` |  |
| `license_version` |  |
| `licenses` |  |
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

Create an instance: `const audio = client.Audio()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt_file` | ``$ARRAY`` |  |
| `attribution` | ``$STRING`` |  |
| `audio_set` | ``$ANY`` |  |
| `bit_rate` | ``$INTEGER`` |  |
| `category` | ``$STRING`` |  |
| `creator` | ``$STRING`` |  |
| `creator_url` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `detail_url` | ``$STRING`` |  |
| `display_name` | ``$STRING`` |  |
| `duration` | ``$INTEGER`` |  |
| `fields_matched` | ``$ARRAY`` |  |
| `filesize` | ``$INTEGER`` |  |
| `filetype` | ``$STRING`` |  |
| `foreign_landing_url` | ``$STRING`` |  |
| `genre` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `identifier` | ``$STRING`` |  |
| `indexed_on` | ``$STRING`` |  |
| `len` | ``$INTEGER`` |  |
| `license_url` | ``$STRING`` |  |
| `license_version` | ``$STRING`` |  |
| `licenses` | ``$STRING`` |  |
| `logo_url` | ``$STRING`` |  |
| `mature` | ``$BOOLEAN`` |  |
| `media_count` | ``$INTEGER`` |  |
| `point` | ``$ARRAY`` |  |
| `provider` | ``$STRING`` |  |
| `reason` | ``$ANY`` |  |
| `related_url` | ``$STRING`` |  |
| `sample_rate` | ``$INTEGER`` |  |
| `source` | ``$STRING`` |  |
| `source_name` | ``$STRING`` |  |
| `source_url` | ``$STRING`` |  |
| `tag` | ``$ARRAY`` |  |
| `thumbnail` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `waveform` | ``$STRING`` |  |

#### Example: Load

```ts
const audio = await client.Audio().load({ id: 'audio_id' })
```

#### Example: List

```ts
const audios = await client.Audio().list()
```

#### Example: Create

```ts
const audio = await client.Audio().create({
  alt_file: /* `$ARRAY` */,
  attribution: /* `$STRING` */,
  audio_set: /* `$ANY` */,
  detail_url: /* `$STRING` */,
  display_name: /* `$STRING` */,
  fields_matched: /* `$ARRAY` */,
  identifier: /* `$STRING` */,
  indexed_on: /* `$STRING` */,
  len: /* `$INTEGER` */,
  license_url: /* `$STRING` */,
  licenses: /* `$STRING` */,
  logo_url: /* `$STRING` */,
  mature: /* `$BOOLEAN` */,
  media_count: /* `$INTEGER` */,
  point: /* `$ARRAY` */,
  reason: /* `$ANY` */,
  related_url: /* `$STRING` */,
  source_name: /* `$STRING` */,
  source_url: /* `$STRING` */,
  tag: /* `$ARRAY` */,
  thumbnail: /* `$STRING` */,
  waveform: /* `$STRING` */,
})
```


### Image

Create an instance: `const image = client.Image()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | ``$STRING`` |  |
| `author_name` | ``$STRING`` |  |
| `author_url` | ``$STRING`` |  |
| `category` | ``$STRING`` |  |
| `creator` | ``$STRING`` |  |
| `creator_url` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `detail_url` | ``$STRING`` |  |
| `display_name` | ``$STRING`` |  |
| `fields_matched` | ``$ARRAY`` |  |
| `filesize` | ``$INTEGER`` |  |
| `filetype` | ``$STRING`` |  |
| `foreign_landing_url` | ``$STRING`` |  |
| `height` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `identifier` | ``$STRING`` |  |
| `indexed_on` | ``$STRING`` |  |
| `license_url` | ``$STRING`` |  |
| `license_version` | ``$STRING`` |  |
| `licenses` | ``$STRING`` |  |
| `logo_url` | ``$STRING`` |  |
| `mature` | ``$BOOLEAN`` |  |
| `media_count` | ``$INTEGER`` |  |
| `provider` | ``$STRING`` |  |
| `reason` | ``$ANY`` |  |
| `related_url` | ``$STRING`` |  |
| `source` | ``$STRING`` |  |
| `source_name` | ``$STRING`` |  |
| `source_url` | ``$STRING`` |  |
| `tag` | ``$ARRAY`` |  |
| `thumbnail` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `type` | ``$ANY`` |  |
| `url` | ``$STRING`` |  |
| `version` | ``$ANY`` |  |
| `width` | ``$INTEGER`` |  |

#### Example: Load

```ts
const image = await client.Image().load({ id: 'image_id' })
```

#### Example: List

```ts
const images = await client.Image().list()
```

#### Example: Create

```ts
const image = await client.Image().create({
  attribution: /* `$STRING` */,
  author_name: /* `$STRING` */,
  author_url: /* `$STRING` */,
  detail_url: /* `$STRING` */,
  display_name: /* `$STRING` */,
  fields_matched: /* `$ARRAY` */,
  identifier: /* `$STRING` */,
  indexed_on: /* `$STRING` */,
  license_url: /* `$STRING` */,
  licenses: /* `$STRING` */,
  logo_url: /* `$STRING` */,
  mature: /* `$BOOLEAN` */,
  media_count: /* `$INTEGER` */,
  reason: /* `$ANY` */,
  related_url: /* `$STRING` */,
  source_name: /* `$STRING` */,
  source_url: /* `$STRING` */,
  tag: /* `$ARRAY` */,
  thumbnail: /* `$STRING` */,
  type: /* `$ANY` */,
  version: /* `$ANY` */,
})
```


### OAuth2Application

Create an instance: `const o_auth2_application = client.OAuth2Application()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: Create

```ts
const o_auth2_application = await client.OAuth2Application().create({
  description: /* `$STRING` */,
  email: /* `$STRING` */,
  name: /* `$STRING` */,
})
```


### OAuth2KeyInfo

Create an instance: `const o_auth2_key_info = client.OAuth2KeyInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate_limit_model` | ``$STRING`` |  |
| `requests_this_minute` | ``$INTEGER`` |  |
| `requests_today` | ``$INTEGER`` |  |
| `verified` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const o_auth2_key_info = await client.OAuth2KeyInfo().load({ id: 'o_auth2_key_info_id' })
```


### OAuth2Token

Create an instance: `const o_auth2_token = client.OAuth2Token()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | ``$STRING`` |  |
| `expires_in` | ``$INTEGER`` |  |
| `scope` | ``$STRING`` |  |
| `token_type` | ``$STRING`` |  |

#### Example: Create

```ts
const o_auth2_token = await client.OAuth2Token().create({
  access_token: /* `$STRING` */,
  expires_in: /* `$INTEGER` */,
  scope: /* `$STRING` */,
  token_type: /* `$STRING` */,
})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local moon = client:Moon(nil)
moon:load({ planet_id = "earth", id = "luna" }, nil)

-- moon:data_get() now returns the loaded moon data
-- moon:match_get() returns the last match criteria
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
