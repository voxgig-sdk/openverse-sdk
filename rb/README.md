# Openverse Ruby SDK



The Ruby SDK for the Openverse API — an entity-oriented client using idiomatic Ruby conventions.

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

### 2. List audios

```ruby
begin
  result = client.audio.list
  if result.is_a?(Array)
    result.each do |item|
      d = item.data_get
      puts "#{d["id"]} #{d["name"]}"
    end
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an audio

```ruby
begin
  result = client.audio.load({ "id" => "example_id" })
  puts result
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# Create
created = client.audio.create({ "name" => "Example" })

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
  warn result["err"]
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

Create a mock client for unit testing — no server required:

```ruby
client = OpenverseSDK.test

result = client.audio.load({ "id" => "test01" })
# result contains mock response data
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
| `Audio` | `(data) -> AudioEntity` | Create a Audio entity instance. |
| `Image` | `(data) -> ImageEntity` | Create a Image entity instance. |
| `OAuth2Application` | `(data) -> OAuth2ApplicationEntity` | Create a OAuth2Application entity instance. |
| `OAuth2KeyInfo` | `(data) -> OAuth2KeyInfoEntity` | Create a OAuth2KeyInfo entity instance. |
| `OAuth2Token` | `(data) -> OAuth2TokenEntity` | Create a OAuth2Token entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
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

Create an instance: `const audio = client.audio`

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
| `license` | ``$STRING`` |  |
| `license_url` | ``$STRING`` |  |
| `license_version` | ``$STRING`` |  |
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
const audio = await client.audio.load({ id: 'audio_id' })
```

#### Example: List

```ts
const audios = await client.audio.list()
```

#### Example: Create

```ts
const audio = await client.audio.create({
  alt_file: /* `$ARRAY` */,
  attribution: /* `$STRING` */,
  audio_set: /* `$ANY` */,
  detail_url: /* `$STRING` */,
  display_name: /* `$STRING` */,
  fields_matched: /* `$ARRAY` */,
  identifier: /* `$STRING` */,
  indexed_on: /* `$STRING` */,
  len: /* `$INTEGER` */,
  license: /* `$STRING` */,
  license_url: /* `$STRING` */,
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

Create an instance: `const image = client.image`

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
| `license` | ``$STRING`` |  |
| `license_url` | ``$STRING`` |  |
| `license_version` | ``$STRING`` |  |
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
const image = await client.image.load({ id: 'image_id' })
```

#### Example: List

```ts
const images = await client.image.list()
```

#### Example: Create

```ts
const image = await client.image.create({
  attribution: /* `$STRING` */,
  author_name: /* `$STRING` */,
  author_url: /* `$STRING` */,
  detail_url: /* `$STRING` */,
  display_name: /* `$STRING` */,
  fields_matched: /* `$ARRAY` */,
  identifier: /* `$STRING` */,
  indexed_on: /* `$STRING` */,
  license: /* `$STRING` */,
  license_url: /* `$STRING` */,
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

Create an instance: `const o_auth2_application = client.o_auth2_application`

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
const o_auth2_application = await client.o_auth2_application.create({
  description: /* `$STRING` */,
  email: /* `$STRING` */,
  name: /* `$STRING` */,
})
```


### OAuth2KeyInfo

Create an instance: `const o_auth2_key_info = client.o_auth2_key_info`

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
const o_auth2_key_info = await client.o_auth2_key_info.load({ id: 'o_auth2_key_info_id' })
```


### OAuth2Token

Create an instance: `const o_auth2_token = client.o_auth2_token`

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
const o_auth2_token = await client.o_auth2_token.create({
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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
audio = client.audio
audio.load({ "id" => "example_id" })

# audio.data_get now returns the loaded audio data
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
