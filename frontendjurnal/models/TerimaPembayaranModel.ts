// Interface untuk Item Tagihan
export interface ItemTagihan {
  no: string;
  deskripsi: string;
  tanggalJatuhTempo: Date | null;
  total: number;
  sisaTagihan: number;
  jumlah: number;
}

// Interface untuk keseluruhan data Pembayaran
export interface TerimaPembayaranData {
  namaPelanggan: string;
  setorKe: string;
  caraPembayaran: string;
  tanggalPembayaran: Date | null;
  tanggalJatuhTempo: Date | null;
  noTransaksi: string;
  tag: string;
  itemTagihan: ItemTagihan[];
  catatan: string;
  subtotal: number;
  diskonPersen: number;
  total: number;
  potongan: number;
  pilihAkun: string;
  sisaTagihan: number;
}

// Initial state
export const initialTerimaPembayaranData: TerimaPembayaranData = {
  namaPelanggan: '',
  setorKe: '',
  caraPembayaran: '',
  tanggalPembayaran: null,
  tanggalJatuhTempo: null,
  noTransaksi: '',
  tag: '',
  itemTagihan: [],
  catatan: '',
  subtotal: 0,
  diskonPersen: 0,
  total: 0,
  potongan: 0,
  pilihAkun: '',
  sisaTagihan: 0
};

// Opsi-opsi untuk dropdown
export const dropdownOptions = {
  pelanggan: [
    { label: 'Tian', value: 'tian' },
    { label: 'Budi', value: 'budi' },
    { label: 'Ani', value: 'ani' }
  ],
  setorKe: [
    { label: 'Kas', value: 'kas' },
    { label: 'Bank BCA', value: 'bca' },
    { label: 'Bank Mandiri', value: 'mandiri' }
  ],
  caraPembayaran: [
    { label: 'Cash', value: 'cash' },
    { label: 'Transfer Bank', value: 'transfer' },
    { label: 'Cek/Giro', value: 'cek' }
  ],
  tag: [
    { label: 'Penting', value: 'penting' },
    { label: 'Mendesak', value: 'mendesak' },
    { label: 'Regular', value: 'regular' }
  ],
  akun: [
    { label: 'Kas', value: 'kas' },
    { label: 'Bank', value: 'bank' },
    { label: 'Piutang', value: 'piutang' }
  ]
};

// Helper functions
export const hitungTotal = (subtotal: number, potongan: number): number => {
  return subtotal - potongan;
};

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}; 