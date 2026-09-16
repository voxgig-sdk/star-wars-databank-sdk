

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


describe('CreatureEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_DATABANK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_DATABANK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsDatabankSDK.test()
    const ent = testsdk.Creature()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_DATABANK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'creature.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"classification","req":false,"short":"Creature's classification","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Detailed description of the creature","type":"`$STRING`","index$":1},{"active":true,"name":"habitat","req":false,"short":"Creature's natural habitat","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the creature","type":"`$STRING`","index$":3},{"active":true,"format":"uri","name":"image","req":false,"short":"URL to the creature's image","type":"`$STRING`","index$":4},{"active":true,"name":"name","req":false,"short":"Name of the creature","type":"`$STRING`","index$":5},{"active":true,"format":"uri","name":"url","req":false,"short":"URL to the official Star Wars Databank entry","type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"creature","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /creatures","json":"{\"operationId\":\"getAllCreatures\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the creature\",\"type\":\"string\"},\"classification\":{\"description\":\"Creature's classification\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the creature\",\"type\":\"string\"},\"habitat\":{\"description\":\"Creature's natural habitat\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the creature's image\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the creature\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the official Star Wars Databank entry\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"info\":{\"properties\":{\"count\":{\"description\":\"Total number of items available\",\"type\":\"integer\"},\"next\":{\"description\":\"URL to the next page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"pages\":{\"description\":\"Total number of pages\",\"type\":\"integer\"},\"prev\":{\"description\":\"URL to the previous page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of creatures\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/creatures","segments":[{"lit":"creatures"}],"select":{"exist":["limit","page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /creatures/{id}","json":"{\"operationId\":\"getCreatureById\",\"parameters\":[{\"description\":\"Creature ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the creature\",\"type\":\"string\"},\"classification\":{\"description\":\"Creature's classification\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the creature\",\"type\":\"string\"},\"habitat\":{\"description\":\"Creature's natural habitat\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the creature's image\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the creature\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the official Star Wars Databank entry\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with creature details\"},\"404\":{\"description\":\"Creature not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/creatures/{id}","segments":[{"lit":"creatures"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"creature","name__orig":"creature","Name":"Creature","name_":"creature","name-":"creature","NAME":"CREATURE","index$":1}, {"active":true,"entity":"creature","key$":"BasicCreatureFlow","kind":"basic","name":"BasicCreatureFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"creature_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"creature_ref01","srcdatavar":"creature_ref01_data","suffix":"_dt0"},"match":{"id":"creature01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-creature_ref01"}}],"index$":1}]}, 'Creature')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let creature_ref01_data = Object.values(setup.data.existing.creature)[0] as any

    // LIST
    const creature_ref01_ent = client.Creature()
    const creature_ref01_match: any = {}

    const creature_ref01_list = (await creature_ref01_ent.list(creature_ref01_match)).map((e: any) => e.data())


    // LOAD
    const creature_ref01_match_dt0: any = {}
    creature_ref01_match_dt0.id = creature_ref01_data.id
    const creature_ref01_data_dt0 = (await creature_ref01_ent.load(creature_ref01_match_dt0)).data()
    assert(creature_ref01_data_dt0.id === creature_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/creature/CreatureTestData.json')

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
    ['creature01','creature02','creature03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_DATABANK_TEST_CREATURE_ENTID': idmap,
    'STAR_WARS_DATABANK_TEST_LIVE': 'FALSE',
    'STAR_WARS_DATABANK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_DATABANK_TEST_CREATURE_ENTID']

  const live = 'TRUE' === env.STAR_WARS_DATABANK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_DATABANK_TEST_CREATURE_ENTID']
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
  
