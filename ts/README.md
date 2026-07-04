# Openverse TypeScript SDK



The TypeScript SDK for the Openverse API — a type-safe, entity-oriented client with full async/await support.

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
  name: 'Example',
})

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

const audio = await client.Audio().load({ id: 'test01' })
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

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenverseSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

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
| `alt_file` | ``$ARRAY`` |  |
| `attribution` | ``$STRING`` |  |
| `audio_set` | ``$ANY`` |  |
| `bit_rate` | ``$INTEGER`` |  |
| `category` | ``$STRING`` |  |
| `creator` | ``$STRING`` |  |
| `creator_url` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `detail_url` | ``$STRING`` |  |
| `display_name` | ``$STRING`` |  |
| `duration` | ``$INTEGER`` |  |
| `fields_matched` | ``$ARRAY`` |  |
| `filesize` | ``$INTEGER`` |  |
| `filetype` | ``$STRING`` |  |
| `foreign_landing_url` | ``$STRING`` |  |
| `genre` | ``$ARRAY`` |  |
| `id` | ``$STRING`` |  |
| `identifier` | ``$STRING`` |  |
| `indexed_on` | ``$STRING`` |  |
| `len` | ``$INTEGER`` |  |
| `license` | ``$STRING`` |  |
| `license_url` | ``$STRING`` |  |
| `license_version` | ``$STRING`` |  |
| `logo_url` | ``$STRING`` |  |
| `mature` | ``$BOOLEAN`` |  |
| `media_count` | ``$INTEGER`` |  |
| `point` | ``$ARRAY`` |  |
| `provider` | ``$STRING`` |  |
| `reason` | ``$ANY`` |  |
| `related_url` | ``$STRING`` |  |
| `sample_rate` | ``$INTEGER`` |  |
| `source` | ``$STRING`` |  |
| `source_name` | ``$STRING`` |  |
| `source_url` | ``$STRING`` |  |
| `tag` | ``$ARRAY`` |  |
| `thumbnail` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |
| `waveform` | ``$STRING`` |  |

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
  alt_file: /* `$ARRAY` */,
  attribution: /* `$STRING` */,
  audio_set: /* `$ANY` */,
  detail_url: /* `$STRING` */,
  display_name: /* `$STRING` */,
  fields_matched: /* `$ARRAY` */,
  identifier: /* `$STRING` */,
  indexed_on: /* `$STRING` */,
  len: /* `$INTEGER` */,
  license: /* `$STRING` */,
  license_url: /* `$STRING` */,
  logo_url: /* `$STRING` */,
  mature: /* `$BOOLEAN` */,
  media_count: /* `$INTEGER` */,
  point: /* `$ARRAY` */,
  reason: /* `$ANY` */,
  related_url: /* `$STRING` */,
  source_name: /* `$STRING` */,
  source_url: /* `$STRING` */,
  tag: /* `$ARRAY` */,
  thumbnail: /* `$STRING` */,
  waveform: /* `$STRING` */,
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
| `attribution` | ``$STRING`` |  |
| `author_name` | ``$STRING`` |  |
| `author_url` | ``$STRING`` |  |
| `category` | ``$STRING`` |  |
| `creator` | ``$STRING`` |  |
| `creator_url` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `detail_url` | ``$STRING`` |  |
| `display_name` | ``$STRING`` |  |
| `fields_matched` | ``$ARRAY`` |  |
| `filesize` | ``$INTEGER`` |  |
| `filetype` | ``$STRING`` |  |
| `foreign_landing_url` | ``$STRING`` |  |
| `height` | ``$INTEGER`` |  |
| `id` | ``$STRING`` |  |
| `identifier` | ``$STRING`` |  |
| `indexed_on` | ``$STRING`` |  |
| `license` | ``$STRING`` |  |
| `license_url` | ``$STRING`` |  |
| `license_version` | ``$STRING`` |  |
| `logo_url` | ``$STRING`` |  |
| `mature` | ``$BOOLEAN`` |  |
| `media_count` | ``$INTEGER`` |  |
| `provider` | ``$STRING`` |  |
| `reason` | ``$ANY`` |  |
| `related_url` | ``$STRING`` |  |
| `source` | ``$STRING`` |  |
| `source_name` | ``$STRING`` |  |
| `source_url` | ``$STRING`` |  |
| `tag` | ``$ARRAY`` |  |
| `thumbnail` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |
| `type` | ``$ANY`` |  |
| `url` | ``$STRING`` |  |
| `version` | ``$ANY`` |  |
| `width` | ``$INTEGER`` |  |

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
  attribution: /* `$STRING` */,
  author_name: /* `$STRING` */,
  author_url: /* `$STRING` */,
  detail_url: /* `$STRING` */,
  display_name: /* `$STRING` */,
  fields_matched: /* `$ARRAY` */,
  identifier: /* `$STRING` */,
  indexed_on: /* `$STRING` */,
  license: /* `$STRING` */,
  license_url: /* `$STRING` */,
  logo_url: /* `$STRING` */,
  mature: /* `$BOOLEAN` */,
  media_count: /* `$INTEGER` */,
  reason: /* `$ANY` */,
  related_url: /* `$STRING` */,
  source_name: /* `$STRING` */,
  source_url: /* `$STRING` */,
  tag: /* `$ARRAY` */,
  thumbnail: /* `$STRING` */,
  type: /* `$ANY` */,
  version: /* `$ANY` */,
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
| `description` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: Create

```ts
const o_auth2_application = await client.OAuth2Application().create({
  description: /* `$STRING` */,
  email: /* `$STRING` */,
  name: /* `$STRING` */,
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
| `rate_limit_model` | ``$STRING`` |  |
| `requests_this_minute` | ``$INTEGER`` |  |
| `requests_today` | ``$INTEGER`` |  |
| `verified` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const o_auth2_key_info = await client.OAuth2KeyInfo().load({ id: 'o_auth2_key_info_id' })
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
| `access_token` | ``$STRING`` |  |
| `expires_in` | ``$INTEGER`` |  |
| `scope` | ``$STRING`` |  |
| `token_type` | ``$STRING`` |  |

#### Example: Create

```ts
const o_auth2_token = await client.OAuth2Token().create({
  access_token: /* `$STRING` */,
  expires_in: /* `$INTEGER` */,
  scope: /* `$STRING` */,
  token_type: /* `$STRING` */,
})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const audio = client.Audio()
await audio.load({ id: "example_id" })

// audio.data() now returns the loaded audio data
// audio.match() returns { id: "example_id" }
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
