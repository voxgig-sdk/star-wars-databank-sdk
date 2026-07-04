# StarWarsDatabank PHP SDK



The PHP SDK for the StarWarsDatabank API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/star-wars-databank-sdk/releases](https://github.com/voxgig-sdk/star-wars-databank-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'starwarsdatabank_sdk.php';

$client = new StarWarsDatabankSDK();
```

### 2. List characters

```php
try {
    $result = $client->character()->list();
    if (is_array($result)) {
        foreach ($result as $item) {
            $d = $item->data_get();
            echo $d["id"] . " " . $d["name"] . "\n";
        }
    }
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a character

```php
try {
    $result = $client->character()->load(["id" => "example_id"]);
    print_r($result);
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = StarWarsDatabankSDK::test();

$result = $client->character()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new StarWarsDatabankSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
STAR_WARS_DATABANK_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### StarWarsDatabankSDK

```php
require_once 'starwarsdatabank_sdk.php';
$client = new StarWarsDatabankSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = StarWarsDatabankSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### StarWarsDatabankSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Character` | `($data): CharacterEntity` | Create a Character entity instance. |
| `Creature` | `($data): CreatureEntity` | Create a Creature entity instance. |
| `Droid` | `($data): DroidEntity` | Create a Droid entity instance. |
| `Location` | `($data): LocationEntity` | Create a Location entity instance. |
| `Organization` | `($data): OrganizationEntity` | Create a Organization entity instance. |
| `Species` | `($data): SpeciesEntity` | Create a Species entity instance. |
| `Vehicle` | `($data): VehicleEntity` | Create a Vehicle entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── starwarsdatabank_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`starwarsdatabank_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$character = $client->character();
$character->load(["id" => "example_id"]);

// $character->dataGet() now returns the loaded character data
// $character->matchGet() returns the last match criteria
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
