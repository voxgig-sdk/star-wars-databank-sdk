# Typed models for the StarWarsDatabank SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Character:
    affiliation: Optional[str] = None
    description: Optional[str] = None
    homeworld: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    name: Optional[str] = None
    species: Optional[str] = None
    url: Optional[str] = None


@dataclass
class CharacterLoadMatch:
    id: str


@dataclass
class CharacterListMatch:
    affiliation: Optional[str] = None
    description: Optional[str] = None
    homeworld: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    name: Optional[str] = None
    species: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Creature:
    classification: Optional[str] = None
    description: Optional[str] = None
    habitat: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class CreatureLoadMatch:
    id: str


@dataclass
class CreatureListMatch:
    classification: Optional[str] = None
    description: Optional[str] = None
    habitat: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Droid:
    affiliation: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    manufacturer: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class DroidLoadMatch:
    id: str


@dataclass
class DroidListMatch:
    affiliation: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    manufacturer: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Location:
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    name: Optional[str] = None
    region: Optional[str] = None
    sector: Optional[str] = None
    terrain: Optional[str] = None
    url: Optional[str] = None


@dataclass
class LocationLoadMatch:
    id: str


@dataclass
class LocationListMatch:
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    name: Optional[str] = None
    region: Optional[str] = None
    sector: Optional[str] = None
    terrain: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Organization:
    allegiance: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    leader: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class OrganizationLoadMatch:
    id: str


@dataclass
class OrganizationListMatch:
    allegiance: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    leader: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Species:
    classification: Optional[str] = None
    description: Optional[str] = None
    designation: Optional[str] = None
    homeworld: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    language: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class SpeciesLoadMatch:
    id: str


@dataclass
class SpeciesListMatch:
    classification: Optional[str] = None
    description: Optional[str] = None
    designation: Optional[str] = None
    homeworld: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    language: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Vehicle:
    affiliation: Optional[str] = None
    armament: Optional[str] = None
    crew: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    length: Optional[str] = None
    manufacturer: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None


@dataclass
class VehicleLoadMatch:
    id: str


@dataclass
class VehicleListMatch:
    affiliation: Optional[str] = None
    armament: Optional[str] = None
    crew: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    image: Optional[str] = None
    length: Optional[str] = None
    manufacturer: Optional[str] = None
    name: Optional[str] = None
    url: Optional[str] = None

