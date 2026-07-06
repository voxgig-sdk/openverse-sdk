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
| `alt_file` | `list` | Yes |  |
| `attribution` | `str` | Yes |  |
| `audio_set` | `Any` | Yes |  |
| `bit_rate` | `int` | No |  |
| `category` | `str` | No |  |
| `creator` | `str` | No |  |
| `creator_url` | `str` | No |  |
| `description` | `str` | No |  |
| `detail_url` | `str` | Yes |  |
| `display_name` | `str` | Yes |  |
| `duration` | `int` | No |  |
| `fields_matched` | `list` | Yes |  |
| `filesize` | `int` | No |  |
| `filetype` | `str` | No |  |
| `foreign_landing_url` | `str` | No |  |
| `genre` | `list` | No |  |
| `id` | `str` | Yes |  |
| `identifier` | `str` | Yes |  |
| `indexed_on` | `str` | Yes |  |
| `len` | `int` | Yes |  |
| `license` | `str` | Yes |  |
| `license_url` | `str` | Yes |  |
| `license_version` | `str` | No |  |
| `logo_url` | `str` | Yes |  |
| `mature` | `bool` | Yes |  |
| `media_count` | `int` | Yes |  |
| `point` | `list` | Yes |  |
| `provider` | `str` | No |  |
| `reason` | `Any` | Yes |  |
| `related_url` | `str` | Yes |  |
| `sample_rate` | `int` | No |  |
| `source` | `str` | No |  |
| `source_name` | `str` | Yes |  |
| `source_url` | `str` | Yes |  |
| `tag` | `list` | Yes |  |
| `thumbnail` | `str` | Yes |  |
| `title` | `str` | No |  |
| `url` | `str` | No |  |
| `waveform` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Audio().create({
    "alt_file": [],  # list
    "attribution": "example",  # str
    "audio_set": "example",  # Any
    "detail_url": "example",  # str
    "display_name": "example",  # str
    "fields_matched": [],  # list
    "identifier": "example",  # str
    "indexed_on": "example",  # str
    "len": 1,  # int
    "license": "example",  # str
    "license_url": "example",  # str
    "logo_url": "example",  # str
    "mature": True,  # bool
    "media_count": 1,  # int
    "point": [],  # list
    "reason": "example",  # Any
    "related_url": "example",  # str
    "source_name": "example",  # str
    "source_url": "example",  # str
    "tag": [],  # list
    "thumbnail": "example",  # str
    "waveform": "example",  # str
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
| `attribution` | `str` | Yes |  |
| `author_name` | `str` | Yes |  |
| `author_url` | `str` | Yes |  |
| `category` | `str` | No |  |
| `creator` | `str` | No |  |
| `creator_url` | `str` | No |  |
| `description` | `str` | No |  |
| `detail_url` | `str` | Yes |  |
| `display_name` | `str` | Yes |  |
| `fields_matched` | `list` | Yes |  |
| `filesize` | `int` | No |  |
| `filetype` | `str` | No |  |
| `foreign_landing_url` | `str` | No |  |
| `height` | `int` | No |  |
| `id` | `str` | Yes |  |
| `identifier` | `str` | Yes |  |
| `indexed_on` | `str` | Yes |  |
| `license` | `str` | Yes |  |
| `license_url` | `str` | Yes |  |
| `license_version` | `str` | No |  |
| `logo_url` | `str` | Yes |  |
| `mature` | `bool` | Yes |  |
| `media_count` | `int` | Yes |  |
| `provider` | `str` | No |  |
| `reason` | `Any` | Yes |  |
| `related_url` | `str` | Yes |  |
| `source` | `str` | No |  |
| `source_name` | `str` | Yes |  |
| `source_url` | `str` | Yes |  |
| `tag` | `list` | Yes |  |
| `thumbnail` | `str` | Yes |  |
| `title` | `str` | No |  |
| `type` | `Any` | Yes |  |
| `url` | `str` | No |  |
| `version` | `Any` | Yes |  |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Image().create({
    "attribution": "example",  # str
    "author_name": "example",  # str
    "author_url": "example",  # str
    "detail_url": "example",  # str
    "display_name": "example",  # str
    "fields_matched": [],  # list
    "identifier": "example",  # str
    "indexed_on": "example",  # str
    "license": "example",  # str
    "license_url": "example",  # str
    "logo_url": "example",  # str
    "mature": True,  # bool
    "media_count": 1,  # int
    "reason": "example",  # Any
    "related_url": "example",  # str
    "source_name": "example",  # str
    "source_url": "example",  # str
    "tag": [],  # list
    "thumbnail": "example",  # str
    "type": "example",  # Any
    "version": "example",  # Any
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
| `description` | `str` | Yes |  |
| `email` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OAuth2Application().create({
    "description": "example",  # str
    "email": "example",  # str
    "name": "example",  # str
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
| `rate_limit_model` | `str` | Yes |  |
| `requests_this_minute` | `int` | Yes |  |
| `requests_today` | `int` | Yes |  |
| `verified` | `bool` | Yes |  |

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
| `access_token` | `str` | Yes |  |
| `expires_in` | `int` | Yes |  |
| `scope` | `str` | Yes |  |
| `token_type` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OAuth2Token().create({
    "access_token": "example",  # str
    "expires_in": 1,  # int
    "scope": "example",  # str
    "token_type": "example",  # str
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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OpenverseSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

