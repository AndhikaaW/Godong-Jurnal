// Interface untuk Produk Return
export interface ProdukReturn {
  nama: string;
  qtyFaktur: number;
  qtyRetur: number;
  unit: string;
  hargaSatuan: number;
  diskon: number;
  pajak: number;
  jumlah: number;
}

// Interface untuk keseluruhan data Return
export interface ReturnPenjualanData {
  namaPelanggan: string;
  email: string;
  alamatPenagihan: string;
  tanggalTransaksi: Date | null;
  tanggalRetur: Date | null;
  noRetur: string;
  noFaktur: string;
  gudang: string;
  tag: string;
  produk: ProdukReturn[];
  pesan: string;
  catatan: string;
  subtotal: number;
  totalRetur: number;
}

// Initial state untuk form Return
export const initialReturnData: ReturnPenjualanData = {
  namaPelanggan: 'Budi Santoso',
  email: 'budi@example.com',
  alamatPenagihan: 'Jl. Serayu No. 10, Madiun',
  tanggalTransaksi: new Date('2024-03-15'),
  tanggalRetur: new Date('2024-03-19'),
  noRetur: 'RET/2024/03/001',
  noFaktur: 'INV/2024/03/001',
  gudang: 'gudang-pusat',
  tag: 'regular',
  produk: [
    {
      nama: 'Giftcard Garena 1001',
      qtyFaktur: 1,
      qtyRetur: 0,
      unit: 'Buah',
      hargaSatuan: 180000,
      diskon: 0,
      pajak: 0,
      jumlah: 180000
    }
  ],
  pesan: '',
  catatan: '',
  subtotal: 180000,
  totalRetur: 180000
};

// Opsi-opsi untuk dropdown
export const dropdownOptions = {
  tag: [
    { label: 'Penting', value: 'penting' },
    { label: 'Mendesak', value: 'mendesak' },
    { label: 'Regular', value: 'regular' }
  ],
  
  gudang: [
    { label: 'Gudang Pusat', value: 'gudang-pusat' },
    { label: 'Gudang Cabang A', value: 'gudang-a' },
    { label: 'Gudang Cabang B', value: 'gudang-b' }
  ],

  unit: [
    { label: 'Buah', value: 'Buah' },
    { label: 'Set', value: 'Set' },
    { label: 'Paket', value: 'Paket' }
  ],

  produk: [
    { 
      label: 'Giftcard Garena 1001', 
      value: 'giftcard-1001',
      hargaSatuan: 180000,
      unit: 'Buah'
    },
    { 
      label: 'Giftcard Mobile Legend', 
      value: 'giftcard-ml',
      hargaSatuan: 150000,
      unit: 'Buah'
    },
    { 
      label: 'Giftcard PUBG', 
      value: 'giftcard-pubg',
      hargaSatuan: 200000,
      unit: 'Buah'
    }
  ]
};

// Helper functions
export const hitungJumlahProduk = (produk: ProdukReturn): number => {
  const hargaSetelahDiskon = produk.hargaSatuan * (1 - produk.diskon / 100);
  const jumlahSebelumPajak = hargaSetelahDiskon * produk.qtyRetur;
  const jumlahPajak = jumlahSebelumPajak * (produk.pajak / 100);
  return jumlahSebelumPajak + jumlahPajak;
};

export const hitungSubtotal = (produkList: ProdukReturn[]): number => {
  return produkList.reduce((total, produk) => total + hitungJumlahProduk(produk), 0);
};

export const hitungTotal = (subtotal: number): number => {
  return subtotal;
};

// Validasi form
export const validateReturnData = (data: ReturnPenjualanData): string[] => {
  const errors: string[] = [];

  if (!data.namaPelanggan) errors.push('Nama Pelanggan harus diisi');
  if (!data.tanggalRetur) errors.push('Tanggal Retur harus diisi');
  if (!data.gudang) errors.push('Gudang harus diisi');

  data.produk.forEach((produk, index) => {
    if (produk.qtyRetur > produk.qtyFaktur) {
      errors.push(`Produk #${index + 1}: Qty retur tidak boleh melebihi qty faktur`);
    }
  });

  return errors;
};

// Helper untuk format rupiah
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};