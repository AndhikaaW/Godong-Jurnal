<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterNamaBank extends Model
{
    use HasFactory;
    protected $table = 'master_nama_bank';
    protected $fillable = ['id', 'kode', 'nama_bank'];
    public $timestamps = false;
}
