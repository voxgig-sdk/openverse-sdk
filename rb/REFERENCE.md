# Openverse Ruby SDK Reference

Complete API reference for the Openverse Ruby SDK.


## OpenverseSDK

### Constructor

```ruby
require_relative 'openverse_sdk'

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

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

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

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## AudioEntity

```ruby
audio = client.Audio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt_file` | ``$ARRAY`` | Yes |  |
| `attribution` | ``$STRING`` | Yes |  |
| `audio_set` | ``$ANY`` | Yes |  |
| `bit_rate` | ``$INTEGER`` | No |  |
| `category` | ``$STRING`` | No |  |
| `creator` | ``$STRING`` | No |  |
| `creator_url` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `detail_url` | ``$STRING`` | Yes |  |
| `display_name` | ``$STRING`` | Yes |  |
| `duration` | ``$INTEGER`` | No |  |
| `fields_matched` | ``$ARRAY`` | Yes |  |
| `filesize` | ``$INTEGER`` | No |  |
| `filetype` | ``$STRING`` | No |  |
| `foreign_landing_url` | ``$STRING`` | No |  |
| `genre` | ``$ARRAY`` | No |  |
| `id` | ``$STRING`` | Yes |  |
| `identifier` | ``$STRING`` | Yes |  |
| `indexed_on` | ``$STRING`` | Yes |  |
| `len` | ``$INTEGER`` | Yes |  |
| `license_url` | ``$STRING`` | Yes |  |
| `license_version` | ``$STRING`` | No |  |
| `licenses` | ``$STRING`` | Yes |  |
| `logo_url` | ``$STRING`` | Yes |  |
| `mature` | ``$BOOLEAN`` | Yes |  |
| `media_count` | ``$INTEGER`` | Yes |  |
| `point` | ``$ARRAY`` | Yes |  |
| `provider` | ``$STRING`` | No |  |
| `reason` | ``$ANY`` | Yes |  |
| `related_url` | ``$STRING`` | Yes |  |
| `sample_rate` | ``$INTEGER`` | No |  |
| `source` | ``$STRING`` | No |  |
| `source_name` | ``$STRING`` | Yes |  |
| `source_url` | ``$STRING`` | Yes |  |
| `tag` | ``$ARRAY`` | Yes |  |
| `thumbnail` | ``$STRING`` | Yes |  |
| `title` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |
| `waveform` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Audio.create({
  "alt_file" => # `$ARRAY`,
  "attribution" => # `$STRING`,
  "audio_set" => # `$ANY`,
  "detail_url" => # `$STRING`,
  "display_name" => # `$STRING`,
  "fields_matched" => # `$ARRAY`,
  "identifier" => # `$STRING`,
  "indexed_on" => # `$STRING`,
  "len" => # `$INTEGER`,
  "license_url" => # `$STRING`,
  "licenses" => # `$STRING`,
  "logo_url" => # `$STRING`,
  "mature" => # `$BOOLEAN`,
  "media_count" => # `$INTEGER`,
  "point" => # `$ARRAY`,
  "reason" => # `$ANY`,
  "related_url" => # `$STRING`,
  "source_name" => # `$STRING`,
  "source_url" => # `$STRING`,
  "tag" => # `$ARRAY`,
  "thumbnail" => # `$STRING`,
  "waveform" => # `$STRING`,
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Audio.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Audio.load({ "id" => "audio_id" })
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
| `attribution` | ``$STRING`` | Yes |  |
| `author_name` | ``$STRING`` | Yes |  |
| `author_url` | ``$STRING`` | Yes |  |
| `category` | ``$STRING`` | No |  |
| `creator` | ``$STRING`` | No |  |
| `creator_url` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `detail_url` | ``$STRING`` | Yes |  |
| `display_name` | ``$STRING`` | Yes |  |
| `fields_matched` | ``$ARRAY`` | Yes |  |
| `filesize` | ``$INTEGER`` | No |  |
| `filetype` | ``$STRING`` | No |  |
| `foreign_landing_url` | ``$STRING`` | No |  |
| `height` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | Yes |  |
| `identifier` | ``$STRING`` | Yes |  |
| `indexed_on` | ``$STRING`` | Yes |  |
| `license_url` | ``$STRING`` | Yes |  |
| `license_version` | ``$STRING`` | No |  |
| `licenses` | ``$STRING`` | Yes |  |
| `logo_url` | ``$STRING`` | Yes |  |
| `mature` | ``$BOOLEAN`` | Yes |  |
| `media_count` | ``$INTEGER`` | Yes |  |
| `provider` | ``$STRING`` | No |  |
| `reason` | ``$ANY`` | Yes |  |
| `related_url` | ``$STRING`` | Yes |  |
| `source` | ``$STRING`` | No |  |
| `source_name` | ``$STRING`` | Yes |  |
| `source_url` | ``$STRING`` | Yes |  |
| `tag` | ``$ARRAY`` | Yes |  |
| `thumbnail` | ``$STRING`` | Yes |  |
| `title` | ``$STRING`` | No |  |
| `type` | ``$ANY`` | Yes |  |
| `url` | ``$STRING`` | No |  |
| `version` | ``$ANY`` | Yes |  |
| `width` | ``$INTEGER`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `attribution` | - | - | - | - | - |
| `author_name` | - | - | - | - | - |
| `author_url` | - | - | - | - | - |
| `category` | - | - | - | - | - |
| `creator` | - | - | - | - | - |
| `creator_url` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `detail_url` | - | - | - | - | - |
| `display_name` | - | - | - | - | - |
| `fields_matched` | - | - | - | - | - |
| `filesize` | - | - | - | - | - |
| `filetype` | - | - | - | - | - |
| `foreign_landing_url` | - | - | - | - | - |
| `height` | Yes | - | - | - | - |
| `id` | - | - | - | - | - |
| `identifier` | - | - | - | - | - |
| `indexed_on` | - | - | - | - | - |
| `license_url` | - | - | - | - | - |
| `license_version` | - | - | - | - | - |
| `licenses` | - | - | - | - | - |
| `logo_url` | - | - | - | - | - |
| `mature` | - | - | - | - | - |
| `media_count` | - | - | - | - | - |
| `provider` | - | - | - | - | - |
| `reason` | - | - | - | - | - |
| `related_url` | - | - | - | - | - |
| `source` | - | - | - | - | - |
| `source_name` | - | - | - | - | - |
| `source_url` | - | - | - | - | - |
| `tag` | - | - | - | - | - |
| `thumbnail` | - | - | - | - | - |
| `title` | - | - | - | - | - |
| `type` | - | - | - | - | - |
| `url` | - | - | - | - | - |
| `version` | - | - | - | - | - |
| `width` | Yes | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Image.create({
  "attribution" => # `$STRING`,
  "author_name" => # `$STRING`,
  "author_url" => # `$STRING`,
  "detail_url" => # `$STRING`,
  "display_name" => # `$STRING`,
  "fields_matched" => # `$ARRAY`,
  "identifier" => # `$STRING`,
  "indexed_on" => # `$STRING`,
  "license_url" => # `$STRING`,
  "licenses" => # `$STRING`,
  "logo_url" => # `$STRING`,
  "mature" => # `$BOOLEAN`,
  "media_count" => # `$INTEGER`,
  "reason" => # `$ANY`,
  "related_url" => # `$STRING`,
  "source_name" => # `$STRING`,
  "source_url" => # `$STRING`,
  "tag" => # `$ARRAY`,
  "thumbnail" => # `$STRING`,
  "type" => # `$ANY`,
  "version" => # `$ANY`,
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Image.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Image.load({ "id" => "image_id" })
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
| `description` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.OAuth2Application.create({
  "description" => # `$STRING`,
  "email" => # `$STRING`,
  "name" => # `$STRING`,
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
| `rate_limit_model` | ``$STRING`` | Yes |  |
| `requests_this_minute` | ``$INTEGER`` | Yes |  |
| `requests_today` | ``$INTEGER`` | Yes |  |
| `verified` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.OAuth2KeyInfo.load({ "id" => "o_auth2_key_info_id" })
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
| `access_token` | ``$STRING`` | Yes |  |
| `expires_in` | ``$INTEGER`` | Yes |  |
| `scope` | ``$STRING`` | Yes |  |
| `token_type` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.OAuth2Token.create({
  "access_token" => # `$STRING`,
  "expires_in" => # `$INTEGER`,
  "scope" => # `$STRING`,
  "token_type" => # `$STRING`,
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

