# Openverse Golang SDK Reference

Complete API reference for the Openverse Golang SDK.


## OpenverseSDK

### Constructor

```go
func NewOpenverseSDK(options map[string]any) *OpenverseSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *OpenverseSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `Audio(data map[string]any) OpenverseEntity`

Create a new `Audio` entity instance. Pass `nil` for no initial data.

#### `Image(data map[string]any) OpenverseEntity`

Create a new `Image` entity instance. Pass `nil` for no initial data.

#### `OAuth2Application(data map[string]any) OpenverseEntity`

Create a new `OAuth2Application` entity instance. Pass `nil` for no initial data.

#### `OAuth2KeyInfo(data map[string]any) OpenverseEntity`

Create a new `OAuth2KeyInfo` entity instance. Pass `nil` for no initial data.

#### `OAuth2Token(data map[string]any) OpenverseEntity`

Create a new `OAuth2Token` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AudioEntity

```go
audio := client.Audio(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Audio(nil).Create(map[string]any{
    "alt_file": /* `$ARRAY` */,
    "attribution": /* `$STRING` */,
    "audio_set": /* `$ANY` */,
    "detail_url": /* `$STRING` */,
    "display_name": /* `$STRING` */,
    "fields_matched": /* `$ARRAY` */,
    "identifier": /* `$STRING` */,
    "indexed_on": /* `$STRING` */,
    "len": /* `$INTEGER` */,
    "license_url": /* `$STRING` */,
    "licenses": /* `$STRING` */,
    "logo_url": /* `$STRING` */,
    "mature": /* `$BOOLEAN` */,
    "media_count": /* `$INTEGER` */,
    "point": /* `$ARRAY` */,
    "reason": /* `$ANY` */,
    "related_url": /* `$STRING` */,
    "source_name": /* `$STRING` */,
    "source_url": /* `$STRING` */,
    "tag": /* `$ARRAY` */,
    "thumbnail": /* `$STRING` */,
    "waveform": /* `$STRING` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Audio(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Audio(nil).Load(map[string]any{"id": "audio_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AudioEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ImageEntity

```go
image := client.Image(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Image(nil).Create(map[string]any{
    "attribution": /* `$STRING` */,
    "author_name": /* `$STRING` */,
    "author_url": /* `$STRING` */,
    "detail_url": /* `$STRING` */,
    "display_name": /* `$STRING` */,
    "fields_matched": /* `$ARRAY` */,
    "identifier": /* `$STRING` */,
    "indexed_on": /* `$STRING` */,
    "license_url": /* `$STRING` */,
    "licenses": /* `$STRING` */,
    "logo_url": /* `$STRING` */,
    "mature": /* `$BOOLEAN` */,
    "media_count": /* `$INTEGER` */,
    "reason": /* `$ANY` */,
    "related_url": /* `$STRING` */,
    "source_name": /* `$STRING` */,
    "source_url": /* `$STRING` */,
    "tag": /* `$ARRAY` */,
    "thumbnail": /* `$STRING` */,
    "type": /* `$ANY` */,
    "version": /* `$ANY` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Image(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Image(nil).Load(map[string]any{"id": "image_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ImageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OAuth2ApplicationEntity

```go
o_auth2_application := client.OAuth2Application(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.OAuth2Application(nil).Create(map[string]any{
    "description": /* `$STRING` */,
    "email": /* `$STRING` */,
    "name": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OAuth2ApplicationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OAuth2KeyInfoEntity

```go
o_auth2_key_info := client.OAuth2KeyInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate_limit_model` | ``$STRING`` | Yes |  |
| `requests_this_minute` | ``$INTEGER`` | Yes |  |
| `requests_today` | ``$INTEGER`` | Yes |  |
| `verified` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.OAuth2KeyInfo(nil).Load(map[string]any{"id": "o_auth2_key_info_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OAuth2KeyInfoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OAuth2TokenEntity

```go
o_auth2_token := client.OAuth2Token(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | ``$STRING`` | Yes |  |
| `expires_in` | ``$INTEGER`` | Yes |  |
| `scope` | ``$STRING`` | Yes |  |
| `token_type` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.OAuth2Token(nil).Create(map[string]any{
    "access_token": /* `$STRING` */,
    "expires_in": /* `$INTEGER` */,
    "scope": /* `$STRING` */,
    "token_type": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OAuth2TokenEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewOpenverseSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

