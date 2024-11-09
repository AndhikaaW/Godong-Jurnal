// Interface untuk Produk
export interface ProdukPenawaran {
  nama: string;
  deskripsi: string;
  kuantitas: number;
  unit: string;
  hargaSatuan: number;
  diskon: number;
  pajak: number;
  jumlah: number;
}

// Interface untuk keseluruhan data Penawaran
export interface PenawaranPenjualanData {
  namaPelanggan: string;
  email: string;
  alamatPenagihan: string;
  tanggalTransaksi: Date | null;
  tanggalKadaluwarsa: Date | null;
  noTransaksi: string;
  syaratPembayaran: string;
  tag: string;
  produk: ProdukPenawaran[];
  pesan: string;
  catatan: string;
  subtotal: number;
  total: number;
}

// Initial state untuk form Penawaran
export const initialPenawaranData: PenawaranPenjualanData = {
  namaPelanggan: '',
  email: '',
  alamatPenagihan: '',
  tanggalTransaksi: null,
  tanggalKadaluwarsa: null,
  noTransaksi: '',
  syaratPembayaran: '',
  tag: '',
  produk: [{ 
    nama: '', 
    deskripsi: '', 
    kuantitas: 1, 
    unit: 'Buah', 
    hargaSatuan: 0, 
    diskon: 0, 
    pajak: 0, 
    jumlah: 0 
  }],
  pesan: '',
  catatan: '',
  subtotal: 0,
  total: 0
};

// Opsi-opsi untuk dropdown
export const dropdownOptions = {
  produk: [
    { label: 'Laptop Asus ROG', value: 'laptop-asus-rog' },
    { label: 'Smartphone Samsung Galaxy S21', value: 'samsung-galaxy-s21' },
    { label: 'Printer Epson L3150', value: 'printer-epson-l3150' }
  ],

  unit: [
    { label: 'Buah', value: 'Buah' },
    { label: 'Set', value: 'Set' },
    { label: 'Paket', value: 'Paket' }
  ],

  pajak: [
    { label: 'PPN 11%', value: 11 },
    { label: 'PPh 23 (2%)', value: 2 },
    { label: 'Tidak kena pajak', value: 0 }
  ],

  syaratPembayaran: [
    { label: 'Cash/Tunai', value: 'cash' },
    { label: 'Net 30', value: 'net30' },
    { label: 'Custom', value: 'custom' }
  ],

  tag: [
    { label: 'Penting', value: 'penting' },
    { label: 'Mendesak', value: 'mendesak' },
    { label: 'Regular', value: 'regular' }
  ]
};

// Helper functions
export const hitungJumlahProduk = (produk: ProdukPenawaran): number => {
  const hargaSetelahDiskon = produk.hargaSatuan * (1 - produk.diskon / 100);
  const jumlahSebelumPajak = hargaSetelahDiskon * produk.kuantitas;
  const jumlahPajak = jumlahSebelumPajak * (produk.pajak / 100);
  return jumlahSebelumPajak + jumlahPajak;
};

export const hitungSubtotal = (produkList: ProdukPenawaran[]): number => {
  return produkList.reduce((total, produk) => total + hitungJumlahProduk(produk), 0);
};

export const hitungTotal = (subtotal: number): number => {
  return subtotal;
};

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}; 