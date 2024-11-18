<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterTipeProduct extends Model
{
    protected $table = 'master_tipe_produk';
    protected $fillable = ['keterangan', 'kode'];
    public $timestamps = false;

    public function produk()
    {
        return $this->hasMany(MasterDataProduct::class, 'type', 'kode');
    }
}