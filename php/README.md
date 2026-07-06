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
    // list() returns an array of Audio records — iterate directly.
    $audios = $client->Audio()->list();
    foreach ($audios as $item) {
        echo $item["id"] . " " . $item["alt_file"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an audio

```php
try {
    // load() returns the bare Audio record (throws on error).
    $audio = $client->Audio()->load(["id" => "example_id"]);
    print_r($audio);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the bare created Audio record.
$created = $client->Audio()->create(["identifier" => "example"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $audios = $client->Audio()->list();
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

// Entity ops return the bare mock record (throws on error).
$audio = $client->Audio()->list();
print_r($audio);
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

Entity operations return the bare result data (an `array` for single-entity
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
| `alt_file` | `array` |  |
| `attribution` | `string` |  |
| `audio_set` | `mixed` |  |
| `bit_rate` | `int` |  |
| `category` | `string` |  |
| `creator` | `string` |  |
| `creator_url` | `string` |  |
| `description` | `string` |  |
| `detail_url` | `string` |  |
| `display_name` | `string` |  |
| `duration` | `int` |  |
| `fields_matched` | `array` |  |
| `filesize` | `int` |  |
| `filetype` | `string` |  |
| `foreign_landing_url` | `string` |  |
| `genre` | `array` |  |
| `id` | `string` |  |
| `identifier` | `string` |  |
| `indexed_on` | `string` |  |
| `len` | `int` |  |
| `license` | `string` |  |
| `license_url` | `string` |  |
| `license_version` | `string` |  |
| `logo_url` | `string` |  |
| `mature` | `bool` |  |
| `media_count` | `int` |  |
| `point` | `array` |  |
| `provider` | `string` |  |
| `reason` | `mixed` |  |
| `related_url` | `string` |  |
| `sample_rate` | `int` |  |
| `source` | `string` |  |
| `source_name` | `string` |  |
| `source_url` | `string` |  |
| `tag` | `array` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |
| `waveform` | `string` |  |

#### Example: Load

```php
// load() returns the bare Audio record (throws on error).
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
| `attribution` | `string` |  |
| `author_name` | `string` |  |
| `author_url` | `string` |  |
| `category` | `string` |  |
| `creator` | `string` |  |
| `creator_url` | `string` |  |
| `description` | `string` |  |
| `detail_url` | `string` |  |
| `display_name` | `string` |  |
| `fields_matched` | `array` |  |
| `filesize` | `int` |  |
| `filetype` | `string` |  |
| `foreign_landing_url` | `string` |  |
| `height` | `int` |  |
| `id` | `string` |  |
| `identifier` | `string` |  |
| `indexed_on` | `string` |  |
| `license` | `string` |  |
| `license_url` | `string` |  |
| `license_version` | `string` |  |
| `logo_url` | `string` |  |
| `mature` | `bool` |  |
| `media_count` | `int` |  |
| `provider` | `string` |  |
| `reason` | `mixed` |  |
| `related_url` | `string` |  |
| `source` | `string` |  |
| `source_name` | `string` |  |
| `source_url` | `string` |  |
| `tag` | `array` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |
| `type` | `mixed` |  |
| `url` | `string` |  |
| `version` | `mixed` |  |
| `width` | `int` |  |

#### Example: Load

```php
// load() returns the bare Image record (throws on error).
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


### OAuth2Application

Create an instance: `$o_auth2_application = $client->OAuth2Application();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `email` | `string` |  |
| `name` | `string` |  |

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
| `rate_limit_model` | `string` |  |
| `requests_this_minute` | `int` |  |
| `requests_today` | `int` |  |
| `verified` | `bool` |  |

#### Example: Load

```php
// load() returns the bare OAuth2KeyInfo record (throws on error).
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
| `access_token` | `string` |  |
| `expires_in` | `int` |  |
| `scope` | `string` |  |
| `token_type` | `string` |  |

#### Example: Create

```php
$o_auth2_token = $client->OAuth2Token()->create([
    "access_token" => null, // string
    "expires_in" => null, // int
    "scope" => null, // string
    "token_type" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
$audio = $client->Audio();
$audio->list();

// $audio->data_get() now returns the audio data from the last list
// $audio->match_get() returns the last match criteria
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
