

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenverseSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('OAuth2TokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENVERSE_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENVERSE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenverseSDK.test()
    const ent = testsdk.OAuth2Token()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENVERSE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'o_auth2_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"access_token","req":true,"short":"The access token that can be used to authenticate requests.","type":"`$STRING`","index$":0},{"active":true,"name":"expires_in","req":true,"short":"The number of seconds until the token expires.","type":"`$INTEGER`","index$":1},{"active":true,"name":"scope","req":true,"short":"The scope of the token.","type":"`$STRING`","index$":2},{"active":true,"name":"token_type","req":true,"short":"The type of token.","type":"`$STRING`","index$":3}],"name":"o_auth2_token","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /v1/auth_tokens/token/","json":"{\"operationId\":\"token\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"description\":\"Serializes a request for an access token.\\n\\nThis is a dummy serializer for OpenAPI and is not actually used.\",\"properties\":{\"client_id\":{\"description\":\"The unique, public identifier of your application.\",\"type\":\"string\"},\"client_secret\":{\"description\":\"The secret key used to authenticate your application.\",\"type\":\"string\"},\"grant_type\":{\"description\":\"* `client_credentials` - client_credentials\",\"enum\":[\"client_credentials\"],\"type\":\"string\"}},\"required\":[\"client_id\",\"client_secret\",\"grant_type\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"OK\":{\"value\":{\"access_token\":\"<Openverse API token>\",\"expires_in\":36000,\"scope\":\"read write groups\",\"token_type\":\"Bearer\"}}},\"schema\":{\"description\":\"Serializes the response for an access token.\\n\\nThis is a dummy serializer for OpenAPI and is not actually used.\",\"properties\":{\"access_token\":{\"description\":\"The access token that can be used to authenticate requests.\",\"type\":\"string\"},\"expires_in\":{\"description\":\"The number of seconds until the token expires.\",\"type\":\"integer\"},\"scope\":{\"description\":\"The scope of the token.\",\"type\":\"string\"},\"token_type\":{\"description\":\"The type of token. This will always be 'Bearer'.\",\"type\":\"string\"}},\"required\":[\"access_token\",\"expires_in\",\"scope\",\"token_type\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"APIException\",\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"Unauthorized\":{\"value\":{\"detail\":\"Authentication credentials were not provided.\"}}},\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"NotAuthenticated\",\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"securitySchemes\":{\"Openverse API Token\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/v1/auth_tokens/token/","segments":[{"lit":"v1"},{"lit":"auth_tokens"},{"lit":"token"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"o_auth2_token","name__orig":"o_auth2_token","Name":"OAuth2Token","name_":"o_auth2_token","name-":"o-auth2-token","NAME":"O_AUTH2_TOKEN","index$":4}, {"active":true,"entity":"o_auth2_token","key$":"BasicOAuth2TokenFlow","kind":"basic","name":"BasicOAuth2TokenFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"o_auth2_token_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'OAuth2Token')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const o_auth2_token_ref01_ent = client.OAuth2Token()
    let o_auth2_token_ref01_data = setup.data.new.o_auth2_token['o_auth2_token_ref01']

    o_auth2_token_ref01_data = (await o_auth2_token_ref01_ent.create(o_auth2_token_ref01_data)).data()
    assert(null != o_auth2_token_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/o_auth2_token/OAuth2TokenTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenverseSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['o_auth2_token01','o_auth2_token02','o_auth2_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENVERSE_TEST_O_AUTH2_TOKEN_ENTID': idmap,
    'OPENVERSE_TEST_LIVE': 'FALSE',
    'OPENVERSE_TEST_EXPLAIN': 'FALSE',
    'OPENVERSE_APIKEY': '',
  })

  idmap = env['OPENVERSE_TEST_O_AUTH2_TOKEN_ENTID']

  const live = 'TRUE' === env.OPENVERSE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENVERSE_TEST_O_AUTH2_TOKEN_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenverseSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
