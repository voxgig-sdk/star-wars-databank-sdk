# frozen_string_literal: true

# Typed models for the StarWarsDatabank SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Character entity data model.
#
# @!attribute [rw] affiliation
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] homeworld
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] species
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Character = Struct.new(
  :affiliation,
  :description,
  :homeworld,
  :id,
  :image,
  :name,
  :species,
  :url,
  keyword_init: true
)

# Request payload for Character#load.
#
# @!attribute [rw] id
#   @return [String]
CharacterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Character#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
CharacterListMatch = Struct.new(
  :limit,
  :page,
  keyword_init: true
)

# Creature entity data model.
#
# @!attribute [rw] classification
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] habitat
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Creature = Struct.new(
  :classification,
  :description,
  :habitat,
  :id,
  :image,
  :name,
  :url,
  keyword_init: true
)

# Request payload for Creature#load.
#
# @!attribute [rw] id
#   @return [String]
CreatureLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Creature#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
CreatureListMatch = Struct.new(
  :limit,
  :page,
  keyword_init: true
)

# Droid entity data model.
#
# @!attribute [rw] affiliation
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Droid = Struct.new(
  :affiliation,
  :description,
  :id,
  :image,
  :manufacturer,
  :name,
  :type,
  :url,
  keyword_init: true
)

# Request payload for Droid#load.
#
# @!attribute [rw] id
#   @return [String]
DroidLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Droid#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
DroidListMatch = Struct.new(
  :limit,
  :page,
  keyword_init: true
)

# Location entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] sector
#   @return [String, nil]
#
# @!attribute [rw] terrain
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Location = Struct.new(
  :description,
  :id,
  :image,
  :name,
  :region,
  :sector,
  :terrain,
  :url,
  keyword_init: true
)

# Request payload for Location#load.
#
# @!attribute [rw] id
#   @return [String]
LocationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Location#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
LocationListMatch = Struct.new(
  :limit,
  :page,
  keyword_init: true
)

# Organization entity data model.
#
# @!attribute [rw] allegiance
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] leader
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Organization = Struct.new(
  :allegiance,
  :description,
  :id,
  :image,
  :leader,
  :name,
  :type,
  :url,
  keyword_init: true
)

# Request payload for Organization#load.
#
# @!attribute [rw] id
#   @return [String]
OrganizationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Organization#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
OrganizationListMatch = Struct.new(
  :limit,
  :page,
  keyword_init: true
)

# Species entity data model.
#
# @!attribute [rw] classification
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] designation
#   @return [String, nil]
#
# @!attribute [rw] homeworld
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Species = Struct.new(
  :classification,
  :description,
  :designation,
  :homeworld,
  :id,
  :image,
  :language,
  :name,
  :url,
  keyword_init: true
)

# Request payload for Species#load.
#
# @!attribute [rw] id
#   @return [String]
SpeciesLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Species#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
SpeciesListMatch = Struct.new(
  :limit,
  :page,
  keyword_init: true
)

# Vehicle entity data model.
#
# @!attribute [rw] affiliation
#   @return [String, nil]
#
# @!attribute [rw] armament
#   @return [String, nil]
#
# @!attribute [rw] class
#   @return [String, nil]
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] length
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Vehicle = Struct.new(
  :affiliation,
  :armament,
  :class,
  :crew,
  :description,
  :id,
  :image,
  :length,
  :manufacturer,
  :name,
  :url,
  keyword_init: true
)

# Request payload for Vehicle#load.
#
# @!attribute [rw] id
#   @return [String]
VehicleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Vehicle#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
VehicleListMatch = Struct.new(
  :limit,
  :page,
  keyword_init: true
)

