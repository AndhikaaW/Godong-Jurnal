<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrubKontak extends Model
{
    use HasFactory;
    protected $table = "grup_kontak";
    public $timestamps = false;
    protected $fillable = ['id','kode','nama'];
}
