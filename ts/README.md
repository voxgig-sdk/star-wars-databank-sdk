# StarWarsDatabank TypeScript SDK



The TypeScript SDK for the StarWarsDatabank API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Character()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
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

### 2. List character records

`list()` resolves to an array of Character ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const characters = await client.Character().list()

for (const character of characters) {
  console.log(character)
}
```

### 3. Load a character

`load()` returns the entity directly and throws on failure:

```ts
try {
  const character = await client.Character().load({ id: 'example_id' })
  console.log(character)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const locations = await client.Location().list()
  console.log(locations)
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
const client = StarWarsDatabankSDK.test()

const location = await client.Location().list()
// location is the entity, populated with mock response data
// — call location.data() for the record itself
console.log(location)
```

You can also use the instance method:

```ts
const client = new StarWarsDatabankSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Location()

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
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): StarWarsDatabankSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
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

#### Character

| Field | Description |
| --- | --- |
| `affiliation` | Character's affiliation or allegiance |
| `description` | Detailed description of the character |
| `homeworld` | Character's home planet |
| `id` | Unique identifier for the character |
| `image` | URL to the character's image |
| `name` | Name of the character |
| `species` | Character's species |
| `url` | URL to the official Star Wars Databank entry |

Operations: list, load.

API path: `/characters`

#### Creature

| Field | Description |
| --- | --- |
| `classification` | Creature's classification |
| `description` | Detailed description of the creature |
| `habitat` | Creature's natural habitat |
| `id` | Unique identifier for the creature |
| `image` | URL to the creature's image |
| `name` | Name of the creature |
| `url` | URL to the official Star Wars Databank entry |

Operations: list, load.

API path: `/creatures`

#### Droid

| Field | Description |
| --- | --- |
| `affiliation` | Droid's affiliation |
| `description` | Detailed description of the droid |
| `id` | Unique identifier for the droid |
| `image` | URL to the droid's image |
| `manufacturer` | Droid's manufacturer |
| `name` | Name or designation of the droid |
| `type` | Droid type or class |
| `url` | URL to the official Star Wars Databank entry |

Operations: list, load.

API path: `/droids`

#### Location

| Field | Description |
| --- | --- |
| `description` | Detailed description of the location |
| `id` | Unique identifier for the location |
| `image` | URL to the location's image |
| `name` | Name of the location |
| `region` | Galactic region where the location is situated |
| `sector` | Sector where the location is situated |
| `terrain` | Terrain type of the location |
| `url` | URL to the official Star Wars Databank entry |

Operations: list, load.

API path: `/locations`

#### Organization

| Field | Description |
| --- | --- |
| `allegiance` | Organization's allegiance |
| `description` | Detailed description of the organization |
| `id` | Unique identifier for the organization |
| `image` | URL to the organization's image |
| `leader` | Leader of the organization |
| `name` | Name of the organization |
| `type` | Type of organization |
| `url` | URL to the official Star Wars Databank entry |

Operations: list, load.

API path: `/organizations`

#### Species

| Field | Description |
| --- | --- |
| `classification` | Biological classification |
| `description` | Detailed description of the species |
| `designation` | Sentience designation |
| `homeworld` | Homeworld of the species |
| `id` | Unique identifier for the species |
| `image` | URL to the species' image |
| `language` | Language spoken by the species |
| `name` | Name of the species |
| `url` | URL to the official Star Wars Databank entry |

Operations: list, load.

API path: `/species`

#### Vehicle

| Field | Description |
| --- | --- |
| `affiliation` | Vehicle's affiliation |
| `armament` | Vehicle armament |
| `class` | Vehicle class or type |
| `crew` | Crew capacity |
| `description` | Detailed description of the vehicle |
| `id` | Unique identifier for the vehicle |
| `image` | URL to the vehicle's image |
| `length` | Length of the vehicle |
| `manufacturer` | Vehicle manufacturer |
| `name` | Name of the vehicle |
| `url` | URL to the official Star Wars Databank entry |

Operations: list, load.

API path: `/vehicles`



## Entities


### Character

Create an instance: `const character = client.Character()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `string` | Character's affiliation or allegiance |
| `description` | `string` | Detailed description of the character |
| `homeworld` | `string` | Character's home planet |
| `id` | `string` | Unique identifier for the character |
| `image` | `string` | URL to the character's image |
| `name` | `string` | Name of the character |
| `species` | `string` | Character's species |
| `url` | `string` | URL to the official Star Wars Databank entry |

#### Example: Load

```ts
const character = await client.Character().load({ id: 'character_id' })
```

#### Example: List

```ts
const characters = await client.Character().list()
```


### Creature

Create an instance: `const creature = client.Creature()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `classification` | `string` | Creature's classification |
| `description` | `string` | Detailed description of the creature |
| `habitat` | `string` | Creature's natural habitat |
| `id` | `string` | Unique identifier for the creature |
| `image` | `string` | URL to the creature's image |
| `name` | `string` | Name of the creature |
| `url` | `string` | URL to the official Star Wars Databank entry |

#### Example: Load

```ts
const creature = await client.Creature().load({ id: 'creature_id' })
```

#### Example: List

```ts
const creatures = await client.Creature().list()
```


### Droid

Create an instance: `const droid = client.Droid()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `string` | Droid's affiliation |
| `description` | `string` | Detailed description of the droid |
| `id` | `string` | Unique identifier for the droid |
| `image` | `string` | URL to the droid's image |
| `manufacturer` | `string` | Droid's manufacturer |
| `name` | `string` | Name or designation of the droid |
| `type` | `string` | Droid type or class |
| `url` | `string` | URL to the official Star Wars Databank entry |

#### Example: Load

```ts
const droid = await client.Droid().load({ id: 'droid_id' })
```

#### Example: List

```ts
const droids = await client.Droid().list()
```


### Location

Create an instance: `const location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Detailed description of the location |
| `id` | `string` | Unique identifier for the location |
| `image` | `string` | URL to the location's image |
| `name` | `string` | Name of the location |
| `region` | `string` | Galactic region where the location is situated |
| `sector` | `string` | Sector where the location is situated |
| `terrain` | `string` | Terrain type of the location |
| `url` | `string` | URL to the official Star Wars Databank entry |

#### Example: Load

```ts
const location = await client.Location().load({ id: 'location_id' })
```

#### Example: List

```ts
const locations = await client.Location().list()
```


### Organization

Create an instance: `const organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allegiance` | `string` | Organization's allegiance |
| `description` | `string` | Detailed description of the organization |
| `id` | `string` | Unique identifier for the organization |
| `image` | `string` | URL to the organization's image |
| `leader` | `string` | Leader of the organization |
| `name` | `string` | Name of the organization |
| `type` | `string` | Type of organization |
| `url` | `string` | URL to the official Star Wars Databank entry |

#### Example: Load

```ts
const organization = await client.Organization().load({ id: 'organization_id' })
```

#### Example: List

```ts
const organizations = await client.Organization().list()
```


### Species

Create an instance: `const species = client.Species()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `classification` | `string` | Biological classification |
| `description` | `string` | Detailed description of the species |
| `designation` | `string` | Sentience designation |
| `homeworld` | `string` | Homeworld of the species |
| `id` | `string` | Unique identifier for the species |
| `image` | `string` | URL to the species' image |
| `language` | `string` | Language spoken by the species |
| `name` | `string` | Name of the species |
| `url` | `string` | URL to the official Star Wars Databank entry |

#### Example: Load

```ts
const species = await client.Species().load({ id: 'species_id' })
```

#### Example: List

```ts
const speciess = await client.Species().list()
```


### Vehicle

Create an instance: `const vehicle = client.Vehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `string` | Vehicle's affiliation |
| `armament` | `string` | Vehicle armament |
| `class` | `string` | Vehicle class or type |
| `crew` | `string` | Crew capacity |
| `description` | `string` | Detailed description of the vehicle |
| `id` | `string` | Unique identifier for the vehicle |
| `image` | `string` | URL to the vehicle's image |
| `length` | `string` | Length of the vehicle |
| `manufacturer` | `string` | Vehicle manufacturer |
| `name` | `string` | Name of the vehicle |
| `url` | `string` | URL to the official Star Wars Databank entry |

#### Example: Load

```ts
const vehicle = await client.Vehicle().load({ id: 'vehicle_id' })
```

#### Example: List

```ts
const vehicles = await client.Vehicle().list()
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const location = client.Location()
await location.list()

// location.data() now returns the location data from the last `list`
// location.match() returns the last match criteria
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
