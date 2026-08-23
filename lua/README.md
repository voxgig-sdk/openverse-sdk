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
local created, err = client:Audio():create({ identifier = "example_identifier", alt_files = {}, attribution = "example_attribution", audio_set = "example_audio_set", detail_url = "example_detail_url", display_name = "example_display_name", fields_matched = {}, id = "example_id", indexed_on = "example_indexed_on", len = 1, license = "example_license", license_url = "example_license_url", logo_url = "example_logo_url", mature = true, media_count = 1, points = {}, reason = "example_reason", related_url = "example_related_url", source_name = "example_source_name", source_url = "example_source_url", tags = {}, thumbnail = "example_thumbnail", waveform = "example_waveform" })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local images, err = client:Image():list()
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

local result, err = client:Image():list()
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
| `alt_files` | JSON describing alternative files for this audio. |
| `attribution` | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | Reference to set of which this track is a part. |
| `bit_rate` | Number in bits per second, eg. |
| `category` | The top-level classification of this media file. |
| `creator` | The name of the media creator. |
| `creator_url` | A direct link to the media creator. |
| `description` | The explanation on why media is being reported. |
| `detail_url` | A direct link to the detail view of this audio file. |
| `display_name` | The name of content source, e.g. |
| `duration` | The time length of the audio file in milliseconds. |
| `fields_matched` | List the fields that matched the query for this result. |
| `filesize` | Number in bytes, e.g. |
| `filetype` | The type of the file, related to the file extension. |
| `foreign_landing_url` | The landing page of the work. |
| `genres` | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | Our unique identifier for an open-licensed work. |
| `identifier` | Our unique identifier for an open-licensed work. |
| `indexed_on` | The timestamp of when the media was indexed by Openverse. |
| `len` |  |
| `license` | The name of license for the media. |
| `license_url` | A direct link to the license deed or legal terms. |
| `license_version` | The version of the media license. |
| `logo_url` | The URL to a logo for the source. |
| `mature` | Whether the media item is marked as mature |
| `media_count` | The number of media items indexed from the source. |
| `points` |  |
| `provider` | The content provider, e.g. |
| `reason` | The reason to report media to Openverse. |
| `related_url` | A link to an endpoint that provides similar audio files. |
| `sample_rate` | Number in hertz, eg. |
| `source` | The source of the data, meaning a particular dataset. |
| `source_name` | The source of the media, e.g. |
| `source_url` | The URL of the source, e.g. |
| `tags` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | A direct link to the miniature artwork. |
| `title` | The name of the media. |
| `url` | The actual URL to the media file. |
| `waveform` | A direct link to the waveform peaks. |

Operations: Create, List, Load.

API path: `/v1/audio/{identifier}/report/`

#### Image

| Field | Description |
| --- | --- |
| `attribution` | Legally valid attribution for the media item in plain-text English. |
| `author_name` | The name of the media creator. |
| `author_url` | A direct link to the media creator. |
| `category` | The top-level classification of this media file. |
| `creator` | The name of the media creator. |
| `creator_url` | A direct link to the media creator. |
| `description` | The explanation on why media is being reported. |
| `detail_url` | A direct link to the detail view of this audio file. |
| `display_name` | The name of content source, e.g. |
| `fields_matched` | List the fields that matched the query for this result. |
| `filesize` | Number in bytes, e.g. |
| `filetype` | The type of the file, related to the file extension. |
| `foreign_landing_url` | The landing page of the work. |
| `height` | The height of the image in pixels. |
| `id` | Our unique identifier for an open-licensed work. |
| `identifier` | Our unique identifier for an open-licensed work. |
| `indexed_on` | The timestamp of when the media was indexed by Openverse. |
| `license` | The name of license for the media. |
| `license_url` | A direct link to the license deed or legal terms. |
| `license_version` | The version of the media license. |
| `logo_url` | The URL to a logo for the source. |
| `mature` | Whether the media item is marked as mature |
| `media_count` | The number of media items indexed from the source. |
| `provider` | The content provider, e.g. |
| `reason` | The reason to report media to Openverse. |
| `related_url` | A link to an endpoint that provides similar audio files. |
| `source` | The source of the data, meaning a particular dataset. |
| `source_name` | The source of the media, e.g. |
| `source_url` | The URL of the source, e.g. |
| `tags` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | A direct link to the miniature artwork. |
| `title` | The name of the media. |
| `type` | The resource type, always set to 'photo' for images. |
| `url` | The actual URL to the media file. |
| `version` | The oEmbed version number, always set to 1.0. |
| `width` | The width of the image in pixels. |

Operations: Create, List, Load.

API path: `/v1/images/{identifier}/report/`

#### OAuth2Application

| Field | Description |
| --- | --- |
| `description` | A description of what you are trying to achieve with your project using the API. |
| `email` | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | A unique human-readable name for your application or project requiring access to the Openverse API. |

Operations: Create.

API path: `/v1/auth_tokens/register/`

#### OAuth2KeyInfo

| Field | Description |
| --- | --- |
| `rate_limit_model` | The type of rate limit applied to your key. |
| `requests_this_minute` | The number of requests your key has performed in the last minute. |
| `requests_today` | The number of requests your key has performed in the last day. |
| `verified` | Whether the application has verified the submitted email address. |

Operations: Load.

API path: `/v1/rate_limit/`

#### OAuth2Token

| Field | Description |
| --- | --- |
| `access_token` | The access token that can be used to authenticate requests. |
| `expires_in` | The number of seconds until the token expires. |
| `scope` | The scope of the token. |
| `token_type` | The type of token. |

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
| `alt_files` | `table` | JSON describing alternative files for this audio. |
| `attribution` | `string` | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `any` | Reference to set of which this track is a part. |
| `bit_rate` | `number` | Number in bits per second, eg. |
| `category` | `string` | The top-level classification of this media file. |
| `creator` | `string` | The name of the media creator. |
| `creator_url` | `string` | A direct link to the media creator. |
| `description` | `string` | The explanation on why media is being reported. |
| `detail_url` | `string` | A direct link to the detail view of this audio file. |
| `display_name` | `string` | The name of content source, e.g. |
| `duration` | `number` | The time length of the audio file in milliseconds. |
| `fields_matched` | `table` | List the fields that matched the query for this result. |
| `filesize` | `number` | Number in bytes, e.g. |
| `filetype` | `string` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | The landing page of the work. |
| `genres` | `table` | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `string` | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | The timestamp of when the media was indexed by Openverse. |
| `len` | `number` |  |
| `license` | `string` | The name of license for the media. |
| `license_url` | `string` | A direct link to the license deed or legal terms. |
| `license_version` | `string` | The version of the media license. |
| `logo_url` | `string` | The URL to a logo for the source. |
| `mature` | `boolean` | Whether the media item is marked as mature |
| `media_count` | `number` | The number of media items indexed from the source. |
| `points` | `table` |  |
| `provider` | `string` | The content provider, e.g. |
| `reason` | `any` | The reason to report media to Openverse. |
| `related_url` | `string` | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `number` | Number in hertz, eg. |
| `source` | `string` | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | The source of the media, e.g. |
| `source_url` | `string` | The URL of the source, e.g. |
| `tags` | `table` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | A direct link to the miniature artwork. |
| `title` | `string` | The name of the media. |
| `url` | `string` | The actual URL to the media file. |
| `waveform` | `string` | A direct link to the waveform peaks. |

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
  alt_files = {}, -- table
  attribution = "example_attribution", -- string
  audio_set = "example_audio_set", -- any
  detail_url = "example_detail_url", -- string
  display_name = "example_display_name", -- string
  fields_matched = {}, -- table
  id = "example_id", -- string
  indexed_on = "example_indexed_on", -- string
  len = 1, -- number
  license = "example_license", -- string
  license_url = "example_license_url", -- string
  logo_url = "example_logo_url", -- string
  mature = true, -- boolean
  media_count = 1, -- number
  points = {}, -- table
  reason = "example_reason", -- any
  related_url = "example_related_url", -- string
  source_name = "example_source_name", -- string
  source_url = "example_source_url", -- string
  tags = {}, -- table
  thumbnail = "example_thumbnail", -- string
  waveform = "example_waveform", -- string
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
| `attribution` | `string` | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `string` | The name of the media creator. |
| `author_url` | `string` | A direct link to the media creator. |
| `category` | `string` | The top-level classification of this media file. |
| `creator` | `string` | The name of the media creator. |
| `creator_url` | `string` | A direct link to the media creator. |
| `description` | `string` | The explanation on why media is being reported. |
| `detail_url` | `string` | A direct link to the detail view of this audio file. |
| `display_name` | `string` | The name of content source, e.g. |
| `fields_matched` | `table` | List the fields that matched the query for this result. |
| `filesize` | `number` | Number in bytes, e.g. |
| `filetype` | `string` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | The landing page of the work. |
| `height` | `number` | The height of the image in pixels. |
| `id` | `string` | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | The name of license for the media. |
| `license_url` | `string` | A direct link to the license deed or legal terms. |
| `license_version` | `string` | The version of the media license. |
| `logo_url` | `string` | The URL to a logo for the source. |
| `mature` | `boolean` | Whether the media item is marked as mature |
| `media_count` | `number` | The number of media items indexed from the source. |
| `provider` | `string` | The content provider, e.g. |
| `reason` | `any` | The reason to report media to Openverse. |
| `related_url` | `string` | A link to an endpoint that provides similar audio files. |
| `source` | `string` | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | The source of the media, e.g. |
| `source_url` | `string` | The URL of the source, e.g. |
| `tags` | `table` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | A direct link to the miniature artwork. |
| `title` | `string` | The name of the media. |
| `type` | `any` | The resource type, always set to 'photo' for images. |
| `url` | `string` | The actual URL to the media file. |
| `version` | `any` | The oEmbed version number, always set to 1.0. |
| `width` | `number` | The width of the image in pixels. |

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
  attribution = "example_attribution", -- string
  author_name = "example_author_name", -- string
  author_url = "example_author_url", -- string
  detail_url = "example_detail_url", -- string
  display_name = "example_display_name", -- string
  fields_matched = {}, -- table
  id = "example_id", -- string
  indexed_on = "example_indexed_on", -- string
  license = "example_license", -- string
  license_url = "example_license_url", -- string
  logo_url = "example_logo_url", -- string
  mature = true, -- boolean
  media_count = 1, -- number
  reason = "example_reason", -- any
  related_url = "example_related_url", -- string
  source_name = "example_source_name", -- string
  source_url = "example_source_url", -- string
  tags = {}, -- table
  thumbnail = "example_thumbnail", -- string
  type = "example_type", -- any
  version = "example_version", -- any
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
| `description` | `string` | A description of what you are trying to achieve with your project using the API. |
| `email` | `string` | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `string` | A unique human-readable name for your application or project requiring access to the Openverse API. |

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
| `rate_limit_model` | `string` | The type of rate limit applied to your key. |
| `requests_this_minute` | `number` | The number of requests your key has performed in the last minute. |
| `requests_today` | `number` | The number of requests your key has performed in the last day. |
| `verified` | `boolean` | Whether the application has verified the submitted email address. |

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
| `access_token` | `string` | The access token that can be used to authenticate requests. |
| `expires_in` | `number` | The number of seconds until the token expires. |
| `scope` | `string` | The scope of the token. |
| `token_type` | `string` | The type of token. |

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
local image = client:Image()
image:list()

-- image:data_get() now returns the image data from the last list
-- image:match_get() returns the last match criteria
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
