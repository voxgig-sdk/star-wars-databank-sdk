<?php
declare(strict_types=1);

// StarWarsDatabank SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

StarWarsDatabankUtility::setRegistrar(function (StarWarsDatabankUtility $u): void {
    $u->clean = [StarWarsDatabankClean::class, 'call'];
    $u->done = [StarWarsDatabankDone::class, 'call'];
    $u->make_error = [StarWarsDatabankMakeError::class, 'call'];
    $u->feature_add = [StarWarsDatabankFeatureAdd::class, 'call'];
    $u->feature_hook = [StarWarsDatabankFeatureHook::class, 'call'];
    $u->feature_init = [StarWarsDatabankFeatureInit::class, 'call'];
    $u->fetcher = [StarWarsDatabankFetcher::class, 'call'];
    $u->make_fetch_def = [StarWarsDatabankMakeFetchDef::class, 'call'];
    $u->make_context = [StarWarsDatabankMakeContext::class, 'call'];
    $u->make_options = [StarWarsDatabankMakeOptions::class, 'call'];
    $u->make_request = [StarWarsDatabankMakeRequest::class, 'call'];
    $u->make_response = [StarWarsDatabankMakeResponse::class, 'call'];
    $u->make_result = [StarWarsDatabankMakeResult::class, 'call'];
    $u->make_point = [StarWarsDatabankMakePoint::class, 'call'];
    $u->make_spec = [StarWarsDatabankMakeSpec::class, 'call'];
    $u->make_url = [StarWarsDatabankMakeUrl::class, 'call'];
    $u->param = [StarWarsDatabankParam::class, 'call'];
    $u->prepare_auth = [StarWarsDatabankPrepareAuth::class, 'call'];
    $u->prepare_body = [StarWarsDatabankPrepareBody::class, 'call'];
    $u->prepare_headers = [StarWarsDatabankPrepareHeaders::class, 'call'];
    $u->prepare_method = [StarWarsDatabankPrepareMethod::class, 'call'];
    $u->prepare_params = [StarWarsDatabankPrepareParams::class, 'call'];
    $u->prepare_path = [StarWarsDatabankPreparePath::class, 'call'];
    $u->prepare_query = [StarWarsDatabankPrepareQuery::class, 'call'];
    $u->result_basic = [StarWarsDatabankResultBasic::class, 'call'];
    $u->result_body = [StarWarsDatabankResultBody::class, 'call'];
    $u->result_headers = [StarWarsDatabankResultHeaders::class, 'call'];
    $u->transform_request = [StarWarsDatabankTransformRequest::class, 'call'];
    $u->transform_response = [StarWarsDatabankTransformResponse::class, 'call'];
});
