// Typed models for the Openverse SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Audio {
  alt_file: any[]
  attribution: string
  audio_set: any
  bit_rate?: number
  category?: string
  creator?: string
  creator_url?: string
  description?: string
  detail_url: string
  display_name: string
  duration?: number
  fields_matched: any[]
  filesize?: number
  filetype?: string
  foreign_landing_url?: string
  genre?: any[]
  id: string
  identifier: string
  indexed_on: string
  len: number
  license: string
  license_url: string
  license_version?: string
  logo_url: string
  mature: boolean
  media_count: number
  point: any[]
  provider?: string
  reason: any
  related_url: string
  sample_rate?: number
  source?: string
  source_name: string
  source_url: string
  tag: any[]
  thumbnail: string
  title?: string
  url?: string
  waveform: string
}

export interface AudioLoadMatch {
  identifier: string
  id: string
}

export interface AudioListMatch {
  identifier: string
}

export interface AudioCreateData {
  identifier: string
}

export interface Image {
  attribution: string
  author_name: string
  author_url: string
  category?: string
  creator?: string
  creator_url?: string
  description?: string
  detail_url: string
  display_name: string
  fields_matched: any[]
  filesize?: number
  filetype?: string
  foreign_landing_url?: string
  height?: number
  id: string
  identifier: string
  indexed_on: string
  license: string
  license_url: string
  license_version?: string
  logo_url: string
  mature: boolean
  media_count: number
  provider?: string
  reason: any
  related_url: string
  source?: string
  source_name: string
  source_url: string
  tag: any[]
  thumbnail: string
  title?: string
  type: any
  url?: string
  version: any
  width?: number
}

export interface ImageLoadMatch {
  id: string
}

export interface ImageListMatch {
  identifier: string
}

export interface ImageCreateData {
  identifier: string
}

export interface OAuth2Application {
  description: string
  email: string
  name: string
}

export type OAuth2ApplicationCreateData = Partial<OAuth2Application>

export interface OAuth2KeyInfo {
  rate_limit_model: string
  requests_this_minute: number
  requests_today: number
  verified: boolean
}

export type OAuth2KeyInfoLoadMatch = Partial<OAuth2KeyInfo>

export interface OAuth2Token {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
}

export type OAuth2TokenCreateData = Partial<OAuth2Token>

