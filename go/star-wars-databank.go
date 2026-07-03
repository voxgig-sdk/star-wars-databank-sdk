package voxgigstarwarsdatabanksdk

import (
	"github.com/voxgig-sdk/star-wars-databank-sdk/go/core"
	"github.com/voxgig-sdk/star-wars-databank-sdk/go/entity"
	"github.com/voxgig-sdk/star-wars-databank-sdk/go/feature"
	_ "github.com/voxgig-sdk/star-wars-databank-sdk/go/utility"
)

// Type aliases preserve external API.
type StarWarsDatabankSDK = core.StarWarsDatabankSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type StarWarsDatabankEntity = core.StarWarsDatabankEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type StarWarsDatabankError = core.StarWarsDatabankError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCharacterEntityFunc = func(client *core.StarWarsDatabankSDK, entopts map[string]any) core.StarWarsDatabankEntity {
		return entity.NewCharacterEntity(client, entopts)
	}
	core.NewCreatureEntityFunc = func(client *core.StarWarsDatabankSDK, entopts map[string]any) core.StarWarsDatabankEntity {
		return entity.NewCreatureEntity(client, entopts)
	}
	core.NewDroidEntityFunc = func(client *core.StarWarsDatabankSDK, entopts map[string]any) core.StarWarsDatabankEntity {
		return entity.NewDroidEntity(client, entopts)
	}
	core.NewLocationEntityFunc = func(client *core.StarWarsDatabankSDK, entopts map[string]any) core.StarWarsDatabankEntity {
		return entity.NewLocationEntity(client, entopts)
	}
	core.NewOrganizationEntityFunc = func(client *core.StarWarsDatabankSDK, entopts map[string]any) core.StarWarsDatabankEntity {
		return entity.NewOrganizationEntity(client, entopts)
	}
	core.NewSpeciesEntityFunc = func(client *core.StarWarsDatabankSDK, entopts map[string]any) core.StarWarsDatabankEntity {
		return entity.NewSpeciesEntity(client, entopts)
	}
	core.NewVehicleEntityFunc = func(client *core.StarWarsDatabankSDK, entopts map[string]any) core.StarWarsDatabankEntity {
		return entity.NewVehicleEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewStarWarsDatabankSDK = core.NewStarWarsDatabankSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewStarWarsDatabankSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *StarWarsDatabankSDK  { return NewStarWarsDatabankSDK(nil) }
func Test() *StarWarsDatabankSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
