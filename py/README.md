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

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    audio = client.Audio().load({"id": "example_id"})
    print(audio)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the bare created record (a dict)
created = client.Audio().create({"identifier": "example_identifier"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    audios = client.Audio().list()
    print(audios)
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

# Entity ops return the bare record and raise on error.
audio = client.Audio().list()
# audio contains the mock response record
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

Entity operations return the bare result data (a `dict` for single-entity
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
| `alt_file` |  |
| `attribution` |  |
| `audio_set` |  |
| `bit_rate` |  |
| `category` |  |
| `creator` |  |
| `creator_url` |  |
| `description` |  |
| `detail_url` |  |
| `display_name` |  |
| `duration` |  |
| `fields_matched` |  |
| `filesize` |  |
| `filetype` |  |
| `foreign_landing_url` |  |
| `genre` |  |
| `id` |  |
| `identifier` |  |
| `indexed_on` |  |
| `len` |  |
| `license` |  |
| `license_url` |  |
| `license_version` |  |
| `logo_url` |  |
| `mature` |  |
| `media_count` |  |
| `point` |  |
| `provider` |  |
| `reason` |  |
| `related_url` |  |
| `sample_rate` |  |
| `source` |  |
| `source_name` |  |
| `source_url` |  |
| `tag` |  |
| `thumbnail` |  |
| `title` |  |
| `url` |  |
| `waveform` |  |

Operations: Create, List, Load.

API path: `/v1/audio/{identifier}/report/`

#### Image

| Field | Description |
| --- | --- |
| `attribution` |  |
| `author_name` |  |
| `author_url` |  |
| `category` |  |
| `creator` |  |
| `creator_url` |  |
| `description` |  |
| `detail_url` |  |
| `display_name` |  |
| `fields_matched` |  |
| `filesize` |  |
| `filetype` |  |
| `foreign_landing_url` |  |
| `height` |  |
| `id` |  |
| `identifier` |  |
| `indexed_on` |  |
| `license` |  |
| `license_url` |  |
| `license_version` |  |
| `logo_url` |  |
| `mature` |  |
| `media_count` |  |
| `provider` |  |
| `reason` |  |
| `related_url` |  |
| `source` |  |
| `source_name` |  |
| `source_url` |  |
| `tag` |  |
| `thumbnail` |  |
| `title` |  |
| `type` |  |
| `url` |  |
| `version` |  |
| `width` |  |

Operations: Create, List, Load.

API path: `/v1/images/{identifier}/report/`

#### OAuth2Application

| Field | Description |
| --- | --- |
| `description` |  |
| `email` |  |
| `name` |  |

Operations: Create.

API path: `/v1/auth_tokens/register/`

#### OAuth2KeyInfo

| Field | Description |
| --- | --- |
| `rate_limit_model` |  |
| `requests_this_minute` |  |
| `requests_today` |  |
| `verified` |  |

Operations: Load.

API path: `/v1/rate_limit/`

#### OAuth2Token

| Field | Description |
| --- | --- |
| `access_token` |  |
| `expires_in` |  |
| `scope` |  |
| `token_type` |  |

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
| `alt_file` | `list` |  |
| `attribution` | `str` |  |
| `audio_set` | `Any` |  |
| `bit_rate` | `int` |  |
| `category` | `str` |  |
| `creator` | `str` |  |
| `creator_url` | `str` |  |
| `description` | `str` |  |
| `detail_url` | `str` |  |
| `display_name` | `str` |  |
| `duration` | `int` |  |
| `fields_matched` | `list` |  |
| `filesize` | `int` |  |
| `filetype` | `str` |  |
| `foreign_landing_url` | `str` |  |
| `genre` | `list` |  |
| `id` | `str` |  |
| `identifier` | `str` |  |
| `indexed_on` | `str` |  |
| `len` | `int` |  |
| `license` | `str` |  |
| `license_url` | `str` |  |
| `license_version` | `str` |  |
| `logo_url` | `str` |  |
| `mature` | `bool` |  |
| `media_count` | `int` |  |
| `point` | `list` |  |
| `provider` | `str` |  |
| `reason` | `Any` |  |
| `related_url` | `str` |  |
| `sample_rate` | `int` |  |
| `source` | `str` |  |
| `source_name` | `str` |  |
| `source_url` | `str` |  |
| `tag` | `list` |  |
| `thumbnail` | `str` |  |
| `title` | `str` |  |
| `url` | `str` |  |
| `waveform` | `str` |  |

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
| `attribution` | `str` |  |
| `author_name` | `str` |  |
| `author_url` | `str` |  |
| `category` | `str` |  |
| `creator` | `str` |  |
| `creator_url` | `str` |  |
| `description` | `str` |  |
| `detail_url` | `str` |  |
| `display_name` | `str` |  |
| `fields_matched` | `list` |  |
| `filesize` | `int` |  |
| `filetype` | `str` |  |
| `foreign_landing_url` | `str` |  |
| `height` | `int` |  |
| `id` | `str` |  |
| `identifier` | `str` |  |
| `indexed_on` | `str` |  |
| `license` | `str` |  |
| `license_url` | `str` |  |
| `license_version` | `str` |  |
| `logo_url` | `str` |  |
| `mature` | `bool` |  |
| `media_count` | `int` |  |
| `provider` | `str` |  |
| `reason` | `Any` |  |
| `related_url` | `str` |  |
| `source` | `str` |  |
| `source_name` | `str` |  |
| `source_url` | `str` |  |
| `tag` | `list` |  |
| `thumbnail` | `str` |  |
| `title` | `str` |  |
| `type` | `Any` |  |
| `url` | `str` |  |
| `version` | `Any` |  |
| `width` | `int` |  |

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
| `description` | `str` |  |
| `email` | `str` |  |
| `name` | `str` |  |

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
| `rate_limit_model` | `str` |  |
| `requests_this_minute` | `int` |  |
| `requests_today` | `int` |  |
| `verified` | `bool` |  |

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
| `access_token` | `str` |  |
| `expires_in` | `int` |  |
| `scope` | `str` |  |
| `token_type` | `str` |  |

#### Example: Create

```python
o_auth2_token = client.OAuth2Token().create({
    "access_token": "example_access_token",  # str
    "expires_in": 1,  # int
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
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
audio = client.Audio()
audio.list()

# audio.data_get() now returns the audio data from the last list
# audio.match_get() returns the last match criteria
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
