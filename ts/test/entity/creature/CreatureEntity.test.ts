

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"classification":{"a":true,"h":"Classification","n":"classification","r":false,"sh":"Creature's classification","t":"`$STRING`","key$":"classification","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Detailed description of the creature","t":"`$STRING`","key$":"description","index$":1},"habitat":{"a":true,"h":"Habitat","n":"habitat","r":false,"sh":"Creature's natural habitat","t":"`$STRING`","key$":"habitat","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the creature","t":"`$STRING`","key$":"id","index$":3},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"sh":"URL to the creature's image","t":"`$STRING`","key$":"image","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the creature","t":"`$STRING`","key$":"name","index$":5},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the official Star Wars Databank entry","t":"`$STRING`","key$":"url","index$":6}},"id":{"field":"id","name":"id"},"name":"creature","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /creatures","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/creatures","q":{"exist":["limit","page"]},"r":{},"s":[{"lit":"creatures"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /creatures/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/creatures/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"creatures"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"creature","name__orig":"creature","Name":"Creature","name_":"creature","name-":"creature","NAME":"CREATURE","index$":1}, {"active":true,"entity":"creature","key$":"BasicCreatureFlow","kind":"basic","name":"BasicCreatureFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"creature_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"creature_ref01","srcdatavar":"creature_ref01_data","suffix":"_dt0"},"m":{"id":"creature01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-creature_ref01"}}],"index$":1}]}, 'Creature', {"GET /creatures":{"protocol":"http","operationId":"getAllCreatures","responses":{"200":{"description":"Successful response with list of creatures","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"_id":{"description":"Unique identifier for the creature","type":"string","key$":"_id"},"classification":{"description":"Creature's classification","type":"string","key$":"classification"},"description":{"description":"Detailed description of the creature","type":"string","key$":"description"},"habitat":{"description":"Creature's natural habitat","type":"string","key$":"habitat"},"image":{"description":"URL to the creature's image","format":"uri","type":"string","key$":"image"},"name":{"description":"Name of the creature","type":"string","key$":"name"},"url":{"description":"URL to the official Star Wars Databank entry","format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Creature","index$":0},"key$":"data","type":"array"},"info":{"key$":"info","properties":{"count":{"description":"Total number of items available","type":"integer"},"next":{"description":"URL to the next page of results","format":"uri","nullable":true,"type":"string"},"pages":{"description":"Total number of pages","type":"integer"},"prev":{"description":"URL to the previous page of results","format":"uri","nullable":true,"type":"string"}},"type":"object","x-ref":"#/components/schemas/PaginationInfo"}}}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"limit","in":"query","description":"Number of items per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":1}],"securitySource":"unspecified"},"GET /creatures/{id}":{"protocol":"http","operationId":"getCreatureById","responses":{"200":{"description":"Successful response with creature details","content":{"application/json":{"schema":{"type":"object","properties":{"_id":{"description":"Unique identifier for the creature","type":"string","key$":"_id"},"name":{"description":"Name of the creature","type":"string","key$":"name"},"description":{"description":"Detailed description of the creature","type":"string","key$":"description"},"image":{"description":"URL to the creature's image","format":"uri","type":"string","key$":"image"},"classification":{"description":"Creature's classification","type":"string","key$":"classification"},"habitat":{"description":"Creature's natural habitat","type":"string","key$":"habitat"},"url":{"description":"URL to the official Star Wars Databank entry","format":"uri","type":"string","key$":"url"}},"x-ref":"#/components/schemas/Creature","index$":0}}}},"404":{"description":"Creature not found"}},"parameters":[{"name":"id","in":"path","description":"Creature ID","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
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
  
