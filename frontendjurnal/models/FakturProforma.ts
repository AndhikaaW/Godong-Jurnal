export interface Produk {
  nama: string;
  deskripsi: string;
  kuantitas: number;
  unit: string;
  hargaSatuan: number;
  diskon: number;
  pajak: string;
  jumlah: number;
}

export interface FakturProforma {
  nomorFaktur: string;
  status: string;
  pelanggan: string;
  email: string;
  alamatPengiriman: string;
  tanggalPengiriman: string;
  kirimMelalui: string;
  syaratPembayaran: string;
  noTransaksi: string;
  noReferensi: string;
  produk: Produk[];
  subtotal: number;
  diskon: number;
  total: number;
  sisaTagihan: number;
}

export const fakturProformaData: FakturProforma = {
  nomorFaktur: '10001-Proforma-1',
  status: 'Draft',
  pelanggan: 'Ra',
  email: 'Ra@gmail.com',
  alamatPengiriman: 'gtw',
  tanggalPengiriman: '03/09/2024',
  kirimMelalui: '12/09/2024',
  syaratPembayaran: 'Net 30',
  noTransaksi: '10004-Proforma-1',
  noReferensi: '',
  produk: [
    {
      nama: 'Buku',
      deskripsi: 'haram',
      kuantitas: 1,
      unit: 'Buah',
      hargaSatuan: 200000,
      diskon: 0,
      pajak: 'PPN',
      jumlah: 200000
    }
  ],
  subtotal: 200000,
  diskon: 20000,
  total: 180000,
  sisaTagihan: 180000
};
