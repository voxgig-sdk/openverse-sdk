# Openverse Ruby SDK Reference

Complete API reference for the Openverse Ruby SDK.


## OpenverseSDK

### Constructor

```ruby
require_relative 'Openverse_sdk'

client = OpenverseSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenverseSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OpenverseSDK.test
```


### Instance Methods

#### `Audio(data = nil)`

Create a new `Audio` entity instance. Pass `nil` for no initial data.

#### `Image(data = nil)`

Create a new `Image` entity instance. Pass `nil` for no initial data.

#### `OAuth2Application(data = nil)`

Create a new `OAuth2Application` entity instance. Pass `nil` for no initial data.

#### `OAuth2KeyInfo(data = nil)`

Create a new `OAuth2KeyInfo` entity instance. Pass `nil` for no initial data.

#### `OAuth2Token(data = nil)`

Create a new `OAuth2Token` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AudioEntity

```ruby
audio = client.Audio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt_file` | `Array` | Yes |  |
| `attribution` | `String` | Yes |  |
| `audio_set` | `Object` | Yes |  |
| `bit_rate` | `Integer` | No |  |
| `category` | `String` | No |  |
| `creator` | `String` | No |  |
| `creator_url` | `String` | No |  |
| `description` | `String` | No |  |
| `detail_url` | `String` | Yes |  |
| `display_name` | `String` | Yes |  |
| `duration` | `Integer` | No |  |
| `fields_matched` | `Array` | Yes |  |
| `filesize` | `Integer` | No |  |
| `filetype` | `String` | No |  |
| `foreign_landing_url` | `String` | No |  |
| `genre` | `Array` | No |  |
| `id` | `String` | Yes |  |
| `identifier` | `String` | Yes |  |
| `indexed_on` | `String` | Yes |  |
| `len` | `Integer` | Yes |  |
| `license` | `String` | Yes |  |
| `license_url` | `String` | Yes |  |
| `license_version` | `String` | No |  |
| `logo_url` | `String` | Yes |  |
| `mature` | `Boolean` | Yes |  |
| `media_count` | `Integer` | Yes |  |
| `point` | `Array` | Yes |  |
| `provider` | `String` | No |  |
| `reason` | `Object` | Yes |  |
| `related_url` | `String` | Yes |  |
| `sample_rate` | `Integer` | No |  |
| `source` | `String` | No |  |
| `source_name` | `String` | Yes |  |
| `source_url` | `String` | Yes |  |
| `tag` | `Array` | Yes |  |
| `thumbnail` | `String` | Yes |  |
| `title` | `String` | No |  |
| `url` | `String` | No |  |
| `waveform` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Audio.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Audio.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Audio.load({ "id" => "audio_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AudioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ImageEntity

```ruby
image = client.Image
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `String` | Yes |  |
| `author_name` | `String` | Yes |  |
| `author_url` | `String` | Yes |  |
| `category` | `String` | No |  |
| `creator` | `String` | No |  |
| `creator_url` | `String` | No |  |
| `description` | `String` | No |  |
| `detail_url` | `String` | Yes |  |
| `display_name` | `String` | Yes |  |
| `fields_matched` | `Array` | Yes |  |
| `filesize` | `Integer` | No |  |
| `filetype` | `String` | No |  |
| `foreign_landing_url` | `String` | No |  |
| `height` | `Integer` | No |  |
| `id` | `String` | Yes |  |
| `identifier` | `String` | Yes |  |
| `indexed_on` | `String` | Yes |  |
| `license` | `String` | Yes |  |
| `license_url` | `String` | Yes |  |
| `license_version` | `String` | No |  |
| `logo_url` | `String` | Yes |  |
| `mature` | `Boolean` | Yes |  |
| `media_count` | `Integer` | Yes |  |
| `provider` | `String` | No |  |
| `reason` | `Object` | Yes |  |
| `related_url` | `String` | Yes |  |
| `source` | `String` | No |  |
| `source_name` | `String` | Yes |  |
| `source_url` | `String` | Yes |  |
| `tag` | `Array` | Yes |  |
| `thumbnail` | `String` | Yes |  |
| `title` | `String` | No |  |
| `type` | `Object` | Yes |  |
| `url` | `String` | No |  |
| `version` | `Object` | Yes |  |
| `width` | `Integer` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `attribution` | - | - | - |
| `author_name` | - | - | - |
| `author_url` | - | - | - |
| `category` | - | - | - |
| `creator` | - | - | - |
| `creator_url` | - | - | - |
| `description` | - | - | - |
| `detail_url` | - | - | - |
| `display_name` | - | - | - |
| `fields_matched` | - | - | - |
| `filesize` | - | - | - |
| `filetype` | - | - | - |
| `foreign_landing_url` | - | - | - |
| `height` | Yes | - | - |
| `id` | - | - | - |
| `identifier` | - | - | - |
| `indexed_on` | - | - | - |
| `license` | - | - | - |
| `license_url` | - | - | - |
| `license_version` | - | - | - |
| `logo_url` | - | - | - |
| `mature` | - | - | - |
| `media_count` | - | - | - |
| `provider` | - | - | - |
| `reason` | - | - | - |
| `related_url` | - | - | - |
| `source` | - | - | - |
| `source_name` | - | - | - |
| `source_url` | - | - | - |
| `tag` | - | - | - |
| `thumbnail` | - | - | - |
| `title` | - | - | - |
| `type` | - | - | - |
| `url` | - | - | - |
| `version` | - | - | - |
| `width` | Yes | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Image.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Image.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Image.load({ "id" => "image_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ImageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OAuth2ApplicationEntity

```ruby
o_auth2_application = client.OAuth2Application
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.OAuth2Application.create({
  "description" => "example", # String
  "email" => "example", # String
  "name" => "example", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OAuth2ApplicationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OAuth2KeyInfoEntity

```ruby
o_auth2_key_info = client.OAuth2KeyInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate_limit_model` | `String` | Yes |  |
| `requests_this_minute` | `Integer` | Yes |  |
| `requests_today` | `Integer` | Yes |  |
| `verified` | `Boolean` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.OAuth2KeyInfo.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OAuth2KeyInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OAuth2TokenEntity

```ruby
o_auth2_token = client.OAuth2Token
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `String` | Yes |  |
| `expires_in` | `Integer` | Yes |  |
| `scope` | `String` | Yes |  |
| `token_type` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.OAuth2Token.create({
  "access_token" => "example", # String
  "expires_in" => 1, # Integer
  "scope" => "example", # String
  "token_type" => "example", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OAuth2TokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = OpenverseSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

