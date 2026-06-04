
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
          "name": "alt_file",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "attribution",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "audio_set",
          "req": true,
          "type": "`$ANY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "bit_rate",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "creator",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "creator_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "detail_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "display_name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "duration",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 10
        },
        {
          "name": "fields_matched",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 11
        },
        {
          "name": "filesize",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 12
        },
        {
          "name": "filetype",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 13
        },
        {
          "name": "foreign_landing_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 14
        },
        {
          "name": "genre",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 15
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 16
        },
        {
          "name": "identifier",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 17
        },
        {
          "name": "indexed_on",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 18
        },
        {
          "name": "len",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 19
        },
        {
          "name": "license",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 20
        },
        {
          "name": "license_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 21
        },
        {
          "name": "license_version",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 22
        },
        {
          "name": "logo_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 23
        },
        {
          "name": "mature",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 24
        },
        {
          "name": "media_count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 25
        },
        {
          "name": "point",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 26
        },
        {
          "name": "provider",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 27
        },
        {
          "name": "reason",
          "req": true,
          "type": "`$ANY`",
          "active": true,
          "index$": 28
        },
        {
          "name": "related_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 29
        },
        {
          "name": "sample_rate",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 30
        },
        {
          "name": "source",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 31
        },
        {
          "name": "source_name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 32
        },
        {
          "name": "source_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 33
        },
        {
          "name": "tag",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 34
        },
        {
          "name": "thumbnail",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 35
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 36
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 37
        },
        {
          "name": "waveform",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 38
        }
      ],
      "name": "audio",
      "op": {
        "create": {
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
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "creator",
                    "orig": "creator",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "excluded_source",
                    "orig": "excluded_source",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "extension",
                    "orig": "extension",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "filter_dead",
                    "orig": "filter_dead",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "length",
                    "orig": "length",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "license",
                    "orig": "license",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "license_type",
                    "orig": "license_type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "mature",
                    "orig": "mature",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "peak",
                    "orig": "peak",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "source",
                    "orig": "source",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "unstable_authority",
                    "orig": "unstable_authority",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "unstable_authority_boost",
                    "orig": "unstable_authority_boost",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "unstable_collection",
                    "orig": "unstable_collection",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "unstable_include_sensitive_result",
                    "orig": "unstable_include_sensitive_result",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": "relevance",
                    "kind": "query",
                    "name": "unstable_sort_by",
                    "orig": "unstable_sort_by",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "desc",
                    "kind": "query",
                    "name": "unstable_sort_dir",
                    "orig": "unstable_sort_dir",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "unstable_tag",
                    "orig": "unstable_tag",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 2
            },
            {
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
              "active": true,
              "args": {},
              "index$": 3
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
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
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "compressed",
                    "orig": "compressed",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "full_size",
                    "orig": "full_size",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "compressed",
                    "orig": "compressed",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "full_size",
                    "orig": "full_size",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
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
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 2
            }
          ],
          "input": "data",
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
          "name": "attribution",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "author_name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "author_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "category",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "creator",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "creator_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "detail_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "display_name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "fields_matched",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 9
        },
        {
          "name": "filesize",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 10
        },
        {
          "name": "filetype",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "foreign_landing_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        },
        {
          "name": "height",
          "op": {
            "load": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 13
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 14
        },
        {
          "name": "identifier",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 15
        },
        {
          "name": "indexed_on",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 16
        },
        {
          "name": "license",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 17
        },
        {
          "name": "license_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 18
        },
        {
          "name": "license_version",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 19
        },
        {
          "name": "logo_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 20
        },
        {
          "name": "mature",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 21
        },
        {
          "name": "media_count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 22
        },
        {
          "name": "provider",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 23
        },
        {
          "name": "reason",
          "req": true,
          "type": "`$ANY`",
          "active": true,
          "index$": 24
        },
        {
          "name": "related_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 25
        },
        {
          "name": "source",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 26
        },
        {
          "name": "source_name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 27
        },
        {
          "name": "source_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 28
        },
        {
          "name": "tag",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 29
        },
        {
          "name": "thumbnail",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 30
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 31
        },
        {
          "name": "type",
          "req": true,
          "type": "`$ANY`",
          "active": true,
          "index$": 32
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 33
        },
        {
          "name": "version",
          "req": true,
          "type": "`$ANY`",
          "active": true,
          "index$": 34
        },
        {
          "name": "width",
          "op": {
            "load": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 35
        }
      ],
      "name": "image",
      "op": {
        "create": {
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
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "aspect_ratio",
                    "orig": "aspect_ratio",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "creator",
                    "orig": "creator",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "excluded_source",
                    "orig": "excluded_source",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "extension",
                    "orig": "extension",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": true,
                    "kind": "query",
                    "name": "filter_dead",
                    "orig": "filter_dead",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "license",
                    "orig": "license",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "license_type",
                    "orig": "license_type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "mature",
                    "orig": "mature",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "page_size",
                    "orig": "page_size",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "size",
                    "orig": "size",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "source",
                    "orig": "source",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "tag",
                    "orig": "tag",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "unstable_authority",
                    "orig": "unstable_authority",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "unstable_authority_boost",
                    "orig": "unstable_authority_boost",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "unstable_collection",
                    "orig": "unstable_collection",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "unstable_include_sensitive_result",
                    "orig": "unstable_include_sensitive_result",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": "relevance",
                    "kind": "query",
                    "name": "unstable_sort_by",
                    "orig": "unstable_sort_by",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "desc",
                    "kind": "query",
                    "name": "unstable_sort_dir",
                    "orig": "unstable_sort_dir",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "unstable_tag",
                    "orig": "unstable_tag",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "identifier",
                    "orig": "identifier",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 1
            },
            {
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
              "active": true,
              "args": {},
              "index$": 2
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
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
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "url",
                    "orig": "url",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
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
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
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
          "name": "description",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "email",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "o_auth2_application",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "method": "POST",
              "orig": "/v1/auth_tokens/register/",
              "parts": [
                "v1",
                "auth_tokens",
                "register"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
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
          "name": "rate_limit_model",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "requests_this_minute",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "requests_today",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "verified",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "o_auth2_key_info",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "method": "GET",
              "orig": "/v1/rate_limit/",
              "parts": [
                "v1",
                "rate_limit"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
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
          "name": "access_token",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "expires_in",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "scope",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "token_type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "o_auth2_token",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "method": "POST",
              "orig": "/v1/auth_tokens/token/",
              "parts": [
                "v1",
                "auth_tokens",
                "token"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
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

