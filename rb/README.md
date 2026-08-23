# StarWarsDatabank Ruby SDK



The Ruby SDK for the StarWarsDatabank API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Character` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/star-wars-databank-sdk/releases](https://github.com/voxgig-sdk/star-wars-databank-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "StarWarsDatabank_sdk"

client = StarWarsDatabankSDK.new
```

### 2. List character records

```ruby
begin
  # list returns an Array of Character records — iterate directly.
  characters = client.Character.list
  characters.each do |item|
    puts "#{item["id"]} #{item["affiliation"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a character

```ruby
begin
  # load returns the ENTITY — call data_get for the Character record (raises on error).
  character = client.Character.load({ "id" => "example_id" })
  puts character
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  locations = client.Location.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = StarWarsDatabankSDK.test({
  "entity" => { "location" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
location = client.Location.list()
puts location
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = StarWarsDatabankSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
STAR_WARS_DATABANK_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### StarWarsDatabankSDK

```ruby
require_relative "StarWarsDatabank_sdk"
client = StarWarsDatabankSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = StarWarsDatabankSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### StarWarsDatabankSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Character` | `(data) -> CharacterEntity` | Create a Character entity instance. |
| `Creature` | `(data) -> CreatureEntity` | Create a Creature entity instance. |
| `Droid` | `(data) -> DroidEntity` | Create a Droid entity instance. |
| `Location` | `(data) -> LocationEntity` | Create a Location entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |
| `Species` | `(data) -> SpeciesEntity` | Create a Species entity instance. |
| `Vehicle` | `(data) -> VehicleEntity` | Create a Vehicle entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `StarWarsDatabankError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

API path: `/vehicles`



## Entities


### Character

Create an instance: `character = client.Character`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `String` | Character's affiliation or allegiance |
| `description` | `String` | Detailed description of the character |
| `homeworld` | `String` | Character's home planet |
| `id` | `String` | Unique identifier for the character |
| `image` | `String` | URL to the character's image |
| `name` | `String` | Name of the character |
| `species` | `String` | Character's species |
| `url` | `String` | URL to the official Star Wars Databank entry |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Character record (raises on error).
character = client.Character.load({ "id" => "character_id" })
```

#### Example: List

```ruby
# list returns an Array of Character records (raises on error).
characters = client.Character.list
```


### Creature

Create an instance: `creature = client.Creature`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `classification` | `String` | Creature's classification |
| `description` | `String` | Detailed description of the creature |
| `habitat` | `String` | Creature's natural habitat |
| `id` | `String` | Unique identifier for the creature |
| `image` | `String` | URL to the creature's image |
| `name` | `String` | Name of the creature |
| `url` | `String` | URL to the official Star Wars Databank entry |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Creature record (raises on error).
creature = client.Creature.load({ "id" => "creature_id" })
```

#### Example: List

```ruby
# list returns an Array of Creature records (raises on error).
creatures = client.Creature.list
```


### Droid

Create an instance: `droid = client.Droid`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `String` | Droid's affiliation |
| `description` | `String` | Detailed description of the droid |
| `id` | `String` | Unique identifier for the droid |
| `image` | `String` | URL to the droid's image |
| `manufacturer` | `String` | Droid's manufacturer |
| `name` | `String` | Name or designation of the droid |
| `type` | `String` | Droid type or class |
| `url` | `String` | URL to the official Star Wars Databank entry |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Droid record (raises on error).
droid = client.Droid.load({ "id" => "droid_id" })
```

#### Example: List

```ruby
# list returns an Array of Droid records (raises on error).
droids = client.Droid.list
```


### Location

Create an instance: `location = client.Location`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` | Detailed description of the location |
| `id` | `String` | Unique identifier for the location |
| `image` | `String` | URL to the location's image |
| `name` | `String` | Name of the location |
| `region` | `String` | Galactic region where the location is situated |
| `sector` | `String` | Sector where the location is situated |
| `terrain` | `String` | Terrain type of the location |
| `url` | `String` | URL to the official Star Wars Databank entry |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Location record (raises on error).
location = client.Location.load({ "id" => "location_id" })
```

#### Example: List

```ruby
# list returns an Array of Location records (raises on error).
locations = client.Location.list
```


### Organization

Create an instance: `organization = client.Organization`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allegiance` | `String` | Organization's allegiance |
| `description` | `String` | Detailed description of the organization |
| `id` | `String` | Unique identifier for the organization |
| `image` | `String` | URL to the organization's image |
| `leader` | `String` | Leader of the organization |
| `name` | `String` | Name of the organization |
| `type` | `String` | Type of organization |
| `url` | `String` | URL to the official Star Wars Databank entry |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Organization record (raises on error).
organization = client.Organization.load({ "id" => "organization_id" })
```

#### Example: List

```ruby
# list returns an Array of Organization records (raises on error).
organizations = client.Organization.list
```


### Species

Create an instance: `species = client.Species`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `classification` | `String` | Biological classification |
| `description` | `String` | Detailed description of the species |
| `designation` | `String` | Sentience designation |
| `homeworld` | `String` | Homeworld of the species |
| `id` | `String` | Unique identifier for the species |
| `image` | `String` | URL to the species' image |
| `language` | `String` | Language spoken by the species |
| `name` | `String` | Name of the species |
| `url` | `String` | URL to the official Star Wars Databank entry |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Species record (raises on error).
species = client.Species.load({ "id" => "species_id" })
```

#### Example: List

```ruby
# list returns an Array of Species records (raises on error).
speciess = client.Species.list
```


### Vehicle

Create an instance: `vehicle = client.Vehicle`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `String` | Vehicle's affiliation |
| `armament` | `String` | Vehicle armament |
| `class` | `String` | Vehicle class or type |
| `crew` | `String` | Crew capacity |
| `description` | `String` | Detailed description of the vehicle |
| `id` | `String` | Unique identifier for the vehicle |
| `image` | `String` | URL to the vehicle's image |
| `length` | `String` | Length of the vehicle |
| `manufacturer` | `String` | Vehicle manufacturer |
| `name` | `String` | Name of the vehicle |
| `url` | `String` | URL to the official Star Wars Databank entry |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Vehicle record (raises on error).
vehicle = client.Vehicle.load({ "id" => "vehicle_id" })
```

#### Example: List

```ruby
# list returns an Array of Vehicle records (raises on error).
vehicles = client.Vehicle.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── StarWarsDatabank_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`StarWarsDatabank_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
location = client.Location
location.list()

# location.data_get now returns the location data from the last list
# location.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
