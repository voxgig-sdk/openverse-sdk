// Typed models for the Openverse SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Audio {
  alt_files: any[]
  attribution: string
  audio_set: any
  bit_rate?: number
  category?: string
  creator?: string
  creator_url?: string
  detail_url: string
  duration?: number
  fields_matched: any[]
  filesize?: number
  filetype?: string
  foreign_landing_url?: string
  genres?: any[]
  id: string
  indexed_on: string
  license: string
  license_url: string
  license_version?: string
  mature: boolean
  provider?: string
  related_url: string
  sample_rate?: number
  source?: string
  tags: any[]
  thumbnail: string
  title?: string
  url?: string
  waveform: string
}

export interface AudioLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'thumb'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AudioListMatch {
  category?: string
  creator?: string
  excluded_source?: string
  extension?: string
  filter_dead?: boolean
  length?: string
  license?: string
  license_type?: string
  mature?: boolean
  page?: number
  page_size?: number
  peak?: boolean
  q?: string
  source?: string
  tag?: string
  title?: string
  unstable_authority?: boolean
  unstable_authority_boost?: number
  unstable_collection?: string
  unstable_include_sensitive_result?: boolean
  unstable_sort_by?: string
  unstable_sort_dir?: string
  unstable_tag?: string

  // Selects a custom action instead of the plain list:
  //   'related' | 'stat' | 'waveform'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AudioCreateData {
  identifier: string
  alt_files: any[]
  attribution: string
  audio_set: any
  bit_rate?: number
  category?: string
  creator?: string
  creator_url?: string
  detail_url: string
  duration?: number
  fields_matched: any[]
  filesize?: number
  filetype?: string
  foreign_landing_url?: string
  genres?: any[]
  id: string
  indexed_on: string
  license: string
  license_url: string
  license_version?: string
  mature: boolean
  provider?: string
  related_url: string
  sample_rate?: number
  source?: string
  tags: any[]
  thumbnail: string
  title?: string
  url?: string
  waveform: string

  // Selects a custom action instead of the plain create:
  //   'report'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Image {
  attribution: string
  category?: string
  creator?: string
  creator_url?: string
  detail_url: string
  fields_matched: any[]
  filesize?: number
  filetype?: string
  foreign_landing_url?: string
  height?: number
  id: string
  indexed_on: string
  license: string
  license_url: string
  license_version?: string
  mature: boolean
  provider?: string
  related_url: string
  source?: string
  tags: any[]
  thumbnail: string
  title?: string
  url?: string
  width?: number
}

export interface ImageLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'oembed'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ImageListMatch {
  aspect_ratio?: string
  category?: string
  creator?: string
  excluded_source?: string
  extension?: string
  filter_dead?: boolean
  license?: string
  license_type?: string
  mature?: boolean
  page?: number
  page_size?: number
  q?: string
  size?: string
  source?: string
  tag?: string
  title?: string
  unstable_authority?: boolean
  unstable_authority_boost?: number
  unstable_collection?: string
  unstable_include_sensitive_result?: boolean
  unstable_sort_by?: string
  unstable_sort_dir?: string
  unstable_tag?: string

  // Selects a custom action instead of the plain list:
  //   'related' | 'stat'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ImageCreateData {
  identifier: string
  attribution: string
  category?: string
  creator?: string
  creator_url?: string
  detail_url: string
  fields_matched: any[]
  filesize?: number
  filetype?: string
  foreign_landing_url?: string
  height?: number
  id: string
  indexed_on: string
  license: string
  license_url: string
  license_version?: string
  mature: boolean
  provider?: string
  related_url: string
  source?: string
  tags: any[]
  thumbnail: string
  title?: string
  url?: string
  width?: number

  // Selects a custom action instead of the plain create:
  //   'report'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OAuth2Application {
  description: string
  email: string
  name: string
}

export interface OAuth2ApplicationCreateData {
  description: string
  email: string
  name: string
}

export interface OAuth2KeyInfo {
  rate_limit_model: string
  requests_this_minute: number
  requests_today: number
  verified: boolean
}

export interface OAuth2KeyInfoLoadMatch {
  rate_limit_model?: string
  requests_this_minute?: number
  requests_today?: number
  verified?: boolean
}

export interface OAuth2Token {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
}

export interface OAuth2TokenCreateData {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
}

