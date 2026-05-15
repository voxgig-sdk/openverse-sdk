package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAudioEntityFunc func(client *OpenverseSDK, entopts map[string]any) OpenverseEntity

var NewImageEntityFunc func(client *OpenverseSDK, entopts map[string]any) OpenverseEntity

var NewOAuth2ApplicationEntityFunc func(client *OpenverseSDK, entopts map[string]any) OpenverseEntity

var NewOAuth2KeyInfoEntityFunc func(client *OpenverseSDK, entopts map[string]any) OpenverseEntity

var NewOAuth2TokenEntityFunc func(client *OpenverseSDK, entopts map[string]any) OpenverseEntity

