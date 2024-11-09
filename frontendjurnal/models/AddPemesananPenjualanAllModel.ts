// Interface untuk Produk
export interface ProdukPemesanan {
  nama: string;
  deskripsi: string;
  kuantitas: number;
  unit: string;
  hargaSatuan: number;
  diskon: number;
  pajak: number;
  jumlah: number;
}

// Interface untuk keseluruhan data Pemesanan
export interface PemesananPenjualanData {
  namaPelanggan: string;
  email: string;
  alamatPenagihan: string;
  tanggalTransaksi: Date | null;
  tanggalJatuhTempo: Date | null;
  noTransaksi: string;
  noReferensiPelanggan: string;
  syaratPembayaran: string;
  gudang: string;
  tag: string;
  produk: ProdukPemesanan[];
  pesan: string;
  catatan: string;
  subtotal: number;
  total: number;
  sisaTagihan: number;
}

// Initial state untuk form Pemesanan
export const initialPemesananData: PemesananPenjualanData = {
  namaPelanggan: '',
  email: '',
  alamatPenagihan: '',
  tanggalTransaksi: null,
  tanggalJatuhTempo: null,
  noTransaksi: '',
  noReferensiPelanggan: '',
  syaratPembayaran: '',
  gudang: '',
  tag: '',
  produk: [{ 
    nama: '', 
    deskripsi: '', 
    kuantitas: 1, 
    unit: '', 
    hargaSatuan: 0, 
    diskon: 0, 
    pajak: 0, 
    jumlah: 0 
  }],
  pesan: '',
  catatan: '',
  subtotal: 0,
  total: 0,
  sisaTagihan: 0
};

// Opsi-opsi untuk dropdown
export const dropdownOptions = {
  produk: [
    { label: 'Laptop Asus ROG', value: 'laptop-asus-rog' },
    { label: 'Smartphone Samsung Galaxy S21', value: 'samsung-galaxy-s21' },
    { label: 'Printer Epson L3150', value: 'printer-epson-l3150' },
    { label: 'Monitor LG 27 inch', value: 'monitor-lg-27' },
    { label: 'Keyboard Mechanical Logitech', value: 'keyboard-logitech' }
  ],

  unit: [
    { label: 'Buah', value: 'Buah' },
    { label: 'Set', value: 'Set' },
    { label: 'Paket', value: 'Paket' },
    { label: 'Lusin', value: 'Lusin' },
    { label: 'Box', value: 'Box' }
  ],

  pajak: [
    { label: 'PPN 11%', value: 11 },
    { label: 'PPh 23 (2%)', value: 2 },
    { label: 'Tidak kena pajak', value: 0 }
  ],

  syaratPembayaran: [
    { label: 'Cash/Tunai', value: 'cash' },
    { label: 'Net 30', value: 'net30' },
    { label: 'Net 60', value: 'net60' },
    { label: 'Custom', value: 'custom' }
  ],

  tag: [
    { label: 'Penting', value: 'penting' },
    { label: 'Mendesak', value: 'mendesak' },
    { label: 'Regular', value: 'regular' },
    { label: 'Follow Up', value: 'follow-up' }
  ],

  gudang: [
    { label: 'Gudang Pusat', value: 'gudang-pusat' },
    { label: 'Gudang Cabang A', value: 'gudang-a' },
    { label: 'Gudang Cabang B', value: 'gudang-b' }
  ]
};

// Helper functions untuk kalkulasi
export const hitungJumlahProduk = (produk: ProdukPemesanan): number => {
  const hargaSetelahDiskon = produk.hargaSatuan * (1 - produk.diskon / 100);
  const jumlahSebelumPajak = hargaSetelahDiskon * produk.kuantitas;
  const jumlahPajak = jumlahSebelumPajak * (produk.pajak / 100);
  return jumlahSebelumPajak + jumlahPajak;
};

export const hitungSubtotal = (produkList: ProdukPemesanan[]): number => {
  return produkList.reduce((total, produk) => total + hitungJumlahProduk(produk), 0);
};

export const hitungTotal = (subtotal: number, diskon: number = 0): number => {
  return subtotal - diskon;
};

// Format currency
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Validasi form
export const validatePemesananData = (data: PemesananPenjualanData): string[] => {
  const errors: string[] = [];

  if (!data.namaPelanggan) errors.push('Nama Pelanggan harus diisi');
  if (!data.email) errors.push('Email harus diisi');
  if (!data.alamatPenagihan) errors.push('Alamat Penagihan harus diisi');
  if (!data.tanggalTransaksi) errors.push('Tanggal Transaksi harus diisi');
  if (!data.syaratPembayaran) errors.push('Syarat Pembayaran harus diisi');
  if (!data.gudang) errors.push('Gudang harus diisi');

  // Validasi produk
  if (data.produk.length === 0) {
    errors.push('Minimal harus ada satu produk');
  } else {
    data.produk.forEach((produk, index) => {
      if (!produk.nama) errors.push(`Produk #${index + 1}: Nama produk harus diisi`);
      if (produk.kuantitas <= 0) errors.push(`Produk #${index + 1}: Kuantitas harus lebih dari 0`);
      if (produk.hargaSatuan <= 0) errors.push(`Produk #${index + 1}: Harga satuan harus lebih dari 0`);
    });
  }

  return errors;
}; 