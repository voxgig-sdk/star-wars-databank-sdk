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
			"name": "StarWarsDatabank",
			"slug": "star-wars-databank",
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
			"base": "https://starwars-databank-server.onrender.com/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"character": map[string]any{},
				"creature": map[string]any{},
				"droid": map[string]any{},
				"location": map[string]any{},
				"organization": map[string]any{},
				"species": map[string]any{},
				"vehicle": map[string]any{},
			},
		},
		"entity": map[string]any{
			"character": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "affiliation",
						"short": "Character's affiliation or allegiance",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the character",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeworld",
						"short": "Character's home planet",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the character",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "image",
						"short": "URL to the character's image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the character",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "species",
						"short": "Character's species",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "URL to the official Star Wars Databank entry",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "character",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/characters",
								"segments": []any{
									map[string]any{
										"lit": "characters",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"characters",
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
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/characters/{id}",
								"segments": []any{
									map[string]any{
										"lit": "characters",
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
									"characters",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"creature": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "classification",
						"short": "Creature's classification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the creature",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "habitat",
						"short": "Creature's natural habitat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the creature",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "image",
						"short": "URL to the creature's image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the creature",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "URL to the official Star Wars Databank entry",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "creature",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/creatures",
								"segments": []any{
									map[string]any{
										"lit": "creatures",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"creatures",
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
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/creatures/{id}",
								"segments": []any{
									map[string]any{
										"lit": "creatures",
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
									"creatures",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"droid": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "affiliation",
						"short": "Droid's affiliation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the droid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the droid",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "image",
						"short": "URL to the droid's image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"short": "Droid's manufacturer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name or designation of the droid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Droid type or class",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "URL to the official Star Wars Databank entry",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "droid",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/droids",
								"segments": []any{
									map[string]any{
										"lit": "droids",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"droids",
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
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/droids/{id}",
								"segments": []any{
									map[string]any{
										"lit": "droids",
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
									"droids",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"location": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Detailed description of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "image",
						"short": "URL to the location's image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"short": "Galactic region where the location is situated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sector",
						"short": "Sector where the location is situated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "terrain",
						"short": "Terrain type of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "URL to the official Star Wars Databank entry",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "location",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/locations",
								"segments": []any{
									map[string]any{
										"lit": "locations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"locations",
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
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/locations/{id}",
								"segments": []any{
									map[string]any{
										"lit": "locations",
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
									"locations",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"organization": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "allegiance",
						"short": "Organization's allegiance",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the organization",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the organization",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "image",
						"short": "URL to the organization's image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "leader",
						"short": "Leader of the organization",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the organization",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of organization",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "URL to the official Star Wars Databank entry",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "organization",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/organizations",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"organizations",
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
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/organizations/{id}",
								"segments": []any{
									map[string]any{
										"lit": "organizations",
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
									"organizations",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"species": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "classification",
						"short": "Biological classification",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "designation",
						"short": "Sentience designation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "homeworld",
						"short": "Homeworld of the species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the species",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "image",
						"short": "URL to the species' image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"short": "Language spoken by the species",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the species",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "URL to the official Star Wars Databank entry",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "species",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/species",
								"segments": []any{
									map[string]any{
										"lit": "species",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"species",
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
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/species/{id}",
								"segments": []any{
									map[string]any{
										"lit": "species",
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
									"species",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"vehicle": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "affiliation",
						"short": "Vehicle's affiliation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "armament",
						"short": "Vehicle armament",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "class",
						"short": "Vehicle class or type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "crew",
						"short": "Crew capacity",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Detailed description of the vehicle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the vehicle",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "image",
						"short": "URL to the vehicle's image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "length",
						"short": "Length of the vehicle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"short": "Vehicle manufacturer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the vehicle",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"short": "URL to the official Star Wars Databank entry",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "vehicle",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vehicles",
								"segments": []any{
									map[string]any{
										"lit": "vehicles",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"vehicles",
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
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/vehicles/{id}",
								"segments": []any{
									map[string]any{
										"lit": "vehicles",
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
									"vehicles",
									"{id}",
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
