# StarWarsDatabank Golang SDK Reference

Complete API reference for the StarWarsDatabank Golang SDK.


## StarWarsDatabankSDK

### Constructor

```go
func NewStarWarsDatabankSDK(options map[string]any) *StarWarsDatabankSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *StarWarsDatabankSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *StarWarsDatabankSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Character(data map[string]any) StarWarsDatabankEntity`

Create a new `Character` entity instance. Pass `nil` for no initial data.

#### `Creature(data map[string]any) StarWarsDatabankEntity`

Create a new `Creature` entity instance. Pass `nil` for no initial data.

#### `Droid(data map[string]any) StarWarsDatabankEntity`

Create a new `Droid` entity instance. Pass `nil` for no initial data.

#### `Location(data map[string]any) StarWarsDatabankEntity`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Organization(data map[string]any) StarWarsDatabankEntity`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `Species(data map[string]any) StarWarsDatabankEntity`

Create a new `Species` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data map[string]any) StarWarsDatabankEntity`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CharacterEntity

```go
character := client.Character(nil)
fmt.Println(character.GetName()) // "character"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `string` | No | Character's affiliation or allegiance |
| `description` | `string` | No | Detailed description of the character |
| `homeworld` | `string` | No | Character's home planet |
| `id` | `string` | No | Unique identifier for the character |
| `image` | `string` | No | URL to the character's image |
| `name` | `string` | No | Name of the character |
| `species` | `string` | No | Character's species |
| `url` | `string` | No | URL to the official Star Wars Databank entry |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Character(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Character(nil).Load(map[string]any{"id": "character_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CharacterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CreatureEntity

```go
creature := client.Creature(nil)
fmt.Println(creature.GetName()) // "creature"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `classification` | `string` | No | Creature's classification |
| `description` | `string` | No | Detailed description of the creature |
| `habitat` | `string` | No | Creature's natural habitat |
| `id` | `string` | No | Unique identifier for the creature |
| `image` | `string` | No | URL to the creature's image |
| `name` | `string` | No | Name of the creature |
| `url` | `string` | No | URL to the official Star Wars Databank entry |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Creature(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Creature(nil).Load(map[string]any{"id": "creature_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CreatureEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DroidEntity

```go
droid := client.Droid(nil)
fmt.Println(droid.GetName()) // "droid"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `string` | No | Droid's affiliation |
| `description` | `string` | No | Detailed description of the droid |
| `id` | `string` | No | Unique identifier for the droid |
| `image` | `string` | No | URL to the droid's image |
| `manufacturer` | `string` | No | Droid's manufacturer |
| `name` | `string` | No | Name or designation of the droid |
| `type` | `string` | No | Droid type or class |
| `url` | `string` | No | URL to the official Star Wars Databank entry |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Droid(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Droid(nil).Load(map[string]any{"id": "droid_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DroidEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LocationEntity

```go
location := client.Location(nil)
fmt.Println(location.GetName()) // "location"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Detailed description of the location |
| `id` | `string` | No | Unique identifier for the location |
| `image` | `string` | No | URL to the location's image |
| `name` | `string` | No | Name of the location |
| `region` | `string` | No | Galactic region where the location is situated |
| `sector` | `string` | No | Sector where the location is situated |
| `terrain` | `string` | No | Terrain type of the location |
| `url` | `string` | No | URL to the official Star Wars Databank entry |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Location(nil).Load(map[string]any{"id": "location_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OrganizationEntity

```go
organization := client.Organization(nil)
fmt.Println(organization.GetName()) // "organization"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allegiance` | `string` | No | Organization's allegiance |
| `description` | `string` | No | Detailed description of the organization |
| `id` | `string` | No | Unique identifier for the organization |
| `image` | `string` | No | URL to the organization's image |
| `leader` | `string` | No | Leader of the organization |
| `name` | `string` | No | Name of the organization |
| `type` | `string` | No | Type of organization |
| `url` | `string` | No | URL to the official Star Wars Databank entry |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Organization(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Organization(nil).Load(map[string]any{"id": "organization_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SpeciesEntity

```go
species := client.Species(nil)
fmt.Println(species.GetName()) // "species"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `classification` | `string` | No | Biological classification |
| `description` | `string` | No | Detailed description of the species |
| `designation` | `string` | No | Sentience designation |
| `homeworld` | `string` | No | Homeworld of the species |
| `id` | `string` | No | Unique identifier for the species |
| `image` | `string` | No | URL to the species' image |
| `language` | `string` | No | Language spoken by the species |
| `name` | `string` | No | Name of the species |
| `url` | `string` | No | URL to the official Star Wars Databank entry |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Species(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Species(nil).Load(map[string]any{"id": "species_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VehicleEntity

```go
vehicle := client.Vehicle(nil)
fmt.Println(vehicle.GetName()) // "vehicle"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `string` | No | Vehicle's affiliation |
| `armament` | `string` | No | Vehicle armament |
| `class` | `string` | No | Vehicle class or type |
| `crew` | `string` | No | Crew capacity |
| `description` | `string` | No | Detailed description of the vehicle |
| `id` | `string` | No | Unique identifier for the vehicle |
| `image` | `string` | No | URL to the vehicle's image |
| `length` | `string` | No | Length of the vehicle |
| `manufacturer` | `string` | No | Vehicle manufacturer |
| `name` | `string` | No | Name of the vehicle |
| `url` | `string` | No | URL to the official Star Wars Databank entry |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Vehicle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Vehicle(nil).Load(map[string]any{"id": "vehicle_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewStarWarsDatabankSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

