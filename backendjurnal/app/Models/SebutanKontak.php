<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SebutanKontak extends Model
{
    use HasFactory;
    protected $table = 'sebutan_kontak';
    protected $fillable = ['id', 'kode', 'name'];
    public $timestamps = false;

    public function dataContacts()
    {
        return $this->hasMany(DataContact::class, 'sebutan', 'kode');
    }
}