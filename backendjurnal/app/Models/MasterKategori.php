<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterKategori extends Model
{
    protected $table = 'master_kategori';
    protected $fillable = ['kode', 'keterangan'];
    public $timestamps = false;

    public function produk()
    {
        return $this->hasMany(MasterDataProduct::class, 'kategori', 'kode');
    }
}