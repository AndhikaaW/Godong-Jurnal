<?php

// app/Models/DataProduk.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterDataProduct extends Model
{
    protected $table = 'data_produk';
    protected $fillable = ['kode', 'barcode', 'nama', 'unit', 'kategori', 'deskripsi', 'type', 'gambar'];
    public $timestamps = false;

    public function kategori()
    {
        return $this->belongsTo(MasterKategori::class, 'kategori', 'kode');
    }

    public function tipe()
    {
        return $this->belongsTo(MasterTipeProduct::class, 'type', 'kode');
    }

    public function harga()
    {
        return $this->hasOne(HargaProduct::class, 'product_id', 'id');
    }

    public function inventaris()
    {
        return $this->hasOne(InventarisProduct::class, 'kode_produk', 'kode');
    }

    public function bundles()
    {
        return $this->hasMany(BundleProduct::class, 'kode_product', 'kode');
    }
}