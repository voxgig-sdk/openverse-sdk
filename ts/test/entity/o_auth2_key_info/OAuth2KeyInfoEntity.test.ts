

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


describe('OAuth2KeyInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENVERSE_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENVERSE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenverseSDK.test()
    const ent = testsdk.OAuth2KeyInfo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENVERSE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'o_auth2_key_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"rate_limit_model","req":true,"short":"The type of rate limit applied to your key.","type":"`$STRING`","index$":0},{"active":true,"name":"requests_this_minute","req":true,"short":"The number of requests your key has performed in the last minute.","type":"`$INTEGER`","index$":1},{"active":true,"name":"requests_today","req":true,"short":"The number of requests your key has performed in the last day.","type":"`$INTEGER`","index$":2},{"active":true,"name":"verified","req":true,"short":"Whether the application has verified the submitted email address.","type":"`$BOOLEAN`","index$":3}],"name":"o_auth2_key_info","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /v1/rate_limit/","json":"{\"operationId\":\"key_info\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"OK\":{\"value\":{\"rate_limit_model\":\"enhanced\",\"requests_this_minute\":2,\"requests_today\":40}}},\"schema\":{\"properties\":{\"rate_limit_model\":{\"description\":\"The type of rate limit applied to your key. Can be 'standard' or 'enhanced'; enhanced users enjoy higher rate limits than their standard key counterparts. Contact Openverse if you need a higher rate limit.\",\"type\":\"string\"},\"requests_this_minute\":{\"description\":\"The number of requests your key has performed in the last minute.\",\"nullable\":true,\"type\":\"integer\"},\"requests_today\":{\"description\":\"The number of requests your key has performed in the last day.\",\"nullable\":true,\"type\":\"integer\"},\"verified\":{\"description\":\"Whether the application has verified the submitted email address.\",\"type\":\"boolean\"}},\"required\":[\"rate_limit_model\",\"requests_this_minute\",\"requests_today\",\"verified\"],\"type\":\"object\"}}},\"description\":\"OK\"},\"401\":{\"content\":{\"application/json\":{\"examples\":{\"Unauthorized\":{\"value\":{\"detail\":\"Authentication credentials were not provided.\"}}},\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"NotAuthenticated\",\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"APIException\",\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"examples\":{\"InternalServerError\":{\"summary\":\"Internal Server Error\",\"value\":{\"detail\":\"A server error occurred.\"}}},\"schema\":{\"properties\":{\"detail\":{\"description\":\"A description of what went wrong.\",\"type\":\"string\"}},\"title\":\"APIException\",\"type\":\"object\"}}},\"description\":\"Internal Server Error\"}},\"security\":[{\"Openverse API Token\":[]}],\"securitySchemes\":{\"Openverse API Token\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/rate_limit/","segments":[{"lit":"v1"},{"lit":"rate_limit"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"o_auth2_key_info","name__orig":"o_auth2_key_info","Name":"OAuth2KeyInfo","name_":"o_auth2_key_info","name-":"o-auth2-key-info","NAME":"O_AUTH2_KEY_INFO","index$":3}, {"active":true,"entity":"o_auth2_key_info","key$":"BasicOAuth2KeyInfoFlow","kind":"basic","name":"BasicOAuth2KeyInfoFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"o_auth2_key_info_ref01","srcdatavar":"o_auth2_key_info_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-o_auth2_key_info_ref01"}}],"index$":0}]}, 'OAuth2KeyInfo')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let o_auth2_key_info_ref01_data = Object.values(setup.data.existing.o_auth2_key_info)[0] as any

    // LOAD
    const o_auth2_key_info_ref01_ent = client.OAuth2KeyInfo()
    const o_auth2_key_info_ref01_match_dt0: any = {}
    const o_auth2_key_info_ref01_data_dt0 = (await o_auth2_key_info_ref01_ent.load(o_auth2_key_info_ref01_match_dt0)).data()
    assert(null != o_auth2_key_info_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/o_auth2_key_info/OAuth2KeyInfoTestData.json')

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
    ['o_auth2_key_info01','o_auth2_key_info02','o_auth2_key_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENVERSE_TEST_O_AUTH2_KEY_INFO_ENTID': idmap,
    'OPENVERSE_TEST_LIVE': 'FALSE',
    'OPENVERSE_TEST_EXPLAIN': 'FALSE',
    'OPENVERSE_APIKEY': '',
  })

  idmap = env['OPENVERSE_TEST_O_AUTH2_KEY_INFO_ENTID']

  const live = 'TRUE' === env.OPENVERSE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENVERSE_TEST_O_AUTH2_KEY_INFO_ENTID']
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
  
