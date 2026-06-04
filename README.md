# StarWarsDatabank SDK

Browse Star Wars characters, droids, creatures, locations, organizations, species, and vehicles from a single unofficial Databank API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Star Wars Databank API

The Star Wars Databank API is a community-run REST service that mirrors the kind of catalogue found on the official Star Wars Databank, exposing the universe's people, droids, creatures, places, factions, species, and ships through a single base URL at `https://starwars-databank-server.onrender.com/api/v1`.

What you get from the API:

- Paginated lists of entities (e.g. `GET /api/v1/characters?page=1&limit=10`) returning `_id`, `name`, `description`, and `image` fields plus `total`, `page`, `limit`, `next`, `prev` pagination metadata.
- Separate collections per entity type: characters, droids, creatures, locations, organizations, species, and vehicles.
- Free, key-less access suitable for demos, tutorials, and fan projects.

Operational notes: the server is hosted on Render's free tier and may cold-start on first request. CORS is not enabled by default, so browser callers should proxy through their own backend. Individual endpoints have varied uptime historically (the `characters` route in particular has been flaky), so build in retries or fall back gracefully when a collection is unavailable.

## Try it

**TypeScript**
```bash
npm install star-wars-databank
```

**Python**
```bash
pip install star-wars-databank-sdk
```

**PHP**
```bash
composer require voxgig/star-wars-databank-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/star-wars-databank-sdk/go
```

**Ruby**
```bash
gem install star-wars-databank-sdk
```

**Lua**
```bash
luarocks install star-wars-databank-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { StarWarsDatabankSDK } from 'star-wars-databank'

const client = new StarWarsDatabankSDK({})

// List all characters
const characters = await client.Character().list()
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
cd go-mcp && go build -o star-wars-databank-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "star-wars-databank": {
      "command": "/abs/path/to/star-wars-databank-mcp"
    }
  }
}
```

## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Character** | A named Star Wars person or being — heroes, villains, and supporting cast — served from `/api/v1/characters` with `name`, `description`, and `image` fields. | `/characters` |
| **Creature** | A non-sapient lifeform from the galaxy (banthas, rancors, dewbacks, etc.) listed under `/api/v1/creatures`. | `/creatures` |
| **Droid** | A mechanical character such as astromechs, protocol droids, and battle droids, available at `/api/v1/droids`. | `/droids` |
| **Location** | A planet, moon, city, or other place in the Star Wars universe, served from `/api/v1/locations`. | `/locations` |
| **Organization** | A faction, government, military, or guild (e.g. the Empire, Rebel Alliance, Jedi Order) exposed at `/api/v1/organizations`. | `/organizations` |
| **Species** | A sapient or notable biological species (Wookiees, Twi'leks, Hutts, etc.) listed under `/api/v1/species`. | `/species` |
| **Vehicle** | A ship, speeder, walker, or other craft from the saga, served from `/api/v1/vehicles`. | `/vehicles` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from starwarsdatabank_sdk import StarWarsDatabankSDK

client = StarWarsDatabankSDK({})

# List all characters
characters, err = client.Character(None).list(None, None)

# Load a specific character
character, err = client.Character(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'starwarsdatabank_sdk.php';

$client = new StarWarsDatabankSDK([]);

// List all characters
[$characters, $err] = $client->Character(null)->list(null, null);

// Load a specific character
[$character, $err] = $client->Character(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/star-wars-databank-sdk/go"

client := sdk.NewStarWarsDatabankSDK(map[string]any{})

// List all characters
characters, err := client.Character(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "StarWarsDatabank_sdk"

client = StarWarsDatabankSDK.new({})

# List all characters
characters, err = client.Character(nil).list(nil, nil)

# Load a specific character
character, err = client.Character(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("star-wars-databank_sdk")

local client = sdk.new({})

-- List all characters
local characters, err = client:Character(nil):list(nil, nil)

-- Load a specific character
local character, err = client:Character(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = StarWarsDatabankSDK.test()
const result = await client.Character().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = StarWarsDatabankSDK.test(None, None)
result, err = client.Character(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = StarWarsDatabankSDK::test(null, null);
[$result, $err] = $client->Character(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Character(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = StarWarsDatabankSDK.test(nil, nil)
result, err = client.Character(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Character(nil):load(
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

## Using the Star Wars Databank API

- Upstream: [https://starwars-databank-server.onrender.com/api/v1](https://starwars-databank-server.onrender.com/api/v1)
- API docs: [https://freepublicapis.com/star-wars-databank-api](https://freepublicapis.com/star-wars-databank-api)

- The API itself publishes no explicit licence or terms of use.
- Star Wars characters, names, and imagery are trademarks of Lucasfilm Ltd. / The Walt Disney Company; treat the data as fan-curated reference material.
- No authentication key is documented, but the service is community-hosted on Render and offered as-is without uptime guarantees.
- Verify any commercial or redistribution use against Lucasfilm's IP terms before shipping.

---

Generated from the Star Wars Databank API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
