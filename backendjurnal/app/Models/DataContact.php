<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataContact extends Model
{
    use HasFactory;
    protected $table = "data_kontak";
    public $timestamps = false;
    protected $fillable = [
        'id',
        'kode',
        'nama_tampilan',
        'tipe_kontak',
        'grup_kontak',
        'nama_lengkap',
        'sebutan',
        'identitas',
        'nomor_identitas',
        'email',
        'nama_perusahaan',
        'no_handphone',
        'no_telepon',
        'no_fax',
        'npwp',
        'alamat_penagihan',
        'alamat_pengiriman',
        'akun_piutang',
        'akun_hutang',
        'syarat_pembayaran_utama',
    ];

    public function dataBankContacts()
    {
        return $this->hasMany(DataBankContact::class, 'kode_kontak', 'kode');
    }

    public function grupKontak()
    {
        return $this->belongsTo(GrubKontak::class, 'grup_kontak', 'kode');
    }

    public function sebutanKontak()
    {
        return $this->belongsTo(SebutanKontak::class, 'sebutan', 'kode');
    }

    public function identitasKontak()
    {
        return $this->belongsTo(IdentitasKontak::class, 'identitas', 'kode');
    }

    public function akunPiutang()
    {
        return $this->belongsTo(MasterAkun::class, 'akun_piutang', 'kode');
    }

    public function akunHutang()
    {
        return $this->belongsTo(MasterAkun::class, 'akun_hutang', 'kode');
    }

    public function masterKontak()
    {
        return $this->belongsTo(MasterContact::class, 'kode', 'kode');
    }
}