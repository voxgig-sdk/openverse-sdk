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
(0, node_test_1.describe)('OAuth2ApplicationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENVERSE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENVERSE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenverseSDK.test();
        const ent = testsdk.OAuth2Application();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENVERSE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'o_auth2_application.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "description", "req": true, "short": "A description of what you are trying to achieve with your project using the API.", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "email", "name": "email", "req": true, "short": "A valid email that we can reach you at if we have any questions about your use case or data consumption.", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "name", "req": true, "short": "A unique human-readable name for your application or project requiring access to the Openverse API.", "type": "`$STRING`", "index$": 2 }], "name": "o_auth2_application", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /v1/auth_tokens/register/", "json": "{\"operationId\":\"register\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"A description of what you are trying to achieve with your project using the API. Please provide as much detail as possible!\",\"maxLength\":10000,\"type\":\"string\"},\"email\":{\"description\":\"A valid email that we can reach you at if we have any questions about your use case or data consumption.\",\"format\":\"email\",\"maxLength\":254,\"type\":\"string\"},\"name\":{\"description\":\"A unique human-readable name for your application or project requiring access to the Openverse API.\",\"maxLength\":150,\"type\":\"string\"}},\"required\":[\"description\",\"email\",\"name\"],\"type\":\"object\"}},\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"A description of what you are trying to achieve with your project using the API. Please provide as much detail as possible!\",\"maxLength\":10000,\"type\":\"string\"},\"email\":{\"description\":\"A valid email that we can reach you at if we have any questions about your use case or data consumption.\",\"format\":\"email\",\"maxLength\":254,\"type\":\"string\"},\"name\":{\"description\":\"A unique human-readable name for your application or project requiring access to the Openverse API.\",\"maxLength\":150,\"type\":\"string\"}},\"required\":[\"description\",\"email\",\"name\"],\"type\":\"object\"}},\"multipart/form-data\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"A description of what you are trying to achieve with your project using the API. Please provide as much detail as possible!\",\"maxLength\":10000,\"type\":\"string\"},\"email\":{\"description\":\"A valid email that we can reach you at if we have any questions about your use case or data consumption.\",\"format\":\"email\",\"maxLength\":254,\"type\":\"string\"},\"name\":{\"description\":\"A unique human-readable name for your application or project requiring access to the Openverse API.\",\"maxLength\":150,\"type\":\"string\"}},\"required\":[\"description\",\"email\",\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"examples\":{\"Created\":{\"value\":{\"client_id\":\"<Openverse API client ID>\",\"client_secret\":\"<Openverse API client secret>\",\"name\":\"My amazing project\"}}},\"schema\":{\"properties\":{\"client_id\":{\"description\":\"The unique, public identifier of your application.\",\"type\":\"string\"},\"client_secret\":{\"description\":\"The secret key used to authenticate your application.\",\"type\":\"string\"},\"msg\":{\"description\":\"Some additional information about the application.\",\"type\":\"string\"},\"name\":{\"description\":\"The name of your application or project.\",\"type\":\"string\"}},\"required\":[\"client_id\",\"client_secret\",\"msg\",\"name\"],\"type\":\"object\"}}},\"description\":\"Created\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"BadRequest\":{\"summary\":\"Bad Request\",\"value\":{\"detail\":{\"<request parameter>\":\"<error details>\"}}}},\"schema\":{\"properties\":{\"detail\":{\"oneOf\":[{\"description\":\"A description of what went wrong.\",\"type\":\"string\"},{\"additionalProperties\":true,\"type\":\"object\"}]}},\"title\":\"ValidationError\",\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"APIException\",\"type\":\"object\"}}},\"description\":\"Too Many Requests\"}},\"security\":[{}],\"securitySchemes\":{\"Openverse API Token\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/v1/auth_tokens/register/", "segments": [{ "lit": "v1" }, { "lit": "auth_tokens" }, { "lit": "register" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "o_auth2_application", "name__orig": "o_auth2_application", "Name": "OAuth2Application", "name_": "o_auth2_application", "name-": "o-auth2-application", "NAME": "O_AUTH2_APPLICATION", "index$": 2 }, { "active": true, "entity": "o_auth2_application", "key$": "BasicOAuth2ApplicationFlow", "kind": "basic", "name": "BasicOAuth2ApplicationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "o_auth2_application_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'OAuth2Application');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const o_auth2_application_ref01_ent = client.OAuth2Application();
        let o_auth2_application_ref01_data = setup.data.new.o_auth2_application['o_auth2_application_ref01'];
        o_auth2_application_ref01_data = (await o_auth2_application_ref01_ent.create(o_auth2_application_ref01_data)).data();
        (0, node_assert_1.default)(null != o_auth2_application_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/o_auth2_application/OAuth2ApplicationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenverseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['o_auth2_application01', 'o_auth2_application02', 'o_auth2_application03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENVERSE_TEST_O_AUTH2_APPLICATION_ENTID': idmap,
        'OPENVERSE_TEST_LIVE': 'FALSE',
        'OPENVERSE_TEST_EXPLAIN': 'FALSE',
        'OPENVERSE_APIKEY': '',
    });
    idmap = env['OPENVERSE_TEST_O_AUTH2_APPLICATION_ENTID'];
    const live = 'TRUE' === env.OPENVERSE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENVERSE_TEST_O_AUTH2_APPLICATION_ENTID'];
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
//# sourceMappingURL=OAuth2ApplicationEntity.test.js.map