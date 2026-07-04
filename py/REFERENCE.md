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
audio = client.audio
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
| `license` | ``$STRING`` | Yes |  |
| `license_url` | ``$STRING`` | Yes |  |
| `license_version` | ``$STRING`` | No |  |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.audio.create({
    "alt_file": # `$ARRAY`,
    "attribution": # `$STRING`,
    "audio_set": # `$ANY`,
    "detail_url": # `$STRING`,
    "display_name": # `$STRING`,
    "fields_matched": # `$ARRAY`,
    "identifier": # `$STRING`,
    "indexed_on": # `$STRING`,
    "len": # `$INTEGER`,
    "license": # `$STRING`,
    "license_url": # `$STRING`,
    "logo_url": # `$STRING`,
    "mature": # `$BOOLEAN`,
    "media_count": # `$INTEGER`,
    "point": # `$ARRAY`,
    "reason": # `$ANY`,
    "related_url": # `$STRING`,
    "source_name": # `$STRING`,
    "source_url": # `$STRING`,
    "tag": # `$ARRAY`,
    "thumbnail": # `$STRING`,
    "waveform": # `$STRING`,
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.audio.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.audio.load({"id": "audio_id"})
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
image = client.image
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
| `license` | ``$STRING`` | Yes |  |
| `license_url` | ``$STRING`` | Yes |  |
| `license_version` | ``$STRING`` | No |  |
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
| `license` | - | - | - | - | - |
| `license_url` | - | - | - | - | - |
| `license_version` | - | - | - | - | - |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.image.create({
    "attribution": # `$STRING`,
    "author_name": # `$STRING`,
    "author_url": # `$STRING`,
    "detail_url": # `$STRING`,
    "display_name": # `$STRING`,
    "fields_matched": # `$ARRAY`,
    "identifier": # `$STRING`,
    "indexed_on": # `$STRING`,
    "license": # `$STRING`,
    "license_url": # `$STRING`,
    "logo_url": # `$STRING`,
    "mature": # `$BOOLEAN`,
    "media_count": # `$INTEGER`,
    "reason": # `$ANY`,
    "related_url": # `$STRING`,
    "source_name": # `$STRING`,
    "source_url": # `$STRING`,
    "tag": # `$ARRAY`,
    "thumbnail": # `$STRING`,
    "type": # `$ANY`,
    "version": # `$ANY`,
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.image.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.image.load({"id": "image_id"})
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
o_auth2_application = client.o_auth2_application
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.o_auth2_application.create({
    "description": # `$STRING`,
    "email": # `$STRING`,
    "name": # `$STRING`,
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
o_auth2_key_info = client.o_auth2_key_info
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate_limit_model` | ``$STRING`` | Yes |  |
| `requests_this_minute` | ``$INTEGER`` | Yes |  |
| `requests_today` | ``$INTEGER`` | Yes |  |
| `verified` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.o_auth2_key_info.load({"id": "o_auth2_key_info_id"})
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
o_auth2_token = client.o_auth2_token
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | ``$STRING`` | Yes |  |
| `expires_in` | ``$INTEGER`` | Yes |  |
| `scope` | ``$STRING`` | Yes |  |
| `token_type` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.o_auth2_token.create({
    "access_token": # `$STRING`,
    "expires_in": # `$INTEGER`,
    "scope": # `$STRING`,
    "token_type": # `$STRING`,
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

