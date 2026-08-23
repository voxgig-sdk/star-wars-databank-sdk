# StarWarsDatabank Ruby SDK Reference

Complete API reference for the StarWarsDatabank Ruby SDK.


## StarWarsDatabankSDK

### Constructor

```ruby
require_relative 'StarWarsDatabank_sdk'

client = StarWarsDatabankSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StarWarsDatabankSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = StarWarsDatabankSDK.test
```


### Instance Methods

#### `Character(data = nil)`

Create a new `Character` entity instance. Pass `nil` for no initial data.

#### `Creature(data = nil)`

Create a new `Creature` entity instance. Pass `nil` for no initial data.

#### `Droid(data = nil)`

Create a new `Droid` entity instance. Pass `nil` for no initial data.

#### `Location(data = nil)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Organization(data = nil)`

Create a new `Organization` entity instance. Pass `nil` for no initial data.

#### `Species(data = nil)`

Create a new `Species` entity instance. Pass `nil` for no initial data.

#### `Vehicle(data = nil)`

Create a new `Vehicle` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CharacterEntity

```ruby
character = client.Character
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `String` | No | Character's affiliation or allegiance |
| `description` | `String` | No | Detailed description of the character |
| `homeworld` | `String` | No | Character's home planet |
| `id` | `String` | No | Unique identifier for the character |
| `image` | `String` | No | URL to the character's image |
| `name` | `String` | No | Name of the character |
| `species` | `String` | No | Character's species |
| `url` | `String` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Character.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Character.load({ "id" => "character_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CharacterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CreatureEntity

```ruby
creature = client.Creature
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `classification` | `String` | No | Creature's classification |
| `description` | `String` | No | Detailed description of the creature |
| `habitat` | `String` | No | Creature's natural habitat |
| `id` | `String` | No | Unique identifier for the creature |
| `image` | `String` | No | URL to the creature's image |
| `name` | `String` | No | Name of the creature |
| `url` | `String` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Creature.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Creature.load({ "id" => "creature_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CreatureEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DroidEntity

```ruby
droid = client.Droid
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `String` | No | Droid's affiliation |
| `description` | `String` | No | Detailed description of the droid |
| `id` | `String` | No | Unique identifier for the droid |
| `image` | `String` | No | URL to the droid's image |
| `manufacturer` | `String` | No | Droid's manufacturer |
| `name` | `String` | No | Name or designation of the droid |
| `type` | `String` | No | Droid type or class |
| `url` | `String` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Droid.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Droid.load({ "id" => "droid_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DroidEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LocationEntity

```ruby
location = client.Location
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Detailed description of the location |
| `id` | `String` | No | Unique identifier for the location |
| `image` | `String` | No | URL to the location's image |
| `name` | `String` | No | Name of the location |
| `region` | `String` | No | Galactic region where the location is situated |
| `sector` | `String` | No | Sector where the location is situated |
| `terrain` | `String` | No | Terrain type of the location |
| `url` | `String` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Location.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Location.load({ "id" => "location_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrganizationEntity

```ruby
organization = client.Organization
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allegiance` | `String` | No | Organization's allegiance |
| `description` | `String` | No | Detailed description of the organization |
| `id` | `String` | No | Unique identifier for the organization |
| `image` | `String` | No | URL to the organization's image |
| `leader` | `String` | No | Leader of the organization |
| `name` | `String` | No | Name of the organization |
| `type` | `String` | No | Type of organization |
| `url` | `String` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Organization.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Organization.load({ "id" => "organization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SpeciesEntity

```ruby
species = client.Species
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `classification` | `String` | No | Biological classification |
| `description` | `String` | No | Detailed description of the species |
| `designation` | `String` | No | Sentience designation |
| `homeworld` | `String` | No | Homeworld of the species |
| `id` | `String` | No | Unique identifier for the species |
| `image` | `String` | No | URL to the species' image |
| `language` | `String` | No | Language spoken by the species |
| `name` | `String` | No | Name of the species |
| `url` | `String` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Species.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Species.load({ "id" => "species_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VehicleEntity

```ruby
vehicle = client.Vehicle
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `String` | No | Vehicle's affiliation |
| `armament` | `String` | No | Vehicle armament |
| `class` | `String` | No | Vehicle class or type |
| `crew` | `String` | No | Crew capacity |
| `description` | `String` | No | Detailed description of the vehicle |
| `id` | `String` | No | Unique identifier for the vehicle |
| `image` | `String` | No | URL to the vehicle's image |
| `length` | `String` | No | Length of the vehicle |
| `manufacturer` | `String` | No | Vehicle manufacturer |
| `name` | `String` | No | Name of the vehicle |
| `url` | `String` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Vehicle.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Vehicle.load({ "id" => "vehicle_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = StarWarsDatabankSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

