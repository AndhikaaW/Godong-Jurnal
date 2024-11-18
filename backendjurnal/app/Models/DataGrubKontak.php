<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataGrubKontak extends Model
{
    protected $table = "data_grub_kontak";
    protected $fillable = ['id','kode_kontak','kode_grub'];
    public $timestamps = false;
    use HasFactory;
    public function dataKontak()
    {
        return $this->belongsTo(DataContact::class, 'kode', 'kode_kontak');
    }
    public function grupKontak()
    {
        return $this->belongsTo(GrubKontak::class, 'kode_grub', 'kode');
    }
}
