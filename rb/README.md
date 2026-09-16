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
    puts "#{item["id"]} #{item["alt_files"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an audio

```ruby
begin
  # load returns the ENTITY — call data_get for the Audio record (raises on error).
  audio = client.Audio.load({ "id" => "example_id" })
  puts audio
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Audio record.
created = client.Audio.create({ "identifier" => "example_identifier", "alt_files" => [], "attribution" => "example_attribution", "audio_set" => "example_audio_set", "detail_url" => "example_detail_url", "display_name" => "example_display_name", "fields_matched" => [], "id" => "example_id", "indexed_on" => "example_indexed_on", "len" => 1, "license" => "example_license", "license_url" => "example_license_url", "logo_url" => "example_logo_url", "mature" => true, "media_count" => 1, "points" => [], "reason" => "example_reason", "related_url" => "example_related_url", "source_name" => "example_source_name", "source_url" => "example_source_url", "tags" => [], "thumbnail" => "example_thumbnail", "waveform" => "example_waveform" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  images = client.Image.list()
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
  "entity" => { "image" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
image = client.Image.list()
puts image
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
| `alt_files` | `Array` | JSON describing alternative files for this audio. |
| `attribution` | `String` | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `Object` | Reference to set of which this track is a part. |
| `bit_rate` | `Integer` | Number in bits per second, eg. |
| `category` | `String` | The top-level classification of this media file. |
| `creator` | `String` | The name of the media creator. |
| `creator_url` | `String` | A direct link to the media creator. |
| `description` | `String` | The explanation on why media is being reported. |
| `detail_url` | `String` | A direct link to the detail view of this audio file. |
| `display_name` | `String` | The name of content source, e.g. |
| `duration` | `Integer` | The time length of the audio file in milliseconds. |
| `fields_matched` | `Array` | List the fields that matched the query for this result. |
| `filesize` | `Integer` | Number in bytes, e.g. |
| `filetype` | `String` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `String` | The landing page of the work. |
| `genres` | `Array` | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `String` | Our unique identifier for an open-licensed work. |
| `identifier` | `String` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `String` | The timestamp of when the media was indexed by Openverse. |
| `len` | `Integer` |  |
| `license` | `String` | The name of license for the media. |
| `license_url` | `String` | A direct link to the license deed or legal terms. |
| `license_version` | `String` | The version of the media license. |
| `logo_url` | `String` | The URL to a logo for the source. |
| `mature` | `Boolean` | Whether the media item is marked as mature |
| `media_count` | `Integer` | The number of media items indexed from the source. |
| `points` | `Array` |  |
| `provider` | `String` | The content provider, e.g. |
| `reason` | `Object` | The reason to report media to Openverse. |
| `related_url` | `String` | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `Integer` | Number in hertz, eg. |
| `source` | `String` | The source of the data, meaning a particular dataset. |
| `source_name` | `String` | The source of the media, e.g. |
| `source_url` | `String` | The URL of the source, e.g. |
| `tags` | `Array` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `String` | A direct link to the miniature artwork. |
| `title` | `String` | The name of the media. |
| `url` | `String` | The actual URL to the media file. |
| `waveform` | `String` | A direct link to the waveform peaks. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Audio record (raises on error).
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
| `attribution` | `String` | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `String` | The name of the media creator. |
| `author_url` | `String` | A direct link to the media creator. |
| `category` | `String` | The top-level classification of this media file. |
| `creator` | `String` | The name of the media creator. |
| `creator_url` | `String` | A direct link to the media creator. |
| `description` | `String` | The explanation on why media is being reported. |
| `detail_url` | `String` | A direct link to the detail view of this audio file. |
| `display_name` | `String` | The name of content source, e.g. |
| `fields_matched` | `Array` | List the fields that matched the query for this result. |
| `filesize` | `Integer` | Number in bytes, e.g. |
| `filetype` | `String` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `String` | The landing page of the work. |
| `height` | `Integer` | The height of the image in pixels. |
| `id` | `String` | Our unique identifier for an open-licensed work. |
| `identifier` | `String` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `String` | The timestamp of when the media was indexed by Openverse. |
| `license` | `String` | The name of license for the media. |
| `license_url` | `String` | A direct link to the license deed or legal terms. |
| `license_version` | `String` | The version of the media license. |
| `logo_url` | `String` | The URL to a logo for the source. |
| `mature` | `Boolean` | Whether the media item is marked as mature |
| `media_count` | `Integer` | The number of media items indexed from the source. |
| `provider` | `String` | The content provider, e.g. |
| `reason` | `Object` | The reason to report media to Openverse. |
| `related_url` | `String` | A link to an endpoint that provides similar audio files. |
| `source` | `String` | The source of the data, meaning a particular dataset. |
| `source_name` | `String` | The source of the media, e.g. |
| `source_url` | `String` | The URL of the source, e.g. |
| `tags` | `Array` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `String` | A direct link to the miniature artwork. |
| `title` | `String` | The name of the media. |
| `type` | `Object` | The resource type, always set to 'photo' for images. |
| `url` | `String` | The actual URL to the media file. |
| `version` | `Object` | The oEmbed version number, always set to 1.0. |
| `width` | `Integer` | The width of the image in pixels. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Image record (raises on error).
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


### OAuth2Application

Create an instance: `o_auth2_application = client.OAuth2Application`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | A description of what you are trying to achieve with your project using the API. |
| `email` | `String` | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `String` | A unique human-readable name for your application or project requiring access to the Openverse API. |

#### Example: Create

```ruby
o_auth2_application = client.OAuth2Application.create({
  "description" => "example_description", # String
  "email" => "example_email", # String
  "name" => "example_name", # String
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
| `rate_limit_model` | `String` | The type of rate limit applied to your key. |
| `requests_this_minute` | `Integer` | The number of requests your key has performed in the last minute. |
| `requests_today` | `Integer` | The number of requests your key has performed in the last day. |
| `verified` | `Boolean` | Whether the application has verified the submitted email address. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the OAuth2KeyInfo record (raises on error).
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
| `access_token` | `String` | The access token that can be used to authenticate requests. |
| `expires_in` | `Integer` | The number of seconds until the token expires. |
| `scope` | `String` | The scope of the token. |
| `token_type` | `String` | The type of token. |

#### Example: Create

```ruby
o_auth2_token = client.OAuth2Token.create({
  "access_token" => "example_access_token", # String
  "expires_in" => 1, # Integer
  "scope" => "example_scope", # String
  "token_type" => "example_token_type", # String
})
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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
image = client.Image
image.list()

# image.data_get now returns the image data from the last list
# image.match_get returns the last match criteria
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
