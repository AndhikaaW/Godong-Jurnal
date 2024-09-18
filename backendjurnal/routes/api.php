<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MenuProductController;
use App\Http\Controllers\SidebarController;
use App\Models\MenuProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getsidebar', [SidebarController::class, 'getSidebar']);
Route::get('/getproducts', [MenuProductController::class, 'index']);
Route::get('/getViewMaster', [ContactController::class, 'viewMasterKontak']);
Route::get('/getJenisKontak', [ContactController::class, 'viewJenisKontak']);
Route::post('/input-data-kontak', [ContactController::class, 'inputDataContact']);
