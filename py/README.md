# StarWarsDatabank Python SDK



The Python SDK for the StarWarsDatabank API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Character()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/star-wars-databank-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from starwarsdatabank_sdk import StarWarsDatabankSDK

client = StarWarsDatabankSDK()
```

### 2. List character records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    characters = client.Character().list()
    for character in characters:
        print(character)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a character

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    character = client.Character().load({"id": "example_id"})
    print(character)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    locations = client.Location().list()
    print(locations)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = StarWarsDatabankSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
location = client.Location().list()
# location contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = StarWarsDatabankSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### StarWarsDatabankSDK

```python
from starwarsdatabank_sdk import StarWarsDatabankSDK

client = StarWarsDatabankSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = StarWarsDatabankSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### StarWarsDatabankSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `character = client.Character()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `str` | Character's affiliation or allegiance |
| `description` | `str` | Detailed description of the character |
| `homeworld` | `str` | Character's home planet |
| `id` | `str` | Unique identifier for the character |
| `image` | `str` | URL to the character's image |
| `name` | `str` | Name of the character |
| `species` | `str` | Character's species |
| `url` | `str` | URL to the official Star Wars Databank entry |

#### Example: Load

```python
character = client.Character().load({"id": "character_id"})
```

#### Example: List

```python
characters = client.Character().list()
```


### Creature

Create an instance: `creature = client.Creature()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `classification` | `str` | Creature's classification |
| `description` | `str` | Detailed description of the creature |
| `habitat` | `str` | Creature's natural habitat |
| `id` | `str` | Unique identifier for the creature |
| `image` | `str` | URL to the creature's image |
| `name` | `str` | Name of the creature |
| `url` | `str` | URL to the official Star Wars Databank entry |

#### Example: Load

```python
creature = client.Creature().load({"id": "creature_id"})
```

#### Example: List

```python
creatures = client.Creature().list()
```


### Droid

Create an instance: `droid = client.Droid()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `str` | Droid's affiliation |
| `description` | `str` | Detailed description of the droid |
| `id` | `str` | Unique identifier for the droid |
| `image` | `str` | URL to the droid's image |
| `manufacturer` | `str` | Droid's manufacturer |
| `name` | `str` | Name or designation of the droid |
| `type` | `str` | Droid type or class |
| `url` | `str` | URL to the official Star Wars Databank entry |

#### Example: Load

```python
droid = client.Droid().load({"id": "droid_id"})
```

#### Example: List

```python
droids = client.Droid().list()
```


### Location

Create an instance: `location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Detailed description of the location |
| `id` | `str` | Unique identifier for the location |
| `image` | `str` | URL to the location's image |
| `name` | `str` | Name of the location |
| `region` | `str` | Galactic region where the location is situated |
| `sector` | `str` | Sector where the location is situated |
| `terrain` | `str` | Terrain type of the location |
| `url` | `str` | URL to the official Star Wars Databank entry |

#### Example: Load

```python
location = client.Location().load({"id": "location_id"})
```

#### Example: List

```python
locations = client.Location().list()
```


### Organization

Create an instance: `organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allegiance` | `str` | Organization's allegiance |
| `description` | `str` | Detailed description of the organization |
| `id` | `str` | Unique identifier for the organization |
| `image` | `str` | URL to the organization's image |
| `leader` | `str` | Leader of the organization |
| `name` | `str` | Name of the organization |
| `type` | `str` | Type of organization |
| `url` | `str` | URL to the official Star Wars Databank entry |

#### Example: Load

```python
organization = client.Organization().load({"id": "organization_id"})
```

#### Example: List

```python
organizations = client.Organization().list()
```


### Species

Create an instance: `species = client.Species()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `classification` | `str` | Biological classification |
| `description` | `str` | Detailed description of the species |
| `designation` | `str` | Sentience designation |
| `homeworld` | `str` | Homeworld of the species |
| `id` | `str` | Unique identifier for the species |
| `image` | `str` | URL to the species' image |
| `language` | `str` | Language spoken by the species |
| `name` | `str` | Name of the species |
| `url` | `str` | URL to the official Star Wars Databank entry |

#### Example: Load

```python
species = client.Species().load({"id": "species_id"})
```

#### Example: List

```python
speciess = client.Species().list()
```


### Vehicle

Create an instance: `vehicle = client.Vehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affiliation` | `str` | Vehicle's affiliation |
| `armament` | `str` | Vehicle armament |
| `class` | `str` | Vehicle class or type |
| `crew` | `str` | Crew capacity |
| `description` | `str` | Detailed description of the vehicle |
| `id` | `str` | Unique identifier for the vehicle |
| `image` | `str` | URL to the vehicle's image |
| `length` | `str` | Length of the vehicle |
| `manufacturer` | `str` | Vehicle manufacturer |
| `name` | `str` | Name of the vehicle |
| `url` | `str` | URL to the official Star Wars Databank entry |

#### Example: Load

```python
vehicle = client.Vehicle().load({"id": "vehicle_id"})
```

#### Example: List

```python
vehicles = client.Vehicle().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── starwarsdatabank_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`starwarsdatabank_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
location = client.Location()
location.list()

# location.data_get() now returns the location data from the last list
# location.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
