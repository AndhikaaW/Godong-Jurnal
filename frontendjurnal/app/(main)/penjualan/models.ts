export interface PenjualanItem {
  tanggal: string;
  no: string;
  nama: string;
  tanggalJatuhTempo: string;
  status: string;
  sisaTagihan: string;
  total: string;
  tag: string;
}

export interface PengirimanItem {
  tanggal: string;
  no: string;
  nama: string;
  status: string;
  total: string;
  tag: string;
}

export interface PesananItem {
  tanggal: string;
  no: string;
  nama: string;
  tanggalKirim: string;
  status: string;
  total: string;
  tag: string;
}

export interface PenawaranItem {
  tanggal: string;
  no: string;
  nama: string;
  tanggalBerlaku: string;
  status: string;
  total: string;
  tag: string;
}
