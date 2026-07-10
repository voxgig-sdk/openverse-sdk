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

#### `Test() *OpenverseSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *OpenverseSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
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
fmt.Println(audio.GetName()) // "audio"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt_file` | `[]any` | Yes |  |
| `attribution` | `string` | Yes |  |
| `audio_set` | `any` | Yes |  |
| `bit_rate` | `int` | No |  |
| `category` | `string` | No |  |
| `creator` | `string` | No |  |
| `creator_url` | `string` | No |  |
| `description` | `string` | No |  |
| `detail_url` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `duration` | `int` | No |  |
| `fields_matched` | `[]any` | Yes |  |
| `filesize` | `int` | No |  |
| `filetype` | `string` | No |  |
| `foreign_landing_url` | `string` | No |  |
| `genre` | `[]any` | No |  |
| `id` | `string` | Yes |  |
| `identifier` | `string` | Yes |  |
| `indexed_on` | `string` | Yes |  |
| `len` | `int` | Yes |  |
| `license` | `string` | Yes |  |
| `license_url` | `string` | Yes |  |
| `license_version` | `string` | No |  |
| `logo_url` | `string` | Yes |  |
| `mature` | `bool` | Yes |  |
| `media_count` | `int` | Yes |  |
| `point` | `[]any` | Yes |  |
| `provider` | `string` | No |  |
| `reason` | `any` | Yes |  |
| `related_url` | `string` | Yes |  |
| `sample_rate` | `int` | No |  |
| `source` | `string` | No |  |
| `source_name` | `string` | Yes |  |
| `source_url` | `string` | Yes |  |
| `tag` | `[]any` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |
| `waveform` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Audio(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Audio(nil).Load(map[string]any{"id": "audio_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Audio(nil).Create(map[string]any{
    "identifier": "example_identifier",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(image.GetName()) // "image"
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
| `fields_matched` | `[]any` | Yes |  |
| `filesize` | `int` | No |  |
| `filetype` | `string` | No |  |
| `foreign_landing_url` | `string` | No |  |
| `height` | `int` | No |  |
| `id` | `string` | Yes |  |
| `identifier` | `string` | Yes |  |
| `indexed_on` | `string` | Yes |  |
| `license` | `string` | Yes |  |
| `license_url` | `string` | Yes |  |
| `license_version` | `string` | No |  |
| `logo_url` | `string` | Yes |  |
| `mature` | `bool` | Yes |  |
| `media_count` | `int` | Yes |  |
| `provider` | `string` | No |  |
| `reason` | `any` | Yes |  |
| `related_url` | `string` | Yes |  |
| `source` | `string` | No |  |
| `source_name` | `string` | Yes |  |
| `source_url` | `string` | Yes |  |
| `tag` | `[]any` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | No |  |
| `type` | `any` | Yes |  |
| `url` | `string` | No |  |
| `version` | `any` | Yes |  |
| `width` | `int` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Image(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Image(nil).Load(map[string]any{"id": "image_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Image(nil).Create(map[string]any{
    "identifier": "example_identifier",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
oAuth2Application := client.OAuth2Application(nil)
fmt.Println(oAuth2Application.GetName()) // "o_auth2_application"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.OAuth2Application(nil).Create(map[string]any{
    "description": "example_description",
    "email": "example_email",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
oAuth2KeyInfo := client.OAuth2KeyInfo(nil)
fmt.Println(oAuth2KeyInfo.GetName()) // "o_auth2_key_info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate_limit_model` | `string` | Yes |  |
| `requests_this_minute` | `int` | Yes |  |
| `requests_today` | `int` | Yes |  |
| `verified` | `bool` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.OAuth2KeyInfo(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
oAuth2Token := client.OAuth2Token(nil)
fmt.Println(oAuth2Token.GetName()) // "o_auth2_token"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `expires_in` | `int` | Yes |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.OAuth2Token(nil).Create(map[string]any{
    "access_token": "example_access_token",
    "expires_in": 1,
    "scope": "example_scope",
    "token_type": "example_token_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

