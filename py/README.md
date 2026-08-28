# Openverse Python SDK



The Python SDK for the Openverse API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Audio()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/openverse-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from openverse_sdk import OpenverseSDK

client = OpenverseSDK({
    "apikey": os.environ.get("OPENVERSE_APIKEY"),
})
```

### 2. List audio records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    audios = client.Audio().list()
    for audio in audios:
        print(audio)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an audio

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    audio = client.Audio().load({"id": "example_id"})
    print(audio)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Audio().create({"identifier": "example_identifier", "alt_files": [], "attribution": "example_attribution", "audio_set": "example_audio_set", "detail_url": "example_detail_url", "display_name": "example_display_name", "fields_matched": [], "id": "example_id", "indexed_on": "example_indexed_on", "len": 1, "license": "example_license", "license_url": "example_license_url", "logo_url": "example_logo_url", "mature": True, "media_count": 1, "points": [], "reason": "example_reason", "related_url": "example_related_url", "source_name": "example_source_name", "source_url": "example_source_url", "tags": [], "thumbnail": "example_thumbnail", "waveform": "example_waveform"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    images = client.Image().list()
    print(images)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = OpenverseSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
image = client.Image().list()
# image contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = OpenverseSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### OpenverseSDK

```python
from openverse_sdk import OpenverseSDK

client = OpenverseSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = OpenverseSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### OpenverseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `audio = client.Audio()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt_files` | `list` | JSON describing alternative files for this audio. |
| `attribution` | `str` | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `Any` | Reference to set of which this track is a part. |
| `bit_rate` | `int` | Number in bits per second, eg. |
| `category` | `str` | The top-level classification of this media file. |
| `creator` | `str` | The name of the media creator. |
| `creator_url` | `str` | A direct link to the media creator. |
| `description` | `str` | The explanation on why media is being reported. |
| `detail_url` | `str` | A direct link to the detail view of this audio file. |
| `display_name` | `str` | The name of content source, e.g. |
| `duration` | `int` | The time length of the audio file in milliseconds. |
| `fields_matched` | `list` | List the fields that matched the query for this result. |
| `filesize` | `int` | Number in bytes, e.g. |
| `filetype` | `str` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `str` | The landing page of the work. |
| `genres` | `list` | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `str` | Our unique identifier for an open-licensed work. |
| `identifier` | `str` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `str` | The timestamp of when the media was indexed by Openverse. |
| `len` | `int` |  |
| `license` | `str` | The name of license for the media. |
| `license_url` | `str` | A direct link to the license deed or legal terms. |
| `license_version` | `str` | The version of the media license. |
| `logo_url` | `str` | The URL to a logo for the source. |
| `mature` | `bool` | Whether the media item is marked as mature |
| `media_count` | `int` | The number of media items indexed from the source. |
| `points` | `list` |  |
| `provider` | `str` | The content provider, e.g. |
| `reason` | `Any` | The reason to report media to Openverse. |
| `related_url` | `str` | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `int` | Number in hertz, eg. |
| `source` | `str` | The source of the data, meaning a particular dataset. |
| `source_name` | `str` | The source of the media, e.g. |
| `source_url` | `str` | The URL of the source, e.g. |
| `tags` | `list` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `str` | A direct link to the miniature artwork. |
| `title` | `str` | The name of the media. |
| `url` | `str` | The actual URL to the media file. |
| `waveform` | `str` | A direct link to the waveform peaks. |

#### Example: Load

```python
audio = client.Audio().load({"id": "audio_id"})
```

#### Example: List

```python
audios = client.Audio().list()
```

#### Example: Create

```python
audio = client.Audio().create({
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


### Image

Create an instance: `image = client.Image()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `str` | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `str` | The name of the media creator. |
| `author_url` | `str` | A direct link to the media creator. |
| `category` | `str` | The top-level classification of this media file. |
| `creator` | `str` | The name of the media creator. |
| `creator_url` | `str` | A direct link to the media creator. |
| `description` | `str` | The explanation on why media is being reported. |
| `detail_url` | `str` | A direct link to the detail view of this audio file. |
| `display_name` | `str` | The name of content source, e.g. |
| `fields_matched` | `list` | List the fields that matched the query for this result. |
| `filesize` | `int` | Number in bytes, e.g. |
| `filetype` | `str` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `str` | The landing page of the work. |
| `height` | `int` | The height of the image in pixels. |
| `id` | `str` | Our unique identifier for an open-licensed work. |
| `identifier` | `str` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `str` | The timestamp of when the media was indexed by Openverse. |
| `license` | `str` | The name of license for the media. |
| `license_url` | `str` | A direct link to the license deed or legal terms. |
| `license_version` | `str` | The version of the media license. |
| `logo_url` | `str` | The URL to a logo for the source. |
| `mature` | `bool` | Whether the media item is marked as mature |
| `media_count` | `int` | The number of media items indexed from the source. |
| `provider` | `str` | The content provider, e.g. |
| `reason` | `Any` | The reason to report media to Openverse. |
| `related_url` | `str` | A link to an endpoint that provides similar audio files. |
| `source` | `str` | The source of the data, meaning a particular dataset. |
| `source_name` | `str` | The source of the media, e.g. |
| `source_url` | `str` | The URL of the source, e.g. |
| `tags` | `list` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `str` | A direct link to the miniature artwork. |
| `title` | `str` | The name of the media. |
| `type` | `Any` | The resource type, always set to 'photo' for images. |
| `url` | `str` | The actual URL to the media file. |
| `version` | `Any` | The oEmbed version number, always set to 1.0. |
| `width` | `int` | The width of the image in pixels. |

#### Example: Load

```python
image = client.Image().load({"id": "image_id"})
```

#### Example: List

```python
images = client.Image().list()
```

#### Example: Create

```python
image = client.Image().create({
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


### OAuth2Application

Create an instance: `o_auth2_application = client.OAuth2Application()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | A description of what you are trying to achieve with your project using the API. |
| `email` | `str` | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `str` | A unique human-readable name for your application or project requiring access to the Openverse API. |

#### Example: Create

```python
o_auth2_application = client.OAuth2Application().create({
    "description": "example_description",  # str
    "email": "example_email",  # str
    "name": "example_name",  # str
})
```


### OAuth2KeyInfo

Create an instance: `o_auth2_key_info = client.OAuth2KeyInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate_limit_model` | `str` | The type of rate limit applied to your key. |
| `requests_this_minute` | `int` | The number of requests your key has performed in the last minute. |
| `requests_today` | `int` | The number of requests your key has performed in the last day. |
| `verified` | `bool` | Whether the application has verified the submitted email address. |

#### Example: Load

```python
o_auth2_key_info = client.OAuth2KeyInfo().load()
```


### OAuth2Token

Create an instance: `o_auth2_token = client.OAuth2Token()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `str` | The access token that can be used to authenticate requests. |
| `expires_in` | `int` | The number of seconds until the token expires. |
| `scope` | `str` | The scope of the token. |
| `token_type` | `str` | The type of token. |

#### Example: Create

```python
o_auth2_token = client.OAuth2Token().create({
    "access_token": "example_access_token",  # str
    "expires_in": 1,  # int
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── openverse_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`openverse_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
image = client.Image()
image.list()

# image.data_get() now returns the image data from the last list
# image.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
