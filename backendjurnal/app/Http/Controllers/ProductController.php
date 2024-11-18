<?php

namespace App\Http\Controllers;

use App\Models\MasterDataProduct;
use App\Models\MasterKategori;
use App\Models\MasterTipeProduct;
use App\Models\HargaProduct;
use App\Models\BundleProduct;
use App\Models\InventarisProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = MasterDataProduct::with(['kategori', 'tipe', 'harga', 'inventaris', 'bundles'])->get();
        return view('products.index', compact('products'));
    }

    public function create()
    {
        $categories = MasterKategori::all();
        $types = MasterTipeProduct::all();
        return view('products.create', compact('categories', 'types'));
    }

    public function store(Request $request)
    {
        // Validasi data produk
        $validatedData = $request->validate([
            'kode' => 'required|string|max:255|unique:data_produk,kode',
            'barcode' => 'nullable|string|max:255',
            'nama' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
            'kategori' => 'required|string|exists:master_kategori,kode',
            'deskripsi' => 'nullable|string',
            'type' => 'required|string|exists:master_tipe_produk,kode',
            'gambar' => 'nullable|string|max:255',
            'harga_beli' => 'nullable|numeric',
            'akun_beli' => 'nullable|string|max:255',
            'akun_diskon' => 'nullable|string|max:255',
            'harga_jual' => 'nullable|numeric',
            'akun_jual' => 'nullable|string|max:255',
            'pajak_jual' => 'nullable|string|max:255',
            'quantity' => 'nullable|integer',
            'min_stock' => 'nullable|integer',
            'bundles' => 'nullable|array',
            'bundles.*.kode_bundle' => 'nullable|string',
            'bundles.*.quantity' => 'nullable|integer'
        ]);

        // Simpan data produk ke tabel data_produk
        $product = MasterDataProduct::create($validatedData);

        // Cek dan simpan data ke tabel harga_product jika tersedia
        if ($request->filled(['harga_beli', 'akun_beli', 'harga_jual'])) {
            HargaProduct::create([
                'product_id' => $product->kode,
                'harga_beli' => $request->harga_beli,
                'akun_beli' => $request->akun_beli,
                'akun_diskon' => $request->akun_diskon,
                'harga_jual' => $request->harga_jual,
                'akun_jual' => $request->akun_jual,
                'pajak_jual' => $request->pajak_jual
            ]);
        }

        // Cek dan simpan data ke tabel inventaris_product jika tersedia
        if ($request->filled(['quantity', 'min_stock'])) {
            InventarisProduct::create([
                'kode_produk' => $product->kode,
                'quantity' => $request->quantity,
                'min_stock' => $request->min_stock
            ]);
        }

        // Cek dan simpan data ke tabel bundle_product jika tersedia
        if ($request->has('bundles')) {
            foreach ($request->bundles as $bundle) {
                if (!empty($bundle['kode_bundle']) && !empty($bundle['quantity'])) {
                    BundleProduct::create([
                        'kode_bundle' => $bundle['kode_bundle'],
                        'kode_product' => $product->kode,
                        'quantity' => $bundle['quantity']
                    ]);
                }
            }
        }

        // Kembalikan response JSON
        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }
    // Add other methods like edit, update, delete as needed
}
