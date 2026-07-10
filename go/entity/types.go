// Typed models for the Openverse SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Audio is the typed data model for the audio entity.
type Audio struct {
	AltFile []any `json:"alt_file"`
	Attribution string `json:"attribution"`
	AudioSet any `json:"audio_set"`
	BitRate *int `json:"bit_rate,omitempty"`
	Category *string `json:"category,omitempty"`
	Creator *string `json:"creator,omitempty"`
	CreatorUrl *string `json:"creator_url,omitempty"`
	Description *string `json:"description,omitempty"`
	DetailUrl string `json:"detail_url"`
	DisplayName string `json:"display_name"`
	Duration *int `json:"duration,omitempty"`
	FieldsMatched []any `json:"fields_matched"`
	Filesize *int `json:"filesize,omitempty"`
	Filetype *string `json:"filetype,omitempty"`
	ForeignLandingUrl *string `json:"foreign_landing_url,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id string `json:"id"`
	Identifier string `json:"identifier"`
	IndexedOn string `json:"indexed_on"`
	Len int `json:"len"`
	License string `json:"license"`
	LicenseUrl string `json:"license_url"`
	LicenseVersion *string `json:"license_version,omitempty"`
	LogoUrl string `json:"logo_url"`
	Mature bool `json:"mature"`
	MediaCount int `json:"media_count"`
	Point []any `json:"point"`
	Provider *string `json:"provider,omitempty"`
	Reason any `json:"reason"`
	RelatedUrl string `json:"related_url"`
	SampleRate *int `json:"sample_rate,omitempty"`
	Source *string `json:"source,omitempty"`
	SourceName string `json:"source_name"`
	SourceUrl string `json:"source_url"`
	Tag []any `json:"tag"`
	Thumbnail string `json:"thumbnail"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
	Waveform string `json:"waveform"`
}

// AudioLoadMatch is the typed request payload for Audio.LoadTyped.
type AudioLoadMatch struct {
	Identifier *string `json:"identifier,omitempty"`
	Id *string `json:"id,omitempty"`
}

// AudioListMatch is the typed request payload for Audio.ListTyped.
type AudioListMatch struct {
	AltFile *[]any `json:"alt_file,omitempty"`
	Attribution *string `json:"attribution,omitempty"`
	AudioSet *any `json:"audio_set,omitempty"`
	BitRate *int `json:"bit_rate,omitempty"`
	Category *string `json:"category,omitempty"`
	Creator *string `json:"creator,omitempty"`
	CreatorUrl *string `json:"creator_url,omitempty"`
	Description *string `json:"description,omitempty"`
	DetailUrl *string `json:"detail_url,omitempty"`
	DisplayName *string `json:"display_name,omitempty"`
	Duration *int `json:"duration,omitempty"`
	FieldsMatched *[]any `json:"fields_matched,omitempty"`
	Filesize *int `json:"filesize,omitempty"`
	Filetype *string `json:"filetype,omitempty"`
	ForeignLandingUrl *string `json:"foreign_landing_url,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *string `json:"id,omitempty"`
	Identifier *string `json:"identifier,omitempty"`
	IndexedOn *string `json:"indexed_on,omitempty"`
	Len *int `json:"len,omitempty"`
	License *string `json:"license,omitempty"`
	LicenseUrl *string `json:"license_url,omitempty"`
	LicenseVersion *string `json:"license_version,omitempty"`
	LogoUrl *string `json:"logo_url,omitempty"`
	Mature *bool `json:"mature,omitempty"`
	MediaCount *int `json:"media_count,omitempty"`
	Point *[]any `json:"point,omitempty"`
	Provider *string `json:"provider,omitempty"`
	Reason *any `json:"reason,omitempty"`
	RelatedUrl *string `json:"related_url,omitempty"`
	SampleRate *int `json:"sample_rate,omitempty"`
	Source *string `json:"source,omitempty"`
	SourceName *string `json:"source_name,omitempty"`
	SourceUrl *string `json:"source_url,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Thumbnail *string `json:"thumbnail,omitempty"`
	Title *string `json:"title,omitempty"`
	Url *string `json:"url,omitempty"`
	Waveform *string `json:"waveform,omitempty"`
}

// AudioCreateData is the typed request payload for Audio.CreateTyped.
type AudioCreateData struct {
	Identifier string `json:"identifier"`
}

// Image is the typed data model for the image entity.
type Image struct {
	Attribution string `json:"attribution"`
	AuthorName string `json:"author_name"`
	AuthorUrl string `json:"author_url"`
	Category *string `json:"category,omitempty"`
	Creator *string `json:"creator,omitempty"`
	CreatorUrl *string `json:"creator_url,omitempty"`
	Description *string `json:"description,omitempty"`
	DetailUrl string `json:"detail_url"`
	DisplayName string `json:"display_name"`
	FieldsMatched []any `json:"fields_matched"`
	Filesize *int `json:"filesize,omitempty"`
	Filetype *string `json:"filetype,omitempty"`
	ForeignLandingUrl *string `json:"foreign_landing_url,omitempty"`
	Height *int `json:"height,omitempty"`
	Id string `json:"id"`
	Identifier string `json:"identifier"`
	IndexedOn string `json:"indexed_on"`
	License string `json:"license"`
	LicenseUrl string `json:"license_url"`
	LicenseVersion *string `json:"license_version,omitempty"`
	LogoUrl string `json:"logo_url"`
	Mature bool `json:"mature"`
	MediaCount int `json:"media_count"`
	Provider *string `json:"provider,omitempty"`
	Reason any `json:"reason"`
	RelatedUrl string `json:"related_url"`
	Source *string `json:"source,omitempty"`
	SourceName string `json:"source_name"`
	SourceUrl string `json:"source_url"`
	Tag []any `json:"tag"`
	Thumbnail string `json:"thumbnail"`
	Title *string `json:"title,omitempty"`
	Type any `json:"type"`
	Url *string `json:"url,omitempty"`
	Version any `json:"version"`
	Width *int `json:"width,omitempty"`
}

// ImageLoadMatch is the typed request payload for Image.LoadTyped.
type ImageLoadMatch struct {
	Id string `json:"id"`
}

// ImageListMatch is the typed request payload for Image.ListTyped.
type ImageListMatch struct {
	Attribution *string `json:"attribution,omitempty"`
	AuthorName *string `json:"author_name,omitempty"`
	AuthorUrl *string `json:"author_url,omitempty"`
	Category *string `json:"category,omitempty"`
	Creator *string `json:"creator,omitempty"`
	CreatorUrl *string `json:"creator_url,omitempty"`
	Description *string `json:"description,omitempty"`
	DetailUrl *string `json:"detail_url,omitempty"`
	DisplayName *string `json:"display_name,omitempty"`
	FieldsMatched *[]any `json:"fields_matched,omitempty"`
	Filesize *int `json:"filesize,omitempty"`
	Filetype *string `json:"filetype,omitempty"`
	ForeignLandingUrl *string `json:"foreign_landing_url,omitempty"`
	Height *int `json:"height,omitempty"`
	Id *string `json:"id,omitempty"`
	Identifier *string `json:"identifier,omitempty"`
	IndexedOn *string `json:"indexed_on,omitempty"`
	License *string `json:"license,omitempty"`
	LicenseUrl *string `json:"license_url,omitempty"`
	LicenseVersion *string `json:"license_version,omitempty"`
	LogoUrl *string `json:"logo_url,omitempty"`
	Mature *bool `json:"mature,omitempty"`
	MediaCount *int `json:"media_count,omitempty"`
	Provider *string `json:"provider,omitempty"`
	Reason *any `json:"reason,omitempty"`
	RelatedUrl *string `json:"related_url,omitempty"`
	Source *string `json:"source,omitempty"`
	SourceName *string `json:"source_name,omitempty"`
	SourceUrl *string `json:"source_url,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Thumbnail *string `json:"thumbnail,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
	Version *any `json:"version,omitempty"`
	Width *int `json:"width,omitempty"`
}

// ImageCreateData is the typed request payload for Image.CreateTyped.
type ImageCreateData struct {
	Identifier string `json:"identifier"`
}

// OAuth2Application is the typed data model for the o_auth2_application entity.
type OAuth2Application struct {
	Description string `json:"description"`
	Email string `json:"email"`
	Name string `json:"name"`
}

// OAuth2ApplicationCreateData is the typed request payload for OAuth2Application.CreateTyped.
type OAuth2ApplicationCreateData struct {
	Description string `json:"description"`
	Email string `json:"email"`
	Name string `json:"name"`
}

// OAuth2KeyInfo is the typed data model for the o_auth2_key_info entity.
type OAuth2KeyInfo struct {
	RateLimitModel string `json:"rate_limit_model"`
	RequestsThisMinute int `json:"requests_this_minute"`
	RequestsToday int `json:"requests_today"`
	Verified bool `json:"verified"`
}

// OAuth2KeyInfoLoadMatch is the typed request payload for OAuth2KeyInfo.LoadTyped.
type OAuth2KeyInfoLoadMatch struct {
	RateLimitModel *string `json:"rate_limit_model,omitempty"`
	RequestsThisMinute *int `json:"requests_this_minute,omitempty"`
	RequestsToday *int `json:"requests_today,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// OAuth2Token is the typed data model for the o_auth2_token entity.
type OAuth2Token struct {
	AccessToken string `json:"access_token"`
	ExpiresIn int `json:"expires_in"`
	Scope string `json:"scope"`
	TokenType string `json:"token_type"`
}

// OAuth2TokenCreateData is the typed request payload for OAuth2Token.CreateTyped.
type OAuth2TokenCreateData struct {
	AccessToken string `json:"access_token"`
	ExpiresIn int `json:"expires_in"`
	Scope string `json:"scope"`
	TokenType string `json:"token_type"`
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
