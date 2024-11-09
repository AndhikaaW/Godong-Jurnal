export interface PenagihanPenjualan {
  nomorPenagihan: string;
  pelanggan: string;
  email: string;
  alamatPenagihan: string;
  tanggalTransaksi: string;
  tanggalJatuhTempo: string;
  noTransaksi: string;
  noReferensi: string;
  syaratPembayaran: string;
  gudang: string;
  tag: string;
  produk: {
    nama: string;
    deskripsi: string;
    kuantitas: number;
    unit: string;
    hargaSatuan: number;
    diskon: number;
    pajak: string;
    jumlah: number;
  }[];
  pesan: string;
  catatan: string;
  lampiran: string;
  subtotal: number;
  total: number;
  sisaTagihan: number;
  pembayaran: {
    tanggal: string;
    no: string;
    pelanggan: string;
    tanggalJatuhTempo: string;
    status: string;
    jumlah: number;
  }[];
}

export const PenagihanPenjualan = {
  nomorPenagihan: '#10201',
  pelanggan: 'Tian',
  email: 'tian@gmail.com',
  alamatPenagihan: 'pct',
  tanggalTransaksi: '03/09/2024',
  tanggalJatuhTempo: '12/09/2024',
  noTransaksi: 'Sales Invoice #11211',
  noReferensi: '-',
  syaratPembayaran: '-',
  gudang: '-',
  tag: '-',
  produk: [
    {
      nama: 'Sapi',
      deskripsi: 'Berat 100kg',
      kuantitas: 1,
      unit: 'Ekor',
      hargaSatuan: 10000000,
      diskon: 0,
      pajak: 'PPN',
      jumlah: 10000000
    }
  ],
  pesan: 'apalah apalah',
  catatan: 'guranggaru',
  lampiran: 'image.jpg',
  subtotal: 10000000,
  total: 11100000,
  sisaTagihan: 11100000,
  pembayaran: [
    {
      tanggal: '03/09/2024',
      no: 'Sales Invoice #11211',
      pelanggan: 'Tian',
      tanggalJatuhTempo: '03/09/2024',
      status: 'Dibayar',
      jumlah: 11000000
    }
  ]
};
