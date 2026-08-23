<?php
declare(strict_types=1);

// StarWarsDatabank SDK configuration

class StarWarsDatabankConfig
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
                "name" => "StarWarsDatabank",
                "slug" => "star-wars-databank",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://starwars-databank-server.onrender.com/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "character" => [],
                    "creature" => [],
                    "droid" => [],
                    "location" => [],
                    "organization" => [],
                    "species" => [],
                    "vehicle" => [],
                ],
            ],
            "entity" => [
        'character' => [
          'fields' => [
            [
              'name' => 'affiliation',
              'short' => 'Character\'s affiliation or allegiance',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed description of the character',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'homeworld',
              'short' => 'Character\'s home planet',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the character',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the character\'s image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the character',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'species',
              'short' => 'Character\'s species',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the official Star Wars Databank entry',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'character',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/characters',
                  'parts' => [
                    'characters',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
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
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/characters/{id}',
                  'parts' => [
                    'characters',
                    '{id}',
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
            'ancestors' => [],
          ],
        ],
        'creature' => [
          'fields' => [
            [
              'name' => 'classification',
              'short' => 'Creature\'s classification',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed description of the creature',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'habitat',
              'short' => 'Creature\'s natural habitat',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the creature',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the creature\'s image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the creature',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the official Star Wars Databank entry',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'creature',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/creatures',
                  'parts' => [
                    'creatures',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
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
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/creatures/{id}',
                  'parts' => [
                    'creatures',
                    '{id}',
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
            'ancestors' => [],
          ],
        ],
        'droid' => [
          'fields' => [
            [
              'name' => 'affiliation',
              'short' => 'Droid\'s affiliation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed description of the droid',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the droid',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the droid\'s image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'manufacturer',
              'short' => 'Droid\'s manufacturer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name or designation of the droid',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Droid type or class',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the official Star Wars Databank entry',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'droid',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/droids',
                  'parts' => [
                    'droids',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
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
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/droids/{id}',
                  'parts' => [
                    'droids',
                    '{id}',
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
            'ancestors' => [],
          ],
        ],
        'location' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Detailed description of the location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the location\'s image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'region',
              'short' => 'Galactic region where the location is situated',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sector',
              'short' => 'Sector where the location is situated',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'terrain',
              'short' => 'Terrain type of the location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the official Star Wars Databank entry',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'location',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/locations',
                  'parts' => [
                    'locations',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
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
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/locations/{id}',
                  'parts' => [
                    'locations',
                    '{id}',
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
            'ancestors' => [],
          ],
        ],
        'organization' => [
          'fields' => [
            [
              'name' => 'allegiance',
              'short' => 'Organization\'s allegiance',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed description of the organization',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the organization',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the organization\'s image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'leader',
              'short' => 'Leader of the organization',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the organization',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'short' => 'Type of organization',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the official Star Wars Databank entry',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'organization',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/organizations',
                  'parts' => [
                    'organizations',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
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
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/organizations/{id}',
                  'parts' => [
                    'organizations',
                    '{id}',
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
            'ancestors' => [],
          ],
        ],
        'species' => [
          'fields' => [
            [
              'name' => 'classification',
              'short' => 'Biological classification',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed description of the species',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'designation',
              'short' => 'Sentience designation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'homeworld',
              'short' => 'Homeworld of the species',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the species',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the species\' image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'language',
              'short' => 'Language spoken by the species',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the species',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the official Star Wars Databank entry',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'species',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/species',
                  'parts' => [
                    'species',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
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
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/species/{id}',
                  'parts' => [
                    'species',
                    '{id}',
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
            'ancestors' => [],
          ],
        ],
        'vehicle' => [
          'fields' => [
            [
              'name' => 'affiliation',
              'short' => 'Vehicle\'s affiliation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'armament',
              'short' => 'Vehicle armament',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'class',
              'short' => 'Vehicle class or type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'crew',
              'short' => 'Crew capacity',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Detailed description of the vehicle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the vehicle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'short' => 'URL to the vehicle\'s image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'length',
              'short' => 'Length of the vehicle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'manufacturer',
              'short' => 'Vehicle manufacturer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the vehicle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'URL to the official Star Wars Databank entry',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'vehicle',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/vehicles',
                  'parts' => [
                    'vehicles',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'page',
                    ],
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
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/vehicles/{id}',
                  'parts' => [
                    'vehicles',
                    '{id}',
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
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return StarWarsDatabankFeatures::make_feature($name);
    }
}
