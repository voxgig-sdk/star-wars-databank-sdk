# Typed models for the StarWarsDatabank SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Character(TypedDict, total=False):
    affiliation: str
    description: str
    homeworld: str
    id: str
    image: str
    name: str
    species: str
    url: str


class CharacterLoadMatch(TypedDict):
    id: str


class CharacterListMatch(TypedDict, total=False):
    affiliation: str
    description: str
    homeworld: str
    id: str
    image: str
    name: str
    species: str
    url: str


class Creature(TypedDict, total=False):
    classification: str
    description: str
    habitat: str
    id: str
    image: str
    name: str
    url: str


class CreatureLoadMatch(TypedDict):
    id: str


class CreatureListMatch(TypedDict, total=False):
    classification: str
    description: str
    habitat: str
    id: str
    image: str
    name: str
    url: str


class Droid(TypedDict, total=False):
    affiliation: str
    description: str
    id: str
    image: str
    manufacturer: str
    name: str
    type: str
    url: str


class DroidLoadMatch(TypedDict):
    id: str


class DroidListMatch(TypedDict, total=False):
    affiliation: str
    description: str
    id: str
    image: str
    manufacturer: str
    name: str
    type: str
    url: str


class Location(TypedDict, total=False):
    description: str
    id: str
    image: str
    name: str
    region: str
    sector: str
    terrain: str
    url: str


class LocationLoadMatch(TypedDict):
    id: str


class LocationListMatch(TypedDict, total=False):
    description: str
    id: str
    image: str
    name: str
    region: str
    sector: str
    terrain: str
    url: str


class Organization(TypedDict, total=False):
    allegiance: str
    description: str
    id: str
    image: str
    leader: str
    name: str
    type: str
    url: str


class OrganizationLoadMatch(TypedDict):
    id: str


class OrganizationListMatch(TypedDict, total=False):
    allegiance: str
    description: str
    id: str
    image: str
    leader: str
    name: str
    type: str
    url: str


class Species(TypedDict, total=False):
    classification: str
    description: str
    designation: str
    homeworld: str
    id: str
    image: str
    language: str
    name: str
    url: str


class SpeciesLoadMatch(TypedDict):
    id: str


class SpeciesListMatch(TypedDict, total=False):
    classification: str
    description: str
    designation: str
    homeworld: str
    id: str
    image: str
    language: str
    name: str
    url: str


class Vehicle(TypedDict, total=False):
    affiliation: str
    armament: str
    crew: str
    description: str
    id: str
    image: str
    length: str
    manufacturer: str
    name: str
    url: str


class VehicleLoadMatch(TypedDict):
    id: str


class VehicleListMatch(TypedDict, total=False):
    affiliation: str
    armament: str
    crew: str
    description: str
    id: str
    image: str
    length: str
    manufacturer: str
    name: str
    url: str
