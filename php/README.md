# Openverse PHP SDK



The PHP SDK for the Openverse API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Audio()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openverse-sdk/releases](https://github.com/voxgig-sdk/openverse-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'openverse_sdk.php';

$client = new OpenverseSDK([
    "apikey" => getenv("OPENVERSE_APIKEY"),
]);
```

### 2. List audio records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $audios = $client->Audio()->list();
    foreach ($audios as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["alt_files"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an audio

```php
try {
    // load() returns the ENTITY — call data_get() for the Audio record (throws on error).
    $audio = $client->Audio()->load(["id" => "example_id"]);
    print_r($audio->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Audio record.
$created = $client->Audio()->create(["identifier" => "example_identifier", "alt_files" => [], "attribution" => "example_attribution", "audio_set" => "example_audio_set", "detail_url" => "example_detail_url", "display_name" => "example_display_name", "fields_matched" => [], "id" => "example_id", "indexed_on" => "example_indexed_on", "len" => 1, "license" => "example_license", "license_url" => "example_license_url", "logo_url" => "example_logo_url", "mature" => true, "media_count" => 1, "points" => [], "reason" => "example_reason", "related_url" => "example_related_url", "source_name" => "example_source_name", "source_url" => "example_source_url", "tags" => [], "thumbnail" => "example_thumbnail", "waveform" => "example_waveform"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $images = $client->Image()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = OpenverseSDK::test([
    "entity" => ["audio" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$audio = $client->Audio()->list();
print_r(array_map(fn($item) => $item->data_get(), $audio));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OpenverseSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENVERSE_TEST_LIVE=TRUE
OPENVERSE_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OpenverseSDK

```php
require_once 'openverse_sdk.php';
$client = new OpenverseSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OpenverseSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OpenverseSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Audio` | `($data): AudioEntity` | Create an Audio entity instance. |
| `Image` | `($data): ImageEntity` | Create an Image entity instance. |
| `OAuth2Application` | `($data): OAuth2ApplicationEntity` | Create an OAuth2Application entity instance. |
| `OAuth2KeyInfo` | `($data): OAuth2KeyInfoEntity` | Create an OAuth2KeyInfo entity instance. |
| `OAuth2Token` | `($data): OAuth2TokenEntity` | Create an OAuth2Token entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$audio = $client->Audio();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt_files` | `array` | JSON describing alternative files for this audio. |
| `attribution` | `string` | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `mixed` | Reference to set of which this track is a part. |
| `bit_rate` | `int` | Number in bits per second, eg. |
| `category` | `string` | The top-level classification of this media file. |
| `creator` | `string` | The name of the media creator. |
| `creator_url` | `string` | A direct link to the media creator. |
| `description` | `string` | The explanation on why media is being reported. |
| `detail_url` | `string` | A direct link to the detail view of this audio file. |
| `display_name` | `string` | The name of content source, e.g. |
| `duration` | `int` | The time length of the audio file in milliseconds. |
| `fields_matched` | `array` | List the fields that matched the query for this result. |
| `filesize` | `int` | Number in bytes, e.g. |
| `filetype` | `string` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | The landing page of the work. |
| `genres` | `array` | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `string` | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | The timestamp of when the media was indexed by Openverse. |
| `len` | `int` |  |
| `license` | `string` | The name of license for the media. |
| `license_url` | `string` | A direct link to the license deed or legal terms. |
| `license_version` | `string` | The version of the media license. |
| `logo_url` | `string` | The URL to a logo for the source. |
| `mature` | `bool` | Whether the media item is marked as mature |
| `media_count` | `int` | The number of media items indexed from the source. |
| `points` | `array` |  |
| `provider` | `string` | The content provider, e.g. |
| `reason` | `mixed` | The reason to report media to Openverse. |
| `related_url` | `string` | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `int` | Number in hertz, eg. |
| `source` | `string` | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | The source of the media, e.g. |
| `source_url` | `string` | The URL of the source, e.g. |
| `tags` | `array` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | A direct link to the miniature artwork. |
| `title` | `string` | The name of the media. |
| `url` | `string` | The actual URL to the media file. |
| `waveform` | `string` | A direct link to the waveform peaks. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Audio record (throws on error).
$audio = $client->Audio()->load(["id" => "audio_id"]);
```

#### Example: List

```php
// list() returns an array of Audio records (throws on error).
$audios = $client->Audio()->list();
```

#### Example: Create

```php
$audio = $client->Audio()->create([
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


### Image

Create an instance: `$image = $client->Image();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `string` | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `string` | The name of the media creator. |
| `author_url` | `string` | A direct link to the media creator. |
| `category` | `string` | The top-level classification of this media file. |
| `creator` | `string` | The name of the media creator. |
| `creator_url` | `string` | A direct link to the media creator. |
| `description` | `string` | The explanation on why media is being reported. |
| `detail_url` | `string` | A direct link to the detail view of this audio file. |
| `display_name` | `string` | The name of content source, e.g. |
| `fields_matched` | `array` | List the fields that matched the query for this result. |
| `filesize` | `int` | Number in bytes, e.g. |
| `filetype` | `string` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | The landing page of the work. |
| `height` | `int` | The height of the image in pixels. |
| `id` | `string` | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | The name of license for the media. |
| `license_url` | `string` | A direct link to the license deed or legal terms. |
| `license_version` | `string` | The version of the media license. |
| `logo_url` | `string` | The URL to a logo for the source. |
| `mature` | `bool` | Whether the media item is marked as mature |
| `media_count` | `int` | The number of media items indexed from the source. |
| `provider` | `string` | The content provider, e.g. |
| `reason` | `mixed` | The reason to report media to Openverse. |
| `related_url` | `string` | A link to an endpoint that provides similar audio files. |
| `source` | `string` | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | The source of the media, e.g. |
| `source_url` | `string` | The URL of the source, e.g. |
| `tags` | `array` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | A direct link to the miniature artwork. |
| `title` | `string` | The name of the media. |
| `type` | `mixed` | The resource type, always set to 'photo' for images. |
| `url` | `string` | The actual URL to the media file. |
| `version` | `mixed` | The oEmbed version number, always set to 1.0. |
| `width` | `int` | The width of the image in pixels. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Image record (throws on error).
$image = $client->Image()->load(["id" => "image_id"]);
```

#### Example: List

```php
// list() returns an array of Image records (throws on error).
$images = $client->Image()->list();
```

#### Example: Create

```php
$image = $client->Image()->create([
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


### OAuth2Application

Create an instance: `$o_auth2_application = $client->OAuth2Application();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A description of what you are trying to achieve with your project using the API. |
| `email` | `string` | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `string` | A unique human-readable name for your application or project requiring access to the Openverse API. |

#### Example: Create

```php
$o_auth2_application = $client->OAuth2Application()->create([
    "description" => null, // string
    "email" => null, // string
    "name" => null, // string
]);
```


### OAuth2KeyInfo

Create an instance: `$o_auth2_key_info = $client->OAuth2KeyInfo();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate_limit_model` | `string` | The type of rate limit applied to your key. |
| `requests_this_minute` | `int` | The number of requests your key has performed in the last minute. |
| `requests_today` | `int` | The number of requests your key has performed in the last day. |
| `verified` | `bool` | Whether the application has verified the submitted email address. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the OAuth2KeyInfo record (throws on error).
$o_auth2_key_info = $client->OAuth2KeyInfo()->load();
```


### OAuth2Token

Create an instance: `$o_auth2_token = $client->OAuth2Token();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | The access token that can be used to authenticate requests. |
| `expires_in` | `int` | The number of seconds until the token expires. |
| `scope` | `string` | The scope of the token. |
| `token_type` | `string` | The type of token. |

#### Example: Create

```php
$o_auth2_token = $client->OAuth2Token()->create([
    "access_token" => null, // string
    "expires_in" => null, // int
    "scope" => null, // string
    "token_type" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── openverse_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`openverse_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$image = $client->Image();
$image->list();

// $image->data_get() now returns the image data from the last list
// $image->match_get() returns the last match criteria
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
