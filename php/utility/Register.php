<?php
declare(strict_types=1);

// Openverse SDK utility registration

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

OpenverseUtility::setRegistrar(function (OpenverseUtility $u): void {
    $u->clean = [OpenverseClean::class, 'call'];
    $u->done = [OpenverseDone::class, 'call'];
    $u->make_error = [OpenverseMakeError::class, 'call'];
    $u->feature_add = [OpenverseFeatureAdd::class, 'call'];
    $u->feature_hook = [OpenverseFeatureHook::class, 'call'];
    $u->feature_init = [OpenverseFeatureInit::class, 'call'];
    $u->fetcher = [OpenverseFetcher::class, 'call'];
    $u->make_fetch_def = [OpenverseMakeFetchDef::class, 'call'];
    $u->make_context = [OpenverseMakeContext::class, 'call'];
    $u->make_options = [OpenverseMakeOptions::class, 'call'];
    $u->make_request = [OpenverseMakeRequest::class, 'call'];
    $u->make_response = [OpenverseMakeResponse::class, 'call'];
    $u->make_result = [OpenverseMakeResult::class, 'call'];
    $u->make_point = [OpenverseMakePoint::class, 'call'];
    $u->make_spec = [OpenverseMakeSpec::class, 'call'];
    $u->make_url = [OpenverseMakeUrl::class, 'call'];
    $u->param = [OpenverseParam::class, 'call'];
    $u->prepare_auth = [OpenversePrepareAuth::class, 'call'];
    $u->prepare_body = [OpenversePrepareBody::class, 'call'];
    $u->prepare_headers = [OpenversePrepareHeaders::class, 'call'];
    $u->prepare_method = [OpenversePrepareMethod::class, 'call'];
    $u->prepare_params = [OpenversePrepareParams::class, 'call'];
    $u->prepare_path = [OpenversePreparePath::class, 'call'];
    $u->prepare_query = [OpenversePrepareQuery::class, 'call'];
    $u->result_basic = [OpenverseResultBasic::class, 'call'];
    $u->result_body = [OpenverseResultBody::class, 'call'];
    $u->result_headers = [OpenverseResultHeaders::class, 'call'];
    $u->transform_request = [OpenverseTransformRequest::class, 'call'];
    $u->transform_response = [OpenverseTransformResponse::class, 'call'];
});
