package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Openverse",
			"slug": "openverse",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.openverse.org",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"audio": map[string]any{},
				"image": map[string]any{},
				"o_auth2_application": map[string]any{},
				"o_auth2_key_info": map[string]any{},
				"o_auth2_token": map[string]any{},
			},
		},
		"entity": map[string]any{
			"audio": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alt_files",
						"req": true,
						"short": "JSON describing alternative files for this audio.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "attribution",
						"req": true,
						"short": "Legally valid attribution for the media item in plain-text English.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "audio_set",
						"req": true,
						"short": "Reference to set of which this track is a part.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "bit_rate",
						"short": "Number in bits per second, eg.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "category",
						"short": "The top-level classification of this media file.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creator",
						"short": "The name of the media creator.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creator_url",
						"short": "A direct link to the media creator.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "The explanation on why media is being reported.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "detail_url",
						"req": true,
						"short": "A direct link to the detail view of this audio file.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "display_name",
						"req": true,
						"short": "The name of content source, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"short": "The time length of the audio file in milliseconds.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "fields_matched",
						"req": true,
						"short": "List the fields that matched the query for this result.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "filesize",
						"short": "Number in bytes, e.g.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "filetype",
						"short": "The type of the file, related to the file extension.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "foreign_landing_url",
						"short": "The landing page of the work.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "genres",
						"short": "An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Our unique identifier for an open-licensed work.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "identifier",
						"req": true,
						"short": "Our unique identifier for an open-licensed work.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "indexed_on",
						"req": true,
						"short": "The timestamp of when the media was indexed by Openverse.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "len",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "license",
						"req": true,
						"short": "The name of license for the media.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "license_url",
						"req": true,
						"short": "A direct link to the license deed or legal terms.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "license_version",
						"short": "The version of the media license.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logo_url",
						"req": true,
						"short": "The URL to a logo for the source.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mature",
						"req": true,
						"short": "Whether the media item is marked as mature",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "media_count",
						"req": true,
						"short": "The number of media items indexed from the source.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "points",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "provider",
						"short": "The content provider, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reason",
						"req": true,
						"short": "The reason to report media to Openverse.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "related_url",
						"req": true,
						"short": "A link to an endpoint that provides similar audio files.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sample_rate",
						"short": "Number in hertz, eg.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "source",
						"short": "The source of the data, meaning a particular dataset.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_name",
						"req": true,
						"short": "The source of the media, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"req": true,
						"short": "The URL of the source, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"req": true,
						"short": "Tags with detailed metadata, such as accuracy.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "thumbnail",
						"req": true,
						"short": "A direct link to the miniature artwork.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "The name of the media.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "The actual URL to the media file.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "waveform",
						"req": true,
						"short": "A direct link to the waveform peaks.",
						"type": "`$STRING`",
					},
				},
				"name": "audio",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "identifier",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/audio/{identifier}/report/",
								"parts": []any{
									"v1",
									"audio",
									"{identifier}",
									"report",
								},
								"select": map[string]any{
									"$action": "report",
									"exist": []any{
										"identifier",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.reason`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "creator",
											"orig": "creator",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "excluded_source",
											"orig": "excluded_source",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "extension",
											"orig": "extension",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "filter_dead",
											"orig": "filter_dead",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "length",
											"orig": "length",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "license",
											"orig": "license",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "license_type",
											"orig": "license_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "mature",
											"orig": "mature",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "peak",
											"orig": "peak",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "tag",
											"orig": "tag",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "title",
											"orig": "title",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "unstable_authority",
											"orig": "unstable_authority",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "unstable_authority_boost",
											"orig": "unstable_authority_boost",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "unstable_collection",
											"orig": "unstable_collection",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "unstable_include_sensitive_result",
											"orig": "unstable_include_sensitive_result",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "relevance",
											"kind": "query",
											"name": "unstable_sort_by",
											"orig": "unstable_sort_by",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "desc",
											"kind": "query",
											"name": "unstable_sort_dir",
											"orig": "unstable_sort_dir",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "unstable_tag",
											"orig": "unstable_tag",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/audio/",
								"parts": []any{
									"v1",
									"audio",
								},
								"select": map[string]any{
									"exist": []any{
										"category",
										"creator",
										"excluded_source",
										"extension",
										"filter_dead",
										"length",
										"license",
										"license_type",
										"mature",
										"page",
										"page_size",
										"peak",
										"q",
										"source",
										"tag",
										"title",
										"unstable_authority",
										"unstable_authority_boost",
										"unstable_collection",
										"unstable_include_sensitive_result",
										"unstable_sort_by",
										"unstable_sort_dir",
										"unstable_tag",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "identifier",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/audio/{identifier}/related/",
								"parts": []any{
									"v1",
									"audio",
									"{identifier}",
									"related",
								},
								"select": map[string]any{
									"$action": "related",
									"exist": []any{
										"identifier",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "identifier",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/audio/{identifier}/waveform/",
								"parts": []any{
									"v1",
									"audio",
									"{identifier}",
									"waveform",
								},
								"select": map[string]any{
									"$action": "waveform",
									"exist": []any{
										"identifier",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.points`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/audio/stats/",
								"parts": []any{
									"v1",
									"audio",
									"stats",
								},
								"select": map[string]any{
									"$action": "stat",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "identifier",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "compressed",
											"orig": "compressed",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "full_size",
											"orig": "full_size",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/audio/{identifier}/thumb/",
								"parts": []any{
									"v1",
									"audio",
									"{identifier}",
									"thumb",
								},
								"select": map[string]any{
									"$action": "thumb",
									"exist": []any{
										"compressed",
										"full_size",
										"identifier",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "identifier",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "compressed",
											"orig": "compressed",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "full_size",
											"orig": "full_size",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/images/{identifier}/thumb/",
								"parts": []any{
									"v1",
									"images",
									"{identifier}",
									"thumb",
								},
								"select": map[string]any{
									"exist": []any{
										"compressed",
										"full_size",
										"identifier",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/audio/{identifier}/",
								"parts": []any{
									"v1",
									"audio",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"identifier": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"audio",
						},
						[]any{
							"image",
						},
					},
				},
			},
			"image": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attribution",
						"req": true,
						"short": "Legally valid attribution for the media item in plain-text English.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "author_name",
						"req": true,
						"short": "The name of the media creator.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "author_url",
						"req": true,
						"short": "A direct link to the media creator.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "category",
						"short": "The top-level classification of this media file.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creator",
						"short": "The name of the media creator.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "creator_url",
						"short": "A direct link to the media creator.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "The explanation on why media is being reported.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "detail_url",
						"req": true,
						"short": "A direct link to the detail view of this audio file.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "display_name",
						"req": true,
						"short": "The name of content source, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fields_matched",
						"req": true,
						"short": "List the fields that matched the query for this result.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "filesize",
						"short": "Number in bytes, e.g.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "filetype",
						"short": "The type of the file, related to the file extension.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "foreign_landing_url",
						"short": "The landing page of the work.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "height",
						"op": map[string]any{
							"load": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "The height of the image in pixels.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Our unique identifier for an open-licensed work.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "identifier",
						"req": true,
						"short": "Our unique identifier for an open-licensed work.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "indexed_on",
						"req": true,
						"short": "The timestamp of when the media was indexed by Openverse.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "license",
						"req": true,
						"short": "The name of license for the media.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "license_url",
						"req": true,
						"short": "A direct link to the license deed or legal terms.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "license_version",
						"short": "The version of the media license.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logo_url",
						"req": true,
						"short": "The URL to a logo for the source.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mature",
						"req": true,
						"short": "Whether the media item is marked as mature",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "media_count",
						"req": true,
						"short": "The number of media items indexed from the source.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "provider",
						"short": "The content provider, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reason",
						"req": true,
						"short": "The reason to report media to Openverse.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "related_url",
						"req": true,
						"short": "A link to an endpoint that provides similar audio files.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"short": "The source of the data, meaning a particular dataset.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_name",
						"req": true,
						"short": "The source of the media, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source_url",
						"req": true,
						"short": "The URL of the source, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"req": true,
						"short": "Tags with detailed metadata, such as accuracy.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "thumbnail",
						"req": true,
						"short": "A direct link to the miniature artwork.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "The name of the media.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"short": "The resource type, always set to 'photo' for images.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "url",
						"short": "The actual URL to the media file.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "The oEmbed version number, always set to 1.0.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "width",
						"op": map[string]any{
							"load": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "The width of the image in pixels.",
						"type": "`$INTEGER`",
					},
				},
				"name": "image",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "identifier",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/images/{identifier}/report/",
								"parts": []any{
									"v1",
									"images",
									"{identifier}",
									"report",
								},
								"select": map[string]any{
									"$action": "report",
									"exist": []any{
										"identifier",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.reason`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "aspect_ratio",
											"orig": "aspect_ratio",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "creator",
											"orig": "creator",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "excluded_source",
											"orig": "excluded_source",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "extension",
											"orig": "extension",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": true,
											"kind": "query",
											"name": "filter_dead",
											"orig": "filter_dead",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "license",
											"orig": "license",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "license_type",
											"orig": "license_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "mature",
											"orig": "mature",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "size",
											"orig": "size",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "tag",
											"orig": "tag",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "title",
											"orig": "title",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "unstable_authority",
											"orig": "unstable_authority",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "unstable_authority_boost",
											"orig": "unstable_authority_boost",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "unstable_collection",
											"orig": "unstable_collection",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "unstable_include_sensitive_result",
											"orig": "unstable_include_sensitive_result",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "relevance",
											"kind": "query",
											"name": "unstable_sort_by",
											"orig": "unstable_sort_by",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "desc",
											"kind": "query",
											"name": "unstable_sort_dir",
											"orig": "unstable_sort_dir",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "unstable_tag",
											"orig": "unstable_tag",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/images/",
								"parts": []any{
									"v1",
									"images",
								},
								"select": map[string]any{
									"exist": []any{
										"aspect_ratio",
										"category",
										"creator",
										"excluded_source",
										"extension",
										"filter_dead",
										"license",
										"license_type",
										"mature",
										"page",
										"page_size",
										"q",
										"size",
										"source",
										"tag",
										"title",
										"unstable_authority",
										"unstable_authority_boost",
										"unstable_collection",
										"unstable_include_sensitive_result",
										"unstable_sort_by",
										"unstable_sort_dir",
										"unstable_tag",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "identifier",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/images/{identifier}/related/",
								"parts": []any{
									"v1",
									"images",
									"{identifier}",
									"related",
								},
								"select": map[string]any{
									"$action": "related",
									"exist": []any{
										"identifier",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/images/stats/",
								"parts": []any{
									"v1",
									"images",
									"stats",
								},
								"select": map[string]any{
									"$action": "stat",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "identifier",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/images/{identifier}/",
								"parts": []any{
									"v1",
									"images",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"identifier": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "url",
											"orig": "url",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/images/oembed/",
								"parts": []any{
									"v1",
									"images",
									"oembed",
								},
								"select": map[string]any{
									"$action": "oembed",
									"exist": []any{
										"url",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"image",
						},
					},
				},
			},
			"o_auth2_application": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"req": true,
						"short": "A description of what you are trying to achieve with your project using the API.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"req": true,
						"short": "A valid email that we can reach you at if we have any questions about your use case or data consumption.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "A unique human-readable name for your application or project requiring access to the Openverse API.",
						"type": "`$STRING`",
					},
				},
				"name": "o_auth2_application",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/auth_tokens/register/",
								"parts": []any{
									"v1",
									"auth_tokens",
									"register",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"o_auth2_key_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "rate_limit_model",
						"req": true,
						"short": "The type of rate limit applied to your key.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "requests_this_minute",
						"req": true,
						"short": "The number of requests your key has performed in the last minute.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "requests_today",
						"req": true,
						"short": "The number of requests your key has performed in the last day.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "verified",
						"req": true,
						"short": "Whether the application has verified the submitted email address.",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "o_auth2_key_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/rate_limit/",
								"parts": []any{
									"v1",
									"rate_limit",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"o_auth2_token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "access_token",
						"req": true,
						"short": "The access token that can be used to authenticate requests.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_in",
						"req": true,
						"short": "The number of seconds until the token expires.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "scope",
						"req": true,
						"short": "The scope of the token.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token_type",
						"req": true,
						"short": "The type of token.",
						"type": "`$STRING`",
					},
				},
				"name": "o_auth2_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/auth_tokens/token/",
								"parts": []any{
									"v1",
									"auth_tokens",
									"token",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
