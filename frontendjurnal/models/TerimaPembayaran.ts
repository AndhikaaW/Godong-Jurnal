export interface DetailPembayaran {
  no: string;
  deskripsi: string;
  jumlah: number;
}

export interface TerimaPembayaran {
  nomorPembayaran: string;
  status: string;
  pelanggan: string;
  setorKe: string;
  jumlah: number;
  caraPembayaran: string;
  tanggalPembayaran: string;
  tanggalJatuhTempo: string;
  noTransaksi: string;
  tag: string;
  detailPembayaran: DetailPembayaran[];
}

export const terimaPembayaranData: TerimaPembayaran = {
  nomorPembayaran: '10002',
  status: 'Lunas',
  pelanggan: 'Ra',
  setorKe: 'Kas',
  jumlah: 180000,
  caraPembayaran: 'gtw',
  tanggalPembayaran: '03/09/2024',
  tanggalJatuhTempo: '12/09/2024',
  noTransaksi: '#10002',
  tag: '-',
  detailPembayaran: [
    {
      no: 'Sales Invoice #10004\nProForma Invoice #10001-ProForma-1',
      deskripsi: 'gimana gimana',
      jumlah: 180000
    }
  ]
};
