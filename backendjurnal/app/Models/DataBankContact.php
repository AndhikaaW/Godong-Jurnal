<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataBankContact extends Model
{
    protected $table = 'data_bank_kontak';
    protected $fillable = [
        'id',
        'kode',
        'kode_kontak',
        'nama_bank',
        'cabang_bank',
        'pemegang_akun_bank',
        'nomor_rekening',
    ];
    public $timestamps = false;
    use HasFactory;

    public function dataContact()
    {
        return $this->belongsTo(DataContact::class, 'kode_kontak', 'kode');
    }

    public function masterNamaBank()
    {
        return $this->belongsTo(MasterNamaBank::class, 'nama_bank', 'kode');
    }
}