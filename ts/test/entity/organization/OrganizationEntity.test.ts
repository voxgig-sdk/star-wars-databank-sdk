

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"allegiance","req":false,"short":"Organization's allegiance","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Detailed description of the organization","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the organization","type":"`$STRING`","index$":2},{"active":true,"format":"uri","name":"image","req":false,"short":"URL to the organization's image","type":"`$STRING`","index$":3},{"active":true,"name":"leader","req":false,"short":"Leader of the organization","type":"`$STRING`","index$":4},{"active":true,"name":"name","req":false,"short":"Name of the organization","type":"`$STRING`","index$":5},{"active":true,"name":"type","req":false,"short":"Type of organization","type":"`$STRING`","index$":6},{"active":true,"format":"uri","name":"url","req":false,"short":"URL to the official Star Wars Databank entry","type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"organization","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /organizations","json":"{\"operationId\":\"getAllOrganizations\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the organization\",\"type\":\"string\"},\"allegiance\":{\"description\":\"Organization's allegiance\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the organization\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the organization's image\",\"format\":\"uri\",\"type\":\"string\"},\"leader\":{\"description\":\"Leader of the organization\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the organization\",\"type\":\"string\"},\"type\":{\"description\":\"Type of organization\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the official Star Wars Databank entry\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"info\":{\"properties\":{\"count\":{\"description\":\"Total number of items available\",\"type\":\"integer\"},\"next\":{\"description\":\"URL to the next page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"pages\":{\"description\":\"Total number of pages\",\"type\":\"integer\"},\"prev\":{\"description\":\"URL to the previous page of results\",\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of organizations\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/organizations","segments":[{"lit":"organizations"}],"select":{"exist":["limit","page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /organizations/{id}","json":"{\"operationId\":\"getOrganizationById\",\"parameters\":[{\"description\":\"Organization ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"Unique identifier for the organization\",\"type\":\"string\"},\"allegiance\":{\"description\":\"Organization's allegiance\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the organization\",\"type\":\"string\"},\"image\":{\"description\":\"URL to the organization's image\",\"format\":\"uri\",\"type\":\"string\"},\"leader\":{\"description\":\"Leader of the organization\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the organization\",\"type\":\"string\"},\"type\":{\"description\":\"Type of organization\",\"type\":\"string\"},\"url\":{\"description\":\"URL to the official Star Wars Databank entry\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with organization details\"},\"404\":{\"description\":\"Organization not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/organizations/{id}","segments":[{"lit":"organizations"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"organization","name__orig":"organization","Name":"Organization","name_":"organization","name-":"organization","NAME":"ORGANIZATION","index$":4}, {"active":true,"entity":"organization","key$":"BasicOrganizationFlow","kind":"basic","name":"BasicOrganizationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"organization_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_dt0"},"match":{"id":"organization01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"index$":1}]}, 'Organization')
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
  
