<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\CompanyController;

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

Route::prefix('iCRS')->controller(LoginController::class)->group(function () {
    //! app/Http/Middleware/VerifyCsrfToken.php -> add '/auth/login'
    Route::post('/login', 'login');
});

Route::prefix('iCRS')->controller(HomePageController::class)->group(function() {
    Route::post('/home', '');
});

Route::prefix('iCRS')->controller(DevicesController::class)->group(function () {
//     //! app/Http/Middleware/VerifyCsrfToken.php -> add '/auth/login'
    Route::post('/add-company', 'addCompany');
    Route::put('/edit-device', 'editDevice');
//     Route::delete('/delete-device/{id}', 'deleteDevice');
//     Route::get('/get-all-devices', 'getAllDevices');
});
