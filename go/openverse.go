package voxgigopenversesdk

import (
	"github.com/voxgig-sdk/openverse-sdk/go/core"
	"github.com/voxgig-sdk/openverse-sdk/go/entity"
	"github.com/voxgig-sdk/openverse-sdk/go/feature"
	_ "github.com/voxgig-sdk/openverse-sdk/go/utility"
)

// Type aliases preserve external API.
type OpenverseSDK = core.OpenverseSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OpenverseEntity = core.OpenverseEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OpenverseError = core.OpenverseError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAudioEntityFunc = func(client *core.OpenverseSDK, entopts map[string]any) core.OpenverseEntity {
		return entity.NewAudioEntity(client, entopts)
	}
	core.NewImageEntityFunc = func(client *core.OpenverseSDK, entopts map[string]any) core.OpenverseEntity {
		return entity.NewImageEntity(client, entopts)
	}
	core.NewOAuth2ApplicationEntityFunc = func(client *core.OpenverseSDK, entopts map[string]any) core.OpenverseEntity {
		return entity.NewOAuth2ApplicationEntity(client, entopts)
	}
	core.NewOAuth2KeyInfoEntityFunc = func(client *core.OpenverseSDK, entopts map[string]any) core.OpenverseEntity {
		return entity.NewOAuth2KeyInfoEntity(client, entopts)
	}
	core.NewOAuth2TokenEntityFunc = func(client *core.OpenverseSDK, entopts map[string]any) core.OpenverseEntity {
		return entity.NewOAuth2TokenEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpenverseSDK = core.NewOpenverseSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
