<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterContact extends Model
{
    use HasFactory;
    protected $table = 'master_kontak';
    protected $fillable = ['id', 'kode', 'nama'];
    public $timestamps = false;

    public function dataContact()
    {
        return $this->hasMany(DataContact::class, 'kode', 'kode');
    }
}