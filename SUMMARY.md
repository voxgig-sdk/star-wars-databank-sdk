# Star Wars Databank API

The Star Wars Databank API provides access to a comprehensive collection of data related to the Star Wars universe including characters, droids, creatures, locations, organizations, species, and vehicles. It is a RESTful API that presents official information derived directly from the Star Wars Databank, allowing users to explore and interact with the vast lore of the saga.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 14 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Character

Results: Successful response with list of characters; Successful response with character details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `affiliation`: Character&#39;s affiliation or allegiance
- `description`: Detailed description of the character
- `homeworld`: Character&#39;s home planet
- `id`: Unique identifier for the character
- `image`: URL to the character&#39;s image

### Creature

Results: Successful response with list of creatures; Successful response with creature details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `classification`: Creature&#39;s classification
- `description`: Detailed description of the creature
- `habitat`: Creature&#39;s natural habitat
- `id`: Unique identifier for the creature
- `image`: URL to the creature&#39;s image

### Droid

Results: Successful response with list of droids; Successful response with droid details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `affiliation`: Droid&#39;s affiliation
- `description`: Detailed description of the droid
- `id`: Unique identifier for the droid
- `image`: URL to the droid&#39;s image
- `manufacturer`: Droid&#39;s manufacturer

### Location

Results: Successful response with list of locations; Successful response with location details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Detailed description of the location
- `id`: Unique identifier for the location
- `image`: URL to the location&#39;s image
- `name`: Name of the location
- `region`: Galactic region where the location is situated

### Organization

Results: Successful response with list of organizations; Successful response with organization details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `allegiance`: Organization&#39;s allegiance
- `description`: Detailed description of the organization
- `id`: Unique identifier for the organization
- `image`: URL to the organization&#39;s image
- `leader`: Leader of the organization

### Species

Results: Successful response with list of species; Successful response with species details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `classification`: Biological classification
- `description`: Detailed description of the species
- `designation`: Sentience designation
- `homeworld`: Homeworld of the species
- `id`: Unique identifier for the species

### Vehicle

Results: Successful response with list of vehicles; Successful response with vehicle details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `affiliation`: Vehicle&#39;s affiliation
- `armament`: Vehicle armament
- `class`: Vehicle class or type
- `crew`: Crew capacity
- `description`: Detailed description of the vehicle

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Character | `list` | `GET /characters` | See reference |
| Character | `load` | `GET /characters/{id}` | See reference |
| Creature | `list` | `GET /creatures` | See reference |
| Creature | `load` | `GET /creatures/{id}` | See reference |
| Droid | `list` | `GET /droids` | See reference |
| Droid | `load` | `GET /droids/{id}` | See reference |
| Location | `list` | `GET /locations` | See reference |
| Location | `load` | `GET /locations/{id}` | See reference |
| Organization | `list` | `GET /organizations` | See reference |
| Organization | `load` | `GET /organizations/{id}` | See reference |
| Species | `list` | `GET /species` | See reference |
| Species | `load` | `GET /species/{id}` | See reference |
| Vehicle | `list` | `GET /vehicles` | See reference |
| Vehicle | `load` | `GET /vehicles/{id}` | See reference |

## Connect to the API

- Production server: `https://starwars-databank-server.onrender.com/api/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `star-wars-databank_list`: List records for an entity. Supported entities: `character`, `creature`, `droid`, `location`, `organization`, `species`, `vehicle`.
- `star-wars-databank_load`: Load one record for an entity. Supported entities: `character`, `creature`, `droid`, `location`, `organization`, `species`, `vehicle`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

