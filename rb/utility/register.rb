# StarWarsDatabank SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

StarWarsDatabankUtility.registrar = ->(u) {
  u.clean = StarWarsDatabankUtilities::Clean
  u.done = StarWarsDatabankUtilities::Done
  u.make_error = StarWarsDatabankUtilities::MakeError
  u.feature_add = StarWarsDatabankUtilities::FeatureAdd
  u.feature_hook = StarWarsDatabankUtilities::FeatureHook
  u.feature_init = StarWarsDatabankUtilities::FeatureInit
  u.fetcher = StarWarsDatabankUtilities::Fetcher
  u.make_fetch_def = StarWarsDatabankUtilities::MakeFetchDef
  u.make_context = StarWarsDatabankUtilities::MakeContext
  u.make_options = StarWarsDatabankUtilities::MakeOptions
  u.make_request = StarWarsDatabankUtilities::MakeRequest
  u.make_response = StarWarsDatabankUtilities::MakeResponse
  u.make_result = StarWarsDatabankUtilities::MakeResult
  u.make_point = StarWarsDatabankUtilities::MakePoint
  u.make_spec = StarWarsDatabankUtilities::MakeSpec
  u.make_url = StarWarsDatabankUtilities::MakeUrl
  u.param = StarWarsDatabankUtilities::Param
  u.prepare_auth = StarWarsDatabankUtilities::PrepareAuth
  u.prepare_body = StarWarsDatabankUtilities::PrepareBody
  u.prepare_headers = StarWarsDatabankUtilities::PrepareHeaders
  u.prepare_method = StarWarsDatabankUtilities::PrepareMethod
  u.prepare_params = StarWarsDatabankUtilities::PrepareParams
  u.prepare_path = StarWarsDatabankUtilities::PreparePath
  u.prepare_query = StarWarsDatabankUtilities::PrepareQuery
  u.graphql_body = StarWarsDatabankUtilities::GraphqlBody
  u.graphql_errors = StarWarsDatabankUtilities::GraphqlErrors
  u.result_basic = StarWarsDatabankUtilities::ResultBasic
  u.result_body = StarWarsDatabankUtilities::ResultBody
  u.result_headers = StarWarsDatabankUtilities::ResultHeaders
  u.transform_request = StarWarsDatabankUtilities::TransformRequest
  u.transform_response = StarWarsDatabankUtilities::TransformResponse
}
