# Openverse SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Openverse",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.openverse.org",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "audio": {},
                "image": {},
                "o_auth2_application": {},
                "o_auth2_key_info": {},
                "o_auth2_token": {},
            },
        },
        "entity": {
      "audio": {
        "fields": [
          {
            "name": "alt_files",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "attribution",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "audio_set",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "bit_rate",
            "type": "`$INTEGER`",
          },
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "creator",
            "type": "`$STRING`",
          },
          {
            "name": "creator_url",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "detail_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "display_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "fields_matched",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "filesize",
            "type": "`$INTEGER`",
          },
          {
            "name": "filetype",
            "type": "`$STRING`",
          },
          {
            "name": "foreign_landing_url",
            "type": "`$STRING`",
          },
          {
            "name": "genres",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "identifier",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "indexed_on",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "len",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "license",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "license_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "license_version",
            "type": "`$STRING`",
          },
          {
            "name": "logo_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "mature",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "media_count",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "points",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "provider",
            "type": "`$STRING`",
          },
          {
            "name": "reason",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "related_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "sample_rate",
            "type": "`$INTEGER`",
          },
          {
            "name": "source",
            "type": "`$STRING`",
          },
          {
            "name": "source_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "source_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "thumbnail",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "waveform",
            "req": True,
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/v1/audio/{identifier}/report/",
                "parts": [
                  "v1",
                  "audio",
                  "{identifier}",
                  "report",
                ],
                "select": {
                  "$action": "report",
                  "exist": [
                    "identifier",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.reason`",
                },
              },
            ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "creator",
                      "orig": "creator",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "excluded_source",
                      "orig": "excluded_source",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "extension",
                      "orig": "extension",
                      "type": "`$STRING`",
                    },
                    {
                      "example": True,
                      "kind": "query",
                      "name": "filter_dead",
                      "orig": "filter_dead",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "length",
                      "orig": "length",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "license",
                      "orig": "license",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "license_type",
                      "orig": "license_type",
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "mature",
                      "orig": "mature",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "peak",
                      "orig": "peak",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "source",
                      "orig": "source",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "title",
                      "orig": "title",
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "unstable_authority",
                      "orig": "unstable_authority",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "unstable_authority_boost",
                      "orig": "unstable_authority_boost",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "unstable_collection",
                      "orig": "unstable_collection",
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "unstable_include_sensitive_result",
                      "orig": "unstable_include_sensitive_result",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": "relevance",
                      "kind": "query",
                      "name": "unstable_sort_by",
                      "orig": "unstable_sort_by",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "desc",
                      "kind": "query",
                      "name": "unstable_sort_dir",
                      "orig": "unstable_sort_dir",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "unstable_tag",
                      "orig": "unstable_tag",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/audio/",
                "parts": [
                  "v1",
                  "audio",
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
                    "unstable_tag",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "identifier",
                      "orig": "identifier",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/audio/{identifier}/related/",
                "parts": [
                  "v1",
                  "audio",
                  "{identifier}",
                  "related",
                ],
                "select": {
                  "$action": "related",
                  "exist": [
                    "identifier",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "identifier",
                      "orig": "identifier",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/audio/{identifier}/waveform/",
                "parts": [
                  "v1",
                  "audio",
                  "{identifier}",
                  "waveform",
                ],
                "select": {
                  "$action": "waveform",
                  "exist": [
                    "identifier",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.points`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/v1/audio/stats/",
                "parts": [
                  "v1",
                  "audio",
                  "stats",
                ],
                "select": {
                  "$action": "stat",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "compressed",
                      "orig": "compressed",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "full_size",
                      "orig": "full_size",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/audio/{identifier}/thumb/",
                "parts": [
                  "v1",
                  "audio",
                  "{identifier}",
                  "thumb",
                ],
                "select": {
                  "$action": "thumb",
                  "exist": [
                    "compressed",
                    "full_size",
                    "identifier",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "identifier",
                      "orig": "identifier",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "compressed",
                      "orig": "compressed",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "full_size",
                      "orig": "full_size",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/images/{identifier}/thumb/",
                "parts": [
                  "v1",
                  "images",
                  "{identifier}",
                  "thumb",
                ],
                "select": {
                  "exist": [
                    "compressed",
                    "full_size",
                    "identifier",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "identifier",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/audio/{identifier}/",
                "parts": [
                  "v1",
                  "audio",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "identifier": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "audio",
            ],
            [
              "image",
            ],
          ],
        },
      },
      "image": {
        "fields": [
          {
            "name": "attribution",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "author_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "author_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "creator",
            "type": "`$STRING`",
          },
          {
            "name": "creator_url",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "detail_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "display_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "fields_matched",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "filesize",
            "type": "`$INTEGER`",
          },
          {
            "name": "filetype",
            "type": "`$STRING`",
          },
          {
            "name": "foreign_landing_url",
            "type": "`$STRING`",
          },
          {
            "name": "height",
            "op": {
              "load": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "identifier",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "indexed_on",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "license",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "license_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "license_version",
            "type": "`$STRING`",
          },
          {
            "name": "logo_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "mature",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "media_count",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "provider",
            "type": "`$STRING`",
          },
          {
            "name": "reason",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "related_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "type": "`$STRING`",
          },
          {
            "name": "source_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "source_url",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "thumbnail",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "version",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "width",
            "op": {
              "load": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "type": "`$INTEGER`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/v1/images/{identifier}/report/",
                "parts": [
                  "v1",
                  "images",
                  "{identifier}",
                  "report",
                ],
                "select": {
                  "$action": "report",
                  "exist": [
                    "identifier",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.reason`",
                },
              },
            ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "creator",
                      "orig": "creator",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "excluded_source",
                      "orig": "excluded_source",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "extension",
                      "orig": "extension",
                      "type": "`$STRING`",
                    },
                    {
                      "example": True,
                      "kind": "query",
                      "name": "filter_dead",
                      "orig": "filter_dead",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "license",
                      "orig": "license",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "license_type",
                      "orig": "license_type",
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "mature",
                      "orig": "mature",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "size",
                      "orig": "size",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "source",
                      "orig": "source",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "title",
                      "orig": "title",
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "unstable_authority",
                      "orig": "unstable_authority",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "unstable_authority_boost",
                      "orig": "unstable_authority_boost",
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "unstable_collection",
                      "orig": "unstable_collection",
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "unstable_include_sensitive_result",
                      "orig": "unstable_include_sensitive_result",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": "relevance",
                      "kind": "query",
                      "name": "unstable_sort_by",
                      "orig": "unstable_sort_by",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "desc",
                      "kind": "query",
                      "name": "unstable_sort_dir",
                      "orig": "unstable_sort_dir",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "unstable_tag",
                      "orig": "unstable_tag",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/images/",
                "parts": [
                  "v1",
                  "images",
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
                    "unstable_tag",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "identifier",
                      "orig": "identifier",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/images/{identifier}/related/",
                "parts": [
                  "v1",
                  "images",
                  "{identifier}",
                  "related",
                ],
                "select": {
                  "$action": "related",
                  "exist": [
                    "identifier",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/v1/images/stats/",
                "parts": [
                  "v1",
                  "images",
                  "stats",
                ],
                "select": {
                  "$action": "stat",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/images/{identifier}/",
                "parts": [
                  "v1",
                  "images",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "identifier": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "url",
                      "orig": "url",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/images/oembed/",
                "parts": [
                  "v1",
                  "images",
                  "oembed",
                ],
                "select": {
                  "$action": "oembed",
                  "exist": [
                    "url",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "image",
            ],
          ],
        },
      },
      "o_auth2_application": {
        "fields": [
          {
            "name": "description",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
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
                  "register",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "o_auth2_key_info": {
        "fields": [
          {
            "name": "rate_limit_model",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "requests_this_minute",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "requests_today",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "verified",
            "req": True,
            "type": "`$BOOLEAN`",
          },
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
                  "rate_limit",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "o_auth2_token": {
        "fields": [
          {
            "name": "access_token",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "expires_in",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "scope",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "token_type",
            "req": True,
            "type": "`$STRING`",
          },
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
                  "token",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
