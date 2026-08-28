# frozen_string_literal: true

# Typed models for the Openverse SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Audio entity data model.
#
# @!attribute [rw] alt_files
#   @return [Array]
#
# @!attribute [rw] attribution
#   @return [String]
#
# @!attribute [rw] audio_set
#   @return [Object]
#
# @!attribute [rw] bit_rate
#   @return [Integer, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] creator_url
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] detail_url
#   @return [String]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] fields_matched
#   @return [Array]
#
# @!attribute [rw] filesize
#   @return [Integer, nil]
#
# @!attribute [rw] filetype
#   @return [String, nil]
#
# @!attribute [rw] foreign_landing_url
#   @return [String, nil]
#
# @!attribute [rw] genres
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] indexed_on
#   @return [String]
#
# @!attribute [rw] len
#   @return [Integer]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] license_url
#   @return [String]
#
# @!attribute [rw] license_version
#   @return [String, nil]
#
# @!attribute [rw] logo_url
#   @return [String]
#
# @!attribute [rw] mature
#   @return [Boolean]
#
# @!attribute [rw] media_count
#   @return [Integer]
#
# @!attribute [rw] points
#   @return [Array]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [Object]
#
# @!attribute [rw] related_url
#   @return [String]
#
# @!attribute [rw] sample_rate
#   @return [Integer, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] source_name
#   @return [String]
#
# @!attribute [rw] source_url
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array]
#
# @!attribute [rw] thumbnail
#   @return [String]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] waveform
#   @return [String]
Audio = Struct.new(
  :alt_files,
  :attribution,
  :audio_set,
  :bit_rate,
  :category,
  :creator,
  :creator_url,
  :description,
  :detail_url,
  :display_name,
  :duration,
  :fields_matched,
  :filesize,
  :filetype,
  :foreign_landing_url,
  :genres,
  :id,
  :identifier,
  :indexed_on,
  :len,
  :license,
  :license_url,
  :license_version,
  :logo_url,
  :mature,
  :media_count,
  :points,
  :provider,
  :reason,
  :related_url,
  :sample_rate,
  :source,
  :source_name,
  :source_url,
  :tags,
  :thumbnail,
  :title,
  :url,
  :waveform,
  keyword_init: true
)

# Request payload for Audio#load.
#
# @!attribute [rw] id
#   @return [String]
AudioLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Audio#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] excluded_source
#   @return [String, nil]
#
# @!attribute [rw] extension
#   @return [String, nil]
#
# @!attribute [rw] filter_dead
#   @return [Boolean, nil]
#
# @!attribute [rw] length
#   @return [String, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] license_type
#   @return [String, nil]
#
# @!attribute [rw] mature
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] peak
#   @return [Boolean, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unstable_authority
#   @return [Boolean, nil]
#
# @!attribute [rw] unstable_authority_boost
#   @return [Float, nil]
#
# @!attribute [rw] unstable_collection
#   @return [String, nil]
#
# @!attribute [rw] unstable_include_sensitive_result
#   @return [Boolean, nil]
#
# @!attribute [rw] unstable_sort_by
#   @return [String, nil]
#
# @!attribute [rw] unstable_sort_dir
#   @return [String, nil]
#
# @!attribute [rw] unstable_tag
#   @return [String, nil]
AudioListMatch = Struct.new(
  :category,
  :creator,
  :excluded_source,
  :extension,
  :filter_dead,
  :length,
  :license,
  :license_type,
  :mature,
  :page,
  :page_size,
  :peak,
  :q,
  :source,
  :tag,
  :title,
  :unstable_authority,
  :unstable_authority_boost,
  :unstable_collection,
  :unstable_include_sensitive_result,
  :unstable_sort_by,
  :unstable_sort_dir,
  :unstable_tag,
  keyword_init: true
)

# Request payload for Audio#create.
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] alt_files
#   @return [Array]
#
# @!attribute [rw] attribution
#   @return [String]
#
# @!attribute [rw] audio_set
#   @return [Object]
#
# @!attribute [rw] bit_rate
#   @return [Integer, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] creator_url
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] detail_url
#   @return [String]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] fields_matched
#   @return [Array]
#
# @!attribute [rw] filesize
#   @return [Integer, nil]
#
# @!attribute [rw] filetype
#   @return [String, nil]
#
# @!attribute [rw] foreign_landing_url
#   @return [String, nil]
#
# @!attribute [rw] genres
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] indexed_on
#   @return [String]
#
# @!attribute [rw] len
#   @return [Integer]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] license_url
#   @return [String]
#
# @!attribute [rw] license_version
#   @return [String, nil]
#
# @!attribute [rw] logo_url
#   @return [String]
#
# @!attribute [rw] mature
#   @return [Boolean]
#
# @!attribute [rw] media_count
#   @return [Integer]
#
# @!attribute [rw] points
#   @return [Array]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [Object]
#
# @!attribute [rw] related_url
#   @return [String]
#
# @!attribute [rw] sample_rate
#   @return [Integer, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] source_name
#   @return [String]
#
# @!attribute [rw] source_url
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array]
#
# @!attribute [rw] thumbnail
#   @return [String]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] waveform
#   @return [String]
AudioCreateData = Struct.new(
  :identifier,
  :alt_files,
  :attribution,
  :audio_set,
  :bit_rate,
  :category,
  :creator,
  :creator_url,
  :description,
  :detail_url,
  :display_name,
  :duration,
  :fields_matched,
  :filesize,
  :filetype,
  :foreign_landing_url,
  :genres,
  :id,
  :indexed_on,
  :len,
  :license,
  :license_url,
  :license_version,
  :logo_url,
  :mature,
  :media_count,
  :points,
  :provider,
  :reason,
  :related_url,
  :sample_rate,
  :source,
  :source_name,
  :source_url,
  :tags,
  :thumbnail,
  :title,
  :url,
  :waveform,
  keyword_init: true
)

# Image entity data model.
#
# @!attribute [rw] attribution
#   @return [String]
#
# @!attribute [rw] author_name
#   @return [String]
#
# @!attribute [rw] author_url
#   @return [String]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] creator_url
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] detail_url
#   @return [String]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] fields_matched
#   @return [Array]
#
# @!attribute [rw] filesize
#   @return [Integer, nil]
#
# @!attribute [rw] filetype
#   @return [String, nil]
#
# @!attribute [rw] foreign_landing_url
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] indexed_on
#   @return [String]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] license_url
#   @return [String]
#
# @!attribute [rw] license_version
#   @return [String, nil]
#
# @!attribute [rw] logo_url
#   @return [String]
#
# @!attribute [rw] mature
#   @return [Boolean]
#
# @!attribute [rw] media_count
#   @return [Integer]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [Object]
#
# @!attribute [rw] related_url
#   @return [String]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] source_name
#   @return [String]
#
# @!attribute [rw] source_url
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array]
#
# @!attribute [rw] thumbnail
#   @return [String]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Object]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Object]
#
# @!attribute [rw] width
#   @return [Integer, nil]
Image = Struct.new(
  :attribution,
  :author_name,
  :author_url,
  :category,
  :creator,
  :creator_url,
  :description,
  :detail_url,
  :display_name,
  :fields_matched,
  :filesize,
  :filetype,
  :foreign_landing_url,
  :height,
  :id,
  :identifier,
  :indexed_on,
  :license,
  :license_url,
  :license_version,
  :logo_url,
  :mature,
  :media_count,
  :provider,
  :reason,
  :related_url,
  :source,
  :source_name,
  :source_url,
  :tags,
  :thumbnail,
  :title,
  :type,
  :url,
  :version,
  :width,
  keyword_init: true
)

# Request payload for Image#load.
#
# @!attribute [rw] id
#   @return [String]
ImageLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Image#list.
#
# @!attribute [rw] aspect_ratio
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] excluded_source
#   @return [String, nil]
#
# @!attribute [rw] extension
#   @return [String, nil]
#
# @!attribute [rw] filter_dead
#   @return [Boolean, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] license_type
#   @return [String, nil]
#
# @!attribute [rw] mature
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] page_size
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] tag
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unstable_authority
#   @return [Boolean, nil]
#
# @!attribute [rw] unstable_authority_boost
#   @return [Float, nil]
#
# @!attribute [rw] unstable_collection
#   @return [String, nil]
#
# @!attribute [rw] unstable_include_sensitive_result
#   @return [Boolean, nil]
#
# @!attribute [rw] unstable_sort_by
#   @return [String, nil]
#
# @!attribute [rw] unstable_sort_dir
#   @return [String, nil]
#
# @!attribute [rw] unstable_tag
#   @return [String, nil]
ImageListMatch = Struct.new(
  :aspect_ratio,
  :category,
  :creator,
  :excluded_source,
  :extension,
  :filter_dead,
  :license,
  :license_type,
  :mature,
  :page,
  :page_size,
  :q,
  :size,
  :source,
  :tag,
  :title,
  :unstable_authority,
  :unstable_authority_boost,
  :unstable_collection,
  :unstable_include_sensitive_result,
  :unstable_sort_by,
  :unstable_sort_dir,
  :unstable_tag,
  keyword_init: true
)

# Request payload for Image#create.
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] attribution
#   @return [String]
#
# @!attribute [rw] author_name
#   @return [String]
#
# @!attribute [rw] author_url
#   @return [String]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] creator_url
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] detail_url
#   @return [String]
#
# @!attribute [rw] display_name
#   @return [String]
#
# @!attribute [rw] fields_matched
#   @return [Array]
#
# @!attribute [rw] filesize
#   @return [Integer, nil]
#
# @!attribute [rw] filetype
#   @return [String, nil]
#
# @!attribute [rw] foreign_landing_url
#   @return [String, nil]
#
# @!attribute [rw] height
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] indexed_on
#   @return [String]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] license_url
#   @return [String]
#
# @!attribute [rw] license_version
#   @return [String, nil]
#
# @!attribute [rw] logo_url
#   @return [String]
#
# @!attribute [rw] mature
#   @return [Boolean]
#
# @!attribute [rw] media_count
#   @return [Integer]
#
# @!attribute [rw] provider
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [Object]
#
# @!attribute [rw] related_url
#   @return [String]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] source_name
#   @return [String]
#
# @!attribute [rw] source_url
#   @return [String]
#
# @!attribute [rw] tags
#   @return [Array]
#
# @!attribute [rw] thumbnail
#   @return [String]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Object]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [Object]
#
# @!attribute [rw] width
#   @return [Integer, nil]
ImageCreateData = Struct.new(
  :identifier,
  :attribution,
  :author_name,
  :author_url,
  :category,
  :creator,
  :creator_url,
  :description,
  :detail_url,
  :display_name,
  :fields_matched,
  :filesize,
  :filetype,
  :foreign_landing_url,
  :height,
  :id,
  :indexed_on,
  :license,
  :license_url,
  :license_version,
  :logo_url,
  :mature,
  :media_count,
  :provider,
  :reason,
  :related_url,
  :source,
  :source_name,
  :source_url,
  :tags,
  :thumbnail,
  :title,
  :type,
  :url,
  :version,
  :width,
  keyword_init: true
)

# OAuth2Application entity data model.
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
OAuth2Application = Struct.new(
  :description,
  :email,
  :name,
  keyword_init: true
)

# Request payload for OAuth2Application#create.
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
OAuth2ApplicationCreateData = Struct.new(
  :description,
  :email,
  :name,
  keyword_init: true
)

# OAuth2KeyInfo entity data model.
#
# @!attribute [rw] rate_limit_model
#   @return [String]
#
# @!attribute [rw] requests_this_minute
#   @return [Integer]
#
# @!attribute [rw] requests_today
#   @return [Integer]
#
# @!attribute [rw] verified
#   @return [Boolean]
OAuth2KeyInfo = Struct.new(
  :rate_limit_model,
  :requests_this_minute,
  :requests_today,
  :verified,
  keyword_init: true
)

# Request payload for OAuth2KeyInfo#load.
#
# @!attribute [rw] rate_limit_model
#   @return [String, nil]
#
# @!attribute [rw] requests_this_minute
#   @return [Integer, nil]
#
# @!attribute [rw] requests_today
#   @return [Integer, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
OAuth2KeyInfoLoadMatch = Struct.new(
  :rate_limit_model,
  :requests_this_minute,
  :requests_today,
  :verified,
  keyword_init: true
)

# OAuth2Token entity data model.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer]
#
# @!attribute [rw] scope
#   @return [String]
#
# @!attribute [rw] token_type
#   @return [String]
OAuth2Token = Struct.new(
  :access_token,
  :expires_in,
  :scope,
  :token_type,
  keyword_init: true
)

# Request payload for OAuth2Token#create.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer]
#
# @!attribute [rw] scope
#   @return [String]
#
# @!attribute [rw] token_type
#   @return [String]
OAuth2TokenCreateData = Struct.new(
  :access_token,
  :expires_in,
  :scope,
  :token_type,
  keyword_init: true
)

