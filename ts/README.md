# Openverse TypeScript SDK



The TypeScript SDK for the Openverse API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Audio()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openverse-sdk/releases](https://github.com/voxgig-sdk/openverse-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpenverseSDK } from '@voxgig-sdk/openverse'

const client = new OpenverseSDK({
  apikey: process.env.OPENVERSE_APIKEY,
})
```

### 2. List audio records

`list()` resolves to an array of Audio ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const audios = await client.Audio().list()

for (const audio of audios) {
  console.log(audio)
}
```

### 3. Load an audio

`load()` returns the entity directly and throws on failure:

```ts
try {
  const audio = await client.Audio().load({ id: 'example_id' })
  console.log(audio)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Audio ENTITY (.data() for the record)
const created = await client.Audio().create({
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


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const images = await client.Image().list()
  console.log(images)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OpenverseSDK.test()

const image = await client.Image().list()
// image is the entity, populated with mock response data
// — call image.data() for the record itself
console.log(image)
```

You can also use the instance method:

```ts
const client = new OpenverseSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Image()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OpenverseSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### OpenverseSDK

#### Constructor

```ts
new OpenverseSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Audio(data?)` | `AudioEntity` | Create an Audio entity instance. |
| `Image(data?)` | `ImageEntity` | Create an Image entity instance. |
| `OAuth2Application(data?)` | `OAuth2ApplicationEntity` | Create an OAuth2Application entity instance. |
| `OAuth2KeyInfo(data?)` | `OAuth2KeyInfoEntity` | Create an OAuth2KeyInfo entity instance. |
| `OAuth2Token(data?)` | `OAuth2TokenEntity` | Create an OAuth2Token entity instance. |
| `tester(testopts?, sdkopts?)` | `OpenverseSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpenverseSDK.test(testopts?, sdkopts?)` | `OpenverseSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenverseSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: create, list, load.

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

Operations: create, list, load.

API path: `/v1/images/{identifier}/report/`

#### OAuth2Application

| Field | Description |
| --- | --- |
| `description` | A description of what you are trying to achieve with your project using the API. |
| `email` | A valid email that we can reach you at if we have any questions about your use case or data consumption. |
| `name` | A unique human-readable name for your application or project requiring access to the Openverse API. |

Operations: create.

API path: `/v1/auth_tokens/register/`

#### OAuth2KeyInfo

| Field | Description |
| --- | --- |
| `rate_limit_model` | The type of rate limit applied to your key. |
| `requests_this_minute` | The number of requests your key has performed in the last minute. |
| `requests_today` | The number of requests your key has performed in the last day. |
| `verified` | Whether the application has verified the submitted email address. |

Operations: load.

API path: `/v1/rate_limit/`

#### OAuth2Token

| Field | Description |
| --- | --- |
| `access_token` | The access token that can be used to authenticate requests. |
| `expires_in` | The number of seconds until the token expires. |
| `scope` | The scope of the token. |
| `token_type` | The type of token. |

Operations: create.

API path: `/v1/auth_tokens/token/`



## Entities


### Audio

Create an instance: `const audio = client.Audio()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt_files` | `any[]` | JSON describing alternative files for this audio. |
| `attribution` | `string` | Legally valid attribution for the media item in plain-text English. |
| `audio_set` | `any` | Reference to set of which this track is a part. |
| `bit_rate` | `number` | Number in bits per second, eg. |
| `category` | `string` | The top-level classification of this media file. |
| `creator` | `string` | The name of the media creator. |
| `creator_url` | `string` | A direct link to the media creator. |
| `description` | `string` | The explanation on why media is being reported. |
| `detail_url` | `string` | A direct link to the detail view of this audio file. |
| `display_name` | `string` | The name of content source, e.g. |
| `duration` | `number` | The time length of the audio file in milliseconds. |
| `fields_matched` | `any[]` | List the fields that matched the query for this result. |
| `filesize` | `number` | Number in bytes, e.g. |
| `filetype` | `string` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | The landing page of the work. |
| `genres` | `any[]` | An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category |
| `id` | `string` | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | The timestamp of when the media was indexed by Openverse. |
| `len` | `number` |  |
| `license` | `string` | The name of license for the media. |
| `license_url` | `string` | A direct link to the license deed or legal terms. |
| `license_version` | `string` | The version of the media license. |
| `logo_url` | `string` | The URL to a logo for the source. |
| `mature` | `boolean` | Whether the media item is marked as mature |
| `media_count` | `number` | The number of media items indexed from the source. |
| `points` | `any[]` |  |
| `provider` | `string` | The content provider, e.g. |
| `reason` | `any` | The reason to report media to Openverse. |
| `related_url` | `string` | A link to an endpoint that provides similar audio files. |
| `sample_rate` | `number` | Number in hertz, eg. |
| `source` | `string` | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | The source of the media, e.g. |
| `source_url` | `string` | The URL of the source, e.g. |
| `tags` | `any[]` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | A direct link to the miniature artwork. |
| `title` | `string` | The name of the media. |
| `url` | `string` | The actual URL to the media file. |
| `waveform` | `string` | A direct link to the waveform peaks. |

#### Example: Load

```ts
const audio = await client.Audio().load({ id: 'audio_id' })
```

#### Example: List

```ts
const audios = await client.Audio().list()
```

#### Example: Create

```ts
const audio = await client.Audio().create({
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


### Image

Create an instance: `const image = client.Image()`

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
| `fields_matched` | `any[]` | List the fields that matched the query for this result. |
| `filesize` | `number` | Number in bytes, e.g. |
| `filetype` | `string` | The type of the file, related to the file extension. |
| `foreign_landing_url` | `string` | The landing page of the work. |
| `height` | `number` | The height of the image in pixels. |
| `id` | `string` | Our unique identifier for an open-licensed work. |
| `identifier` | `string` | Our unique identifier for an open-licensed work. |
| `indexed_on` | `string` | The timestamp of when the media was indexed by Openverse. |
| `license` | `string` | The name of license for the media. |
| `license_url` | `string` | A direct link to the license deed or legal terms. |
| `license_version` | `string` | The version of the media license. |
| `logo_url` | `string` | The URL to a logo for the source. |
| `mature` | `boolean` | Whether the media item is marked as mature |
| `media_count` | `number` | The number of media items indexed from the source. |
| `provider` | `string` | The content provider, e.g. |
| `reason` | `any` | The reason to report media to Openverse. |
| `related_url` | `string` | A link to an endpoint that provides similar audio files. |
| `source` | `string` | The source of the data, meaning a particular dataset. |
| `source_name` | `string` | The source of the media, e.g. |
| `source_url` | `string` | The URL of the source, e.g. |
| `tags` | `any[]` | Tags with detailed metadata, such as accuracy. |
| `thumbnail` | `string` | A direct link to the miniature artwork. |
| `title` | `string` | The name of the media. |
| `type` | `any` | The resource type, always set to 'photo' for images. |
| `url` | `string` | The actual URL to the media file. |
| `version` | `any` | The oEmbed version number, always set to 1.0. |
| `width` | `number` | The width of the image in pixels. |

#### Example: Load

```ts
const image = await client.Image().load({ id: 'image_id' })
```

#### Example: List

```ts
const images = await client.Image().list()
```

#### Example: Create

```ts
const image = await client.Image().create({
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


### OAuth2Application

Create an instance: `const o_auth2_application = client.OAuth2Application()`

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

```ts
const o_auth2_application = await client.OAuth2Application().create({
  description: 'example_description',
  email: 'example_email',
  name: 'example_name',
})
```


### OAuth2KeyInfo

Create an instance: `const o_auth2_key_info = client.OAuth2KeyInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `rate_limit_model` | `string` | The type of rate limit applied to your key. |
| `requests_this_minute` | `number` | The number of requests your key has performed in the last minute. |
| `requests_today` | `number` | The number of requests your key has performed in the last day. |
| `verified` | `boolean` | Whether the application has verified the submitted email address. |

#### Example: Load

```ts
const o_auth2_key_info = await client.OAuth2KeyInfo().load()
```


### OAuth2Token

Create an instance: `const o_auth2_token = client.OAuth2Token()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | The access token that can be used to authenticate requests. |
| `expires_in` | `number` | The number of seconds until the token expires. |
| `scope` | `string` | The scope of the token. |
| `token_type` | `string` | The type of token. |

#### Example: Create

```ts
const o_auth2_token = await client.OAuth2Token().create({
  access_token: 'example_access_token',
  expires_in: 1,
  scope: 'example_scope',
  token_type: 'example_token_type',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
openverse/
├── src/
│   ├── OpenverseSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpenverseSDK } from '@voxgig-sdk/openverse'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const image = client.Image()
await image.list()

// image.data() now returns the image data from the last `list`
// image.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
