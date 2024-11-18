// Interface untuk data deposit
export interface DepositData {
  pelanggan: string;
  setorKe: string;
  caraPembayaran: string;
  tanggalPembayaran: Date | null;
  tanggalJatuhTempo: Date | null;
  noTransaksi: string;
  tag: string;
  catatan: string;
  total: number;
}

// Interface untuk data transaksi dalam tabel
export interface TransaksiDeposit {
  nomor: string;
  deskripsi: string;
  tanggalTransaksi: string;
  total: number;
  sisaTagihan: number;
  tambahDeposit: number;
}

// Data awal untuk form deposit
export const initialDepositData: DepositData = {
  pelanggan: '',
  setorKe: '',
  caraPembayaran: '',
  tanggalPembayaran: null,
  tanggalJatuhTempo: null,
  noTransaksi: '(Auto)',
  tag: 'Custom',
  catatan: '',
  total: 0
};

// Opsi-opsi untuk dropdown
export const dropdownOptions = {
  pelanggan: [
    { label: 'PT Maju Jaya', value: 'pt_maju_jaya' },
    { label: 'CV Sukses Makmur', value: 'cv_sukses_makmur' },
    { label: 'Toko Sejahtera', value: 'toko_sejahtera' }
  ],
  caraPembayaran: [
    { label: 'Kas Tunai', value: 'kas_tunai' },
    { label: 'Transfer Bank', value: 'transfer_bank' }
  ],
  setorKe: [
    { label: 'Kas Besar', value: 'kas_besar' },
    { label: 'Bank BCA', value: 'bank_bca' },
    { label: 'Bank Mandiri', value: 'bank_mandiri' }
  ],
  tag: [
    { label: 'Penting', value: 'penting' },
    { label: 'Mendesak', value: 'mendesak' },
    { label: 'Regular', value: 'regular' }
  ]
};

// Data contoh untuk tabel transaksi
export const sampleTransaksiData: TransaksiDeposit[] = [
  {
    nomor: 'Sales Order #0001',
    deskripsi: '',
    tanggalTransaksi: '10/09/2024',
    total: 1500000,
    sisaTagihan: 1500000,
    tambahDeposit: 1500000
  }
];

// Fungsi helper untuk format rupiah
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount);
};

// Fungsi untuk validasi data deposit
export const validateDepositData = (data: DepositData): boolean => {
  if (!data.pelanggan) return false;
  if (!data.setorKe) return false;
  if (!data.caraPembayaran) return false;
  if (!data.tanggalPembayaran) return false;
  if (data.total <= 0) return false;
  return true;
};

// Fungsi untuk menghitung total deposit
export const hitungTotalDeposit = (transaksi: TransaksiDeposit[]): number => {
  return transaksi.reduce((total, item) => total + item.tambahDeposit, 0);
}; 