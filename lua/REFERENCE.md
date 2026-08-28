# Openverse Lua SDK Reference

Complete API reference for the Openverse Lua SDK.


## OpenverseSDK

### Constructor

```lua
local sdk = require("openverse_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Audio(data)`

Create a new `Audio` entity instance. Pass `nil` for no initial data.

#### `Image(data)`

Create a new `Image` entity instance. Pass `nil` for no initial data.

#### `OAuth2Application(data)`

Create a new `OAuth2Application` entity instance. Pass `nil` for no initial data.

#### `OAuth2KeyInfo(data)`

Create a new `OAuth2KeyInfo` entity instance. Pass `nil` for no initial data.

#### `OAuth2Token(data)`

Create a new `OAuth2Token` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AudioEntity

```lua
local audio = client:Audio(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt_files` | `table` | Yes | JSON describing alternative files for this audio. |
| `attribution` | `string` | Yes | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `any` | Yes | Reference to set of which this track is a part. |
| `bit_rate` | `number` | No | Number in bits per second, eg. |
| `category` | `string` | No | The top-level classification of this media file. |
| `creator` | `string` | No | The name of the media creator. |
| `creator_url` | `string` | No | A direct link to the media creator. |
| `description` | `string` | No | The explanation on why media is being reported. |
| `detail_url` | `string` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `string` | Yes | The name of content source, e.g. |
| `duration` | `number` | No | The time length of the audio file in milliseconds. |
| `fields_matched` | `table` | Yes | List the fields that matched the query for this result. |
| `filesize` | `number` | No | Number in bytes, e.g. |
| `filetype` | `string` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | No | The landing page of the work. |
| `genres` | `table` | No | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | Yes | The timestamp of when the media was indexed by Openverse. |
| `len` | `number` | Yes |  |
| `license` | `string` | Yes | The name of license for the media. |
| `license_url` | `string` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `string` | No | The version of the media license. |
| `logo_url` | `string` | Yes | The URL to a logo for the source. |
| `mature` | `boolean` | Yes | Whether the media item is marked as mature |
| `media_count` | `number` | Yes | The number of media items indexed from the source. |
| `points` | `table` | Yes |  |
| `provider` | `string` | No | The content provider, e.g. |
| `reason` | `any` | Yes | The reason to report media to Openverse. |
| `related_url` | `string` | Yes | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `number` | No | Number in hertz, eg. |
| `source` | `string` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | Yes | The source of the media, e.g. |
| `source_url` | `string` | Yes | The URL of the source, e.g. |
| `tags` | `table` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | Yes | A direct link to the miniature artwork. |
| `title` | `string` | No | The name of the media. |
| `url` | `string` | No | The actual URL to the media file. |
| `waveform` | `string` | Yes | A direct link to the waveform peaks. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Audio():create({
  identifier = --[[ string ]],
  alt_files = --[[ table ]],
  attribution = --[[ string ]],
  audio_set = --[[ any ]],
  detail_url = --[[ string ]],
  display_name = --[[ string ]],
  fields_matched = --[[ table ]],
  id = --[[ string ]],
  indexed_on = --[[ string ]],
  len = --[[ number ]],
  license = --[[ string ]],
  license_url = --[[ string ]],
  logo_url = --[[ string ]],
  mature = --[[ boolean ]],
  media_count = --[[ number ]],
  points = --[[ table ]],
  reason = --[[ any ]],
  related_url = --[[ string ]],
  source_name = --[[ string ]],
  source_url = --[[ string ]],
  tags = --[[ table ]],
  thumbnail = --[[ string ]],
  waveform = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Audio():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Audio():load({ id = "audio_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AudioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ImageEntity

```lua
local image = client:Image(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `string` | Yes | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `string` | Yes | The name of the media creator. |
| `author_url` | `string` | Yes | A direct link to the media creator. |
| `category` | `string` | No | The top-level classification of this media file. |
| `creator` | `string` | No | The name of the media creator. |
| `creator_url` | `string` | No | A direct link to the media creator. |
| `description` | `string` | No | The explanation on why media is being reported. |
| `detail_url` | `string` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `string` | Yes | The name of content source, e.g. |
| `fields_matched` | `table` | Yes | List the fields that matched the query for this result. |
| `filesize` | `number` | No | Number in bytes, e.g. |
| `filetype` | `string` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | No | The landing page of the work. |
| `height` | `number` | No | The height of the image in pixels. |
| `id` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | Yes | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | Yes | The name of license for the media. |
| `license_url` | `string` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `string` | No | The version of the media license. |
| `logo_url` | `string` | Yes | The URL to a logo for the source. |
| `mature` | `boolean` | Yes | Whether the media item is marked as mature |
| `media_count` | `number` | Yes | The number of media items indexed from the source. |
| `provider` | `string` | No | The content provider, e.g. |
| `reason` | `any` | Yes | The reason to report media to Openverse. |
| `related_url` | `string` | Yes | A link to an endpoint that provides similar audio files. |
| `source` | `string` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | Yes | The source of the media, e.g. |
| `source_url` | `string` | Yes | The URL of the source, e.g. |
| `tags` | `table` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | Yes | A direct link to the miniature artwork. |
| `title` | `string` | No | The name of the media. |
| `type` | `any` | Yes | The resource type, always set to 'photo' for images. |
| `url` | `string` | No | The actual URL to the media file. |
| `version` | `any` | Yes | The oEmbed version number, always set to 1.0. |
| `width` | `number` | No | The width of the image in pixels. |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Image():create({
  identifier = --[[ string ]],
  attribution = --[[ string ]],
  author_name = --[[ string ]],
  author_url = --[[ string ]],
  detail_url = --[[ string ]],
  display_name = --[[ string ]],
  fields_matched = --[[ table ]],
  id = --[[ string ]],
  indexed_on = --[[ string ]],
  license = --[[ string ]],
  license_url = --[[ string ]],
  logo_url = --[[ string ]],
  mature = --[[ boolean ]],
  media_count = --[[ number ]],
  reason = --[[ any ]],
  related_url = --[[ string ]],
  source_name = --[[ string ]],
  source_url = --[[ string ]],
  tags = --[[ table ]],
  thumbnail = --[[ string ]],
  type = --[[ any ]],
  version = --[[ any ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Image():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Image():load({ id = "image_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OAuth2ApplicationEntity

```lua
local o_auth2_application = client:OAuth2Application(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes | A description of what you are trying to achieve with your project using the API. |
| `email` | `string` | Yes | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `string` | Yes | A unique human-readable name for your application or project requiring access to the Openverse API. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:OAuth2Application():create({
  description = --[[ string ]],
  email = --[[ string ]],
  name = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OAuth2ApplicationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OAuth2KeyInfoEntity

```lua
local o_auth2_key_info = client:OAuth2KeyInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate_limit_model` | `string` | Yes | The type of rate limit applied to your key. |
| `requests_this_minute` | `number` | Yes | The number of requests your key has performed in the last minute. |
| `requests_today` | `number` | Yes | The number of requests your key has performed in the last day. |
| `verified` | `boolean` | Yes | Whether the application has verified the submitted email address. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:OAuth2KeyInfo():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OAuth2KeyInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OAuth2TokenEntity

```lua
local o_auth2_token = client:OAuth2Token(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes | The access token that can be used to authenticate requests. |
| `expires_in` | `number` | Yes | The number of seconds until the token expires. |
| `scope` | `string` | Yes | The scope of the token. |
| `token_type` | `string` | Yes | The type of token. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:OAuth2Token():create({
  access_token = --[[ string ]],
  expires_in = --[[ number ]],
  scope = --[[ string ]],
  token_type = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OAuth2TokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

