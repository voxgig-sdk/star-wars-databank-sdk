-- Typed models for the StarWarsDatabank SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Character
---@field affiliation? string
---@field description? string
---@field homeworld? string
---@field id? string
---@field image? string
---@field name? string
---@field species? string
---@field url? string

---@class CharacterLoadMatch
---@field id string

---@class CharacterListMatch

---@class Creature
---@field classification? string
---@field description? string
---@field habitat? string
---@field id? string
---@field image? string
---@field name? string
---@field url? string

---@class CreatureLoadMatch
---@field id string

---@class CreatureListMatch

---@class Droid
---@field affiliation? string
---@field description? string
---@field id? string
---@field image? string
---@field manufacturer? string
---@field name? string
---@field type? string
---@field url? string

---@class DroidLoadMatch
---@field id string

---@class DroidListMatch

---@class Location
---@field description? string
---@field id? string
---@field image? string
---@field name? string
---@field region? string
---@field sector? string
---@field terrain? string
---@field url? string

---@class LocationLoadMatch
---@field id string

---@class LocationListMatch

---@class Organization
---@field allegiance? string
---@field description? string
---@field id? string
---@field image? string
---@field leader? string
---@field name? string
---@field type? string
---@field url? string

---@class OrganizationLoadMatch
---@field id string

---@class OrganizationListMatch

---@class Species
---@field classification? string
---@field description? string
---@field designation? string
---@field homeworld? string
---@field id? string
---@field image? string
---@field language? string
---@field name? string
---@field url? string

---@class SpeciesLoadMatch
---@field id string

---@class SpeciesListMatch

---@class Vehicle
---@field affiliation? string
---@field armament? string
---@field class? string
---@field crew? string
---@field description? string
---@field id? string
---@field image? string
---@field length? string
---@field manufacturer? string
---@field name? string
---@field url? string

---@class VehicleLoadMatch
---@field id string

---@class VehicleListMatch

local M = {}

return M
