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

export interface CharacterListMatch {
  limit?: number
  page?: number
}

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

export interface CreatureListMatch {
  limit?: number
  page?: number
}

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

export interface DroidListMatch {
  limit?: number
  page?: number
}

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

export interface LocationListMatch {
  limit?: number
  page?: number
}

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

export interface OrganizationListMatch {
  limit?: number
  page?: number
}

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

export interface SpeciesListMatch {
  limit?: number
  page?: number
}

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

export interface VehicleListMatch {
  limit?: number
  page?: number
}

