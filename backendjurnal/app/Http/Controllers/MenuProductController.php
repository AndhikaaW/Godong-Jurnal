<?php

namespace App\Http\Controllers;

use App\Models\MenuProduct;
use Illuminate\Http\Request;

class MenuProductController extends Controller
{
    public function index(){
        $products = MenuProduct::with(["itemsMenu"])->get();
        return response()->json($products);
    }
}
