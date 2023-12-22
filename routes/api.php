<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\CompanyController;
// use App\Http\Controllers\HomePageController;
use App\Http\Controllers\JsonTemplateController;
use App\Http\Controllers\GeneralAssessmentController;
use App\Http\Controllers\AssessmentCommentsController;
use App\Http\Controllers\FinancialAnalyzeCommentsController;
use App\Http\Controllers\DbdFinancialReportController;
use App\Http\Controllers\FinancialRatioAssessmentController;
// use App\Models\Company;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return response()->json(["message" => "Welcome to iCRS API."]);
});

Route::prefix('user')->controller(UserController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/create-user', 'createUser');
    Route::get('/put-cache', 'putCache');
    Route::get('/set-cache', 'setCache');
    Route::get('/pull-cache', 'pullCache');
    Route::get('/get-cache', 'getCache');
    Route::get('/pub-redis', 'pubRedis');
});

Route::prefix('registration')->controller(RegistrationController::class)->group(function () {
    Route::post('/create-regis-id', 'createRegisID');
    Route::patch('/upload-document', 'uploadDocument');
    Route::delete('/delete-document', 'deleteDocument');
    Route::post('/', 'create');
    Route::get('/info', 'getInfo');
    Route::put('/', 'update');
    Route::get('/', 'getAll');
    Route::get('/get-documents-by-id', 'getDocumentsByID');
});

Route::prefix('general-assessment')->controller(GeneralAssessmentController::class)->group(function () {
    Route::get('/approvals-by-id', 'getApprovalsByID');
    Route::post('/', 'create');
    Route::put('/', 'update');
    Route::get('/form-by-id', 'getFormByID');
});

Route::prefix('assessment-comments')->controller(AssessmentCommentsController::class)->group(function () {
    Route::post('/', 'create');
    Route::get('/', 'getAllComments');
});

Route::prefix('financial-comments')->controller(FinancialAnalyzeCommentsController::class)->group(function () {
    Route::post('/', 'create');
    Route::get('/', 'getAllComments');
});

Route::prefix('dbd-financial-report')->controller(DbdFinancialReportController::class)->group(function () {
    Route::get('/sync-by-id', 'syncByID');
    Route::patch('/confirm', 'confirm');
    Route::get('/info', 'info');
});

Route::prefix('financial-ratio')->controller(FinancialRatioAssessmentController::class)->group(function () {
    Route::get('/info', 'info');
});

// Route::prefix('home')->controller(HomePageController::class)->group(function () {
//     Route::get('/', 'index');
//     // Route::get('/gen-uuid', 'generateUUIDV4');
// });

Route::prefix('template')->controller(JsonTemplateController::class)->group(function () {
    Route::get('/upload-documents', 'uploadDocumentsTemplate');
    Route::get('/certifications', 'certifications');
    Route::get('/benefits', 'benefits');
    Route::get('/delivery-terms', 'deliveryTerms');
    Route::get('/company-policy', 'companyPolicy');
    Route::get('/business-types', 'businessTypes');
    Route::get('/country-codes', 'countryCodes');
    Route::get('/all-company', 'allCompany');
});

// Route::prefix('admin')->controller(AdminController::class)->group(function () {
//     Route::post('/company-detail', 'companyDetail');
// });

// Route::prefix('company')->controller(CompanyController::class)->group(function () {
//     //     //! app/Http/Middleware/VerifyCsrfToken.php -> add '/auth/login'
//     Route::post('/create-regis-id', 'createRegisId');
//     Route::post('/upload-document', 'uploadDocument');
//     Route::post('/test-post', 'testPost');
//     Route::post('/add-company', 'addCompany');
//     Route::post('/update-company', 'updateCompany');
//     Route::get('/company-list', 'companyList');
//     Route::get('/business-type', 'businessType');
//     Route::get('/country-amount', 'countryAmount');
// });
