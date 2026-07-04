// Typed models for the StarWarsDatabank SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Character {
  affiliation?: string
  description?: string
  homeworld?: string
  id?: string
  image?: string
  name?: string
  species?: string
  url?: string
}

export interface CharacterLoadMatch {
  id: string
}

export type CharacterListMatch = Partial<Character>

export interface Creature {
  classification?: string
  description?: string
  habitat?: string
  id?: string
  image?: string
  name?: string
  url?: string
}

export interface CreatureLoadMatch {
  id: string
}

export type CreatureListMatch = Partial<Creature>

export interface Droid {
  affiliation?: string
  description?: string
  id?: string
  image?: string
  manufacturer?: string
  name?: string
  type?: string
  url?: string
}

export interface DroidLoadMatch {
  id: string
}

export type DroidListMatch = Partial<Droid>

export interface Location {
  description?: string
  id?: string
  image?: string
  name?: string
  region?: string
  sector?: string
  terrain?: string
  url?: string
}

export interface LocationLoadMatch {
  id: string
}

export type LocationListMatch = Partial<Location>

export interface Organization {
  allegiance?: string
  description?: string
  id?: string
  image?: string
  leader?: string
  name?: string
  type?: string
  url?: string
}

export interface OrganizationLoadMatch {
  id: string
}

export type OrganizationListMatch = Partial<Organization>

export interface Species {
  classification?: string
  description?: string
  designation?: string
  homeworld?: string
  id?: string
  image?: string
  language?: string
  name?: string
  url?: string
}

export interface SpeciesLoadMatch {
  id: string
}

export type SpeciesListMatch = Partial<Species>

export interface Vehicle {
  affiliation?: string
  armament?: string
  class?: string
  crew?: string
  description?: string
  id?: string
  image?: string
  length?: string
  manufacturer?: string
  name?: string
  url?: string
}

export interface VehicleLoadMatch {
  id: string
}

export type VehicleListMatch = Partial<Vehicle>

