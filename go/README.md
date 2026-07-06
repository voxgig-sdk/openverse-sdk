# Openverse Golang SDK



The Golang SDK for the Openverse API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Audio(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/openverse-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/openverse-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/openverse-sdk/go=../openverse-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/openverse-sdk/go"
)

func main() {
    client := sdk.NewOpenverseSDK(map[string]any{
        "apikey": os.Getenv("OPENVERSE_APIKEY"),
    })

    // List audio records — the value is the array of records itself.
    audios, err := client.Audio(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range audios.([]any) {
        fmt.Println(item)
    }

    // Load a single audio — the value is the loaded record.
    audio, err := client.Audio(nil).Load(map[string]any{"id": "example"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(audio)

    // Create a audio.
    created, err := client.Audio(nil).Create(map[string]any{"identifier": "example"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
audios, err := client.Audio(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = audios
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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
client := sdk.Test()

audio, err := client.Audio(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(audio) // the returned mock data
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
OPENVERSE_APIKEY=<your-key>
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
| `"apikey"` | `string` | API key for authentication. |
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
| `Audio` | `(data map[string]any) OpenverseEntity` | Create an Audio entity instance. |
| `Image` | `(data map[string]any) OpenverseEntity` | Create an Image entity instance. |
| `OAuth2Application` | `(data map[string]any) OpenverseEntity` | Create an OAuth2Application entity instance. |
| `OAuth2KeyInfo` | `(data map[string]any) OpenverseEntity` | Create an OAuth2KeyInfo entity instance. |
| `OAuth2Token` | `(data map[string]any) OpenverseEntity` | Create an OAuth2Token entity instance. |

### Entity interface (OpenverseEntity)

All entities implement the `OpenverseEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    audio, err := client.Audio(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // audio is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `alt_file` | `[]any` |  |
| `attribution` | `string` |  |
| `audio_set` | `any` |  |
| `bit_rate` | `int` |  |
| `category` | `string` |  |
| `creator` | `string` |  |
| `creator_url` | `string` |  |
| `description` | `string` |  |
| `detail_url` | `string` |  |
| `display_name` | `string` |  |
| `duration` | `int` |  |
| `fields_matched` | `[]any` |  |
| `filesize` | `int` |  |
| `filetype` | `string` |  |
| `foreign_landing_url` | `string` |  |
| `genre` | `[]any` |  |
| `id` | `string` |  |
| `identifier` | `string` |  |
| `indexed_on` | `string` |  |
| `len` | `int` |  |
| `license` | `string` |  |
| `license_url` | `string` |  |
| `license_version` | `string` |  |
| `logo_url` | `string` |  |
| `mature` | `bool` |  |
| `media_count` | `int` |  |
| `point` | `[]any` |  |
| `provider` | `string` |  |
| `reason` | `any` |  |
| `related_url` | `string` |  |
| `sample_rate` | `int` |  |
| `source` | `string` |  |
| `source_name` | `string` |  |
| `source_url` | `string` |  |
| `tag` | `[]any` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |
| `waveform` | `string` |  |

#### Example: Load

```go
audio, err := client.Audio(nil).Load(map[string]any{"id": "audio_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(audio) // the loaded record
```

#### Example: List

```go
audios, err := client.Audio(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(audios) // the array of records
```

#### Example: Create

```go
result, err := client.Audio(nil).Create(map[string]any{
    "alt_file": /* []any */,
    "attribution": /* string */,
    "audio_set": /* any */,
    "detail_url": /* string */,
    "display_name": /* string */,
    "fields_matched": /* []any */,
    "identifier": /* string */,
    "indexed_on": /* string */,
    "len": /* int */,
    "license": /* string */,
    "license_url": /* string */,
    "logo_url": /* string */,
    "mature": /* bool */,
    "media_count": /* int */,
    "point": /* []any */,
    "reason": /* any */,
    "related_url": /* string */,
    "source_name": /* string */,
    "source_url": /* string */,
    "tag": /* []any */,
    "thumbnail": /* string */,
    "waveform": /* string */,
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
| `attribution` | `string` |  |
| `author_name` | `string` |  |
| `author_url` | `string` |  |
| `category` | `string` |  |
| `creator` | `string` |  |
| `creator_url` | `string` |  |
| `description` | `string` |  |
| `detail_url` | `string` |  |
| `display_name` | `string` |  |
| `fields_matched` | `[]any` |  |
| `filesize` | `int` |  |
| `filetype` | `string` |  |
| `foreign_landing_url` | `string` |  |
| `height` | `int` |  |
| `id` | `string` |  |
| `identifier` | `string` |  |
| `indexed_on` | `string` |  |
| `license` | `string` |  |
| `license_url` | `string` |  |
| `license_version` | `string` |  |
| `logo_url` | `string` |  |
| `mature` | `bool` |  |
| `media_count` | `int` |  |
| `provider` | `string` |  |
| `reason` | `any` |  |
| `related_url` | `string` |  |
| `source` | `string` |  |
| `source_name` | `string` |  |
| `source_url` | `string` |  |
| `tag` | `[]any` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |
| `type` | `any` |  |
| `url` | `string` |  |
| `version` | `any` |  |
| `width` | `int` |  |

#### Example: Load

```go
image, err := client.Image(nil).Load(map[string]any{"id": "image_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(image) // the loaded record
```

#### Example: List

```go
images, err := client.Image(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(images) // the array of records
```

#### Example: Create

```go
result, err := client.Image(nil).Create(map[string]any{
    "attribution": /* string */,
    "author_name": /* string */,
    "author_url": /* string */,
    "detail_url": /* string */,
    "display_name": /* string */,
    "fields_matched": /* []any */,
    "identifier": /* string */,
    "indexed_on": /* string */,
    "license": /* string */,
    "license_url": /* string */,
    "logo_url": /* string */,
    "mature": /* bool */,
    "media_count": /* int */,
    "reason": /* any */,
    "related_url": /* string */,
    "source_name": /* string */,
    "source_url": /* string */,
    "tag": /* []any */,
    "thumbnail": /* string */,
    "type": /* any */,
    "version": /* any */,
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
| `description` | `string` |  |
| `email` | `string` |  |
| `name` | `string` |  |

#### Example: Create

```go
result, err := client.OAuth2Application(nil).Create(map[string]any{
    "description": /* string */,
    "email": /* string */,
    "name": /* string */,
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
| `rate_limit_model` | `string` |  |
| `requests_this_minute` | `int` |  |
| `requests_today` | `int` |  |
| `verified` | `bool` |  |

#### Example: Load

```go
o_auth2_key_info, err := client.OAuth2KeyInfo(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(o_auth2_key_info) // the loaded record
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
| `access_token` | `string` |  |
| `expires_in` | `int` |  |
| `scope` | `string` |  |
| `token_type` | `string` |  |

#### Example: Create

```go
result, err := client.OAuth2Token(nil).Create(map[string]any{
    "access_token": /* string */,
    "expires_in": /* int */,
    "scope": /* string */,
    "token_type": /* string */,
}, nil)
```


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

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
audio := client.Audio(nil)
audio.List(nil, nil)

// audio.Data() now returns the audio data from the last list
// audio.Match() returns the last match criteria
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
