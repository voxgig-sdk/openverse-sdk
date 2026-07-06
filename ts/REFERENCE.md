# Openverse TypeScript SDK Reference

Complete API reference for the Openverse TypeScript SDK.


## OpenverseSDK

### Constructor

```ts
new OpenverseSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenverseSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpenverseSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpenverseSDK` instance in test mode.


### Instance Methods

#### `Audio(data?: object)`

Create a new `Audio` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AudioEntity` instance.

#### `Image(data?: object)`

Create a new `Image` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImageEntity` instance.

#### `OAuth2Application(data?: object)`

Create a new `OAuth2Application` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OAuth2ApplicationEntity` instance.

#### `OAuth2KeyInfo(data?: object)`

Create a new `OAuth2KeyInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OAuth2KeyInfoEntity` instance.

#### `OAuth2Token(data?: object)`

Create a new `OAuth2Token` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OAuth2TokenEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpenverseSDK.test()`.

**Returns:** `OpenverseSDK` instance in test mode.


---

## AudioEntity

```ts
const audio = client.Audio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt_file` | `any[]` | Yes |  |
| `attribution` | `string` | Yes |  |
| `audio_set` | `any` | Yes |  |
| `bit_rate` | `number` | No |  |
| `category` | `string` | No |  |
| `creator` | `string` | No |  |
| `creator_url` | `string` | No |  |
| `description` | `string` | No |  |
| `detail_url` | `string` | Yes |  |
| `display_name` | `string` | Yes |  |
| `duration` | `number` | No |  |
| `fields_matched` | `any[]` | Yes |  |
| `filesize` | `number` | No |  |
| `filetype` | `string` | No |  |
| `foreign_landing_url` | `string` | No |  |
| `genre` | `any[]` | No |  |
| `id` | `string` | Yes |  |
| `identifier` | `string` | Yes |  |
| `indexed_on` | `string` | Yes |  |
| `len` | `number` | Yes |  |
| `license` | `string` | Yes |  |
| `license_url` | `string` | Yes |  |
| `license_version` | `string` | No |  |
| `logo_url` | `string` | Yes |  |
| `mature` | `boolean` | Yes |  |
| `media_count` | `number` | Yes |  |
| `point` | `any[]` | Yes |  |
| `provider` | `string` | No |  |
| `reason` | `any` | Yes |  |
| `related_url` | `string` | Yes |  |
| `sample_rate` | `number` | No |  |
| `source` | `string` | No |  |
| `source_name` | `string` | Yes |  |
| `source_url` | `string` | Yes |  |
| `tag` | `any[]` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | No |  |
| `url` | `string` | No |  |
| `waveform` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Audio().create({
  alt_file: /* any[] */,
  attribution: /* string */,
  audio_set: /* any */,
  detail_url: /* string */,
  display_name: /* string */,
  fields_matched: /* any[] */,
  identifier: /* string */,
  indexed_on: /* string */,
  len: /* number */,
  license: /* string */,
  license_url: /* string */,
  logo_url: /* string */,
  mature: /* boolean */,
  media_count: /* number */,
  point: /* any[] */,
  reason: /* any */,
  related_url: /* string */,
  source_name: /* string */,
  source_url: /* string */,
  tag: /* any[] */,
  thumbnail: /* string */,
  waveform: /* string */,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Audio().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Audio().load({ id: 'audio_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AudioEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenverseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImageEntity

```ts
const image = client.Image()
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
| `fields_matched` | `any[]` | Yes |  |
| `filesize` | `number` | No |  |
| `filetype` | `string` | No |  |
| `foreign_landing_url` | `string` | No |  |
| `height` | `number` | No |  |
| `id` | `string` | Yes |  |
| `identifier` | `string` | Yes |  |
| `indexed_on` | `string` | Yes |  |
| `license` | `string` | Yes |  |
| `license_url` | `string` | Yes |  |
| `license_version` | `string` | No |  |
| `logo_url` | `string` | Yes |  |
| `mature` | `boolean` | Yes |  |
| `media_count` | `number` | Yes |  |
| `provider` | `string` | No |  |
| `reason` | `any` | Yes |  |
| `related_url` | `string` | Yes |  |
| `source` | `string` | No |  |
| `source_name` | `string` | Yes |  |
| `source_url` | `string` | Yes |  |
| `tag` | `any[]` | Yes |  |
| `thumbnail` | `string` | Yes |  |
| `title` | `string` | No |  |
| `type` | `any` | Yes |  |
| `url` | `string` | No |  |
| `version` | `any` | Yes |  |
| `width` | `number` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Image().create({
  attribution: /* string */,
  author_name: /* string */,
  author_url: /* string */,
  detail_url: /* string */,
  display_name: /* string */,
  fields_matched: /* any[] */,
  identifier: /* string */,
  indexed_on: /* string */,
  license: /* string */,
  license_url: /* string */,
  logo_url: /* string */,
  mature: /* boolean */,
  media_count: /* number */,
  reason: /* any */,
  related_url: /* string */,
  source_name: /* string */,
  source_url: /* string */,
  tag: /* any[] */,
  thumbnail: /* string */,
  type: /* any */,
  version: /* any */,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Image().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Image().load({ id: 'image_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImageEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenverseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OAuth2ApplicationEntity

```ts
const o_auth2_application = client.OAuth2Application()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OAuth2Application().create({
  description: /* string */,
  email: /* string */,
  name: /* string */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OAuth2ApplicationEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenverseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OAuth2KeyInfoEntity

```ts
const o_auth2_key_info = client.OAuth2KeyInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `rate_limit_model` | `string` | Yes |  |
| `requests_this_minute` | `number` | Yes |  |
| `requests_today` | `number` | Yes |  |
| `verified` | `boolean` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.OAuth2KeyInfo().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OAuth2KeyInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenverseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OAuth2TokenEntity

```ts
const o_auth2_token = client.OAuth2Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `expires_in` | `number` | Yes |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OAuth2Token().create({
  access_token: /* string */,
  expires_in: /* number */,
  scope: /* string */,
  token_type: /* string */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OAuth2TokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenverseSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OpenverseSDK({
  feature: {
    test: { active: true },
  }
})
```

