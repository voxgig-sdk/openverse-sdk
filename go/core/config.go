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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"readOnly": true,
						"req": true,
						"short": "JSON describing alternative files for this audio.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "attribution",
						"readOnly": true,
						"req": true,
						"short": "Legally valid attribution for the media item in plain-text English.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "audio_set",
						"readOnly": true,
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
						"format": "uri",
						"name": "detail_url",
						"readOnly": true,
						"req": true,
						"short": "A direct link to the detail view of this audio file.",
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
						"format": "date-time",
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
						"readOnly": true,
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
						"name": "mature",
						"req": true,
						"short": "Whether the media item is marked as mature",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "provider",
						"short": "The content provider, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "related_url",
						"readOnly": true,
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
						"name": "tags",
						"req": true,
						"short": "Tags with detailed metadata, such as accuracy.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "uri",
						"name": "thumbnail",
						"readOnly": true,
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
						"format": "uri",
						"name": "waveform",
						"readOnly": true,
						"req": true,
						"short": "A direct link to the waveform peaks.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "audio",
									},
									map[string]any{
										"var": "identifier",
									},
									map[string]any{
										"lit": "report",
									},
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
								"parts": []any{
									"v1",
									"audio",
									"{identifier}",
									"report",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "audio",
									},
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
								"parts": []any{
									"v1",
									"audio",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "audio",
									},
									map[string]any{
										"var": "identifier",
									},
									map[string]any{
										"lit": "related",
									},
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
								"parts": []any{
									"v1",
									"audio",
									"{identifier}",
									"related",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "audio",
									},
									map[string]any{
										"var": "identifier",
									},
									map[string]any{
										"lit": "waveform",
									},
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
								"parts": []any{
									"v1",
									"audio",
									"{identifier}",
									"waveform",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/audio/stats/",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "audio",
									},
									map[string]any{
										"lit": "stats",
									},
								},
								"select": map[string]any{
									"$action": "stat",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"audio",
									"stats",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "audio",
									},
									map[string]any{
										"var": "identifier",
									},
									map[string]any{
										"lit": "thumb",
									},
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
								"parts": []any{
									"v1",
									"audio",
									"{identifier}",
									"thumb",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"var": "identifier",
									},
									map[string]any{
										"lit": "thumb",
									},
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
								"parts": []any{
									"v1",
									"images",
									"{identifier}",
									"thumb",
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
								"rename": map[string]any{
									"param": map[string]any{
										"identifier": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "audio",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"v1",
									"audio",
									"{id}",
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
						"readOnly": true,
						"req": true,
						"short": "Legally valid attribution for the media item in plain-text English.",
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
						"format": "uri",
						"name": "detail_url",
						"readOnly": true,
						"req": true,
						"short": "A direct link to the detail view of this audio file.",
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
						"format": "date-time",
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
						"readOnly": true,
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
						"name": "mature",
						"req": true,
						"short": "Whether the media item is marked as mature",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "provider",
						"short": "The content provider, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "related_url",
						"readOnly": true,
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
						"name": "tags",
						"req": true,
						"short": "Tags with detailed metadata, such as accuracy.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "uri",
						"name": "thumbnail",
						"readOnly": true,
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
						"name": "width",
						"short": "The width of the image in pixels.",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"var": "identifier",
									},
									map[string]any{
										"lit": "report",
									},
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
								"parts": []any{
									"v1",
									"images",
									"{identifier}",
									"report",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "images",
									},
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
								"parts": []any{
									"v1",
									"images",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"var": "identifier",
									},
									map[string]any{
										"lit": "related",
									},
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
								"parts": []any{
									"v1",
									"images",
									"{identifier}",
									"related",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/images/stats/",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"lit": "stats",
									},
								},
								"select": map[string]any{
									"$action": "stat",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"images",
									"stats",
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
								"rename": map[string]any{
									"param": map[string]any{
										"identifier": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"v1",
									"images",
									"{id}",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"lit": "oembed",
									},
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
								"parts": []any{
									"v1",
									"images",
									"oembed",
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
						"format": "email",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth_tokens",
									},
									map[string]any{
										"lit": "register",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"auth_tokens",
									"register",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "rate_limit",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"rate_limit",
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
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth_tokens",
									},
									map[string]any{
										"lit": "token",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"auth_tokens",
									"token",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
