# Openverse PHP SDK Reference

Complete API reference for the Openverse PHP SDK.


## OpenverseSDK

### Constructor

```php
require_once __DIR__ . '/openverse_sdk.php';

$client = new OpenverseSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenverseSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OpenverseSDK::test();
```


### Instance Methods

#### `Audio($data = null)`

Create a new `AudioEntity` instance. Pass `null` for no initial data.

#### `Image($data = null)`

Create a new `ImageEntity` instance. Pass `null` for no initial data.

#### `OAuth2Application($data = null)`

Create a new `OAuth2ApplicationEntity` instance. Pass `null` for no initial data.

#### `OAuth2KeyInfo($data = null)`

Create a new `OAuth2KeyInfoEntity` instance. Pass `null` for no initial data.

#### `OAuth2Token($data = null)`

Create a new `OAuth2TokenEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): OpenverseUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AudioEntity

```php
$audio = $client->Audio();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt_file` | `array` | Yes |  |
| `attribution` | `string` | Yes |  |
| `audio_set` | `mixed` | Yes |  |
| `bit_rate` | `int` | No |  |
| `category` | `string` | No |  |
| `creator` | `string` | No |  |
| `creator_url` | `string` | No |  |
| `description` | `string` | No |  |
| `detail_url` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `duration` | `int` | No |  |
| `fields_matched` | `array` | Yes |  |
| `filesize` | `int` | No |  |
| `filetype` | `string` | No |  |
| `foreign_landing_url` | `string` | No |  |
| `genre` | `array` | No |  |
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
| `point` | `array` | Yes |  |
| `provider` | `string` | No |  |
| `reason` | `mixed` | Yes |  |
| `related_url` | `string` | Yes |  |
| `sample_rate` | `int` | No |  |
| `source` | `string` | No |  |
| `source_name` | `string` | Yes |  |
| `source_url` | `string` | Yes |  |
| `tag` | `array` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |
| `waveform` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Audio()->create([
  "alt_file" => null, // array
  "attribution" => null, // string
  "audio_set" => null, // mixed
  "detail_url" => null, // string
  "display_name" => null, // string
  "fields_matched" => null, // array
  "identifier" => null, // string
  "indexed_on" => null, // string
  "len" => null, // int
  "license" => null, // string
  "license_url" => null, // string
  "logo_url" => null, // string
  "mature" => null, // bool
  "media_count" => null, // int
  "point" => null, // array
  "reason" => null, // mixed
  "related_url" => null, // string
  "source_name" => null, // string
  "source_url" => null, // string
  "tag" => null, // array
  "thumbnail" => null, // string
  "waveform" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Audio()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Audio()->load(["id" => "audio_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AudioEntity`

Create a new `AudioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ImageEntity

```php
$image = $client->Image();
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
| `fields_matched` | `array` | Yes |  |
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
| `reason` | `mixed` | Yes |  |
| `related_url` | `string` | Yes |  |
| `source` | `string` | No |  |
| `source_name` | `string` | Yes |  |
| `source_url` | `string` | Yes |  |
| `tag` | `array` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | No |  |
| `type` | `mixed` | Yes |  |
| `url` | `string` | No |  |
| `version` | `mixed` | Yes |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Image()->create([
  "attribution" => null, // string
  "author_name" => null, // string
  "author_url" => null, // string
  "detail_url" => null, // string
  "display_name" => null, // string
  "fields_matched" => null, // array
  "identifier" => null, // string
  "indexed_on" => null, // string
  "license" => null, // string
  "license_url" => null, // string
  "logo_url" => null, // string
  "mature" => null, // bool
  "media_count" => null, // int
  "reason" => null, // mixed
  "related_url" => null, // string
  "source_name" => null, // string
  "source_url" => null, // string
  "tag" => null, // array
  "thumbnail" => null, // string
  "type" => null, // mixed
  "version" => null, // mixed
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Image()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Image()->load(["id" => "image_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ImageEntity`

Create a new `ImageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OAuth2ApplicationEntity

```php
$o_auth2_application = $client->OAuth2Application();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->OAuth2Application()->create([
  "description" => null, // string
  "email" => null, // string
  "name" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OAuth2ApplicationEntity`

Create a new `OAuth2ApplicationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OAuth2KeyInfoEntity

```php
$o_auth2_key_info = $client->OAuth2KeyInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate_limit_model` | `string` | Yes |  |
| `requests_this_minute` | `int` | Yes |  |
| `requests_today` | `int` | Yes |  |
| `verified` | `bool` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->OAuth2KeyInfo()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OAuth2KeyInfoEntity`

Create a new `OAuth2KeyInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OAuth2TokenEntity

```php
$o_auth2_token = $client->OAuth2Token();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `expires_in` | `int` | Yes |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->OAuth2Token()->create([
  "access_token" => null, // string
  "expires_in" => null, // int
  "scope" => null, // string
  "token_type" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OAuth2TokenEntity`

Create a new `OAuth2TokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new OpenverseSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

