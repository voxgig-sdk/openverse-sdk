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
| `alt_files` | `array` | Yes | JSON describing alternative files for this audio. |
| `attribution` | `string` | Yes | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `mixed` | Yes | Reference to set of which this track is a part. |
| `bit_rate` | `int` | No | Number in bits per second, eg. |
| `category` | `string` | No | The top-level classification of this media file. |
| `creator` | `string` | No | The name of the media creator. |
| `creator_url` | `string` | No | A direct link to the media creator. |
| `description` | `string` | No | The explanation on why media is being reported. |
| `detail_url` | `string` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `string` | Yes | The name of content source, e.g. |
| `duration` | `int` | No | The time length of the audio file in milliseconds. |
| `fields_matched` | `array` | Yes | List the fields that matched the query for this result. |
| `filesize` | `int` | No | Number in bytes, e.g. |
| `filetype` | `string` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | No | The landing page of the work. |
| `genres` | `array` | No | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | Yes | The timestamp of when the media was indexed by Openverse. |
| `len` | `int` | Yes |  |
| `license` | `string` | Yes | The name of license for the media. |
| `license_url` | `string` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `string` | No | The version of the media license. |
| `logo_url` | `string` | Yes | The URL to a logo for the source. |
| `mature` | `bool` | Yes | Whether the media item is marked as mature |
| `media_count` | `int` | Yes | The number of media items indexed from the source. |
| `points` | `array` | Yes |  |
| `provider` | `string` | No | The content provider, e.g. |
| `reason` | `mixed` | Yes | The reason to report media to Openverse. |
| `related_url` | `string` | Yes | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `int` | No | Number in hertz, eg. |
| `source` | `string` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | Yes | The source of the media, e.g. |
| `source_url` | `string` | Yes | The URL of the source, e.g. |
| `tags` | `array` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | Yes | A direct link to the miniature artwork. |
| `title` | `string` | No | The name of the media. |
| `url` | `string` | No | The actual URL to the media file. |
| `waveform` | `string` | Yes | A direct link to the waveform peaks. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Audio()->create([
  "identifier" => null, // string
  "alt_files" => null, // array
  "attribution" => null, // string
  "audio_set" => null, // mixed
  "detail_url" => null, // string
  "display_name" => null, // string
  "fields_matched" => null, // array
  "id" => null, // string
  "indexed_on" => null, // string
  "len" => null, // int
  "license" => null, // string
  "license_url" => null, // string
  "logo_url" => null, // string
  "mature" => null, // bool
  "media_count" => null, // int
  "points" => null, // array
  "reason" => null, // mixed
  "related_url" => null, // string
  "source_name" => null, // string
  "source_url" => null, // string
  "tags" => null, // array
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
| `attribution` | `string` | Yes | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `string` | Yes | The name of the media creator. |
| `author_url` | `string` | Yes | A direct link to the media creator. |
| `category` | `string` | No | The top-level classification of this media file. |
| `creator` | `string` | No | The name of the media creator. |
| `creator_url` | `string` | No | A direct link to the media creator. |
| `description` | `string` | No | The explanation on why media is being reported. |
| `detail_url` | `string` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `string` | Yes | The name of content source, e.g. |
| `fields_matched` | `array` | Yes | List the fields that matched the query for this result. |
| `filesize` | `int` | No | Number in bytes, e.g. |
| `filetype` | `string` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | No | The landing page of the work. |
| `height` | `int` | No | The height of the image in pixels. |
| `id` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | Yes | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | Yes | The name of license for the media. |
| `license_url` | `string` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `string` | No | The version of the media license. |
| `logo_url` | `string` | Yes | The URL to a logo for the source. |
| `mature` | `bool` | Yes | Whether the media item is marked as mature |
| `media_count` | `int` | Yes | The number of media items indexed from the source. |
| `provider` | `string` | No | The content provider, e.g. |
| `reason` | `mixed` | Yes | The reason to report media to Openverse. |
| `related_url` | `string` | Yes | A link to an endpoint that provides similar audio files. |
| `source` | `string` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | Yes | The source of the media, e.g. |
| `source_url` | `string` | Yes | The URL of the source, e.g. |
| `tags` | `array` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | Yes | A direct link to the miniature artwork. |
| `title` | `string` | No | The name of the media. |
| `type` | `mixed` | Yes | The resource type, always set to 'photo' for images. |
| `url` | `string` | No | The actual URL to the media file. |
| `version` | `mixed` | Yes | The oEmbed version number, always set to 1.0. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Image()->create([
  "identifier" => null, // string
  "attribution" => null, // string
  "author_name" => null, // string
  "author_url" => null, // string
  "detail_url" => null, // string
  "display_name" => null, // string
  "fields_matched" => null, // array
  "id" => null, // string
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
  "tags" => null, // array
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
| `description` | `string` | Yes | A description of what you are trying to achieve with your project using the API. |
| `email` | `string` | Yes | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `string` | Yes | A unique human-readable name for your application or project requiring access to the Openverse API. |

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
| `rate_limit_model` | `string` | Yes | The type of rate limit applied to your key. |
| `requests_this_minute` | `int` | Yes | The number of requests your key has performed in the last minute. |
| `requests_today` | `int` | Yes | The number of requests your key has performed in the last day. |
| `verified` | `bool` | Yes | Whether the application has verified the submitted email address. |

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
| `access_token` | `string` | Yes | The access token that can be used to authenticate requests. |
| `expires_in` | `int` | Yes | The number of seconds until the token expires. |
| `scope` | `string` | Yes | The scope of the token. |
| `token_type` | `string` | Yes | The type of token. |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

