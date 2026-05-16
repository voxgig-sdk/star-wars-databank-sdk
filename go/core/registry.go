package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCharacterEntityFunc func(client *StarWarsDatabankSDK, entopts map[string]any) StarWarsDatabankEntity

var NewCreatureEntityFunc func(client *StarWarsDatabankSDK, entopts map[string]any) StarWarsDatabankEntity

var NewDroidEntityFunc func(client *StarWarsDatabankSDK, entopts map[string]any) StarWarsDatabankEntity

var NewLocationEntityFunc func(client *StarWarsDatabankSDK, entopts map[string]any) StarWarsDatabankEntity

var NewOrganizationEntityFunc func(client *StarWarsDatabankSDK, entopts map[string]any) StarWarsDatabankEntity

var NewSpeciesEntityFunc func(client *StarWarsDatabankSDK, entopts map[string]any) StarWarsDatabankEntity

var NewVehicleEntityFunc func(client *StarWarsDatabankSDK, entopts map[string]any) StarWarsDatabankEntity

