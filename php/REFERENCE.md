# StarWarsDatabank PHP SDK Reference

Complete API reference for the StarWarsDatabank PHP SDK.


## StarWarsDatabankSDK

### Constructor

```php
require_once __DIR__ . '/starwarsdatabank_sdk.php';

$client = new StarWarsDatabankSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StarWarsDatabankSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = StarWarsDatabankSDK::test();
```


### Instance Methods

#### `Character($data = null)`

Create a new `CharacterEntity` instance. Pass `null` for no initial data.

#### `Creature($data = null)`

Create a new `CreatureEntity` instance. Pass `null` for no initial data.

#### `Droid($data = null)`

Create a new `DroidEntity` instance. Pass `null` for no initial data.

#### `Location($data = null)`

Create a new `LocationEntity` instance. Pass `null` for no initial data.

#### `Organization($data = null)`

Create a new `OrganizationEntity` instance. Pass `null` for no initial data.

#### `Species($data = null)`

Create a new `SpeciesEntity` instance. Pass `null` for no initial data.

#### `Vehicle($data = null)`

Create a new `VehicleEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): StarWarsDatabankUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CharacterEntity

```php
$character = $client->Character();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Character()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Character()->load(["id" => "character_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CharacterEntity`

Create a new `CharacterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CreatureEntity

```php
$creature = $client->Creature();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Creature()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Creature()->load(["id" => "creature_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CreatureEntity`

Create a new `CreatureEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DroidEntity

```php
$droid = $client->Droid();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Droid()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Droid()->load(["id" => "droid_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DroidEntity`

Create a new `DroidEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LocationEntity

```php
$location = $client->Location();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Location()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Location()->load(["id" => "location_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LocationEntity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrganizationEntity

```php
$organization = $client->Organization();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Organization()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Organization()->load(["id" => "organization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrganizationEntity`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SpeciesEntity

```php
$species = $client->Species();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Species()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Species()->load(["id" => "species_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SpeciesEntity`

Create a new `SpeciesEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VehicleEntity

```php
$vehicle = $client->Vehicle();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Vehicle()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Vehicle()->load(["id" => "vehicle_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VehicleEntity`

Create a new `VehicleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new StarWarsDatabankSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

