# StarWarsDatabank Golang SDK



The Golang SDK for the StarWarsDatabank API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Character(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/star-wars-databank-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/star-wars-databank-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/star-wars-databank-sdk/go=../star-wars-databank-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/star-wars-databank-sdk/go"
)

func main() {
    client := sdk.New()

    // List character records — the value is the array of records itself.
    characters, err := client.Character(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range characters.([]any) {
        fmt.Println(item)
    }

    // Load a single character — the value is the loaded record.
    character, err := client.Character(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(character)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
locations, err := client.Location(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = locations
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

location, err := client.Location(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(location) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewStarWarsDatabankSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewStarWarsDatabankSDK

```go
func NewStarWarsDatabankSDK(options map[string]any) *StarWarsDatabankSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *StarWarsDatabankSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### StarWarsDatabankSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Character` | `(data map[string]any) StarWarsDatabankEntity` | Create a Character entity instance. |
| `Creature` | `(data map[string]any) StarWarsDatabankEntity` | Create a Creature entity instance. |
| `Droid` | `(data map[string]any) StarWarsDatabankEntity` | Create a Droid entity instance. |
| `Location` | `(data map[string]any) StarWarsDatabankEntity` | Create a Location entity instance. |
| `Organization` | `(data map[string]any) StarWarsDatabankEntity` | Create an Organization entity instance. |
| `Species` | `(data map[string]any) StarWarsDatabankEntity` | Create a Species entity instance. |
| `Vehicle` | `(data map[string]any) StarWarsDatabankEntity` | Create a Vehicle entity instance. |

### Entity interface (StarWarsDatabankEntity)

All entities implement the `StarWarsDatabankEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    character, err := client.Character(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // character is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Character

| Field | Description |
| --- | --- |
| `"affiliation"` | Character's affiliation or allegiance |
| `"description"` | Detailed description of the character |
| `"homeworld"` | Character's home planet |
| `"id"` | Unique identifier for the character |
| `"image"` | URL to the character's image |
| `"name"` | Name of the character |
| `"species"` | Character's species |
| `"url"` | URL to the official Star Wars Databank entry |

Operations: List, Load.

API path: `/characters`

#### Creature

| Field | Description |
| --- | --- |
| `"classification"` | Creature's classification |
| `"description"` | Detailed description of the creature |
| `"habitat"` | Creature's natural habitat |
| `"id"` | Unique identifier for the creature |
| `"image"` | URL to the creature's image |
| `"name"` | Name of the creature |
| `"url"` | URL to the official Star Wars Databank entry |

Operations: List, Load.

API path: `/creatures`

#### Droid

| Field | Description |
| --- | --- |
| `"affiliation"` | Droid's affiliation |
| `"description"` | Detailed description of the droid |
| `"id"` | Unique identifier for the droid |
| `"image"` | URL to the droid's image |
| `"manufacturer"` | Droid's manufacturer |
| `"name"` | Name or designation of the droid |
| `"type"` | Droid type or class |
| `"url"` | URL to the official Star Wars Databank entry |

Operations: List, Load.

API path: `/droids`

#### Location

| Field | Description |
| --- | --- |
| `"description"` | Detailed description of the location |
| `"id"` | Unique identifier for the location |
| `"image"` | URL to the location's image |
| `"name"` | Name of the location |
| `"region"` | Galactic region where the location is situated |
| `"sector"` | Sector where the location is situated |
| `"terrain"` | Terrain type of the location |
| `"url"` | URL to the official Star Wars Databank entry |

Operations: List, Load.

API path: `/locations`

#### Organization

| Field | Description |
| --- | --- |
| `"allegiance"` | Organization's allegiance |
| `"description"` | Detailed description of the organization |
| `"id"` | Unique identifier for the organization |
| `"image"` | URL to the organization's image |
| `"leader"` | Leader of the organization |
| `"name"` | Name of the organization |
| `"type"` | Type of organization |
| `"url"` | URL to the official Star Wars Databank entry |

Operations: List, Load.

API path: `/organizations`

#### Species

| Field | Description |
| --- | --- |
| `"classification"` | Biological classification |
| `"description"` | Detailed description of the species |
| `"designation"` | Sentience designation |
| `"homeworld"` | Homeworld of the species |
| `"id"` | Unique identifier for the species |
| `"image"` | URL to the species' image |
| `"language"` | Language spoken by the species |
| `"name"` | Name of the species |
| `"url"` | URL to the official Star Wars Databank entry |

Operations: List, Load.

API path: `/species`

#### Vehicle

| Field | Description |
| --- | --- |
| `"affiliation"` | Vehicle's affiliation |
| `"armament"` | Vehicle armament |
| `"class"` | Vehicle class or type |
| `"crew"` | Crew capacity |
| `"description"` | Detailed description of the vehicle |
| `"id"` | Unique identifier for the vehicle |
| `"image"` | URL to the vehicle's image |
| `"length"` | Length of the vehicle |
| `"manufacturer"` | Vehicle manufacturer |
| `"name"` | Name of the vehicle |
| `"url"` | URL to the official Star Wars Databank entry |

Operations: List, Load.

API path: `/vehicles`



## Entities


### Character

Create an instance: `character := client.Character(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
character, err := client.Character(nil).Load(map[string]any{"id": "character_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(character) // the loaded record
```

#### Example: List

```go
characters, err := client.Character(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(characters) // the array of records
```


### Creature

Create an instance: `creature := client.Creature(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
creature, err := client.Creature(nil).Load(map[string]any{"id": "creature_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(creature) // the loaded record
```

#### Example: List

```go
creatures, err := client.Creature(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(creatures) // the array of records
```


### Droid

Create an instance: `droid := client.Droid(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
droid, err := client.Droid(nil).Load(map[string]any{"id": "droid_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(droid) // the loaded record
```

#### Example: List

```go
droids, err := client.Droid(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(droids) // the array of records
```


### Location

Create an instance: `location := client.Location(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
location, err := client.Location(nil).Load(map[string]any{"id": "location_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(location) // the loaded record
```

#### Example: List

```go
locations, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(locations) // the array of records
```


### Organization

Create an instance: `organization := client.Organization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
organization, err := client.Organization(nil).Load(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organization) // the loaded record
```

#### Example: List

```go
organizations, err := client.Organization(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(organizations) // the array of records
```


### Species

Create an instance: `species := client.Species(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
species, err := client.Species(nil).Load(map[string]any{"id": "species_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(species) // the loaded record
```

#### Example: List

```go
speciess, err := client.Species(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(speciess) // the array of records
```


### Vehicle

Create an instance: `vehicle := client.Vehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
vehicle, err := client.Vehicle(nil).Load(map[string]any{"id": "vehicle_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(vehicle) // the loaded record
```

#### Example: List

```go
vehicles, err := client.Vehicle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(vehicles) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/star-wars-databank-sdk/go/
├── star-wars-databank.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/star-wars-databank-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
location := client.Location(nil)
location.List(nil, nil)

// location.Data() now returns the location data from the last list
// location.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
