<?php
declare(strict_types=1);

// Openverse SDK configuration

class OpenverseConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Openverse",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.openverse.org",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "audio" => [],
                    "image" => [],
                    "o_auth2_application" => [],
                    "o_auth2_key_info" => [],
                    "o_auth2_token" => [],
                ],
            ],
            "entity" => [
        'audio' => [
          'fields' => [
            [
              'name' => 'alt_files',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'attribution',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'audio_set',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'bit_rate',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'creator',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'creator_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'detail_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'display_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'fields_matched',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'filesize',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'filetype',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'foreign_landing_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'genres',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'identifier',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'indexed_on',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'len',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'license',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'license_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'license_version',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'logo_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mature',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'media_count',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'points',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'provider',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reason',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'related_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sample_rate',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'source',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tags',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'thumbnail',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'waveform',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'audio',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'identifier',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/audio/{identifier}/report/',
                  'parts' => [
                    'v1',
                    'audio',
                    '{identifier}',
                    'report',
                  ],
                  'select' => [
                    '$action' => 'report',
                    'exist' => [
                      'identifier',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.reason`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'creator',
                        'orig' => 'creator',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'excluded_source',
                        'orig' => 'excluded_source',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'extension',
                        'orig' => 'extension',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'filter_dead',
                        'orig' => 'filter_dead',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'length',
                        'orig' => 'length',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'license',
                        'orig' => 'license',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'license_type',
                        'orig' => 'license_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'mature',
                        'orig' => 'mature',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'peak',
                        'orig' => 'peak',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'source',
                        'orig' => 'source',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'tag',
                        'orig' => 'tag',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'title',
                        'orig' => 'title',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'unstable_authority',
                        'orig' => 'unstable_authority',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'unstable_authority_boost',
                        'orig' => 'unstable_authority_boost',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'unstable_collection',
                        'orig' => 'unstable_collection',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'unstable_include_sensitive_result',
                        'orig' => 'unstable_include_sensitive_result',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 'relevance',
                        'kind' => 'query',
                        'name' => 'unstable_sort_by',
                        'orig' => 'unstable_sort_by',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'desc',
                        'kind' => 'query',
                        'name' => 'unstable_sort_dir',
                        'orig' => 'unstable_sort_dir',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'unstable_tag',
                        'orig' => 'unstable_tag',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/audio/',
                  'parts' => [
                    'v1',
                    'audio',
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'creator',
                      'excluded_source',
                      'extension',
                      'filter_dead',
                      'length',
                      'license',
                      'license_type',
                      'mature',
                      'page',
                      'page_size',
                      'peak',
                      'q',
                      'source',
                      'tag',
                      'title',
                      'unstable_authority',
                      'unstable_authority_boost',
                      'unstable_collection',
                      'unstable_include_sensitive_result',
                      'unstable_sort_by',
                      'unstable_sort_dir',
                      'unstable_tag',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'identifier',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/audio/{identifier}/related/',
                  'parts' => [
                    'v1',
                    'audio',
                    '{identifier}',
                    'related',
                  ],
                  'select' => [
                    '$action' => 'related',
                    'exist' => [
                      'identifier',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'identifier',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/audio/{identifier}/waveform/',
                  'parts' => [
                    'v1',
                    'audio',
                    '{identifier}',
                    'waveform',
                  ],
                  'select' => [
                    '$action' => 'waveform',
                    'exist' => [
                      'identifier',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.points`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/audio/stats/',
                  'parts' => [
                    'v1',
                    'audio',
                    'stats',
                  ],
                  'select' => [
                    '$action' => 'stat',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'identifier',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'compressed',
                        'orig' => 'compressed',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'full_size',
                        'orig' => 'full_size',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/audio/{identifier}/thumb/',
                  'parts' => [
                    'v1',
                    'audio',
                    '{identifier}',
                    'thumb',
                  ],
                  'select' => [
                    '$action' => 'thumb',
                    'exist' => [
                      'compressed',
                      'full_size',
                      'identifier',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'identifier',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'compressed',
                        'orig' => 'compressed',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'full_size',
                        'orig' => 'full_size',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/images/{identifier}/thumb/',
                  'parts' => [
                    'v1',
                    'images',
                    '{identifier}',
                    'thumb',
                  ],
                  'select' => [
                    'exist' => [
                      'compressed',
                      'full_size',
                      'identifier',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/audio/{identifier}/',
                  'parts' => [
                    'v1',
                    'audio',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'identifier' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'audio',
              ],
              [
                'image',
              ],
            ],
          ],
        ],
        'image' => [
          'fields' => [
            [
              'name' => 'attribution',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'author_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'author_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'creator',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'creator_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'detail_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'display_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fields_matched',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'filesize',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'filetype',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'foreign_landing_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'height',
              'op' => [
                'load' => [
                  'req' => true,
                  'type' => '`$INTEGER`',
                ],
              ],
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'identifier',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'indexed_on',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'license',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'license_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'license_version',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'logo_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mature',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'media_count',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'provider',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reason',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'related_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source_name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'source_url',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tags',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'thumbnail',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'version',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'width',
              'op' => [
                'load' => [
                  'req' => true,
                  'type' => '`$INTEGER`',
                ],
              ],
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'image',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'identifier',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/images/{identifier}/report/',
                  'parts' => [
                    'v1',
                    'images',
                    '{identifier}',
                    'report',
                  ],
                  'select' => [
                    '$action' => 'report',
                    'exist' => [
                      'identifier',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.reason`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'aspect_ratio',
                        'orig' => 'aspect_ratio',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'creator',
                        'orig' => 'creator',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'excluded_source',
                        'orig' => 'excluded_source',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'extension',
                        'orig' => 'extension',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => true,
                        'kind' => 'query',
                        'name' => 'filter_dead',
                        'orig' => 'filter_dead',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'license',
                        'orig' => 'license',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'license_type',
                        'orig' => 'license_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'mature',
                        'orig' => 'mature',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'size',
                        'orig' => 'size',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'source',
                        'orig' => 'source',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'tag',
                        'orig' => 'tag',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'title',
                        'orig' => 'title',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'unstable_authority',
                        'orig' => 'unstable_authority',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'unstable_authority_boost',
                        'orig' => 'unstable_authority_boost',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'unstable_collection',
                        'orig' => 'unstable_collection',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'unstable_include_sensitive_result',
                        'orig' => 'unstable_include_sensitive_result',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 'relevance',
                        'kind' => 'query',
                        'name' => 'unstable_sort_by',
                        'orig' => 'unstable_sort_by',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'desc',
                        'kind' => 'query',
                        'name' => 'unstable_sort_dir',
                        'orig' => 'unstable_sort_dir',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'unstable_tag',
                        'orig' => 'unstable_tag',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/images/',
                  'parts' => [
                    'v1',
                    'images',
                  ],
                  'select' => [
                    'exist' => [
                      'aspect_ratio',
                      'category',
                      'creator',
                      'excluded_source',
                      'extension',
                      'filter_dead',
                      'license',
                      'license_type',
                      'mature',
                      'page',
                      'page_size',
                      'q',
                      'size',
                      'source',
                      'tag',
                      'title',
                      'unstable_authority',
                      'unstable_authority_boost',
                      'unstable_collection',
                      'unstable_include_sensitive_result',
                      'unstable_sort_by',
                      'unstable_sort_dir',
                      'unstable_tag',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'identifier',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/images/{identifier}/related/',
                  'parts' => [
                    'v1',
                    'images',
                    '{identifier}',
                    'related',
                  ],
                  'select' => [
                    '$action' => 'related',
                    'exist' => [
                      'identifier',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/images/stats/',
                  'parts' => [
                    'v1',
                    'images',
                    'stats',
                  ],
                  'select' => [
                    '$action' => 'stat',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'identifier',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/images/{identifier}/',
                  'parts' => [
                    'v1',
                    'images',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'identifier' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'url',
                        'orig' => 'url',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/images/oembed/',
                  'parts' => [
                    'v1',
                    'images',
                    'oembed',
                  ],
                  'select' => [
                    '$action' => 'oembed',
                    'exist' => [
                      'url',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'image',
              ],
            ],
          ],
        ],
        'o_auth2_application' => [
          'fields' => [
            [
              'name' => 'description',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'o_auth2_application',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/auth_tokens/register/',
                  'parts' => [
                    'v1',
                    'auth_tokens',
                    'register',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'o_auth2_key_info' => [
          'fields' => [
            [
              'name' => 'rate_limit_model',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'requests_this_minute',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'requests_today',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'verified',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'o_auth2_key_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/rate_limit/',
                  'parts' => [
                    'v1',
                    'rate_limit',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'o_auth2_token' => [
          'fields' => [
            [
              'name' => 'access_token',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_in',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'scope',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'token_type',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'o_auth2_token',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v1/auth_tokens/token/',
                  'parts' => [
                    'v1',
                    'auth_tokens',
                    'token',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return OpenverseFeatures::make_feature($name);
    }
}
