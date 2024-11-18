<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BundleProduct extends Model
{
    protected $table = 'bundle_product';
    protected $fillable = ['kode_bundle', 'kode_product', 'quantity'];
    public $timestamps = false;
    public function produk()
    {
        return $this->belongsTo(MasterDataProduct::class, 'kode_product', 'kode');
    }
}