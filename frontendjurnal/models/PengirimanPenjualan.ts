export interface Produk {
  nama: string;
  deskripsi: string;
  kuantitas: number;
  unit: string;
}

export interface PengirimanPenjualan {
  nomorPengiriman: string;
  status: string;
  pelanggan: string;
  email: string;
  alamatPengiriman: string;
  tanggalPengiriman: string;
  kirimMelalui: string;
  noPelacakan: string;
  noTransaksi: string;
  noReferensi: string;
  noPemesanan: string;
  tag: string;
  produk: Produk[];
  pesan: string;
  catatan: string;
  lampiran: {
    nama: string;
    ukuran: string;
  }[];
}

export const pengirimanPenjualanData: PengirimanPenjualan = {
  nomorPengiriman: '10201',
  status: 'Belum ditagih',
  pelanggan: 'Tian',
  email: 'tian@gmail.com',
  alamatPengiriman: 'pct',
  tanggalPengiriman: '03/09/2024',
  kirimMelalui: '12/09/2024',
  noPelacakan: '-',
  noTransaksi: 'Sales Invoice #11211',
  noReferensi: '-',
  noPemesanan: 'Sales Order #11211',
  tag: '-',
  produk: [
    {
      nama: 'Sapi',
      deskripsi: 'Berat 100kg',
      kuantitas: 1,
      unit: 'Ekor'
    }
  ],
  pesan: 'apalah apalah',
  catatan: 'gatugatau',
  lampiran: [
    {
      nama: 'image.jpg',
      ukuran: '66.0 KB'
    }
  ]
};
