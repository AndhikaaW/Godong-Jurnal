<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HargaProduct extends Model
{
    protected $table = 'harga_product';
    protected $fillable = ['product_id', 'harga_beli', 'akun_beli', 'akun_diskon', 'harga_jual', 'akun_jual', 'pajak_jual'];
    public $timestamps = false;
    public function produk()
    {
        return $this->belongsTo(MasterDataProduct::class, 'product_id', 'id');
    }
}
