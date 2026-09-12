"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'StarWarsDatabank',
        slug: "star-wars-databank",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://starwars-databank-server.onrender.com/api/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            character: {},
            creature: {},
            droid: {},
            location: {},
            organization: {},
            species: {},
            vehicle: {},
        }
    };
    entity = {
        "character": {
            "fields": [
                {
                    "name": "affiliation",
                    "short": "Character's affiliation or allegiance",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "short": "Detailed description of the character",
                    "type": "`$STRING`"
                },
                {
                    "name": "homeworld",
                    "short": "Character's home planet",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the character",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "image",
                    "short": "URL to the character's image",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Name of the character",
                    "type": "`$STRING`"
                },
                {
                    "name": "species",
                    "short": "Character's species",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL to the official Star Wars Databank entry",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "character",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/characters",
                            "segments": [
                                {
                                    "lit": "characters"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "characters"
                            ]
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
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/characters/{id}",
                            "segments": [
                                {
                                    "lit": "characters"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "characters",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "creature": {
            "fields": [
                {
                    "name": "classification",
                    "short": "Creature's classification",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "short": "Detailed description of the creature",
                    "type": "`$STRING`"
                },
                {
                    "name": "habitat",
                    "short": "Creature's natural habitat",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the creature",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "image",
                    "short": "URL to the creature's image",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Name of the creature",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL to the official Star Wars Databank entry",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "creature",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/creatures",
                            "segments": [
                                {
                                    "lit": "creatures"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "creatures"
                            ]
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
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/creatures/{id}",
                            "segments": [
                                {
                                    "lit": "creatures"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "creatures",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "droid": {
            "fields": [
                {
                    "name": "affiliation",
                    "short": "Droid's affiliation",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "short": "Detailed description of the droid",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the droid",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "image",
                    "short": "URL to the droid's image",
                    "type": "`$STRING`"
                },
                {
                    "name": "manufacturer",
                    "short": "Droid's manufacturer",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Name or designation of the droid",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "short": "Droid type or class",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL to the official Star Wars Databank entry",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "droid",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/droids",
                            "segments": [
                                {
                                    "lit": "droids"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "droids"
                            ]
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
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/droids/{id}",
                            "segments": [
                                {
                                    "lit": "droids"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "droids",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "location": {
            "fields": [
                {
                    "name": "description",
                    "short": "Detailed description of the location",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the location",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "image",
                    "short": "URL to the location's image",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Name of the location",
                    "type": "`$STRING`"
                },
                {
                    "name": "region",
                    "short": "Galactic region where the location is situated",
                    "type": "`$STRING`"
                },
                {
                    "name": "sector",
                    "short": "Sector where the location is situated",
                    "type": "`$STRING`"
                },
                {
                    "name": "terrain",
                    "short": "Terrain type of the location",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL to the official Star Wars Databank entry",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "location",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/locations",
                            "segments": [
                                {
                                    "lit": "locations"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "locations"
                            ]
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
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/locations/{id}",
                            "segments": [
                                {
                                    "lit": "locations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "locations",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "organization": {
            "fields": [
                {
                    "name": "allegiance",
                    "short": "Organization's allegiance",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "short": "Detailed description of the organization",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the organization",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "image",
                    "short": "URL to the organization's image",
                    "type": "`$STRING`"
                },
                {
                    "name": "leader",
                    "short": "Leader of the organization",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Name of the organization",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "short": "Type of organization",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL to the official Star Wars Databank entry",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "organization",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/organizations",
                            "segments": [
                                {
                                    "lit": "organizations"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "organizations"
                            ]
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
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/organizations/{id}",
                            "segments": [
                                {
                                    "lit": "organizations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "organizations",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "species": {
            "fields": [
                {
                    "name": "classification",
                    "short": "Biological classification",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "short": "Detailed description of the species",
                    "type": "`$STRING`"
                },
                {
                    "name": "designation",
                    "short": "Sentience designation",
                    "type": "`$STRING`"
                },
                {
                    "name": "homeworld",
                    "short": "Homeworld of the species",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the species",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "image",
                    "short": "URL to the species' image",
                    "type": "`$STRING`"
                },
                {
                    "name": "language",
                    "short": "Language spoken by the species",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Name of the species",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL to the official Star Wars Databank entry",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "species",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/species",
                            "segments": [
                                {
                                    "lit": "species"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "species"
                            ]
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
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/species/{id}",
                            "segments": [
                                {
                                    "lit": "species"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "species",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "vehicle": {
            "fields": [
                {
                    "name": "affiliation",
                    "short": "Vehicle's affiliation",
                    "type": "`$STRING`"
                },
                {
                    "name": "armament",
                    "short": "Vehicle armament",
                    "type": "`$STRING`"
                },
                {
                    "name": "class",
                    "short": "Vehicle class or type",
                    "type": "`$STRING`"
                },
                {
                    "name": "crew",
                    "short": "Crew capacity",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "short": "Detailed description of the vehicle",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the vehicle",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "image",
                    "short": "URL to the vehicle's image",
                    "type": "`$STRING`"
                },
                {
                    "name": "length",
                    "short": "Length of the vehicle",
                    "type": "`$STRING`"
                },
                {
                    "name": "manufacturer",
                    "short": "Vehicle manufacturer",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Name of the vehicle",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "short": "URL to the official Star Wars Databank entry",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "vehicle",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/vehicles",
                            "segments": [
                                {
                                    "lit": "vehicles"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "vehicles"
                            ]
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
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/vehicles/{id}",
                            "segments": [
                                {
                                    "lit": "vehicles"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "vehicles",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map