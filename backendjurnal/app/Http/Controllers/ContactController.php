<?php

namespace App\Http\Controllers;

use App\Models\DataContact;
use App\Models\MasterContact;
use App\Models\DataBankContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    // Method to view master contact data
    public function viewMasterKontak() {
        $kontak = MasterContact::with(["dataContact"])->get();
        return response()->json($kontak);
    }
    public function viewJenisKontak(){
        $jenisKontak = MasterContact::all();
        return response()->json($jenisKontak);
    }

    // Method to insert new contact data and bank details
    public function inputDataContact(Request $request) {
        // Validate the request data for both contact and bank info
        $validated = Validator::make($request->all(), [
            'nama_tampilan' => 'required|string|max:100',
            'tipe_kontak' => 'required|string|max:100',
            'grup_kontak' => 'nullable|string|max:100',
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
            // Bank related fields
            'nama_bank' => 'required|string|max:100',
            'cabang_bank' => 'required|string|max:100',
            'pemegang_akun_bank' => 'required|string|max:100',
            'nomor_rekening' => 'required|integer',
        ]);

        // Return validation errors if any
        if ($validated->fails()) {
            return response()->json(['errors' => $validated->errors()], 400);
        }

        DB::beginTransaction(); // Start the transaction

        try {
            // Generate new kode for the contact (DATA000000001, DATA000000002, ...)
            $lastKode = DataContact::select(DB::raw('MAX(kode) as kode'))
                ->where('kode', 'LIKE', 'DATA%')
                ->first()
                ->kode;

            // If no records found, start with DATA000000001
            if ($lastKode) {
                $lastNumber = (int)substr($lastKode, 4); // Extract the number part
                $newNumber = str_pad($lastNumber + 1, 9, '0', STR_PAD_LEFT);
            } else {
                $newNumber = '000000001'; // Start from 000000001 if no record exists
            }
            $newKode = 'DATA' . $newNumber;

            // Insert new contact data into the data_contact table
            $contact = DataContact::create(array_merge($validated->validated(), ['kode' => $newKode]));

            // Insert corresponding bank data into the data_bank_kontak table
            DataBankContact::create([
                'kode' => 'BANK' . $newNumber, // Generating similar kode for bank contact (e.g., BANK000000001)
                'kode_kontak' => $newKode, // Link to the DataContact kode
                'nama_bank' => $request->input('nama_bank'),
                'cabang_bank' => $request->input('cabang_bank'),
                'pemegang_akun_bank' => $request->input('pemegang_akun_bank'),
                'nomor_rekening' => $request->input('nomor_rekening'),
            ]);

            DB::commit(); // Commit the transaction

            // Return success response
            return response()->json([
                'message' => 'Data contact and bank details successfully inserted.',
                'contact' => $contact
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack(); // Rollback the transaction in case of error
            \Illuminate\Support\Facades\Log::error('Error inserting contact and bank data: ' . $e->getMessage());

            // Return detailed error message to the client
            return response()->json([
                'error' => 'Failed to insert contact and bank details.',
                'message' => $e->getMessage()  // Error message from the exception
            ], 500);  // Internal server error    
        }
    }
}
