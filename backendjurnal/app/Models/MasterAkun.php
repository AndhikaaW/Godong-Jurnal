<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterAkun extends Model
{
    use HasFactory;
    protected $table = 'master_akun';
    protected $fillable = ['id', 'kode', 'nama'];
    public $timestamps = false;

    public function dataContactsPiutang()
    {
        return $this->hasMany(DataContact::class, 'akun_piutang', 'kode');
    }

    public function dataContactsHutang()
    {
        return $this->hasMany(DataContact::class, 'akun_hutang', 'kode');
    }
}