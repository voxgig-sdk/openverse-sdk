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
| `alt_files` | `Array` | Yes | JSON describing alternative files for this audio. |
| `attribution` | `String` | Yes | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `Object` | Yes | Reference to set of which this track is a part. |
| `bit_rate` | `Integer` | No | Number in bits per second, eg. |
| `category` | `String` | No | The top-level classification of this media file. |
| `creator` | `String` | No | The name of the media creator. |
| `creator_url` | `String` | No | A direct link to the media creator. |
| `description` | `String` | No | The explanation on why media is being reported. |
| `detail_url` | `String` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `String` | Yes | The name of content source, e.g. |
| `duration` | `Integer` | No | The time length of the audio file in milliseconds. |
| `fields_matched` | `Array` | Yes | List the fields that matched the query for this result. |
| `filesize` | `Integer` | No | Number in bytes, e.g. |
| `filetype` | `String` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `String` | No | The landing page of the work. |
| `genres` | `Array` | No | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `String` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `String` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `String` | Yes | The timestamp of when the media was indexed by Openverse. |
| `len` | `Integer` | Yes |  |
| `license` | `String` | Yes | The name of license for the media. |
| `license_url` | `String` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `String` | No | The version of the media license. |
| `logo_url` | `String` | Yes | The URL to a logo for the source. |
| `mature` | `Boolean` | Yes | Whether the media item is marked as mature |
| `media_count` | `Integer` | Yes | The number of media items indexed from the source. |
| `points` | `Array` | Yes |  |
| `provider` | `String` | No | The content provider, e.g. |
| `reason` | `Object` | Yes | The reason to report media to Openverse. |
| `related_url` | `String` | Yes | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `Integer` | No | Number in hertz, eg. |
| `source` | `String` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `String` | Yes | The source of the media, e.g. |
| `source_url` | `String` | Yes | The URL of the source, e.g. |
| `tags` | `Array` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `String` | Yes | A direct link to the miniature artwork. |
| `title` | `String` | No | The name of the media. |
| `url` | `String` | No | The actual URL to the media file. |
| `waveform` | `String` | Yes | A direct link to the waveform peaks. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Audio.create({
  "identifier" => "example_identifier", # String
  "alt_files" => [], # Array
  "attribution" => "example_attribution", # String
  "audio_set" => "example_audio_set", # Object
  "detail_url" => "example_detail_url", # String
  "display_name" => "example_display_name", # String
  "fields_matched" => [], # Array
  "id" => "example_id", # String
  "indexed_on" => "example_indexed_on", # String
  "len" => 1, # Integer
  "license" => "example_license", # String
  "license_url" => "example_license_url", # String
  "logo_url" => "example_logo_url", # String
  "mature" => true, # Boolean
  "media_count" => 1, # Integer
  "points" => [], # Array
  "reason" => "example_reason", # Object
  "related_url" => "example_related_url", # String
  "source_name" => "example_source_name", # String
  "source_url" => "example_source_url", # String
  "tags" => [], # Array
  "thumbnail" => "example_thumbnail", # String
  "waveform" => "example_waveform", # String
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
| `attribution` | `String` | Yes | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `String` | Yes | The name of the media creator. |
| `author_url` | `String` | Yes | A direct link to the media creator. |
| `category` | `String` | No | The top-level classification of this media file. |
| `creator` | `String` | No | The name of the media creator. |
| `creator_url` | `String` | No | A direct link to the media creator. |
| `description` | `String` | No | The explanation on why media is being reported. |
| `detail_url` | `String` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `String` | Yes | The name of content source, e.g. |
| `fields_matched` | `Array` | Yes | List the fields that matched the query for this result. |
| `filesize` | `Integer` | No | Number in bytes, e.g. |
| `filetype` | `String` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `String` | No | The landing page of the work. |
| `height` | `Integer` | No | The height of the image in pixels. |
| `id` | `String` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `String` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `String` | Yes | The timestamp of when the media was indexed by Openverse. |
| `license` | `String` | Yes | The name of license for the media. |
| `license_url` | `String` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `String` | No | The version of the media license. |
| `logo_url` | `String` | Yes | The URL to a logo for the source. |
| `mature` | `Boolean` | Yes | Whether the media item is marked as mature |
| `media_count` | `Integer` | Yes | The number of media items indexed from the source. |
| `provider` | `String` | No | The content provider, e.g. |
| `reason` | `Object` | Yes | The reason to report media to Openverse. |
| `related_url` | `String` | Yes | A link to an endpoint that provides similar audio files. |
| `source` | `String` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `String` | Yes | The source of the media, e.g. |
| `source_url` | `String` | Yes | The URL of the source, e.g. |
| `tags` | `Array` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `String` | Yes | A direct link to the miniature artwork. |
| `title` | `String` | No | The name of the media. |
| `type` | `Object` | Yes | The resource type, always set to 'photo' for images. |
| `url` | `String` | No | The actual URL to the media file. |
| `version` | `Object` | Yes | The oEmbed version number, always set to 1.0. |
| `width` | `Integer` | No | The width of the image in pixels. |

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
| `tags` | - | - | - |
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
  "identifier" => "example_identifier", # String
  "attribution" => "example_attribution", # String
  "author_name" => "example_author_name", # String
  "author_url" => "example_author_url", # String
  "detail_url" => "example_detail_url", # String
  "display_name" => "example_display_name", # String
  "fields_matched" => [], # Array
  "id" => "example_id", # String
  "indexed_on" => "example_indexed_on", # String
  "license" => "example_license", # String
  "license_url" => "example_license_url", # String
  "logo_url" => "example_logo_url", # String
  "mature" => true, # Boolean
  "media_count" => 1, # Integer
  "reason" => "example_reason", # Object
  "related_url" => "example_related_url", # String
  "source_name" => "example_source_name", # String
  "source_url" => "example_source_url", # String
  "tags" => [], # Array
  "thumbnail" => "example_thumbnail", # String
  "type" => "example_type", # Object
  "version" => "example_version", # Object
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
| `description` | `String` | Yes | A description of what you are trying to achieve with your project using the API. |
| `email` | `String` | Yes | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `String` | Yes | A unique human-readable name for your application or project requiring access to the Openverse API. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.OAuth2Application.create({
  "description" => "example_description", # String
  "email" => "example_email", # String
  "name" => "example_name", # String
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
| `rate_limit_model` | `String` | Yes | The type of rate limit applied to your key. |
| `requests_this_minute` | `Integer` | Yes | The number of requests your key has performed in the last minute. |
| `requests_today` | `Integer` | Yes | The number of requests your key has performed in the last day. |
| `verified` | `Boolean` | Yes | Whether the application has verified the submitted email address. |

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
| `access_token` | `String` | Yes | The access token that can be used to authenticate requests. |
| `expires_in` | `Integer` | Yes | The number of seconds until the token expires. |
| `scope` | `String` | Yes | The scope of the token. |
| `token_type` | `String` | Yes | The type of token. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.OAuth2Token.create({
  "access_token" => "example_access_token", # String
  "expires_in" => 1, # Integer
  "scope" => "example_scope", # String
  "token_type" => "example_token_type", # String
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

