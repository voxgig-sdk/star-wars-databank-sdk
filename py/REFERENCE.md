# StarWarsDatabank Python SDK Reference

Complete API reference for the StarWarsDatabank Python SDK.


## StarWarsDatabankSDK

### Constructor

```python
from starwarsdatabank_sdk import StarWarsDatabankSDK

client = StarWarsDatabankSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StarWarsDatabankSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = StarWarsDatabankSDK.test()
```


### Instance Methods

#### `Character(data=None)`

Create a new `CharacterEntity` instance. Pass `None` for no initial data.

#### `Creature(data=None)`

Create a new `CreatureEntity` instance. Pass `None` for no initial data.

#### `Droid(data=None)`

Create a new `DroidEntity` instance. Pass `None` for no initial data.

#### `Location(data=None)`

Create a new `LocationEntity` instance. Pass `None` for no initial data.

#### `Organization(data=None)`

Create a new `OrganizationEntity` instance. Pass `None` for no initial data.

#### `Species(data=None)`

Create a new `SpeciesEntity` instance. Pass `None` for no initial data.

#### `Vehicle(data=None)`

Create a new `VehicleEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CharacterEntity

```python
character = client.Character()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `str` | No | Character's affiliation or allegiance |
| `description` | `str` | No | Detailed description of the character |
| `homeworld` | `str` | No | Character's home planet |
| `id` | `str` | No | Unique identifier for the character |
| `image` | `str` | No | URL to the character's image |
| `name` | `str` | No | Name of the character |
| `species` | `str` | No | Character's species |
| `url` | `str` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Character().list()
for character in results:
    print(character)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Character().load({"id": "character_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CharacterEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreatureEntity

```python
creature = client.Creature()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `classification` | `str` | No | Creature's classification |
| `description` | `str` | No | Detailed description of the creature |
| `habitat` | `str` | No | Creature's natural habitat |
| `id` | `str` | No | Unique identifier for the creature |
| `image` | `str` | No | URL to the creature's image |
| `name` | `str` | No | Name of the creature |
| `url` | `str` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Creature().list()
for creature in results:
    print(creature)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Creature().load({"id": "creature_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreatureEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DroidEntity

```python
droid = client.Droid()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `str` | No | Droid's affiliation |
| `description` | `str` | No | Detailed description of the droid |
| `id` | `str` | No | Unique identifier for the droid |
| `image` | `str` | No | URL to the droid's image |
| `manufacturer` | `str` | No | Droid's manufacturer |
| `name` | `str` | No | Name or designation of the droid |
| `type` | `str` | No | Droid type or class |
| `url` | `str` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Droid().list()
for droid in results:
    print(droid)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Droid().load({"id": "droid_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DroidEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LocationEntity

```python
location = client.Location()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No | Detailed description of the location |
| `id` | `str` | No | Unique identifier for the location |
| `image` | `str` | No | URL to the location's image |
| `name` | `str` | No | Name of the location |
| `region` | `str` | No | Galactic region where the location is situated |
| `sector` | `str` | No | Sector where the location is situated |
| `terrain` | `str` | No | Terrain type of the location |
| `url` | `str` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Location().list()
for location in results:
    print(location)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Location().load({"id": "location_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganizationEntity

```python
organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allegiance` | `str` | No | Organization's allegiance |
| `description` | `str` | No | Detailed description of the organization |
| `id` | `str` | No | Unique identifier for the organization |
| `image` | `str` | No | URL to the organization's image |
| `leader` | `str` | No | Leader of the organization |
| `name` | `str` | No | Name of the organization |
| `type` | `str` | No | Type of organization |
| `url` | `str` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Organization().list()
for organization in results:
    print(organization)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Organization().load({"id": "organization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganizationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpeciesEntity

```python
species = client.Species()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `classification` | `str` | No | Biological classification |
| `description` | `str` | No | Detailed description of the species |
| `designation` | `str` | No | Sentience designation |
| `homeworld` | `str` | No | Homeworld of the species |
| `id` | `str` | No | Unique identifier for the species |
| `image` | `str` | No | URL to the species' image |
| `language` | `str` | No | Language spoken by the species |
| `name` | `str` | No | Name of the species |
| `url` | `str` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Species().list()
for species in results:
    print(species)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Species().load({"id": "species_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpeciesEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VehicleEntity

```python
vehicle = client.Vehicle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affiliation` | `str` | No | Vehicle's affiliation |
| `armament` | `str` | No | Vehicle armament |
| `class` | `str` | No | Vehicle class or type |
| `crew` | `str` | No | Crew capacity |
| `description` | `str` | No | Detailed description of the vehicle |
| `id` | `str` | No | Unique identifier for the vehicle |
| `image` | `str` | No | URL to the vehicle's image |
| `length` | `str` | No | Length of the vehicle |
| `manufacturer` | `str` | No | Vehicle manufacturer |
| `name` | `str` | No | Name of the vehicle |
| `url` | `str` | No | URL to the official Star Wars Databank entry |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Vehicle().list()
for vehicle in results:
    print(vehicle)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Vehicle().load({"id": "vehicle_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VehicleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = StarWarsDatabankSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

