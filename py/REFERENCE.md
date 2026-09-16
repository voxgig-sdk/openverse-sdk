# Openverse Python SDK Reference

Complete API reference for the Openverse Python SDK.


## OpenverseSDK

### Constructor

```python
from openverse_sdk import OpenverseSDK

client = OpenverseSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenverseSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OpenverseSDK.test()
```


### Instance Methods

#### `Audio(data=None)`

Create a new `AudioEntity` instance. Pass `None` for no initial data.

#### `Image(data=None)`

Create a new `ImageEntity` instance. Pass `None` for no initial data.

#### `OAuth2Application(data=None)`

Create a new `OAuth2ApplicationEntity` instance. Pass `None` for no initial data.

#### `OAuth2KeyInfo(data=None)`

Create a new `OAuth2KeyInfoEntity` instance. Pass `None` for no initial data.

#### `OAuth2Token(data=None)`

Create a new `OAuth2TokenEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AudioEntity

```python
audio = client.Audio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt_files` | `list` | Yes | JSON describing alternative files for this audio. |
| `attribution` | `str` | Yes | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `Any` | Yes | Reference to set of which this track is a part. |
| `bit_rate` | `int` | No | Number in bits per second, eg. |
| `category` | `str` | No | The top-level classification of this media file. |
| `creator` | `str` | No | The name of the media creator. |
| `creator_url` | `str` | No | A direct link to the media creator. |
| `description` | `str` | No | The explanation on why media is being reported. |
| `detail_url` | `str` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `str` | Yes | The name of content source, e.g. |
| `duration` | `int` | No | The time length of the audio file in milliseconds. |
| `fields_matched` | `list` | Yes | List the fields that matched the query for this result. |
| `filesize` | `int` | No | Number in bytes, e.g. |
| `filetype` | `str` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `str` | No | The landing page of the work. |
| `genres` | `list` | No | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `str` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `str` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `str` | Yes | The timestamp of when the media was indexed by Openverse. |
| `len` | `int` | Yes |  |
| `license` | `str` | Yes | The name of license for the media. |
| `license_url` | `str` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `str` | No | The version of the media license. |
| `logo_url` | `str` | Yes | The URL to a logo for the source. |
| `mature` | `bool` | Yes | Whether the media item is marked as mature |
| `media_count` | `int` | Yes | The number of media items indexed from the source. |
| `points` | `list` | Yes |  |
| `provider` | `str` | No | The content provider, e.g. |
| `reason` | `Any` | Yes | The reason to report media to Openverse. |
| `related_url` | `str` | Yes | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `int` | No | Number in hertz, eg. |
| `source` | `str` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `str` | Yes | The source of the media, e.g. |
| `source_url` | `str` | Yes | The URL of the source, e.g. |
| `tags` | `list` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `str` | Yes | A direct link to the miniature artwork. |
| `title` | `str` | No | The name of the media. |
| `url` | `str` | No | The actual URL to the media file. |
| `waveform` | `str` | Yes | A direct link to the waveform peaks. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Audio().create({
    "identifier": "example_identifier",  # str
    "alt_files": [],  # list
    "attribution": "example_attribution",  # str
    "audio_set": "example_audio_set",  # Any
    "detail_url": "example_detail_url",  # str
    "display_name": "example_display_name",  # str
    "fields_matched": [],  # list
    "id": "example_id",  # str
    "indexed_on": "example_indexed_on",  # str
    "len": 1,  # int
    "license": "example_license",  # str
    "license_url": "example_license_url",  # str
    "logo_url": "example_logo_url",  # str
    "mature": True,  # bool
    "media_count": 1,  # int
    "points": [],  # list
    "reason": "example_reason",  # Any
    "related_url": "example_related_url",  # str
    "source_name": "example_source_name",  # str
    "source_url": "example_source_url",  # str
    "tags": [],  # list
    "thumbnail": "example_thumbnail",  # str
    "waveform": "example_waveform",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Audio().list()
for audio in results:
    print(audio)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Audio().load({"id": "audio_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AudioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImageEntity

```python
image = client.Image()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `str` | Yes | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `str` | Yes | The name of the media creator. |
| `author_url` | `str` | Yes | A direct link to the media creator. |
| `category` | `str` | No | The top-level classification of this media file. |
| `creator` | `str` | No | The name of the media creator. |
| `creator_url` | `str` | No | A direct link to the media creator. |
| `description` | `str` | No | The explanation on why media is being reported. |
| `detail_url` | `str` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `str` | Yes | The name of content source, e.g. |
| `fields_matched` | `list` | Yes | List the fields that matched the query for this result. |
| `filesize` | `int` | No | Number in bytes, e.g. |
| `filetype` | `str` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `str` | No | The landing page of the work. |
| `height` | `int` | No | The height of the image in pixels. |
| `id` | `str` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `str` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `str` | Yes | The timestamp of when the media was indexed by Openverse. |
| `license` | `str` | Yes | The name of license for the media. |
| `license_url` | `str` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `str` | No | The version of the media license. |
| `logo_url` | `str` | Yes | The URL to a logo for the source. |
| `mature` | `bool` | Yes | Whether the media item is marked as mature |
| `media_count` | `int` | Yes | The number of media items indexed from the source. |
| `provider` | `str` | No | The content provider, e.g. |
| `reason` | `Any` | Yes | The reason to report media to Openverse. |
| `related_url` | `str` | Yes | A link to an endpoint that provides similar audio files. |
| `source` | `str` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `str` | Yes | The source of the media, e.g. |
| `source_url` | `str` | Yes | The URL of the source, e.g. |
| `tags` | `list` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `str` | Yes | A direct link to the miniature artwork. |
| `title` | `str` | No | The name of the media. |
| `type` | `Any` | Yes | The resource type, always set to 'photo' for images. |
| `url` | `str` | No | The actual URL to the media file. |
| `version` | `Any` | Yes | The oEmbed version number, always set to 1.0. |
| `width` | `int` | No | The width of the image in pixels. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Image().create({
    "identifier": "example_identifier",  # str
    "attribution": "example_attribution",  # str
    "author_name": "example_author_name",  # str
    "author_url": "example_author_url",  # str
    "detail_url": "example_detail_url",  # str
    "display_name": "example_display_name",  # str
    "fields_matched": [],  # list
    "id": "example_id",  # str
    "indexed_on": "example_indexed_on",  # str
    "license": "example_license",  # str
    "license_url": "example_license_url",  # str
    "logo_url": "example_logo_url",  # str
    "mature": True,  # bool
    "media_count": 1,  # int
    "reason": "example_reason",  # Any
    "related_url": "example_related_url",  # str
    "source_name": "example_source_name",  # str
    "source_url": "example_source_url",  # str
    "tags": [],  # list
    "thumbnail": "example_thumbnail",  # str
    "type": "example_type",  # Any
    "version": "example_version",  # Any
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Image().list()
for image in results:
    print(image)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Image().load({"id": "image_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OAuth2ApplicationEntity

```python
o_auth2_application = client.OAuth2Application()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | Yes | A description of what you are trying to achieve with your project using the API. |
| `email` | `str` | Yes | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `str` | Yes | A unique human-readable name for your application or project requiring access to the Openverse API. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OAuth2Application().create({
    "description": "example_description",  # str
    "email": "example_email",  # str
    "name": "example_name",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OAuth2ApplicationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OAuth2KeyInfoEntity

```python
o_auth2_key_info = client.OAuth2KeyInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate_limit_model` | `str` | Yes | The type of rate limit applied to your key. |
| `requests_this_minute` | `int` | Yes | The number of requests your key has performed in the last minute. |
| `requests_today` | `int` | Yes | The number of requests your key has performed in the last day. |
| `verified` | `bool` | Yes | Whether the application has verified the submitted email address. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.OAuth2KeyInfo().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OAuth2KeyInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OAuth2TokenEntity

```python
o_auth2_token = client.OAuth2Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `str` | Yes | The access token that can be used to authenticate requests. |
| `expires_in` | `int` | Yes | The number of seconds until the token expires. |
| `scope` | `str` | Yes | The scope of the token. |
| `token_type` | `str` | Yes | The type of token. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OAuth2Token().create({
    "access_token": "example_access_token",  # str
    "expires_in": 1,  # int
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OAuth2TokenEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = OpenverseSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

