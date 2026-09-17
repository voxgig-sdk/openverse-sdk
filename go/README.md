# Openverse Golang SDK



The Golang SDK for the Openverse API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Audio(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
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
    audio, err := client.Audio(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(audio)

    // Create a audio.
    created, err := client.Audio(nil).Create(map[string]any{"identifier": "example_identifier", "alt_files": []any{}, "attribution": "example_attribution", "audio_set": "example_audio_set", "detail_url": "example_detail_url", "fields_matched": []any{}, "id": "example_id", "indexed_on": "example_indexed_on", "license": "example_license", "license_url": "example_license_url", "mature": true, "related_url": "example_related_url", "tags": []any{}, "thumbnail": "example_thumbnail", "waveform": "example_waveform"}, nil)
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
images, err := client.Image(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = images
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

image, err := client.Image(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(image) // the returned mock data
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
| `"alt_files"` | JSON describing alternative files for this audio. |
| `"attribution"` | Legally valid attribution for the media item in plain-text English. |
| `"audio_set"` | Reference to set of which this track is a part. |
| `"bit_rate"` | Number in bits per second, eg. |
| `"category"` | The top-level classification of this media file. |
| `"creator"` | The name of the media creator. |
| `"creator_url"` | A direct link to the media creator. |
| `"detail_url"` | A direct link to the detail view of this audio file. |
| `"duration"` | The time length of the audio file in milliseconds. |
| `"fields_matched"` | List the fields that matched the query for this result. |
| `"filesize"` | Number in bytes, e.g. |
| `"filetype"` | The type of the file, related to the file extension. |
| `"foreign_landing_url"` | The landing page of the work. |
| `"genres"` | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `"id"` | Our unique identifier for an open-licensed work. |
| `"indexed_on"` | The timestamp of when the media was indexed by Openverse. |
| `"license"` | The name of license for the media. |
| `"license_url"` | A direct link to the license deed or legal terms. |
| `"license_version"` | The version of the media license. |
| `"mature"` | Whether the media item is marked as mature |
| `"provider"` | The content provider, e.g. |
| `"related_url"` | A link to an endpoint that provides similar audio files. |
| `"sample_rate"` | Number in hertz, eg. |
| `"source"` | The source of the data, meaning a particular dataset. |
| `"tags"` | Tags with detailed metadata, such as accuracy. |
| `"thumbnail"` | A direct link to the miniature artwork. |
| `"title"` | The name of the media. |
| `"url"` | The actual URL to the media file. |
| `"waveform"` | A direct link to the waveform peaks. |

Operations: Create, List, Load.

API path: `/v1/audio/{identifier}/report/`

#### Image

| Field | Description |
| --- | --- |
| `"attribution"` | Legally valid attribution for the media item in plain-text English. |
| `"category"` | The top-level classification of this media file. |
| `"creator"` | The name of the media creator. |
| `"creator_url"` | A direct link to the media creator. |
| `"detail_url"` | A direct link to the detail view of this audio file. |
| `"fields_matched"` | List the fields that matched the query for this result. |
| `"filesize"` | Number in bytes, e.g. |
| `"filetype"` | The type of the file, related to the file extension. |
| `"foreign_landing_url"` | The landing page of the work. |
| `"height"` | The height of the image in pixels. |
| `"id"` | Our unique identifier for an open-licensed work. |
| `"indexed_on"` | The timestamp of when the media was indexed by Openverse. |
| `"license"` | The name of license for the media. |
| `"license_url"` | A direct link to the license deed or legal terms. |
| `"license_version"` | The version of the media license. |
| `"mature"` | Whether the media item is marked as mature |
| `"provider"` | The content provider, e.g. |
| `"related_url"` | A link to an endpoint that provides similar audio files. |
| `"source"` | The source of the data, meaning a particular dataset. |
| `"tags"` | Tags with detailed metadata, such as accuracy. |
| `"thumbnail"` | A direct link to the miniature artwork. |
| `"title"` | The name of the media. |
| `"url"` | The actual URL to the media file. |
| `"width"` | The width of the image in pixels. |

Operations: Create, List, Load.

API path: `/v1/images/{identifier}/report/`

#### OAuth2Application

| Field | Description |
| --- | --- |
| `"description"` | A description of what you are trying to achieve with your project using the API. |
| `"email"` | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `"name"` | A unique human-readable name for your application or project requiring access to the Openverse API. |

Operations: Create.

API path: `/v1/auth_tokens/register/`

#### OAuth2KeyInfo

| Field | Description |
| --- | --- |
| `"rate_limit_model"` | The type of rate limit applied to your key. |
| `"requests_this_minute"` | The number of requests your key has performed in the last minute. |
| `"requests_today"` | The number of requests your key has performed in the last day. |
| `"verified"` | Whether the application has verified the submitted email address. |

Operations: Load.

API path: `/v1/rate_limit/`

#### OAuth2Token

| Field | Description |
| --- | --- |
| `"access_token"` | The access token that can be used to authenticate requests. |
| `"expires_in"` | The number of seconds until the token expires. |
| `"scope"` | The scope of the token. |
| `"token_type"` | The type of token. |

Operations: Create.

API path: `/v1/auth_tokens/token/`



## Entities


### Audio

Create an instance: `audio := client.Audio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt_files` | `[]any` | JSON describing alternative files for this audio. |
| `attribution` | `string` | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `any` | Reference to set of which this track is a part. |
| `bit_rate` | `int` | Number in bits per second, eg. |
| `category` | `string` | The top-level classification of this media file. |
| `creator` | `string` | The name of the media creator. |
| `creator_url` | `string` | A direct link to the media creator. |
| `detail_url` | `string` | A direct link to the detail view of this audio file. |
| `duration` | `int` | The time length of the audio file in milliseconds. |
| `fields_matched` | `[]any` | List the fields that matched the query for this result. |
| `filesize` | `int` | Number in bytes, e.g. |
| `filetype` | `string` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | The landing page of the work. |
| `genres` | `[]any` | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `string` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | The name of license for the media. |
| `license_url` | `string` | A direct link to the license deed or legal terms. |
| `license_version` | `string` | The version of the media license. |
| `mature` | `bool` | Whether the media item is marked as mature |
| `provider` | `string` | The content provider, e.g. |
| `related_url` | `string` | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `int` | Number in hertz, eg. |
| `source` | `string` | The source of the data, meaning a particular dataset. |
| `tags` | `[]any` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | A direct link to the miniature artwork. |
| `title` | `string` | The name of the media. |
| `url` | `string` | The actual URL to the media file. |
| `waveform` | `string` | A direct link to the waveform peaks. |

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
    "identifier": "example_identifier",
    "alt_files": []any{},
    "attribution": "example_attribution",
    "audio_set": "example_audio_set",
    "detail_url": "example_detail_url",
    "fields_matched": []any{},
    "id": "example_id",
    "indexed_on": "example_indexed_on",
    "license": "example_license",
    "license_url": "example_license_url",
    "mature": true,
    "related_url": "example_related_url",
    "tags": []any{},
    "thumbnail": "example_thumbnail",
    "waveform": "example_waveform",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Image

Create an instance: `image := client.Image(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `string` | Legally valid attribution for the media item in plain-text English. |
| `category` | `string` | The top-level classification of this media file. |
| `creator` | `string` | The name of the media creator. |
| `creator_url` | `string` | A direct link to the media creator. |
| `detail_url` | `string` | A direct link to the detail view of this audio file. |
| `fields_matched` | `[]any` | List the fields that matched the query for this result. |
| `filesize` | `int` | Number in bytes, e.g. |
| `filetype` | `string` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | The landing page of the work. |
| `height` | `int` | The height of the image in pixels. |
| `id` | `string` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | The name of license for the media. |
| `license_url` | `string` | A direct link to the license deed or legal terms. |
| `license_version` | `string` | The version of the media license. |
| `mature` | `bool` | Whether the media item is marked as mature |
| `provider` | `string` | The content provider, e.g. |
| `related_url` | `string` | A link to an endpoint that provides similar audio files. |
| `source` | `string` | The source of the data, meaning a particular dataset. |
| `tags` | `[]any` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | A direct link to the miniature artwork. |
| `title` | `string` | The name of the media. |
| `url` | `string` | The actual URL to the media file. |
| `width` | `int` | The width of the image in pixels. |

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
    "identifier": "example_identifier",
    "attribution": "example_attribution",
    "detail_url": "example_detail_url",
    "fields_matched": []any{},
    "id": "example_id",
    "indexed_on": "example_indexed_on",
    "license": "example_license",
    "license_url": "example_license_url",
    "mature": true,
    "related_url": "example_related_url",
    "tags": []any{},
    "thumbnail": "example_thumbnail",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### OAuth2Application

Create an instance: `oAuth2Application := client.OAuth2Application(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A description of what you are trying to achieve with your project using the API. |
| `email` | `string` | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `string` | A unique human-readable name for your application or project requiring access to the Openverse API. |

#### Example: Create

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


### OAuth2KeyInfo

Create an instance: `oAuth2KeyInfo := client.OAuth2KeyInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate_limit_model` | `string` | The type of rate limit applied to your key. |
| `requests_this_minute` | `int` | The number of requests your key has performed in the last minute. |
| `requests_today` | `int` | The number of requests your key has performed in the last day. |
| `verified` | `bool` | Whether the application has verified the submitted email address. |

#### Example: Load

```go
oAuth2KeyInfo, err := client.OAuth2KeyInfo(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(oAuth2KeyInfo) // the loaded record
```


### OAuth2Token

Create an instance: `oAuth2Token := client.OAuth2Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | The access token that can be used to authenticate requests. |
| `expires_in` | `int` | The number of seconds until the token expires. |
| `scope` | `string` | The scope of the token. |
| `token_type` | `string` | The type of token. |

#### Example: Create

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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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
image := client.Image(nil)
image.List(nil, nil)

// image.Data() now returns the image data from the last list
// image.Match() returns the last match criteria
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
