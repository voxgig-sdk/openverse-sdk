# Openverse SDK

Search openly-licensed images and audio across many providers from a single API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Openverse API

[Openverse](https://openverse.org) is a search engine for openly-licensed media maintained as a [WordPress](https://wordpress.org) project (originally launched by Creative Commons as CC Search). It aggregates hundreds of millions of images and audio tracks from sources such as Flickr, Wikimedia Commons, museum collections, Jamendo and Freesound, all under Creative Commons licences or in the public domain.

What you get from the API:

- Full-text and faceted search across images (`GET /v1/images/`) and audio (`GET /v1/audio/`).
- Per-item detail, related results, thumbnails and (for audio) waveform data.
- Filtering by licence type, source provider, file type, dimensions and more.
- OAuth2 application registration for higher rate limits.

The API is served from `https://api.openverse.org` and documented at [api.openverse.org/v1/](https://api.openverse.org/v1/). Anonymous use is rate-limited; registering an OAuth2 application and using a bearer token raises the limits. See the docs for current throttling tiers and required headers.

## Try it

**TypeScript**
```bash
npm install openverse
```

**Python**
```bash
pip install openverse-sdk
```

**PHP**
```bash
composer require voxgig/openverse-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/openverse-sdk/go
```

**Ruby**
```bash
gem install openverse-sdk
```

**Lua**
```bash
luarocks install openverse-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpenverseSDK } from 'openverse'

const client = new OpenverseSDK({})

// List all audios
const audios = await client.Audio().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o openverse-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "openverse": {
      "command": "/abs/path/to/openverse-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Audio** | Openly-licensed audio tracks (music, sound effects, spoken word) aggregated from providers such as Jamendo and Freesound; served under `/v1/audio/`. | `/v1/audio/{identifier}/report/` |
| **Image** | Openly-licensed still images aggregated from providers such as Flickr, Wikimedia Commons and museum collections; served under `/v1/images/`. | `/v1/images/{identifier}/report/` |
| **OAuth2Application** | An OAuth2 client application registered against the Openverse API in order to obtain credentials for authenticated, higher-throttle access. | `/v1/auth_tokens/register/` |
| **OAuth2KeyInfo** | Metadata about a registered OAuth2 key, including its current rate-limit tier and verification status. | `/v1/rate_limit/` |
| **OAuth2Token** | A bearer access token issued to a registered OAuth2 application and used to authenticate subsequent API requests. | `/v1/auth_tokens/token/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from openverse_sdk import OpenverseSDK

client = OpenverseSDK({})

# List all audios
audios, err = client.Audio(None).list(None, None)

# Load a specific audio
audio, err = client.Audio(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'openverse_sdk.php';

$client = new OpenverseSDK([]);

// List all audios
[$audios, $err] = $client->Audio(null)->list(null, null);

// Load a specific audio
[$audio, $err] = $client->Audio(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/openverse-sdk/go"

client := sdk.NewOpenverseSDK(map[string]any{})

// List all audios
audios, err := client.Audio(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Openverse_sdk"

client = OpenverseSDK.new({})

# List all audios
audios, err = client.Audio(nil).list(nil, nil)

# Load a specific audio
audio, err = client.Audio(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("openverse_sdk")

local client = sdk.new({})

-- List all audios
local audios, err = client:Audio(nil):list(nil, nil)

-- Load a specific audio
local audio, err = client:Audio(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpenverseSDK.test()
const result = await client.Audio().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpenverseSDK.test(None, None)
result, err = client.Audio(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpenverseSDK::test(null, null);
[$result, $err] = $client->Audio(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Audio(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenverseSDK.test(nil, nil)
result, err = client.Audio(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Audio(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Openverse API

- Upstream: [https://openverse.org](https://openverse.org)
- API docs: [https://api.openverse.org/v1/](https://api.openverse.org/v1/)

- This SDK is distributed under the MIT License.
- Openverse itself is a [WordPress](https://wordpress.org) project and the API is open-source.
- Media returned by the API is **not** MIT-licensed: each result carries its own Creative Commons licence or public-domain dedication, which you must respect (attribution, share-alike, etc.).
- Always check the `license` and `license_url` fields on each result before reusing media.

---

Generated from the Openverse API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
