<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterGudang extends Model
{
    protected $table = 'master_gudang';
    public $timestamps = false;
    protected $fillable = ['kode', 'penanggung_jawab', 'alamat'];
}
