

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


describe('VehicleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_DATABANK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_DATABANK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsDatabankSDK.test()
    const ent = testsdk.Vehicle()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_DATABANK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vehicle.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"affiliation":{"a":true,"h":"Affiliation","n":"affiliation","r":false,"sh":"Vehicle's affiliation","t":"`$STRING`","key$":"affiliation","index$":0},"armament":{"a":true,"h":"Armament","n":"armament","r":false,"sh":"Vehicle armament","t":"`$STRING`","key$":"armament","index$":1},"class":{"a":true,"h":"Class","n":"class","r":false,"sh":"Vehicle class or type","t":"`$STRING`","key$":"class","index$":2},"crew":{"a":true,"h":"Crew","n":"crew","r":false,"sh":"Crew capacity","t":"`$STRING`","key$":"crew","index$":3},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Detailed description of the vehicle","t":"`$STRING`","key$":"description","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the vehicle","t":"`$STRING`","key$":"id","index$":5},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"sh":"URL to the vehicle's image","t":"`$STRING`","key$":"image","index$":6},"length":{"a":true,"h":"Length","n":"length","r":false,"sh":"Length of the vehicle","t":"`$STRING`","key$":"length","index$":7},"manufacturer":{"a":true,"h":"Manufacturer","n":"manufacturer","r":false,"sh":"Vehicle manufacturer","t":"`$STRING`","key$":"manufacturer","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the vehicle","t":"`$STRING`","key$":"name","index$":9},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the official Star Wars Databank entry","t":"`$STRING`","key$":"url","index$":10}},"id":{"field":"id","name":"id"},"name":"vehicle","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /vehicles","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/vehicles","q":{"exist":["limit","page"]},"r":{},"s":[{"lit":"vehicles"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /vehicles/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/vehicles/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"vehicles"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"vehicle","name__orig":"vehicle","Name":"Vehicle","name_":"vehicle","name-":"vehicle","NAME":"VEHICLE","index$":6}, {"active":true,"entity":"vehicle","key$":"BasicVehicleFlow","kind":"basic","name":"BasicVehicleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vehicle_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"vehicle_ref01","srcdatavar":"vehicle_ref01_data","suffix":"_dt0"},"m":{"id":"vehicle01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vehicle_ref01"}}],"index$":1}]}, 'Vehicle', {"GET /vehicles":{"protocol":"http","operationId":"getAllVehicles","responses":{"200":{"description":"Successful response with list of vehicles","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"_id":{"description":"Unique identifier for the vehicle","type":"string","key$":"_id"},"affiliation":{"description":"Vehicle's affiliation","type":"string","key$":"affiliation"},"armament":{"description":"Vehicle armament","type":"string","key$":"armament"},"class":{"description":"Vehicle class or type","type":"string","key$":"class"},"crew":{"description":"Crew capacity","type":"string","key$":"crew"},"description":{"description":"Detailed description of the vehicle","type":"string","key$":"description"},"image":{"description":"URL to the vehicle's image","format":"uri","type":"string","key$":"image"},"length":{"description":"Length of the vehicle","type":"string","key$":"length"},"manufacturer":{"description":"Vehicle manufacturer","type":"string","key$":"manufacturer"},"name":{"description":"Name of the vehicle","type":"string","key$":"name"},"url":{"description":"URL to the official Star Wars Databank entry","format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Vehicle","index$":0},"key$":"data","type":"array"},"info":{"key$":"info","properties":{"count":{"description":"Total number of items available","type":"integer"},"next":{"description":"URL to the next page of results","format":"uri","nullable":true,"type":"string"},"pages":{"description":"Total number of pages","type":"integer"},"prev":{"description":"URL to the previous page of results","format":"uri","nullable":true,"type":"string"}},"type":"object","x-ref":"#/components/schemas/PaginationInfo"}}}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"limit","in":"query","description":"Number of items per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":1}],"securitySource":"unspecified"},"GET /vehicles/{id}":{"protocol":"http","operationId":"getVehicleById","responses":{"200":{"description":"Successful response with vehicle details","content":{"application/json":{"schema":{"type":"object","properties":{"_id":{"description":"Unique identifier for the vehicle","type":"string","key$":"_id"},"name":{"description":"Name of the vehicle","type":"string","key$":"name"},"description":{"description":"Detailed description of the vehicle","type":"string","key$":"description"},"image":{"description":"URL to the vehicle's image","format":"uri","type":"string","key$":"image"},"manufacturer":{"description":"Vehicle manufacturer","type":"string","key$":"manufacturer"},"class":{"description":"Vehicle class or type","type":"string","key$":"class"},"affiliation":{"description":"Vehicle's affiliation","type":"string","key$":"affiliation"},"length":{"description":"Length of the vehicle","type":"string","key$":"length"},"crew":{"description":"Crew capacity","type":"string","key$":"crew"},"armament":{"description":"Vehicle armament","type":"string","key$":"armament"},"url":{"description":"URL to the official Star Wars Databank entry","format":"uri","type":"string","key$":"url"}},"x-ref":"#/components/schemas/Vehicle","index$":0}}}},"404":{"description":"Vehicle not found"}},"parameters":[{"name":"id","in":"path","description":"Vehicle ID","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vehicle_ref01_data = Object.values(setup.data.existing.vehicle)[0] as any

    // LIST
    const vehicle_ref01_ent = client.Vehicle()
    const vehicle_ref01_match: any = {}

    const vehicle_ref01_list = (await vehicle_ref01_ent.list(vehicle_ref01_match)).map((e: any) => e.data())


    // LOAD
    const vehicle_ref01_match_dt0: any = {}
    vehicle_ref01_match_dt0.id = vehicle_ref01_data.id
    const vehicle_ref01_data_dt0 = (await vehicle_ref01_ent.load(vehicle_ref01_match_dt0)).data()
    assert(vehicle_ref01_data_dt0.id === vehicle_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/vehicle/VehicleTestData.json')

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
    ['vehicle01','vehicle02','vehicle03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_DATABANK_TEST_VEHICLE_ENTID': idmap,
    'STAR_WARS_DATABANK_TEST_LIVE': 'FALSE',
    'STAR_WARS_DATABANK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_DATABANK_TEST_VEHICLE_ENTID']

  const live = 'TRUE' === env.STAR_WARS_DATABANK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_DATABANK_TEST_VEHICLE_ENTID']
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
  
