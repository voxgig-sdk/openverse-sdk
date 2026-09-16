# Openverse API

Openverse is a search engine for openly-licensed media. The Openverse API is a system that allows programmatic access to public domain digital media. It is our ambition to index and catalog billions of openly-licensed works, including articles, songs, videos, photographs, paintings, and more. Using this API, developers will be able to access the digital commons in their own applications. You can see some examples of [apps built with Openverse](https://docs.openverse.org/api/reference/made_with_ov.html) in our docs.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 17 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Audio

Results: Created; OK; Thumbnail image.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `alt_files`: JSON describing alternative files for this audio.
- `attribution`: Legally valid attribution for the media item in plain-text English.
- `audio_set`: Reference to set of which this track is a part.
- `bit_rate`: Number in bits per second, eg. 128000.
- `category`: The top-level classification of this media file.

### Image

Results: Created; OK.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `attribution`: Legally valid attribution for the media item in plain-text English.
- `author_name`: The name of the media creator.
- `author_url`: A direct link to the media creator.
- `category`: The top-level classification of this media file.
- `creator`: The name of the media creator.

### OAuth2Application

Results: Created.

SDK operations: `create`.

Key fields to recognise:

- `description`: A description of what you are trying to achieve with your project using the API.
- `email`: A valid email that we can reach you at if we have any questions about your use case or data consumption.
- `name`: The name of your application or project.

### OAuth2KeyInfo

Results: OK.

SDK operations: `load`.

Key fields to recognise:

- `rate_limit_model`: The type of rate limit applied to your key. Can be &#39;standard&#39; or &#39;enhanced&#39;; enhanced users enjoy higher rate limits than their standard key counterparts. Contact Openverse if you need a higher rate limit.
- `requests_this_minute`: The number of requests your key has performed in the last minute.
- `requests_today`: The number of requests your key has performed in the last day.
- `verified`: Whether the application has verified the submitted email address.

### OAuth2Token

Results: OK.

SDK operations: `create`.

Key fields to recognise:

- `access_token`: The access token that can be used to authenticate requests.
- `expires_in`: The number of seconds until the token expires.
- `scope`: The scope of the token.
- `token_type`: The type of token. This will always be &#39;Bearer&#39;.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Audio | `create` | `POST /v1/audio/{identifier}/report/` | Not required |
| Audio | `list` | `GET /v1/audio/` | Not required |
| Audio | `list` | `GET /v1/audio/{identifier}/related/` | Not required |
| Audio | `list` | `GET /v1/audio/{identifier}/waveform/` | Not required |
| Audio | `list` | `GET /v1/audio/stats/` | Not required |
| Audio | `load` | `GET /v1/audio/{identifier}/thumb/` | Not required |
| Audio | `load` | `GET /v1/images/{identifier}/thumb/` | Not required |
| Audio | `load` | `GET /v1/audio/{identifier}/` | Not required |
| Image | `create` | `POST /v1/images/{identifier}/report/` | Not required |
| Image | `list` | `GET /v1/images/` | Not required |
| Image | `list` | `GET /v1/images/{identifier}/related/` | Not required |
| Image | `list` | `GET /v1/images/stats/` | Not required |
| Image | `load` | `GET /v1/images/{identifier}/` | Not required |
| Image | `load` | `GET /v1/images/oembed/` | Not required |
| OAuth2Application | `create` | `POST /v1/auth_tokens/register/` | Not required |
| OAuth2KeyInfo | `load` | `GET /v1/rate_limit/` | Required |
| OAuth2Token | `create` | `POST /v1/auth_tokens/token/` | See reference |

## Connect to the API

- API server: `https://api.openverse.org`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /v1/audio/`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.openverse.org/v1/audio/'
```

Inspect the response using the Audio reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `openverse_list`: List records for an entity. Supported entities: `audio`, `image`.
- `openverse_load`: Load one record for an entity. Supported entities: `audio`, `image`, `o_auth2_key_info`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

