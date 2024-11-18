<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataTipeKontak extends Model
{
    protected $table = "data_tipe_kontak";
    protected $fillable = ['id','kode_kontak','kode_type_kontak'];
    public $timestamps = false;
    use HasFactory;
    public function dataContact(){
        return $this->hasMany(DataContact::class,'kode','kode_kontak');
    }
    public function masterContact(){
        return $this->belongsTo(MasterContact::class, 'kode_type_kontak', 'kode');
    }
    
    
}
