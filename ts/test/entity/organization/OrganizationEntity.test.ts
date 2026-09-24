

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


describe('OrganizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_DATABANK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_DATABANK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsDatabankSDK.test()
    const ent = testsdk.Organization()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_DATABANK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"allegiance":{"a":true,"h":"Allegiance","n":"allegiance","r":false,"sh":"Organization's allegiance","t":"`$STRING`","key$":"allegiance","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Detailed description of the organization","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the organization","t":"`$STRING`","key$":"id","index$":2},"image":{"a":true,"fo":"uri","h":"Image","n":"image","r":false,"sh":"URL to the organization's image","t":"`$STRING`","key$":"image","index$":3},"leader":{"a":true,"h":"Leader","n":"leader","r":false,"sh":"Leader of the organization","t":"`$STRING`","key$":"leader","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the organization","t":"`$STRING`","key$":"name","index$":5},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of organization","t":"`$STRING`","key$":"type","index$":6},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL to the official Star Wars Databank entry","t":"`$STRING`","key$":"url","index$":7}},"id":{"field":"id","name":"id"},"name":"organization","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /organizations","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/organizations","q":{"exist":["limit","page"]},"r":{},"s":[{"lit":"organizations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /organizations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/organizations/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"organization","name__orig":"organization","Name":"Organization","name_":"organization","name-":"organization","NAME":"ORGANIZATION","index$":4}, {"active":true,"entity":"organization","key$":"BasicOrganizationFlow","kind":"basic","name":"BasicOrganizationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"organization_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_dt0"},"m":{"id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"index$":1}]}, 'Organization', {"GET /organizations":{"protocol":"http","operationId":"getAllOrganizations","responses":{"200":{"description":"Successful response with list of organizations","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"_id":{"description":"Unique identifier for the organization","type":"string","key$":"_id"},"allegiance":{"description":"Organization's allegiance","type":"string","key$":"allegiance"},"description":{"description":"Detailed description of the organization","type":"string","key$":"description"},"image":{"description":"URL to the organization's image","format":"uri","type":"string","key$":"image"},"leader":{"description":"Leader of the organization","type":"string","key$":"leader"},"name":{"description":"Name of the organization","type":"string","key$":"name"},"type":{"description":"Type of organization","type":"string","key$":"type"},"url":{"description":"URL to the official Star Wars Databank entry","format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Organization","index$":0},"key$":"data","type":"array"},"info":{"key$":"info","properties":{"count":{"description":"Total number of items available","type":"integer"},"next":{"description":"URL to the next page of results","format":"uri","nullable":true,"type":"string"},"pages":{"description":"Total number of pages","type":"integer"},"prev":{"description":"URL to the previous page of results","format":"uri","nullable":true,"type":"string"}},"type":"object","x-ref":"#/components/schemas/PaginationInfo"}}}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"limit","in":"query","description":"Number of items per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":1}],"securitySource":"unspecified"},"GET /organizations/{id}":{"protocol":"http","operationId":"getOrganizationById","responses":{"200":{"description":"Successful response with organization details","content":{"application/json":{"schema":{"type":"object","properties":{"_id":{"description":"Unique identifier for the organization","type":"string","key$":"_id"},"name":{"description":"Name of the organization","type":"string","key$":"name"},"description":{"description":"Detailed description of the organization","type":"string","key$":"description"},"image":{"description":"URL to the organization's image","format":"uri","type":"string","key$":"image"},"type":{"description":"Type of organization","type":"string","key$":"type"},"allegiance":{"description":"Organization's allegiance","type":"string","key$":"allegiance"},"leader":{"description":"Leader of the organization","type":"string","key$":"leader"},"url":{"description":"URL to the official Star Wars Databank entry","format":"uri","type":"string","key$":"url"}},"x-ref":"#/components/schemas/Organization","index$":0}}}},"404":{"description":"Organization not found"}},"parameters":[{"name":"id","in":"path","description":"Organization ID","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let organization_ref01_data = Object.values(setup.data.existing.organization)[0] as any

    // LIST
    const organization_ref01_ent = client.Organization()
    const organization_ref01_match: any = {}

    const organization_ref01_list = (await organization_ref01_ent.list(organization_ref01_match)).map((e: any) => e.data())


    // LOAD
    const organization_ref01_match_dt0: any = {}
    organization_ref01_match_dt0.id = organization_ref01_data.id
    const organization_ref01_data_dt0 = (await organization_ref01_ent.load(organization_ref01_match_dt0)).data()
    assert(organization_ref01_data_dt0.id === organization_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/organization/OrganizationTestData.json')

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
    ['organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_DATABANK_TEST_ORGANIZATION_ENTID': idmap,
    'STAR_WARS_DATABANK_TEST_LIVE': 'FALSE',
    'STAR_WARS_DATABANK_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_DATABANK_TEST_ORGANIZATION_ENTID']

  const live = 'TRUE' === env.STAR_WARS_DATABANK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_DATABANK_TEST_ORGANIZATION_ENTID']
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
  
