# StarWarsDatabank TypeScript SDK



The TypeScript SDK for the StarWarsDatabank API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/star-wars-databank-sdk/releases](https://github.com/voxgig-sdk/star-wars-databank-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { StarWarsDatabankSDK } from '@voxgig-sdk/star-wars-databank'

const client = new StarWarsDatabankSDK()
```

### 2. List characters

```ts
const result = await client.character.list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a character

```ts
const result = await client.character.load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
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
const client = StarWarsDatabankSDK.test()

const result = await client.character.load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new StarWarsDatabankSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.character

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

const client = new StarWarsDatabankSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
STAR_WARS_DATABANK_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### StarWarsDatabankSDK

#### Constructor

```ts
new StarWarsDatabankSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
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
| `Character(data?)` | `CharacterEntity` | Create a Character entity instance. |
| `Creature(data?)` | `CreatureEntity` | Create a Creature entity instance. |
| `Droid(data?)` | `DroidEntity` | Create a Droid entity instance. |
| `Location(data?)` | `LocationEntity` | Create a Location entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create a Organization entity instance. |
| `Species(data?)` | `SpeciesEntity` | Create a Species entity instance. |
| `Vehicle(data?)` | `VehicleEntity` | Create a Vehicle entity instance. |
| `tester(testopts?, sdkopts?)` | `StarWarsDatabankSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `StarWarsDatabankSDK.test(testopts?, sdkopts?)` | `StarWarsDatabankSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): StarWarsDatabankSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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

#### Character

| Field | Description |
| --- | --- |
| `affiliation` |  |
| `description` |  |
| `homeworld` |  |
| `id` |  |
| `image` |  |
| `name` |  |
| `species` |  |
| `url` |  |

Operations: list, load.

API path: `/characters`

#### Creature

| Field | Description |
| --- | --- |
| `classification` |  |
| `description` |  |
| `habitat` |  |
| `id` |  |
| `image` |  |
| `name` |  |
| `url` |  |

Operations: list, load.

API path: `/creatures`

#### Droid

| Field | Description |
| --- | --- |
| `affiliation` |  |
| `description` |  |
| `id` |  |
| `image` |  |
| `manufacturer` |  |
| `name` |  |
| `type` |  |
| `url` |  |

Operations: list, load.

API path: `/droids`

#### Location

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `image` |  |
| `name` |  |
| `region` |  |
| `sector` |  |
| `terrain` |  |
| `url` |  |

Operations: list, load.

API path: `/locations`

#### Organization

| Field | Description |
| --- | --- |
| `allegiance` |  |
| `description` |  |
| `id` |  |
| `image` |  |
| `leader` |  |
| `name` |  |
| `type` |  |
| `url` |  |

Operations: list, load.

API path: `/organizations`

#### Species

| Field | Description |
| --- | --- |
| `classification` |  |
| `description` |  |
| `designation` |  |
| `homeworld` |  |
| `id` |  |
| `image` |  |
| `language` |  |
| `name` |  |
| `url` |  |

Operations: list, load.

API path: `/species`

#### Vehicle

| Field | Description |
| --- | --- |
| `affiliation` |  |
| `armament` |  |
| `class` |  |
| `crew` |  |
| `description` |  |
| `id` |  |
| `image` |  |
| `length` |  |
| `manufacturer` |  |
| `name` |  |
| `url` |  |

Operations: list, load.

API path: `/vehicles`



## Entities


### Character

Create an instance: `const character = client.character`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `homeworld` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `species` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const character = await client.character.load({ id: 'character_id' })
```

#### Example: List

```ts
const characters = await client.character.list()
```


### Creature

Create an instance: `const creature = client.creature`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `classification` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `habitat` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const creature = await client.creature.load({ id: 'creature_id' })
```

#### Example: List

```ts
const creatures = await client.creature.list()
```


### Droid

Create an instance: `const droid = client.droid`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `manufacturer` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const droid = await client.droid.load({ id: 'droid_id' })
```

#### Example: List

```ts
const droids = await client.droid.list()
```


### Location

Create an instance: `const location = client.location`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |
| `sector` | ``$STRING`` |  |
| `terrain` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const location = await client.location.load({ id: 'location_id' })
```

#### Example: List

```ts
const locations = await client.location.list()
```


### Organization

Create an instance: `const organization = client.organization`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allegiance` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `leader` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const organization = await client.organization.load({ id: 'organization_id' })
```

#### Example: List

```ts
const organizations = await client.organization.list()
```


### Species

Create an instance: `const species = client.species`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `classification` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `designation` | ``$STRING`` |  |
| `homeworld` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `language` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const species = await client.species.load({ id: 'species_id' })
```

#### Example: List

```ts
const speciess = await client.species.list()
```


### Vehicle

Create an instance: `const vehicle = client.vehicle`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | ``$STRING`` |  |
| `armament` | ``$STRING`` |  |
| `class` | ``$STRING`` |  |
| `crew` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `length` | ``$STRING`` |  |
| `manufacturer` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const vehicle = await client.vehicle.load({ id: 'vehicle_id' })
```

#### Example: List

```ts
const vehicles = await client.vehicle.list()
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
star-wars-databank/
├── src/
│   ├── StarWarsDatabankSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { StarWarsDatabankSDK } from '@voxgig-sdk/star-wars-databank'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const character = client.character
await character.load({ id: "example_id" })

// character.data() now returns the loaded character data
// character.match() returns { id: "example_id" }
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
