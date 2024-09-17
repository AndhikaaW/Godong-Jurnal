<?php

namespace App\Http\Controllers;

use App\Models\MasterContact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function viewMasterKontak(){
        $kontak = MasterContact::with(["dataContact"]) -> get();
        return response()->json($kontak);
    }
}
