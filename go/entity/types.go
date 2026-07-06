// Typed models for the StarWarsDatabank SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Character is the typed data model for the character entity.
type Character struct {
	Affiliation *string `json:"affiliation,omitempty"`
	Description *string `json:"description,omitempty"`
	Homeworld *string `json:"homeworld,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	Species *string `json:"species,omitempty"`
	Url *string `json:"url,omitempty"`
}

// CharacterLoadMatch is the typed request payload for Character.LoadTyped.
type CharacterLoadMatch struct {
	Id string `json:"id"`
}

// CharacterListMatch is the typed request payload for Character.ListTyped.
type CharacterListMatch struct {
	Affiliation *string `json:"affiliation,omitempty"`
	Description *string `json:"description,omitempty"`
	Homeworld *string `json:"homeworld,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	Species *string `json:"species,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Creature is the typed data model for the creature entity.
type Creature struct {
	Classification *string `json:"classification,omitempty"`
	Description *string `json:"description,omitempty"`
	Habitat *string `json:"habitat,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// CreatureLoadMatch is the typed request payload for Creature.LoadTyped.
type CreatureLoadMatch struct {
	Id string `json:"id"`
}

// CreatureListMatch is the typed request payload for Creature.ListTyped.
type CreatureListMatch struct {
	Classification *string `json:"classification,omitempty"`
	Description *string `json:"description,omitempty"`
	Habitat *string `json:"habitat,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Droid is the typed data model for the droid entity.
type Droid struct {
	Affiliation *string `json:"affiliation,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// DroidLoadMatch is the typed request payload for Droid.LoadTyped.
type DroidLoadMatch struct {
	Id string `json:"id"`
}

// DroidListMatch is the typed request payload for Droid.ListTyped.
type DroidListMatch struct {
	Affiliation *string `json:"affiliation,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Location is the typed data model for the location entity.
type Location struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *string `json:"region,omitempty"`
	Sector *string `json:"sector,omitempty"`
	Terrain *string `json:"terrain,omitempty"`
	Url *string `json:"url,omitempty"`
}

// LocationLoadMatch is the typed request payload for Location.LoadTyped.
type LocationLoadMatch struct {
	Id string `json:"id"`
}

// LocationListMatch is the typed request payload for Location.ListTyped.
type LocationListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Name *string `json:"name,omitempty"`
	Region *string `json:"region,omitempty"`
	Sector *string `json:"sector,omitempty"`
	Terrain *string `json:"terrain,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Organization is the typed data model for the organization entity.
type Organization struct {
	Allegiance *string `json:"allegiance,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Leader *string `json:"leader,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// OrganizationLoadMatch is the typed request payload for Organization.LoadTyped.
type OrganizationLoadMatch struct {
	Id string `json:"id"`
}

// OrganizationListMatch is the typed request payload for Organization.ListTyped.
type OrganizationListMatch struct {
	Allegiance *string `json:"allegiance,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Leader *string `json:"leader,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Species is the typed data model for the species entity.
type Species struct {
	Classification *string `json:"classification,omitempty"`
	Description *string `json:"description,omitempty"`
	Designation *string `json:"designation,omitempty"`
	Homeworld *string `json:"homeworld,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Language *string `json:"language,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// SpeciesLoadMatch is the typed request payload for Species.LoadTyped.
type SpeciesLoadMatch struct {
	Id string `json:"id"`
}

// SpeciesListMatch is the typed request payload for Species.ListTyped.
type SpeciesListMatch struct {
	Classification *string `json:"classification,omitempty"`
	Description *string `json:"description,omitempty"`
	Designation *string `json:"designation,omitempty"`
	Homeworld *string `json:"homeworld,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Language *string `json:"language,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Vehicle is the typed data model for the vehicle entity.
type Vehicle struct {
	Affiliation *string `json:"affiliation,omitempty"`
	Armament *string `json:"armament,omitempty"`
	Class *string `json:"class,omitempty"`
	Crew *string `json:"crew,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Length *string `json:"length,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// VehicleLoadMatch is the typed request payload for Vehicle.LoadTyped.
type VehicleLoadMatch struct {
	Id string `json:"id"`
}

// VehicleListMatch is the typed request payload for Vehicle.ListTyped.
type VehicleListMatch struct {
	Affiliation *string `json:"affiliation,omitempty"`
	Armament *string `json:"armament,omitempty"`
	Class *string `json:"class,omitempty"`
	Crew *string `json:"crew,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	Length *string `json:"length,omitempty"`
	Manufacturer *string `json:"manufacturer,omitempty"`
	Name *string `json:"name,omitempty"`
	Url *string `json:"url,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
