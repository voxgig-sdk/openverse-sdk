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
| `alt_files` | `any[]` | Yes | JSON describing alternative files for this audio. |
| `attribution` | `string` | Yes | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `any` | Yes | Reference to set of which this track is a part. |
| `bit_rate` | `number` | No | Number in bits per second, eg. |
| `category` | `string` | No | The top-level classification of this media file. |
| `creator` | `string` | No | The name of the media creator. |
| `creator_url` | `string` | No | A direct link to the media creator. |
| `description` | `string` | No | The explanation on why media is being reported. |
| `detail_url` | `string` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `string` | Yes | The name of content source, e.g. |
| `duration` | `number` | No | The time length of the audio file in milliseconds. |
| `fields_matched` | `any[]` | Yes | List the fields that matched the query for this result. |
| `filesize` | `number` | No | Number in bytes, e.g. |
| `filetype` | `string` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | No | The landing page of the work. |
| `genres` | `any[]` | No | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | Yes | The timestamp of when the media was indexed by Openverse. |
| `len` | `number` | Yes |  |
| `license` | `string` | Yes | The name of license for the media. |
| `license_url` | `string` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `string` | No | The version of the media license. |
| `logo_url` | `string` | Yes | The URL to a logo for the source. |
| `mature` | `boolean` | Yes | Whether the media item is marked as mature |
| `media_count` | `number` | Yes | The number of media items indexed from the source. |
| `points` | `any[]` | Yes |  |
| `provider` | `string` | No | The content provider, e.g. |
| `reason` | `any` | Yes | The reason to report media to Openverse. |
| `related_url` | `string` | Yes | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `number` | No | Number in hertz, eg. |
| `source` | `string` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | Yes | The source of the media, e.g. |
| `source_url` | `string` | Yes | The URL of the source, e.g. |
| `tags` | `any[]` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | Yes | A direct link to the miniature artwork. |
| `title` | `string` | No | The name of the media. |
| `url` | `string` | No | The actual URL to the media file. |
| `waveform` | `string` | Yes | A direct link to the waveform peaks. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `report` | `/v1/audio/{identifier}/report/` | `client.Audio().create({ $action: 'report', ... })` |
| `related` | `/v1/audio/{identifier}/related/` | `client.Audio().list({ $action: 'related', ... })` |
| `stat` | `/v1/audio/stats/` | `client.Audio().list({ $action: 'stat', ... })` |
| `waveform` | `/v1/audio/{identifier}/waveform/` | `client.Audio().list({ $action: 'waveform', ... })` |
| `thumb` | `/v1/audio/{identifier}/thumb/` | `client.Audio().load({ $action: 'thumb', ... })` |

An action returns that action's OWN response, which is not necessarily a
Audio record — check the API definition for its shape.

```ts
const result = await client.Audio().create({
  $action: 'report',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Audio().create({
  identifier: 'example_identifier',
  alt_files: [],
  attribution: 'example_attribution',
  audio_set: 'example_audio_set',
  detail_url: 'example_detail_url',
  display_name: 'example_display_name',
  fields_matched: [],
  id: 'example_id',
  indexed_on: 'example_indexed_on',
  len: 1,
  license: 'example_license',
  license_url: 'example_license_url',
  logo_url: 'example_logo_url',
  mature: true,
  media_count: 1,
  points: [],
  reason: 'example_reason',
  related_url: 'example_related_url',
  source_name: 'example_source_name',
  source_url: 'example_source_url',
  tags: [],
  thumbnail: 'example_thumbnail',
  waveform: 'example_waveform',
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
| `attribution` | `string` | Yes | Legally valid attribution for the media item in plain-text English. |
| `author_name` | `string` | Yes | The name of the media creator. |
| `author_url` | `string` | Yes | A direct link to the media creator. |
| `category` | `string` | No | The top-level classification of this media file. |
| `creator` | `string` | No | The name of the media creator. |
| `creator_url` | `string` | No | A direct link to the media creator. |
| `description` | `string` | No | The explanation on why media is being reported. |
| `detail_url` | `string` | Yes | A direct link to the detail view of this audio file. |
| `display_name` | `string` | Yes | The name of content source, e.g. |
| `fields_matched` | `any[]` | Yes | List the fields that matched the query for this result. |
| `filesize` | `number` | No | Number in bytes, e.g. |
| `filetype` | `string` | No | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | No | The landing page of the work. |
| `height` | `number` | No | The height of the image in pixels. |
| `id` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Yes | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | Yes | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | Yes | The name of license for the media. |
| `license_url` | `string` | Yes | A direct link to the license deed or legal terms. |
| `license_version` | `string` | No | The version of the media license. |
| `logo_url` | `string` | Yes | The URL to a logo for the source. |
| `mature` | `boolean` | Yes | Whether the media item is marked as mature |
| `media_count` | `number` | Yes | The number of media items indexed from the source. |
| `provider` | `string` | No | The content provider, e.g. |
| `reason` | `any` | Yes | The reason to report media to Openverse. |
| `related_url` | `string` | Yes | A link to an endpoint that provides similar audio files. |
| `source` | `string` | No | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | Yes | The source of the media, e.g. |
| `source_url` | `string` | Yes | The URL of the source, e.g. |
| `tags` | `any[]` | Yes | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | Yes | A direct link to the miniature artwork. |
| `title` | `string` | No | The name of the media. |
| `type` | `any` | Yes | The resource type, always set to 'photo' for images. |
| `url` | `string` | No | The actual URL to the media file. |
| `version` | `any` | Yes | The oEmbed version number, always set to 1.0. |
| `width` | `number` | No | The width of the image in pixels. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `report` | `/v1/images/{identifier}/report/` | `client.Image().create({ $action: 'report', ... })` |
| `related` | `/v1/images/{identifier}/related/` | `client.Image().list({ $action: 'related', ... })` |
| `stat` | `/v1/images/stats/` | `client.Image().list({ $action: 'stat', ... })` |
| `oembed` | `/v1/images/oembed/` | `client.Image().load({ $action: 'oembed', ... })` |

An action returns that action's OWN response, which is not necessarily a
Image record — check the API definition for its shape.

```ts
const result = await client.Image().create({
  $action: 'report',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Image().create({
  identifier: 'example_identifier',
  attribution: 'example_attribution',
  author_name: 'example_author_name',
  author_url: 'example_author_url',
  detail_url: 'example_detail_url',
  display_name: 'example_display_name',
  fields_matched: [],
  id: 'example_id',
  indexed_on: 'example_indexed_on',
  license: 'example_license',
  license_url: 'example_license_url',
  logo_url: 'example_logo_url',
  mature: true,
  media_count: 1,
  reason: 'example_reason',
  related_url: 'example_related_url',
  source_name: 'example_source_name',
  source_url: 'example_source_url',
  tags: [],
  thumbnail: 'example_thumbnail',
  type: 'example_type',
  version: 'example_version',
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
| `description` | `string` | Yes | A description of what you are trying to achieve with your project using the API. |
| `email` | `string` | Yes | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | `string` | Yes | A unique human-readable name for your application or project requiring access to the Openverse API. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OAuth2Application().create({
  description: 'example_description',
  email: 'example_email',
  name: 'example_name',
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
| `rate_limit_model` | `string` | Yes | The type of rate limit applied to your key. |
| `requests_this_minute` | `number` | Yes | The number of requests your key has performed in the last minute. |
| `requests_today` | `number` | Yes | The number of requests your key has performed in the last day. |
| `verified` | `boolean` | Yes | Whether the application has verified the submitted email address. |

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
| `access_token` | `string` | Yes | The access token that can be used to authenticate requests. |
| `expires_in` | `number` | Yes | The number of seconds until the token expires. |
| `scope` | `string` | Yes | The scope of the token. |
| `token_type` | `string` | Yes | The type of token. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OAuth2Token().create({
  access_token: 'example_access_token',
  expires_in: 1,
  scope: 'example_scope',
  token_type: 'example_token_type',
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

