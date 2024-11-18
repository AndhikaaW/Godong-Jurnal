<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventarisProduct extends Model
{
    protected $table = 'inventaris_product';
    protected $fillable = ['kode_produk', 'quantity', 'min_stock'];
    public $timestamps = false;

    public function produk()
    {
        return $this->belongsTo(MasterDataProduct::class, 'kode_produk', 'kode');
    }
}

