"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LocationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when STAR_WARS_DATABANK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('STAR_WARS_DATABANK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.StarWarsDatabankSDK.test();
        const ent = testsdk.Location();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.STAR_WARS_DATABANK_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'location.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Detailed description of the location", "t": "`$STRING`", "key$": "description", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the location", "t": "`$STRING`", "key$": "id", "index$": 1 }, "image": { "a": true, "fo": "uri", "h": "Image", "n": "image", "r": false, "sh": "URL to the location's image", "t": "`$STRING`", "key$": "image", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the location", "t": "`$STRING`", "key$": "name", "index$": 3 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "Galactic region where the location is situated", "t": "`$STRING`", "key$": "region", "index$": 4 }, "sector": { "a": true, "h": "Sector", "n": "sector", "r": false, "sh": "Sector where the location is situated", "t": "`$STRING`", "key$": "sector", "index$": 5 }, "terrain": { "a": true, "h": "Terrain", "n": "terrain", "r": false, "sh": "Terrain type of the location", "t": "`$STRING`", "key$": "terrain", "index$": 6 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "sh": "URL to the official Star Wars Databank entry", "t": "`$STRING`", "key$": "url", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "location", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /locations", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/locations", "q": { "exist": ["limit", "page"] }, "r": {}, "s": [{ "lit": "locations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /locations/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/locations/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "locations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "location", "name__orig": "location", "Name": "Location", "name_": "location", "name-": "location", "NAME": "LOCATION", "index$": 3 }, { "active": true, "entity": "location", "key$": "BasicLocationFlow", "kind": "basic", "name": "BasicLocationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "location_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "location_ref01", "srcdatavar": "location_ref01_data", "suffix": "_dt0" }, "m": { "id": "location01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-location_ref01" } }], "index$": 1 }] }, 'Location', { "GET /locations": { "protocol": "http", "operationId": "getAllLocations", "responses": { "200": { "description": "Successful response with list of locations", "content": { "application/json": { "schema": { "type": "object", "properties": { "data": { "items": { "properties": { "_id": { "description": "Unique identifier for the location", "type": "string", "key$": "_id" }, "description": { "description": "Detailed description of the location", "type": "string", "key$": "description" }, "image": { "description": "URL to the location's image", "format": "uri", "type": "string", "key$": "image" }, "name": { "description": "Name of the location", "type": "string", "key$": "name" }, "region": { "description": "Galactic region where the location is situated", "type": "string", "key$": "region" }, "sector": { "description": "Sector where the location is situated", "type": "string", "key$": "sector" }, "terrain": { "description": "Terrain type of the location", "type": "string", "key$": "terrain" }, "url": { "description": "URL to the official Star Wars Databank entry", "format": "uri", "type": "string", "key$": "url" } }, "type": "object", "x-ref": "#/components/schemas/Location", "index$": 0 }, "key$": "data", "type": "array" }, "info": { "key$": "info", "properties": { "count": { "description": "Total number of items available", "type": "integer" }, "next": { "description": "URL to the next page of results", "format": "uri", "nullable": true, "type": "string" }, "pages": { "description": "Total number of pages", "type": "integer" }, "prev": { "description": "URL to the previous page of results", "format": "uri", "nullable": true, "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PaginationInfo" } } } } } } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 0 }, { "name": "limit", "in": "query", "description": "Number of items per page", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 10 }, "index$": 1 }], "securitySource": "unspecified" }, "GET /locations/{id}": { "protocol": "http", "operationId": "getLocationById", "responses": { "200": { "description": "Successful response with location details", "content": { "application/json": { "schema": { "type": "object", "properties": { "_id": { "description": "Unique identifier for the location", "type": "string", "key$": "_id" }, "name": { "description": "Name of the location", "type": "string", "key$": "name" }, "description": { "description": "Detailed description of the location", "type": "string", "key$": "description" }, "image": { "description": "URL to the location's image", "format": "uri", "type": "string", "key$": "image" }, "region": { "description": "Galactic region where the location is situated", "type": "string", "key$": "region" }, "sector": { "description": "Sector where the location is situated", "type": "string", "key$": "sector" }, "terrain": { "description": "Terrain type of the location", "type": "string", "key$": "terrain" }, "url": { "description": "URL to the official Star Wars Databank entry", "format": "uri", "type": "string", "key$": "url" } }, "x-ref": "#/components/schemas/Location", "index$": 0 } } } }, "404": { "description": "Location not found" } }, "parameters": [{ "name": "id", "in": "path", "description": "Location ID", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let location_ref01_data = Object.values(setup.data.existing.location)[0];
        // LIST
        const location_ref01_ent = client.Location();
        const location_ref01_match = {};
        const location_ref01_list = (await location_ref01_ent.list(location_ref01_match)).map((e) => e.data());
        // LOAD
        const location_ref01_match_dt0 = {};
        location_ref01_match_dt0.id = location_ref01_data.id;
        const location_ref01_data_dt0 = (await location_ref01_ent.load(location_ref01_match_dt0)).data();
        (0, node_assert_1.default)(location_ref01_data_dt0.id === location_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/location/LocationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.StarWarsDatabankSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['location01', 'location02', 'location03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'STAR_WARS_DATABANK_TEST_LOCATION_ENTID': idmap,
        'STAR_WARS_DATABANK_TEST_LIVE': 'FALSE',
        'STAR_WARS_DATABANK_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['STAR_WARS_DATABANK_TEST_LOCATION_ENTID'];
    const live = 'TRUE' === env.STAR_WARS_DATABANK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['STAR_WARS_DATABANK_TEST_LOCATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.StarWarsDatabankSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.STAR_WARS_DATABANK_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=LocationEntity.test.js.map