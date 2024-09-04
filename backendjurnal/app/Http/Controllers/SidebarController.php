<?php

namespace App\Http\Controllers;

use App\Models\Sidebar;
use Illuminate\Http\Request;

class SidebarController extends Controller
{
    public function getSidebar(){
        $sidebar = Sidebar::all();
        return response()->json($sidebar);
    }
}
