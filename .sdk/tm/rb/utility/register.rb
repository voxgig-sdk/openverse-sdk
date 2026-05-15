# Openverse SDK utility registration
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
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OpenverseUtility.registrar = ->(u) {
  u.clean = OpenverseUtilities::Clean
  u.done = OpenverseUtilities::Done
  u.make_error = OpenverseUtilities::MakeError
  u.feature_add = OpenverseUtilities::FeatureAdd
  u.feature_hook = OpenverseUtilities::FeatureHook
  u.feature_init = OpenverseUtilities::FeatureInit
  u.fetcher = OpenverseUtilities::Fetcher
  u.make_fetch_def = OpenverseUtilities::MakeFetchDef
  u.make_context = OpenverseUtilities::MakeContext
  u.make_options = OpenverseUtilities::MakeOptions
  u.make_request = OpenverseUtilities::MakeRequest
  u.make_response = OpenverseUtilities::MakeResponse
  u.make_result = OpenverseUtilities::MakeResult
  u.make_point = OpenverseUtilities::MakePoint
  u.make_spec = OpenverseUtilities::MakeSpec
  u.make_url = OpenverseUtilities::MakeUrl
  u.param = OpenverseUtilities::Param
  u.prepare_auth = OpenverseUtilities::PrepareAuth
  u.prepare_body = OpenverseUtilities::PrepareBody
  u.prepare_headers = OpenverseUtilities::PrepareHeaders
  u.prepare_method = OpenverseUtilities::PrepareMethod
  u.prepare_params = OpenverseUtilities::PrepareParams
  u.prepare_path = OpenverseUtilities::PreparePath
  u.prepare_query = OpenverseUtilities::PrepareQuery
  u.result_basic = OpenverseUtilities::ResultBasic
  u.result_body = OpenverseUtilities::ResultBody
  u.result_headers = OpenverseUtilities::ResultHeaders
  u.transform_request = OpenverseUtilities::TransformRequest
  u.transform_response = OpenverseUtilities::TransformResponse
}
