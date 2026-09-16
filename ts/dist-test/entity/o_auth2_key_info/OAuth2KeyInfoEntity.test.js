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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OAuth2KeyInfoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENVERSE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENVERSE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenverseSDK.test();
        const ent = testsdk.OAuth2KeyInfo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENVERSE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'o_auth2_key_info.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "rate_limit_model", "req": true, "short": "The type of rate limit applied to your key.", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "requests_this_minute", "req": true, "short": "The number of requests your key has performed in the last minute.", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "requests_today", "req": true, "short": "The number of requests your key has performed in the last day.", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "verified", "req": true, "short": "Whether the application has verified the submitted email address.", "type": "`$BOOLEAN`", "index$": 3 }], "name": "o_auth2_key_info", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /v1/rate_limit/", "json": "{\"operationId\":\"key_info\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"OK\":{\"value\":{\"rate_limit_model\":\"enhanced\",\"requests_this_minute\":2,\"requests_today\":40}}},\"schema\":{\"properties\":{\"rate_limit_model\":{\"description\":\"The type of rate limit applied to your key. Can be 'standard' or 'enhanced'; enhanced users enjoy higher rate limits than their standard key counterparts. Contact Openverse if you need a higher rate limit.\",\"type\":\"string\"},\"requests_this_minute\":{\"description\":\"The number of requests your key has performed in the last minute.\",\"nullable\":true,\"type\":\"integer\"},\"requests_today\":{\"description\":\"The number of requests your key has performed in the last day.\",\"nullable\":true,\"type\":\"integer\"},\"verified\":{\"description\":\"Whether the application has verified the submitted email address.\",\"type\":\"boolean\"}},\"required\":[\"rate_limit_model\",\"requests_this_minute\",\"requests_today\",\"verified\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"Unauthorized\":{\"value\":{\"detail\":\"Authentication credentials were not provided.\"}}},\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"NotAuthenticated\",\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"APIException\",\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"InternalServerError\":{\"summary\":\"Internal Server Error\",\"value\":{\"detail\":\"A server error occurred.\"}}},\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"APIException\",\"type\":\"object\"}}},\"description\":\"Internal Server Error\"}},\"security\":[{\"Openverse API Token\":[]}],\"securitySchemes\":{\"Openverse API Token\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/rate_limit/", "segments": [{ "lit": "v1" }, { "lit": "rate_limit" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "o_auth2_key_info", "name__orig": "o_auth2_key_info", "Name": "OAuth2KeyInfo", "name_": "o_auth2_key_info", "name-": "o-auth2-key-info", "NAME": "O_AUTH2_KEY_INFO", "index$": 3 }, { "active": true, "entity": "o_auth2_key_info", "key$": "BasicOAuth2KeyInfoFlow", "kind": "basic", "name": "BasicOAuth2KeyInfoFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "o_auth2_key_info_ref01", "srcdatavar": "o_auth2_key_info_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-o_auth2_key_info_ref01" } }], "index$": 0 }] }, 'OAuth2KeyInfo');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let o_auth2_key_info_ref01_data = Object.values(setup.data.existing.o_auth2_key_info)[0];
        // LOAD
        const o_auth2_key_info_ref01_ent = client.OAuth2KeyInfo();
        const o_auth2_key_info_ref01_match_dt0 = {};
        const o_auth2_key_info_ref01_data_dt0 = (await o_auth2_key_info_ref01_ent.load(o_auth2_key_info_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != o_auth2_key_info_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/o_auth2_key_info/OAuth2KeyInfoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenverseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['o_auth2_key_info01', 'o_auth2_key_info02', 'o_auth2_key_info03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENVERSE_TEST_O_AUTH2_KEY_INFO_ENTID': idmap,
        'OPENVERSE_TEST_LIVE': 'FALSE',
        'OPENVERSE_TEST_EXPLAIN': 'FALSE',
        'OPENVERSE_APIKEY': '',
    });
    idmap = env['OPENVERSE_TEST_O_AUTH2_KEY_INFO_ENTID'];
    const live = 'TRUE' === env.OPENVERSE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENVERSE_TEST_O_AUTH2_KEY_INFO_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenverseSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.OPENVERSE_APIKEY,
            },
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
        explain: 'TRUE' === env.OPENVERSE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=OAuth2KeyInfoEntity.test.js.map