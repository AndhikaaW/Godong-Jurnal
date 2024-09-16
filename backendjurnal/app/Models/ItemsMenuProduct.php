<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemsMenuProduct extends Model
{
    use HasFactory;
    protected $table = 'items_menu_product';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'kode',
        'kode_menu',
        'nama',
        'description'
    ];
}
