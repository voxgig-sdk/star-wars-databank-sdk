

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { StarWarsDatabankSDK, BaseFeature, stdutil } from '../../..'

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


describe('DroidEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_DATABANK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_DATABANK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsDatabankSDK.test()
    const ent = testsdk.Droid()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_DATABANK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'droid.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"affiliation","req":false,"short":"Droid's affiliation","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Detailed description of the droid","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the droid","type":"`$STRING`","index$":2},{"active":true,"format":"uri","name":"image","req":false,"short":"URL to the droid's image","type":"`$STRING`","index$":3},{"active":true,"name":"manufacturer","req":false,"short":"Droid's manufacturer","type":"`$STRING`","index$":4},{"active":true,"name":"name","req":false,"short":"Name or designation of the droid","type":"`$STRING`","index$":5},{"active":true,"name":"type","req":false,"short":"Droid type or class","type":"`$STRING`","index$":6},{"active":true,"format":"uri","name":"url","req":false,"short":"URL to the official Star Wars Databank entry","type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"droid","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /droids","json":"{\"operationId\":\"getAllDroids\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the droid\",\"type\":\"string\"},\"affiliation\":{\"description\":\"Droid's affiliation\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the droid\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the droid's image\",\"format\":\"uri\",\"type\":\"string\"},\"manufacturer\":{\"description\":\"Droid's manufacturer\",\"type\":\"string\"},\"name\":{\"description\":\"Name or designation of the droid\",\"type\":\"string\"},\"type\":{\"description\":\"Droid type or class\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the official Star Wars Databank entry\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"info\":{\"properties\":{\"count\":{\"description\":\"Total number of items available\",\"type\":\"integer\"},\"next\":{\"description\":\"URL to the next page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"pages\":{\"description\":\"Total number of pages\",\"type\":\"integer\"},\"prev\":{\"description\":\"URL to the previous page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of droids\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/droids","segments":[{"lit":"droids"}],"select":{"exist":["limit","page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /droids/{id}","json":"{\"operationId\":\"getDroidById\",\"parameters\":[{\"description\":\"Droid ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the droid\",\"type\":\"string\"},\"affiliation\":{\"description\":\"Droid's affiliation\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the droid\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the droid's image\",\"format\":\"uri\",\"type\":\"string\"},\"manufacturer\":{\"description\":\"Droid's manufacturer\",\"type\":\"string\"},\"name\":{\"description\":\"Name or designation of the droid\",\"type\":\"string\"},\"type\":{\"description\":\"Droid type or class\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the official Star Wars Databank entry\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with droid details\"},\"404\":{\"description\":\"Droid not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/droids/{id}","segments":[{"lit":"droids"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"droid","name__orig":"droid","Name":"Droid","name_":"droid","name-":"droid","NAME":"DROID","index$":2}, {"active":true,"entity":"droid","key$":"BasicDroidFlow","kind":"basic","name":"BasicDroidFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"droid_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"droid_ref01","srcdatavar":"droid_ref01_data","suffix":"_dt0"},"match":{"id":"droid01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-droid_ref01"}}],"index$":1}]}, 'Droid')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let droid_ref01_data = Object.values(setup.data.existing.droid)[0] as any

    // LIST
    const droid_ref01_ent = client.Droid()
    const droid_ref01_match: any = {}

    const droid_ref01_list = (await droid_ref01_ent.list(droid_ref01_match)).map((e: any) => e.data())


    // LOAD
    const droid_ref01_match_dt0: any = {}
    droid_ref01_match_dt0.id = droid_ref01_data.id
    const droid_ref01_data_dt0 = (await droid_ref01_ent.load(droid_ref01_match_dt0)).data()
    assert(droid_ref01_data_dt0.id === droid_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/droid/DroidTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = StarWarsDatabankSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['droid01','droid02','droid03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_DATABANK_TEST_DROID_ENTID': idmap,
    'STAR_WARS_DATABANK_TEST_LIVE': 'FALSE',
    'STAR_WARS_DATABANK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_DATABANK_TEST_DROID_ENTID']

  const live = 'TRUE' === env.STAR_WARS_DATABANK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_DATABANK_TEST_DROID_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new StarWarsDatabankSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
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
    explain: 'TRUE' === env.STAR_WARS_DATABANK_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
