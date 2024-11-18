<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MenuProductController;
use App\Http\Controllers\ProductController;
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

//API CONTACT
    //GET
        Route::get('/getsidebar', [SidebarController::class, 'getSidebar']);
        Route::get('/getproducts', [MenuProductController::class, 'index']);
        Route::get('/getViewMaster', [ContactController::class, 'viewMasterKontak']);
        Route::get('/getJenisKontak', [ContactController::class, 'viewJenisKontak']);
        Route::get('/getGrubKontak', [ContactController::class, 'viewGrubKontak']);
        Route::get('/getBank', [ContactController::class, 'viewBank']);
        Route::get('/getAkun', [ContactController::class, 'viewAkun']);
        Route::get('/getAkun/{id}', [ContactController::class, 'viewAkunById']);
        Route::get('/getIdentitasKontak', [ContactController::class, 'viewIdentitas']);
        Route::get('/getSebutanKontak', [ContactController::class, 'viewSebutan']);
        Route::get('/getKontakById/{kode}', [ContactController::class, 'viewSingleDataContact']);

    //POST
        Route::post('/inputDataKontak', [ContactController::class, 'inputDataContact']);
        Route::post('/inputGrupKontak', [ContactController::class, 'inputGrupKontak']);
        
    //PUT
        Route::put('/editGrupKontak/{id}', [ContactController::class, 'updateGrupKontak']);

    //DELETE
        Route::delete('/deleteGrupKontak/{id}', [ContactController::class, 'deleteGrupKontak']);


//API PRODUCT
    //GET

    //POST
        Route::post('/inputProduk', [ProductController::class, 'store']);
