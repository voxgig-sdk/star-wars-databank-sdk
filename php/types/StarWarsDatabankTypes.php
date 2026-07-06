<?php
declare(strict_types=1);

// Typed models for the StarWarsDatabank SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Character entity data model. */
class Character
{
    public ?string $affiliation = null;
    public ?string $description = null;
    public ?string $homeworld = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $species = null;
    public ?string $url = null;
}

/** Request payload for Character#load. */
class CharacterLoadMatch
{
    public string $id;
}

/** Request payload for Character#list. */
class CharacterListMatch
{
    public ?string $affiliation = null;
    public ?string $description = null;
    public ?string $homeworld = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $species = null;
    public ?string $url = null;
}

/** Creature entity data model. */
class Creature
{
    public ?string $classification = null;
    public ?string $description = null;
    public ?string $habitat = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Request payload for Creature#load. */
class CreatureLoadMatch
{
    public string $id;
}

/** Request payload for Creature#list. */
class CreatureListMatch
{
    public ?string $classification = null;
    public ?string $description = null;
    public ?string $habitat = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Droid entity data model. */
class Droid
{
    public ?string $affiliation = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $manufacturer = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Request payload for Droid#load. */
class DroidLoadMatch
{
    public string $id;
}

/** Request payload for Droid#list. */
class DroidListMatch
{
    public ?string $affiliation = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $manufacturer = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Location entity data model. */
class Location
{
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $region = null;
    public ?string $sector = null;
    public ?string $terrain = null;
    public ?string $url = null;
}

/** Request payload for Location#load. */
class LocationLoadMatch
{
    public string $id;
}

/** Request payload for Location#list. */
class LocationListMatch
{
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $region = null;
    public ?string $sector = null;
    public ?string $terrain = null;
    public ?string $url = null;
}

/** Organization entity data model. */
class Organization
{
    public ?string $allegiance = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $leader = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Request payload for Organization#load. */
class OrganizationLoadMatch
{
    public string $id;
}

/** Request payload for Organization#list. */
class OrganizationListMatch
{
    public ?string $allegiance = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $leader = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Species entity data model. */
class Species
{
    public ?string $classification = null;
    public ?string $description = null;
    public ?string $designation = null;
    public ?string $homeworld = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $language = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Request payload for Species#load. */
class SpeciesLoadMatch
{
    public string $id;
}

/** Request payload for Species#list. */
class SpeciesListMatch
{
    public ?string $classification = null;
    public ?string $description = null;
    public ?string $designation = null;
    public ?string $homeworld = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $language = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Vehicle entity data model. */
class Vehicle
{
    public ?string $affiliation = null;
    public ?string $armament = null;
    public ?string $class = null;
    public ?string $crew = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $length = null;
    public ?string $manufacturer = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Request payload for Vehicle#load. */
class VehicleLoadMatch
{
    public string $id;
}

/** Request payload for Vehicle#list. */
class VehicleListMatch
{
    public ?string $affiliation = null;
    public ?string $armament = null;
    public ?string $class = null;
    public ?string $crew = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $image = null;
    public ?string $length = null;
    public ?string $manufacturer = null;
    public ?string $name = null;
    public ?string $url = null;
}

