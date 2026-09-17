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
| `alt_files` | `[]any` | Yes | JSON describing alternative files for this audio. |
| `attribution` | `string` | Yes | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `any` | Yes | Reference to set of which this track is a part. |
| `bit_rate` | `int` | No | Number in bits per second, eg. |
| `category` | `string` | No | The top-level classification of this media file. |
| `creator` | `string` | No | The name of the media creator. |
| `creator_url` | `string` | No | A direct link to the media creator. |
| `detail_url` | `string` | Yes | A direct link to the detail view of this audio file. |
| `duration` | `int` | No | The time length of the audio file in milliseconds. |
| `fields_matched` | `[]any` | Yes | List the fields that matched the query for this result. |
| `filesize` | `int` | No | Number in bytes, e.g. |
| `filetype` | `string` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | No | The landing page of the work. |
| `genres` | `[]any` | No | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | Yes | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | Yes | The name of license for the media. |
| `license_url` | `string` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `string` | No | The version of the media license. |
| `mature` | `bool` | Yes | Whether the media item is marked as mature |
| `provider` | `string` | No | The content provider, e.g. |
| `related_url` | `string` | Yes | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `int` | No | Number in hertz, eg. |
| `source` | `string` | No | The source of the data, meaning a particular dataset. |
| `tags` | `[]any` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | Yes | A direct link to the miniature artwork. |
| `title` | `string` | No | The name of the media. |
| `url` | `string` | No | The actual URL to the media file. |
| `waveform` | `string` | Yes | A direct link to the waveform peaks. |

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
| `attribution` | `string` | Yes | Legally valid attribution for the media item in plain-text English. |
| `category` | `string` | No | The top-level classification of this media file. |
| `creator` | `string` | No | The name of the media creator. |
| `creator_url` | `string` | No | A direct link to the media creator. |
| `detail_url` | `string` | Yes | A direct link to the detail view of this audio file. |
| `fields_matched` | `[]any` | Yes | List the fields that matched the query for this result. |
| `filesize` | `int` | No | Number in bytes, e.g. |
| `filetype` | `string` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | No | The landing page of the work. |
| `height` | `int` | No | The height of the image in pixels. |
| `id` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | Yes | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | Yes | The name of license for the media. |
| `license_url` | `string` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `string` | No | The version of the media license. |
| `mature` | `bool` | Yes | Whether the media item is marked as mature |
| `provider` | `string` | No | The content provider, e.g. |
| `related_url` | `string` | Yes | A link to an endpoint that provides similar audio files. |
| `source` | `string` | No | The source of the data, meaning a particular dataset. |
| `tags` | `[]any` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | Yes | A direct link to the miniature artwork. |
| `title` | `string` | No | The name of the media. |
| `url` | `string` | No | The actual URL to the media file. |
| `width` | `int` | No | The width of the image in pixels. |

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
| `description` | `string` | Yes | A description of what you are trying to achieve with your project using the API. |
| `email` | `string` | Yes | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `string` | Yes | A unique human-readable name for your application or project requiring access to the Openverse API. |

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
| `rate_limit_model` | `string` | Yes | The type of rate limit applied to your key. |
| `requests_this_minute` | `int` | Yes | The number of requests your key has performed in the last minute. |
| `requests_today` | `int` | Yes | The number of requests your key has performed in the last day. |
| `verified` | `bool` | Yes | Whether the application has verified the submitted email address. |

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
| `access_token` | `string` | Yes | The access token that can be used to authenticate requests. |
| `expires_in` | `int` | Yes | The number of seconds until the token expires. |
| `scope` | `string` | Yes | The scope of the token. |
| `token_type` | `string` | Yes | The type of token. |

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
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```go
client := sdk.NewOpenverseSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

