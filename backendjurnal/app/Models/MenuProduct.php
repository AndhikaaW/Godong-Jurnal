<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuProduct extends Model
{
    use HasFactory;
    protected $table = 'menu_product';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'kode',
        'name',
    ];
    public function itemsMenu(){
        return $this->hasMany(ItemsMenuProduct::class,'kode_menu','kode');
    }
}
