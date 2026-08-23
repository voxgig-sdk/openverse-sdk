
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Openverse',
        slug: "openverse",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.openverse.org",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      audio: {
      },

      image: {
      },

      o_auth2_application: {
      },

      o_auth2_key_info: {
      },

      o_auth2_token: {
      },

    }
  }


  entity = {
    "audio": {
      "fields": [
        {
          "name": "alt_files",
          "req": true,
          "short": "JSON describing alternative files for this audio.",
          "type": "`$ARRAY`"
        },
        {
          "name": "attribution",
          "req": true,
          "short": "Legally valid attribution for the media item in plain-text English.",
          "type": "`$STRING`"
        },
        {
          "name": "audio_set",
          "req": true,
          "short": "Reference to set of which this track is a part.",
          "type": "`$ANY`"
        },
        {
          "name": "bit_rate",
          "short": "Number in bits per second, eg.",
          "type": "`$INTEGER`"
        },
        {
          "name": "category",
          "short": "The top-level classification of this media file.",
          "type": "`$STRING`"
        },
        {
          "name": "creator",
          "short": "The name of the media creator.",
          "type": "`$STRING`"
        },
        {
          "name": "creator_url",
          "short": "A direct link to the media creator.",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "The explanation on why media is being reported.",
          "type": "`$STRING`"
        },
        {
          "name": "detail_url",
          "req": true,
          "short": "A direct link to the detail view of this audio file.",
          "type": "`$STRING`"
        },
        {
          "name": "display_name",
          "req": true,
          "short": "The name of content source, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "short": "The time length of the audio file in milliseconds.",
          "type": "`$INTEGER`"
        },
        {
          "name": "fields_matched",
          "req": true,
          "short": "List the fields that matched the query for this result.",
          "type": "`$ARRAY`"
        },
        {
          "name": "filesize",
          "short": "Number in bytes, e.g.",
          "type": "`$INTEGER`"
        },
        {
          "name": "filetype",
          "short": "The type of the file, related to the file extension.",
          "type": "`$STRING`"
        },
        {
          "name": "foreign_landing_url",
          "short": "The landing page of the work.",
          "type": "`$STRING`"
        },
        {
          "name": "genres",
          "short": "An array of audio genres such as `rock`, `electronic` for `music` category, or `politics`, `sport`, `education` for `podcast` category",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Our unique identifier for an open-licensed work.",
          "type": "`$STRING`"
        },
        {
          "name": "identifier",
          "req": true,
          "short": "Our unique identifier for an open-licensed work.",
          "type": "`$STRING`"
        },
        {
          "name": "indexed_on",
          "req": true,
          "short": "The timestamp of when the media was indexed by Openverse.",
          "type": "`$STRING`"
        },
        {
          "name": "len",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "license",
          "req": true,
          "short": "The name of license for the media.",
          "type": "`$STRING`"
        },
        {
          "name": "license_url",
          "req": true,
          "short": "A direct link to the license deed or legal terms.",
          "type": "`$STRING`"
        },
        {
          "name": "license_version",
          "short": "The version of the media license.",
          "type": "`$STRING`"
        },
        {
          "name": "logo_url",
          "req": true,
          "short": "The URL to a logo for the source.",
          "type": "`$STRING`"
        },
        {
          "name": "mature",
          "req": true,
          "short": "Whether the media item is marked as mature",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "media_count",
          "req": true,
          "short": "The number of media items indexed from the source.",
          "type": "`$INTEGER`"
        },
        {
          "name": "points",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "provider",
          "short": "The content provider, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "reason",
          "req": true,
          "short": "The reason to report media to Openverse.",
          "type": "`$ANY`"
        },
        {
          "name": "related_url",
          "req": true,
          "short": "A link to an endpoint that provides similar audio files.",
          "type": "`$STRING`"
        },
        {
          "name": "sample_rate",
          "short": "Number in hertz, eg.",
          "type": "`$INTEGER`"
        },
        {
          "name": "source",
          "short": "The source of the data, meaning a particular dataset.",
          "type": "`$STRING`"
        },
        {
          "name": "source_name",
          "req": true,
          "short": "The source of the media, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "source_url",
          "req": true,
          "short": "The URL of the source, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "req": true,
          "short": "Tags with detailed metadata, such as accuracy.",
          "type": "`$ARRAY`"
        },
        {
          "name": "thumbnail",
          "req": true,
          "short": "A direct link to the miniature artwork.",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "The name of the media.",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "The actual URL to the media file.",
          "type": "`$STRING`"
        },
        {
          "name": "waveform",
          "req": true,
          "short": "A direct link to the waveform peaks.",
          "type": "`$STRING`"
        }
      ],
      "name": "audio",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/v1/audio/{identifier}/report/",
              "parts": [
                "v1",
                "audio",
                "{identifier}",
                "report"
              ],
              "select": {
                "$action": "report",
                "exist": [
                  "identifier"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.reason`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "creator",
                    "orig": "creator",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "excluded_source",
                    "orig": "excluded_source",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "extension",
                    "orig": "extension",
                    "type": "`$STRING`"
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "filter_dead",
                    "orig": "filter_dead",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "length",
                    "orig": "length",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "license",
                    "orig": "license",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "license_type",
                    "orig": "license_type",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "mature",
                    "orig": "mature",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "peak",
                    "orig": "peak",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "source",
                    "orig": "source",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "unstable_authority",
                    "orig": "unstable_authority",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "unstable_authority_boost",
                    "orig": "unstable_authority_boost",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "unstable_collection",
                    "orig": "unstable_collection",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "unstable_include_sensitive_result",
                    "orig": "unstable_include_sensitive_result",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": "relevance",
                    "kind": "query",
                    "name": "unstable_sort_by",
                    "orig": "unstable_sort_by",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "desc",
                    "kind": "query",
                    "name": "unstable_sort_dir",
                    "orig": "unstable_sort_dir",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "unstable_tag",
                    "orig": "unstable_tag",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/audio/",
              "parts": [
                "v1",
                "audio"
              ],
              "select": {
                "exist": [
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
                  "unstable_tag"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/audio/{identifier}/related/",
              "parts": [
                "v1",
                "audio",
                "{identifier}",
                "related"
              ],
              "select": {
                "$action": "related",
                "exist": [
                  "identifier"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/audio/{identifier}/waveform/",
              "parts": [
                "v1",
                "audio",
                "{identifier}",
                "waveform"
              ],
              "select": {
                "$action": "waveform",
                "exist": [
                  "identifier"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.points`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/audio/stats/",
              "parts": [
                "v1",
                "audio",
                "stats"
              ],
              "select": {
                "$action": "stat"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "compressed",
                    "orig": "compressed",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "full_size",
                    "orig": "full_size",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/audio/{identifier}/thumb/",
              "parts": [
                "v1",
                "audio",
                "{identifier}",
                "thumb"
              ],
              "select": {
                "$action": "thumb",
                "exist": [
                  "compressed",
                  "full_size",
                  "identifier"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "compressed",
                    "orig": "compressed",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "full_size",
                    "orig": "full_size",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/images/{identifier}/thumb/",
              "parts": [
                "v1",
                "images",
                "{identifier}",
                "thumb"
              ],
              "select": {
                "exist": [
                  "compressed",
                  "full_size",
                  "identifier"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/audio/{identifier}/",
              "parts": [
                "v1",
                "audio",
                "{id}"
              ],
              "rename": {
                "param": {
                  "identifier": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "audio"
          ],
          [
            "image"
          ]
        ]
      }
    },
    "image": {
      "fields": [
        {
          "name": "attribution",
          "req": true,
          "short": "Legally valid attribution for the media item in plain-text English.",
          "type": "`$STRING`"
        },
        {
          "name": "author_name",
          "req": true,
          "short": "The name of the media creator.",
          "type": "`$STRING`"
        },
        {
          "name": "author_url",
          "req": true,
          "short": "A direct link to the media creator.",
          "type": "`$STRING`"
        },
        {
          "name": "category",
          "short": "The top-level classification of this media file.",
          "type": "`$STRING`"
        },
        {
          "name": "creator",
          "short": "The name of the media creator.",
          "type": "`$STRING`"
        },
        {
          "name": "creator_url",
          "short": "A direct link to the media creator.",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "The explanation on why media is being reported.",
          "type": "`$STRING`"
        },
        {
          "name": "detail_url",
          "req": true,
          "short": "A direct link to the detail view of this audio file.",
          "type": "`$STRING`"
        },
        {
          "name": "display_name",
          "req": true,
          "short": "The name of content source, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "fields_matched",
          "req": true,
          "short": "List the fields that matched the query for this result.",
          "type": "`$ARRAY`"
        },
        {
          "name": "filesize",
          "short": "Number in bytes, e.g.",
          "type": "`$INTEGER`"
        },
        {
          "name": "filetype",
          "short": "The type of the file, related to the file extension.",
          "type": "`$STRING`"
        },
        {
          "name": "foreign_landing_url",
          "short": "The landing page of the work.",
          "type": "`$STRING`"
        },
        {
          "name": "height",
          "op": {
            "load": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "The height of the image in pixels.",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Our unique identifier for an open-licensed work.",
          "type": "`$STRING`"
        },
        {
          "name": "identifier",
          "req": true,
          "short": "Our unique identifier for an open-licensed work.",
          "type": "`$STRING`"
        },
        {
          "name": "indexed_on",
          "req": true,
          "short": "The timestamp of when the media was indexed by Openverse.",
          "type": "`$STRING`"
        },
        {
          "name": "license",
          "req": true,
          "short": "The name of license for the media.",
          "type": "`$STRING`"
        },
        {
          "name": "license_url",
          "req": true,
          "short": "A direct link to the license deed or legal terms.",
          "type": "`$STRING`"
        },
        {
          "name": "license_version",
          "short": "The version of the media license.",
          "type": "`$STRING`"
        },
        {
          "name": "logo_url",
          "req": true,
          "short": "The URL to a logo for the source.",
          "type": "`$STRING`"
        },
        {
          "name": "mature",
          "req": true,
          "short": "Whether the media item is marked as mature",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "media_count",
          "req": true,
          "short": "The number of media items indexed from the source.",
          "type": "`$INTEGER`"
        },
        {
          "name": "provider",
          "short": "The content provider, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "reason",
          "req": true,
          "short": "The reason to report media to Openverse.",
          "type": "`$ANY`"
        },
        {
          "name": "related_url",
          "req": true,
          "short": "A link to an endpoint that provides similar audio files.",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "short": "The source of the data, meaning a particular dataset.",
          "type": "`$STRING`"
        },
        {
          "name": "source_name",
          "req": true,
          "short": "The source of the media, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "source_url",
          "req": true,
          "short": "The URL of the source, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "req": true,
          "short": "Tags with detailed metadata, such as accuracy.",
          "type": "`$ARRAY`"
        },
        {
          "name": "thumbnail",
          "req": true,
          "short": "A direct link to the miniature artwork.",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "The name of the media.",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
          "short": "The resource type, always set to 'photo' for images.",
          "type": "`$ANY`"
        },
        {
          "name": "url",
          "short": "The actual URL to the media file.",
          "type": "`$STRING`"
        },
        {
          "name": "version",
          "req": true,
          "short": "The oEmbed version number, always set to 1.0.",
          "type": "`$ANY`"
        },
        {
          "name": "width",
          "op": {
            "load": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "The width of the image in pixels.",
          "type": "`$INTEGER`"
        }
      ],
      "name": "image",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/v1/images/{identifier}/report/",
              "parts": [
                "v1",
                "images",
                "{identifier}",
                "report"
              ],
              "select": {
                "$action": "report",
                "exist": [
                  "identifier"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.reason`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "aspect_ratio",
                    "orig": "aspect_ratio",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "creator",
                    "orig": "creator",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "excluded_source",
                    "orig": "excluded_source",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "extension",
                    "orig": "extension",
                    "type": "`$STRING`"
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "filter_dead",
                    "orig": "filter_dead",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "license",
                    "orig": "license",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "license_type",
                    "orig": "license_type",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "mature",
                    "orig": "mature",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "size",
                    "orig": "size",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "source",
                    "orig": "source",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "unstable_authority",
                    "orig": "unstable_authority",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "unstable_authority_boost",
                    "orig": "unstable_authority_boost",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "unstable_collection",
                    "orig": "unstable_collection",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "unstable_include_sensitive_result",
                    "orig": "unstable_include_sensitive_result",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": "relevance",
                    "kind": "query",
                    "name": "unstable_sort_by",
                    "orig": "unstable_sort_by",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "desc",
                    "kind": "query",
                    "name": "unstable_sort_dir",
                    "orig": "unstable_sort_dir",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "unstable_tag",
                    "orig": "unstable_tag",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/images/",
              "parts": [
                "v1",
                "images"
              ],
              "select": {
                "exist": [
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
                  "unstable_tag"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/images/{identifier}/related/",
              "parts": [
                "v1",
                "images",
                "{identifier}",
                "related"
              ],
              "select": {
                "$action": "related",
                "exist": [
                  "identifier"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/images/stats/",
              "parts": [
                "v1",
                "images",
                "stats"
              ],
              "select": {
                "$action": "stat"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/images/{identifier}/",
              "parts": [
                "v1",
                "images",
                "{id}"
              ],
              "rename": {
                "param": {
                  "identifier": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "url",
                    "orig": "url",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/images/oembed/",
              "parts": [
                "v1",
                "images",
                "oembed"
              ],
              "select": {
                "$action": "oembed",
                "exist": [
                  "url"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "image"
          ]
        ]
      }
    },
    "o_auth2_application": {
      "fields": [
        {
          "name": "description",
          "req": true,
          "short": "A description of what you are trying to achieve with your project using the API.",
          "type": "`$STRING`"
        },
        {
          "name": "email",
          "req": true,
          "short": "A valid email that we can reach you at if we have any questions about your use case or data consumption.",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "short": "A unique human-readable name for your application or project requiring access to the Openverse API.",
          "type": "`$STRING`"
        }
      ],
      "name": "o_auth2_application",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/v1/auth_tokens/register/",
              "parts": [
                "v1",
                "auth_tokens",
                "register"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "o_auth2_key_info": {
      "fields": [
        {
          "name": "rate_limit_model",
          "req": true,
          "short": "The type of rate limit applied to your key.",
          "type": "`$STRING`"
        },
        {
          "name": "requests_this_minute",
          "req": true,
          "short": "The number of requests your key has performed in the last minute.",
          "type": "`$INTEGER`"
        },
        {
          "name": "requests_today",
          "req": true,
          "short": "The number of requests your key has performed in the last day.",
          "type": "`$INTEGER`"
        },
        {
          "name": "verified",
          "req": true,
          "short": "Whether the application has verified the submitted email address.",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "o_auth2_key_info",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/rate_limit/",
              "parts": [
                "v1",
                "rate_limit"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "o_auth2_token": {
      "fields": [
        {
          "name": "access_token",
          "req": true,
          "short": "The access token that can be used to authenticate requests.",
          "type": "`$STRING`"
        },
        {
          "name": "expires_in",
          "req": true,
          "short": "The number of seconds until the token expires.",
          "type": "`$INTEGER`"
        },
        {
          "name": "scope",
          "req": true,
          "short": "The scope of the token.",
          "type": "`$STRING`"
        },
        {
          "name": "token_type",
          "req": true,
          "short": "The type of token.",
          "type": "`$STRING`"
        }
      ],
      "name": "o_auth2_token",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/v1/auth_tokens/token/",
              "parts": [
                "v1",
                "auth_tokens",
                "token"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

