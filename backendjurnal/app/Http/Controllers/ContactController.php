<?php

namespace App\Http\Controllers;

use App\Models\DataContact;
use App\Models\MasterContact;
use App\Models\DataBankContact;
use App\Models\DataGrubKontak;
use App\Models\DataTipeKontak;
use App\Models\GrubKontak;
use App\Models\IdentitasKontak;
use App\Models\MasterAkun;
use App\Models\MasterNamaBank;
use App\Models\SebutanKontak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    // Method to view master contact data
    public function viewMasterKontak()
    {
        $kontak = MasterContact::with(["tipeKontak", "tipeKontak.dataContact"])->get();  // Memuat tipe kontak
        return response()->json($kontak);
    }
    public function viewAkunById($id)
    {
        // Find the contact by ID or fail (404 if not found)
        $kontak = MasterContact::with(["tipeKontak", "tipeKontak.dataContact"])
            ->findOrFail($id);  // Fetch specific contact by ID

        // Return the result as JSON
        return response()->json($kontak);
    }
    public function viewAkun()
    {
        $akun =  MasterAkun::all();
        return response()->json($akun);
    }

    public function viewSingleDataContact($kode)
    {
        $dataContact = DataContact::with(['dataTipeKontak.masterContact'])
            ->where('kode', $kode)
            ->firstOrFail();

        return response()->json($dataContact);
    }
    public function viewGrubKontak()
    {
        // Ambil data grup kontak beserta data_grub
        $grub = GrubKontak::with(['dataGrub'])->get();

        // Lakukan mapping untuk mengambil nama, kode, dan jumlah kontak di setiap grup
        $result = $grub->map(function ($g) {
            return [
                'nama' => $g->nama,
                'kode' => $g->kode,
                'jumlah_kontak' => count($g->dataGrub)
            ];
        });

        return response()->json($result);
    }

    public function viewJenisKontak()
    {
        $jenisKontak = MasterContact::all();
        return response()->json($jenisKontak);
    }
    public function viewBank()
    {
        $bank = MasterNamaBank::all();
        return response()->json($bank);
    }

    public function viewSebutan()
    {
        $jenisSebutan = SebutanKontak::all();
        return response()->json($jenisSebutan);
    }
    public function viewIdentitas()
    {
        $identitas = IdentitasKontak::all();
        return response()->json($identitas);
    }
    public function inputGrupKontak(Request $request)
    {
        // Validasi data yang diterima dari request
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        // Ambil kode terakhir dari database
        $lastGrub = GrubKontak::orderBy('kode', 'desc')->first();

        // Buat kode baru dengan auto-increment format GRUP01, GRUP02, dst.
        if ($lastGrub) {
            // Ambil nomor terakhir dari kode misalnya GRUP01 -> 01
            $lastNumber = (int) substr($lastGrub->kode, 4);
            // Tambahkan 1 ke nomor terakhir
            $newNumber = $lastNumber + 1;
            // Format kode baru menjadi GRUP dengan dua digit angka
            $newKode = 'GRUP' . str_pad($newNumber, 2, '0', STR_PAD_LEFT);
        } else {
            // Jika belum ada data, mulai dari GRUP01
            $newKode = 'GRUP01';
        }

        // Membuat instance baru dan menyimpan data ke database
        $grubKontak = GrubKontak::create([
            'kode' => $newKode,
            'nama' => $validatedData['nama'],
        ]);

        // Mengembalikan respon, misalnya redirect atau respon JSON
        return response()->json([
            'success' => true,
            'message' => 'Data grup kontak berhasil ditambahkan dengan kode: ' . $newKode,
            'data' => $grubKontak,
        ], 201);
    }

    public function updateGrupKontak(Request $request, $kode)
    {
        // Validasi data yang akan di-update
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        // Cari grup kontak berdasarkan kode
        $grubKontak = GrubKontak::where('kode', $kode)->firstOrFail();

        // Update field 'nama'
        $grubKontak->update([
            'nama' => $validatedData['nama'],
        ]);

        // Kembalikan response JSON dengan status berhasil
        return response()->json([
            'success' => true,
            'message' => 'Data grup kontak berhasil diupdate!',
            'data' => $grubKontak,
        ], 200);
    }

    // Method untuk menghapus data grup kontak berdasarkan kode
    public function deleteGrupKontak($kode)
    {
        // Cari grup kontak berdasarkan kode
        $grubKontak = GrubKontak::where('kode', $kode)->firstOrFail();

        // Hapus data grup kontak
        $grubKontak->delete();

        // Kembalikan response JSON dengan status berhasil
        return response()->json([
            'success' => true,
            'message' => 'Data grup kontak berhasil dihapus!',
        ], 200);
    }

    public function inputDataContact(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'nama_tampilan' => 'required|string|max:100',
            'tipe_kontak' => 'required|array',
            'tipe_kontak.*' => 'required|string|max:100',
            'grup_kontak' => 'nullable|array|max:3',
            'grup_kontak.*' => 'required|string|max:100',
            'nama_lengkap' => 'required|string|max:200',
            'sebutan' => 'nullable|string|max:20',
            'identitas' => 'nullable|string|max:100',
            'nomor_identitas' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:50',
            'nama_perusahaan' => 'nullable|string|max:100',
            'no_handphone' => 'nullable|string|max:100',
            'no_telepon' => 'nullable|string|max:100',
            'no_fax' => 'nullable|string|max:100',
            'npwp' => 'nullable|string|max:100',
            'alamat_penagihan' => 'nullable|string',
            'alamat_pengiriman' => 'nullable|string',
            'akun_piutang' => 'nullable|integer',
            'akun_hutang' => 'nullable|integer',
            'syarat_pembayaran_utama' => 'nullable|string|max:100',
            'info_lainnya' => 'nullable|string',
            'hutang_max' => 'nullable|integer',
            'bank_accounts' => 'required|array|min:1',
            'bank_accounts.*.nama_bank' => 'required|string|max:100',
            'bank_accounts.*.cabang_bank' => 'required|string|max:100',
            'bank_accounts.*.pemegang_akun_bank' => 'required|string|max:100',
            'bank_accounts.*.nomor_rekening' => 'required|string|max:50',
        ]);

        if ($validated->fails()) {
            return response()->json(['errors' => $validated->errors()], 400);
        }

        DB::beginTransaction();

        try {
            $lastKode = DataContact::max('kode');
            $newNumber = $lastKode ? (int)substr($lastKode, 4) + 1 : 1;
            $newKode = 'DATA' . str_pad($newNumber, 9, '0', STR_PAD_LEFT);

            $contactData = $validated->validated();
            unset($contactData['tipe_kontak'], $contactData['grup_kontak'], $contactData['bank_accounts']);
            $contact = DataContact::create(array_merge($contactData, ['kode' => $newKode]));

            // Insert tipe_kontak
            foreach ($request->input('tipe_kontak') as $tipeKontak) {
                DataTipeKontak::create([
                    'kode_kontak' => $newKode,
                    'kode_type_kontak' => $tipeKontak,
                ]);
            }

            // Insert grup_kontak (max 3)
            $grupKontaks = $request->input('grup_kontak', []);
            foreach (array_slice($grupKontaks, 0, 3) as $grupKontak) {
                DataGrubKontak::create([
                    'kode_kontak' => $newKode,
                    'kode_grub' => $grupKontak,
                ]);
            }

            // Insert bank accounts
            foreach ($request->input('bank_accounts') as $index => $bankAccount) {
                DataBankContact::create([
                    'kode' => 'BANK' . str_pad($newNumber + $index, 9, '0', STR_PAD_LEFT),
                    'kode_kontak' => $newKode,
                    'nama_bank' => $bankAccount['nama_bank'],
                    'cabang_bank' => $bankAccount['cabang_bank'],
                    'pemegang_akun_bank' => $bankAccount['pemegang_akun_bank'],
                    'nomor_rekening' => $bankAccount['nomor_rekening'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Data contact, type, group, and bank details successfully inserted.',
                'contact' => $contact
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            \Illuminate\Support\Facades\Log::error('Error inserting contact data: ' . $e->getMessage());

            return response()->json([
                'error' => 'Failed to insert contact details.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
