# Openverse Ruby SDK



The Ruby SDK for the Openverse API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Audio` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openverse-sdk/releases](https://github.com/voxgig-sdk/openverse-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Openverse_sdk"

client = OpenverseSDK.new({
  "apikey" => ENV["OPENVERSE_APIKEY"],
})
```

### 2. List audio records

```ruby
begin
  # list returns an Array of Audio records — iterate directly.
  audios = client.Audio.list
  audios.each do |item|
    puts "#{item["id"]} #{item["alt_file"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an audio

```ruby
begin
  # load returns the bare Audio record (raises on error).
  audio = client.Audio.load({ "id" => "example_id" })
  puts audio
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the bare created Audio record.
created = client.Audio.create({ "identifier" => "example" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  audios = client.Audio.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = OpenverseSDK.test({
  "entity" => { "audio" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
audio = client.Audio.list()
puts audio
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = OpenverseSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### OpenverseSDK

```ruby
require_relative "Openverse_sdk"
client = OpenverseSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = OpenverseSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenverseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Audio` | `(data) -> AudioEntity` | Create an Audio entity instance. |
| `Image` | `(data) -> ImageEntity` | Create an Image entity instance. |
| `OAuth2Application` | `(data) -> OAuth2ApplicationEntity` | Create an OAuth2Application entity instance. |
| `OAuth2KeyInfo` | `(data) -> OAuth2KeyInfoEntity` | Create an OAuth2KeyInfo entity instance. |
| `OAuth2Token` | `(data) -> OAuth2TokenEntity` | Create an OAuth2Token entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `OpenverseError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `audio = client.Audio`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt_file` | `Array` |  |
| `attribution` | `String` |  |
| `audio_set` | `Object` |  |
| `bit_rate` | `Integer` |  |
| `category` | `String` |  |
| `creator` | `String` |  |
| `creator_url` | `String` |  |
| `description` | `String` |  |
| `detail_url` | `String` |  |
| `display_name` | `String` |  |
| `duration` | `Integer` |  |
| `fields_matched` | `Array` |  |
| `filesize` | `Integer` |  |
| `filetype` | `String` |  |
| `foreign_landing_url` | `String` |  |
| `genre` | `Array` |  |
| `id` | `String` |  |
| `identifier` | `String` |  |
| `indexed_on` | `String` |  |
| `len` | `Integer` |  |
| `license` | `String` |  |
| `license_url` | `String` |  |
| `license_version` | `String` |  |
| `logo_url` | `String` |  |
| `mature` | `Boolean` |  |
| `media_count` | `Integer` |  |
| `point` | `Array` |  |
| `provider` | `String` |  |
| `reason` | `Object` |  |
| `related_url` | `String` |  |
| `sample_rate` | `Integer` |  |
| `source` | `String` |  |
| `source_name` | `String` |  |
| `source_url` | `String` |  |
| `tag` | `Array` |  |
| `thumbnail` | `String` |  |
| `title` | `String` |  |
| `url` | `String` |  |
| `waveform` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Audio record (raises on error).
audio = client.Audio.load({ "id" => "audio_id" })
```

#### Example: List

```ruby
# list returns an Array of Audio records (raises on error).
audios = client.Audio.list
```

#### Example: Create

```ruby
audio = client.Audio.create({
  "alt_file" => [], # Array
  "attribution" => "example", # String
  "audio_set" => "example", # Object
  "detail_url" => "example", # String
  "display_name" => "example", # String
  "fields_matched" => [], # Array
  "identifier" => "example", # String
  "indexed_on" => "example", # String
  "len" => 1, # Integer
  "license" => "example", # String
  "license_url" => "example", # String
  "logo_url" => "example", # String
  "mature" => true, # Boolean
  "media_count" => 1, # Integer
  "point" => [], # Array
  "reason" => "example", # Object
  "related_url" => "example", # String
  "source_name" => "example", # String
  "source_url" => "example", # String
  "tag" => [], # Array
  "thumbnail" => "example", # String
  "waveform" => "example", # String
})
```


### Image

Create an instance: `image = client.Image`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `String` |  |
| `author_name` | `String` |  |
| `author_url` | `String` |  |
| `category` | `String` |  |
| `creator` | `String` |  |
| `creator_url` | `String` |  |
| `description` | `String` |  |
| `detail_url` | `String` |  |
| `display_name` | `String` |  |
| `fields_matched` | `Array` |  |
| `filesize` | `Integer` |  |
| `filetype` | `String` |  |
| `foreign_landing_url` | `String` |  |
| `height` | `Integer` |  |
| `id` | `String` |  |
| `identifier` | `String` |  |
| `indexed_on` | `String` |  |
| `license` | `String` |  |
| `license_url` | `String` |  |
| `license_version` | `String` |  |
| `logo_url` | `String` |  |
| `mature` | `Boolean` |  |
| `media_count` | `Integer` |  |
| `provider` | `String` |  |
| `reason` | `Object` |  |
| `related_url` | `String` |  |
| `source` | `String` |  |
| `source_name` | `String` |  |
| `source_url` | `String` |  |
| `tag` | `Array` |  |
| `thumbnail` | `String` |  |
| `title` | `String` |  |
| `type` | `Object` |  |
| `url` | `String` |  |
| `version` | `Object` |  |
| `width` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Image record (raises on error).
image = client.Image.load({ "id" => "image_id" })
```

#### Example: List

```ruby
# list returns an Array of Image records (raises on error).
images = client.Image.list
```

#### Example: Create

```ruby
image = client.Image.create({
  "attribution" => "example", # String
  "author_name" => "example", # String
  "author_url" => "example", # String
  "detail_url" => "example", # String
  "display_name" => "example", # String
  "fields_matched" => [], # Array
  "identifier" => "example", # String
  "indexed_on" => "example", # String
  "license" => "example", # String
  "license_url" => "example", # String
  "logo_url" => "example", # String
  "mature" => true, # Boolean
  "media_count" => 1, # Integer
  "reason" => "example", # Object
  "related_url" => "example", # String
  "source_name" => "example", # String
  "source_url" => "example", # String
  "tag" => [], # Array
  "thumbnail" => "example", # String
  "type" => "example", # Object
  "version" => "example", # Object
})
```


### OAuth2Application

Create an instance: `o_auth2_application = client.OAuth2Application`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `email` | `String` |  |
| `name` | `String` |  |

#### Example: Create

```ruby
o_auth2_application = client.OAuth2Application.create({
  "description" => "example", # String
  "email" => "example", # String
  "name" => "example", # String
})
```


### OAuth2KeyInfo

Create an instance: `o_auth2_key_info = client.OAuth2KeyInfo`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate_limit_model` | `String` |  |
| `requests_this_minute` | `Integer` |  |
| `requests_today` | `Integer` |  |
| `verified` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare OAuth2KeyInfo record (raises on error).
o_auth2_key_info = client.OAuth2KeyInfo.load()
```


### OAuth2Token

Create an instance: `o_auth2_token = client.OAuth2Token`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `String` |  |
| `expires_in` | `Integer` |  |
| `scope` | `String` |  |
| `token_type` | `String` |  |

#### Example: Create

```ruby
o_auth2_token = client.OAuth2Token.create({
  "access_token" => "example", # String
  "expires_in" => 1, # Integer
  "scope" => "example", # String
  "token_type" => "example", # String
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Openverse_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Openverse_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
audio = client.Audio
audio.list()

# audio.data_get now returns the audio data from the last list
# audio.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
