
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.openverse.org',

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
          "active": true,
          "name": "alt_file",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "attribution",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "audio_set",
          "req": true,
          "type": "`$ANY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "bit_rate",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "creator",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "creator_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "detail_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "display_name",
          "req": true,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "duration",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 10
        },
        {
          "active": true,
          "name": "fields_matched",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 11
        },
        {
          "active": true,
          "name": "filesize",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 12
        },
        {
          "active": true,
          "name": "filetype",
          "req": false,
          "type": "`$STRING`",
          "index$": 13
        },
        {
          "active": true,
          "name": "foreign_landing_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 14
        },
        {
          "active": true,
          "name": "genre",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 15
        },
        {
          "active": true,
          "name": "id",
          "req": true,
          "type": "`$STRING`",
          "index$": 16
        },
        {
          "active": true,
          "name": "identifier",
          "req": true,
          "type": "`$STRING`",
          "index$": 17
        },
        {
          "active": true,
          "name": "indexed_on",
          "req": true,
          "type": "`$STRING`",
          "index$": 18
        },
        {
          "active": true,
          "name": "len",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 19
        },
        {
          "active": true,
          "name": "license",
          "req": true,
          "type": "`$STRING`",
          "index$": 20
        },
        {
          "active": true,
          "name": "license_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 21
        },
        {
          "active": true,
          "name": "license_version",
          "req": false,
          "type": "`$STRING`",
          "index$": 22
        },
        {
          "active": true,
          "name": "logo_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 23
        },
        {
          "active": true,
          "name": "mature",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 24
        },
        {
          "active": true,
          "name": "media_count",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 25
        },
        {
          "active": true,
          "name": "point",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 26
        },
        {
          "active": true,
          "name": "provider",
          "req": false,
          "type": "`$STRING`",
          "index$": 27
        },
        {
          "active": true,
          "name": "reason",
          "req": true,
          "type": "`$ANY`",
          "index$": 28
        },
        {
          "active": true,
          "name": "related_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 29
        },
        {
          "active": true,
          "name": "sample_rate",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 30
        },
        {
          "active": true,
          "name": "source",
          "req": false,
          "type": "`$STRING`",
          "index$": 31
        },
        {
          "active": true,
          "name": "source_name",
          "req": true,
          "type": "`$STRING`",
          "index$": 32
        },
        {
          "active": true,
          "name": "source_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 33
        },
        {
          "active": true,
          "name": "tag",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 34
        },
        {
          "active": true,
          "name": "thumbnail",
          "req": true,
          "type": "`$STRING`",
          "index$": 35
        },
        {
          "active": true,
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "index$": 36
        },
        {
          "active": true,
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "index$": 37
        },
        {
          "active": true,
          "name": "waveform",
          "req": true,
          "type": "`$STRING`",
          "index$": 38
        }
      ],
      "name": "audio",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "creator",
                    "orig": "creator",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "excluded_source",
                    "orig": "excluded_source",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "extension",
                    "orig": "extension",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": true,
                    "kind": "query",
                    "name": "filter_dead",
                    "orig": "filter_dead",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "length",
                    "orig": "length",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "license",
                    "orig": "license",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "license_type",
                    "orig": "license_type",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "mature",
                    "orig": "mature",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 20,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "peak",
                    "orig": "peak",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "source",
                    "orig": "source",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "unstable_authority",
                    "orig": "unstable_authority",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "unstable_authority_boost",
                    "orig": "unstable_authority_boost",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "unstable_collection",
                    "orig": "unstable_collection",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "unstable_include_sensitive_result",
                    "orig": "unstable_include_sensitive_result",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": "relevance",
                    "kind": "query",
                    "name": "unstable_sort_by",
                    "orig": "unstable_sort_by",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "desc",
                    "kind": "query",
                    "name": "unstable_sort_dir",
                    "orig": "unstable_sort_dir",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "unstable_tag",
                    "orig": "unstable_tag",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 2
            },
            {
              "active": true,
              "args": {},
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
              },
              "index$": 3
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "compressed",
                    "orig": "compressed",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "full_size",
                    "orig": "full_size",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "compressed",
                    "orig": "compressed",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "full_size",
                    "orig": "full_size",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
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
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 2
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "attribution",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "author_name",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "author_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "creator",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "creator_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "detail_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "display_name",
          "req": true,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "fields_matched",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 9
        },
        {
          "active": true,
          "name": "filesize",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 10
        },
        {
          "active": true,
          "name": "filetype",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "foreign_landing_url",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "height",
          "op": {
            "load": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "req": false,
          "type": "`$INTEGER`",
          "index$": 13
        },
        {
          "active": true,
          "name": "id",
          "req": true,
          "type": "`$STRING`",
          "index$": 14
        },
        {
          "active": true,
          "name": "identifier",
          "req": true,
          "type": "`$STRING`",
          "index$": 15
        },
        {
          "active": true,
          "name": "indexed_on",
          "req": true,
          "type": "`$STRING`",
          "index$": 16
        },
        {
          "active": true,
          "name": "license",
          "req": true,
          "type": "`$STRING`",
          "index$": 17
        },
        {
          "active": true,
          "name": "license_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 18
        },
        {
          "active": true,
          "name": "license_version",
          "req": false,
          "type": "`$STRING`",
          "index$": 19
        },
        {
          "active": true,
          "name": "logo_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 20
        },
        {
          "active": true,
          "name": "mature",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 21
        },
        {
          "active": true,
          "name": "media_count",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 22
        },
        {
          "active": true,
          "name": "provider",
          "req": false,
          "type": "`$STRING`",
          "index$": 23
        },
        {
          "active": true,
          "name": "reason",
          "req": true,
          "type": "`$ANY`",
          "index$": 24
        },
        {
          "active": true,
          "name": "related_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 25
        },
        {
          "active": true,
          "name": "source",
          "req": false,
          "type": "`$STRING`",
          "index$": 26
        },
        {
          "active": true,
          "name": "source_name",
          "req": true,
          "type": "`$STRING`",
          "index$": 27
        },
        {
          "active": true,
          "name": "source_url",
          "req": true,
          "type": "`$STRING`",
          "index$": 28
        },
        {
          "active": true,
          "name": "tag",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 29
        },
        {
          "active": true,
          "name": "thumbnail",
          "req": true,
          "type": "`$STRING`",
          "index$": 30
        },
        {
          "active": true,
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "index$": 31
        },
        {
          "active": true,
          "name": "type",
          "req": true,
          "type": "`$ANY`",
          "index$": 32
        },
        {
          "active": true,
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "index$": 33
        },
        {
          "active": true,
          "name": "version",
          "req": true,
          "type": "`$ANY`",
          "index$": 34
        },
        {
          "active": true,
          "name": "width",
          "op": {
            "load": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "req": false,
          "type": "`$INTEGER`",
          "index$": 35
        }
      ],
      "name": "image",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "aspect_ratio",
                    "orig": "aspect_ratio",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "creator",
                    "orig": "creator",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "excluded_source",
                    "orig": "excluded_source",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "extension",
                    "orig": "extension",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": true,
                    "kind": "query",
                    "name": "filter_dead",
                    "orig": "filter_dead",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "license",
                    "orig": "license",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "license_type",
                    "orig": "license_type",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "mature",
                    "orig": "mature",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 20,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "size",
                    "orig": "size",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "source",
                    "orig": "source",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "unstable_authority",
                    "orig": "unstable_authority",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": 1,
                    "kind": "query",
                    "name": "unstable_authority_boost",
                    "orig": "unstable_authority_boost",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "unstable_collection",
                    "orig": "unstable_collection",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "unstable_include_sensitive_result",
                    "orig": "unstable_include_sensitive_result",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": "relevance",
                    "kind": "query",
                    "name": "unstable_sort_by",
                    "orig": "unstable_sort_by",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "desc",
                    "kind": "query",
                    "name": "unstable_sort_dir",
                    "orig": "unstable_sort_dir",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "unstable_tag",
                    "orig": "unstable_tag",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {},
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
              },
              "index$": 2
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "url",
                    "orig": "url",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              },
              "index$": 1
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "description",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "email",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "name",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "o_auth2_application",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
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
              },
              "index$": 0
            }
          ],
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "o_auth2_key_info": {
      "fields": [
        {
          "active": true,
          "name": "rate_limit_model",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "requests_this_minute",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "requests_today",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "verified",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 3
        }
      ],
      "name": "o_auth2_key_info",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {},
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
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "o_auth2_token": {
      "fields": [
        {
          "active": true,
          "name": "access_token",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "expires_in",
          "req": true,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "scope",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "token_type",
          "req": true,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "o_auth2_token",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
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
              },
              "index$": 0
            }
          ],
          "key$": "create"
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

