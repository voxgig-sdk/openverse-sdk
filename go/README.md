# Openverse Golang SDK

The Golang SDK for the Openverse API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/openverse-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/openverse-sdk/go=../path/to/github.com/voxgig-sdk/openverse-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"

    sdk "github.com/voxgig-sdk/openverse-sdk/go"
    "github.com/voxgig-sdk/openverse-sdk/go/core"
)

func main() {
    client := sdk.NewOpenverseSDK(map[string]any{})
```

### 2. List audios

```go
    result, err := client.Audio(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a audio

```go
    result, err = client.Audio(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```

### 4. Create, update, and remove

```go
// Create
created, _ := client.Audio(nil).Create(
    map[string]any{"name": "Example"}, nil,
)
cm := core.ToMapAny(created)
newID := core.ToMapAny(cm["data"])["id"]

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOpenverseSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENVERSE_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewOpenverseSDK

```go
func NewOpenverseSDK(options map[string]any) *OpenverseSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *OpenverseSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenverseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Audio` | `(data map[string]any) OpenverseEntity` | Create a Audio entity instance. |
| `Image` | `(data map[string]any) OpenverseEntity` | Create a Image entity instance. |
| `OAuth2Application` | `(data map[string]any) OpenverseEntity` | Create a OAuth2Application entity instance. |
| `OAuth2KeyInfo` | `(data map[string]any) OpenverseEntity` | Create a OAuth2KeyInfo entity instance. |
| `OAuth2Token` | `(data map[string]any) OpenverseEntity` | Create a OAuth2Token entity instance. |

### Entity interface (OpenverseEntity)

All entities implement the `OpenverseEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Audio

| Field | Description |
| --- | --- |
| `"alt_file"` |  |
| `"attribution"` |  |
| `"audio_set"` |  |
| `"bit_rate"` |  |
| `"category"` |  |
| `"creator"` |  |
| `"creator_url"` |  |
| `"description"` |  |
| `"detail_url"` |  |
| `"display_name"` |  |
| `"duration"` |  |
| `"fields_matched"` |  |
| `"filesize"` |  |
| `"filetype"` |  |
| `"foreign_landing_url"` |  |
| `"genre"` |  |
| `"id"` |  |
| `"identifier"` |  |
| `"indexed_on"` |  |
| `"len"` |  |
| `"license"` |  |
| `"license_url"` |  |
| `"license_version"` |  |
| `"logo_url"` |  |
| `"mature"` |  |
| `"media_count"` |  |
| `"point"` |  |
| `"provider"` |  |
| `"reason"` |  |
| `"related_url"` |  |
| `"sample_rate"` |  |
| `"source"` |  |
| `"source_name"` |  |
| `"source_url"` |  |
| `"tag"` |  |
| `"thumbnail"` |  |
| `"title"` |  |
| `"url"` |  |
| `"waveform"` |  |

Operations: Create, List, Load.

API path: `/v1/audio/{identifier}/report/`

#### Image

| Field | Description |
| --- | --- |
| `"attribution"` |  |
| `"author_name"` |  |
| `"author_url"` |  |
| `"category"` |  |
| `"creator"` |  |
| `"creator_url"` |  |
| `"description"` |  |
| `"detail_url"` |  |
| `"display_name"` |  |
| `"fields_matched"` |  |
| `"filesize"` |  |
| `"filetype"` |  |
| `"foreign_landing_url"` |  |
| `"height"` |  |
| `"id"` |  |
| `"identifier"` |  |
| `"indexed_on"` |  |
| `"license"` |  |
| `"license_url"` |  |
| `"license_version"` |  |
| `"logo_url"` |  |
| `"mature"` |  |
| `"media_count"` |  |
| `"provider"` |  |
| `"reason"` |  |
| `"related_url"` |  |
| `"source"` |  |
| `"source_name"` |  |
| `"source_url"` |  |
| `"tag"` |  |
| `"thumbnail"` |  |
| `"title"` |  |
| `"type"` |  |
| `"url"` |  |
| `"version"` |  |
| `"width"` |  |

Operations: Create, List, Load.

API path: `/v1/images/{identifier}/report/`

#### OAuth2Application

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"email"` |  |
| `"name"` |  |

Operations: Create.

API path: `/v1/auth_tokens/register/`

#### OAuth2KeyInfo

| Field | Description |
| --- | --- |
| `"rate_limit_model"` |  |
| `"requests_this_minute"` |  |
| `"requests_today"` |  |
| `"verified"` |  |

Operations: Load.

API path: `/v1/rate_limit/`

#### OAuth2Token

| Field | Description |
| --- | --- |
| `"access_token"` |  |
| `"expires_in"` |  |
| `"scope"` |  |
| `"token_type"` |  |

Operations: Create.

API path: `/v1/auth_tokens/token/`



## Entities


### Audio

Create an instance: `audio := client.Audio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Audio(nil).Load(map[string]any{"id": "audio_id"}, nil)
```

#### Example: List

```go
results, err := client.Audio(nil).List(nil, nil)
```

#### Example: Create

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
    "license": /* `$STRING` */,
    "license_url": /* `$STRING` */,
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


### Image

Create an instance: `image := client.Image(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Image(nil).Load(map[string]any{"id": "image_id"}, nil)
```

#### Example: List

```go
results, err := client.Image(nil).List(nil, nil)
```

#### Example: Create

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
    "license": /* `$STRING` */,
    "license_url": /* `$STRING` */,
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


### OAuth2Application

Create an instance: `o_auth2_application := client.OAuth2Application(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.OAuth2Application(nil).Create(map[string]any{
    "description": /* `$STRING` */,
    "email": /* `$STRING` */,
    "name": /* `$STRING` */,
}, nil)
```


### OAuth2KeyInfo

Create an instance: `o_auth2_key_info := client.OAuth2KeyInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate_limit_model` | ``$STRING`` |  |
| `requests_this_minute` | ``$INTEGER`` |  |
| `requests_today` | ``$INTEGER`` |  |
| `verified` | ``$BOOLEAN`` |  |

#### Example: Load

```go
result, err := client.OAuth2KeyInfo(nil).Load(map[string]any{"id": "o_auth2_key_info_id"}, nil)
```


### OAuth2Token

Create an instance: `o_auth2_token := client.OAuth2Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | ``$STRING`` |  |
| `expires_in` | ``$INTEGER`` |  |
| `scope` | ``$STRING`` |  |
| `token_type` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.OAuth2Token(nil).Create(map[string]any{
    "access_token": /* `$STRING` */,
    "expires_in": /* `$INTEGER` */,
    "scope": /* `$STRING` */,
    "token_type": /* `$STRING` */,
}, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/openverse-sdk/go/
├── openverse.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/openverse-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
