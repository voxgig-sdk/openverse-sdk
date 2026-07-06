# Openverse TypeScript SDK



The TypeScript SDK for the Openverse API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Audio()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
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

`list()` resolves to an array of Audio objects — iterate it directly:

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
// Create — returns the created Audio
const created = await client.Audio().create({
  identifier: 'example_identifier',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const audios = await client.Audio().list()
  console.log(audios)
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

const audio = await client.Audio().list()
// audio is a bare entity populated with mock response data
console.log(audio)
```

You can also use the instance method:

```ts
const client = new OpenverseSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Audio()

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

Operations: create, list, load.

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

Operations: create, list, load.

API path: `/v1/images/{identifier}/report/`

#### OAuth2Application

| Field | Description |
| --- | --- |
| `description` |  |
| `email` |  |
| `name` |  |

Operations: create.

API path: `/v1/auth_tokens/register/`

#### OAuth2KeyInfo

| Field | Description |
| --- | --- |
| `rate_limit_model` |  |
| `requests_this_minute` |  |
| `requests_today` |  |
| `verified` |  |

Operations: load.

API path: `/v1/rate_limit/`

#### OAuth2Token

| Field | Description |
| --- | --- |
| `access_token` |  |
| `expires_in` |  |
| `scope` |  |
| `token_type` |  |

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
| `alt_file` | `any[]` |  |
| `attribution` | `string` |  |
| `audio_set` | `any` |  |
| `bit_rate` | `number` |  |
| `category` | `string` |  |
| `creator` | `string` |  |
| `creator_url` | `string` |  |
| `description` | `string` |  |
| `detail_url` | `string` |  |
| `display_name` | `string` |  |
| `duration` | `number` |  |
| `fields_matched` | `any[]` |  |
| `filesize` | `number` |  |
| `filetype` | `string` |  |
| `foreign_landing_url` | `string` |  |
| `genre` | `any[]` |  |
| `id` | `string` |  |
| `identifier` | `string` |  |
| `indexed_on` | `string` |  |
| `len` | `number` |  |
| `license` | `string` |  |
| `license_url` | `string` |  |
| `license_version` | `string` |  |
| `logo_url` | `string` |  |
| `mature` | `boolean` |  |
| `media_count` | `number` |  |
| `point` | `any[]` |  |
| `provider` | `string` |  |
| `reason` | `any` |  |
| `related_url` | `string` |  |
| `sample_rate` | `number` |  |
| `source` | `string` |  |
| `source_name` | `string` |  |
| `source_url` | `string` |  |
| `tag` | `any[]` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |
| `url` | `string` |  |
| `waveform` | `string` |  |

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
| `attribution` | `string` |  |
| `author_name` | `string` |  |
| `author_url` | `string` |  |
| `category` | `string` |  |
| `creator` | `string` |  |
| `creator_url` | `string` |  |
| `description` | `string` |  |
| `detail_url` | `string` |  |
| `display_name` | `string` |  |
| `fields_matched` | `any[]` |  |
| `filesize` | `number` |  |
| `filetype` | `string` |  |
| `foreign_landing_url` | `string` |  |
| `height` | `number` |  |
| `id` | `string` |  |
| `identifier` | `string` |  |
| `indexed_on` | `string` |  |
| `license` | `string` |  |
| `license_url` | `string` |  |
| `license_version` | `string` |  |
| `logo_url` | `string` |  |
| `mature` | `boolean` |  |
| `media_count` | `number` |  |
| `provider` | `string` |  |
| `reason` | `any` |  |
| `related_url` | `string` |  |
| `source` | `string` |  |
| `source_name` | `string` |  |
| `source_url` | `string` |  |
| `tag` | `any[]` |  |
| `thumbnail` | `string` |  |
| `title` | `string` |  |
| `type` | `any` |  |
| `url` | `string` |  |
| `version` | `any` |  |
| `width` | `number` |  |

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


### OAuth2Application

Create an instance: `const o_auth2_application = client.OAuth2Application()`

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

```ts
const o_auth2_application = await client.OAuth2Application().create({
  description: /* string */,
  email: /* string */,
  name: /* string */,
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
| `rate_limit_model` | `string` |  |
| `requests_this_minute` | `number` |  |
| `requests_today` | `number` |  |
| `verified` | `boolean` |  |

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
| `access_token` | `string` |  |
| `expires_in` | `number` |  |
| `scope` | `string` |  |
| `token_type` | `string` |  |

#### Example: Create

```ts
const o_auth2_token = await client.OAuth2Token().create({
  access_token: /* string */,
  expires_in: /* number */,
  scope: /* string */,
  token_type: /* string */,
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
const audio = client.Audio()
await audio.list()

// audio.data() now returns the audio data from the last `list`
// audio.match() returns the last match criteria
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
