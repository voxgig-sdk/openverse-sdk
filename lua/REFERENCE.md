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
| `alt_file` | `table` | Yes |  |
| `attribution` | `string` | Yes |  |
| `audio_set` | `any` | Yes |  |
| `bit_rate` | `number` | No |  |
| `category` | `string` | No |  |
| `creator` | `string` | No |  |
| `creator_url` | `string` | No |  |
| `description` | `string` | No |  |
| `detail_url` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `duration` | `number` | No |  |
| `fields_matched` | `table` | Yes |  |
| `filesize` | `number` | No |  |
| `filetype` | `string` | No |  |
| `foreign_landing_url` | `string` | No |  |
| `genre` | `table` | No |  |
| `id` | `string` | Yes |  |
| `identifier` | `string` | Yes |  |
| `indexed_on` | `string` | Yes |  |
| `len` | `number` | Yes |  |
| `license` | `string` | Yes |  |
| `license_url` | `string` | Yes |  |
| `license_version` | `string` | No |  |
| `logo_url` | `string` | Yes |  |
| `mature` | `boolean` | Yes |  |
| `media_count` | `number` | Yes |  |
| `point` | `table` | Yes |  |
| `provider` | `string` | No |  |
| `reason` | `any` | Yes |  |
| `related_url` | `string` | Yes |  |
| `sample_rate` | `number` | No |  |
| `source` | `string` | No |  |
| `source_name` | `string` | Yes |  |
| `source_url` | `string` | Yes |  |
| `tag` | `table` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |
| `waveform` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Audio():create({
  alt_file = --[[ table ]],
  attribution = --[[ string ]],
  audio_set = --[[ any ]],
  detail_url = --[[ string ]],
  display_name = --[[ string ]],
  fields_matched = --[[ table ]],
  identifier = --[[ string ]],
  indexed_on = --[[ string ]],
  len = --[[ number ]],
  license = --[[ string ]],
  license_url = --[[ string ]],
  logo_url = --[[ string ]],
  mature = --[[ boolean ]],
  media_count = --[[ number ]],
  point = --[[ table ]],
  reason = --[[ any ]],
  related_url = --[[ string ]],
  source_name = --[[ string ]],
  source_url = --[[ string ]],
  tag = --[[ table ]],
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
| `attribution` | `string` | Yes |  |
| `author_name` | `string` | Yes |  |
| `author_url` | `string` | Yes |  |
| `category` | `string` | No |  |
| `creator` | `string` | No |  |
| `creator_url` | `string` | No |  |
| `description` | `string` | No |  |
| `detail_url` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `fields_matched` | `table` | Yes |  |
| `filesize` | `number` | No |  |
| `filetype` | `string` | No |  |
| `foreign_landing_url` | `string` | No |  |
| `height` | `number` | No |  |
| `id` | `string` | Yes |  |
| `identifier` | `string` | Yes |  |
| `indexed_on` | `string` | Yes |  |
| `license` | `string` | Yes |  |
| `license_url` | `string` | Yes |  |
| `license_version` | `string` | No |  |
| `logo_url` | `string` | Yes |  |
| `mature` | `boolean` | Yes |  |
| `media_count` | `number` | Yes |  |
| `provider` | `string` | No |  |
| `reason` | `any` | Yes |  |
| `related_url` | `string` | Yes |  |
| `source` | `string` | No |  |
| `source_name` | `string` | Yes |  |
| `source_url` | `string` | Yes |  |
| `tag` | `table` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | No |  |
| `type` | `any` | Yes |  |
| `url` | `string` | No |  |
| `version` | `any` | Yes |  |
| `width` | `number` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Image():create({
  attribution = --[[ string ]],
  author_name = --[[ string ]],
  author_url = --[[ string ]],
  detail_url = --[[ string ]],
  display_name = --[[ string ]],
  fields_matched = --[[ table ]],
  identifier = --[[ string ]],
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
  tag = --[[ table ]],
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
| `description` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `name` | `string` | Yes |  |

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
| `rate_limit_model` | `string` | Yes |  |
| `requests_this_minute` | `number` | Yes |  |
| `requests_today` | `number` | Yes |  |
| `verified` | `boolean` | Yes |  |

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
| `access_token` | `string` | Yes |  |
| `expires_in` | `number` | Yes |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

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

