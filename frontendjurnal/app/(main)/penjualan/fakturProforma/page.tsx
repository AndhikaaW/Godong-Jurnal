"use client"
import React from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { fakturProformaData } from '@/models/FakturProforma';

const FakturProformaPage: React.FC = () => {
  // Fungsi untuk memformat angka ke format Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Faktur Proforma #{fakturProformaData.nomorFaktur}</h1>
      <div className="bg-green-500 h-2rem mb-3"></div>
      <Card className="mb-4">
        <h2 className="text-xl font-bold mb-4">Detail Pemesanan ProForma</h2>
        <div className="grid">
          <div className="col-6">
            <div className="grid">
              <div className="col-4 text-500">Pelanggan</div>
              <div className="col-8 text-blue-500">{fakturProformaData.pelanggan}</div>
              <div className="col-4 text-500">Email</div>
              <div className="col-8 text-blue-500">{fakturProformaData.email}</div>
            </div>
          </div>
          <div className="col-6 text-right">
            <div className="text-500 mb-2">Total Jumlah</div>
            <div className="text-green-500 text-3xl font-bold">{formatRupiah(fakturProformaData.total)}</div>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="grid">
          <div className="col-4 flex flex-column">
            <div className='flex justify-content-between'>
            <span className="text-500">Alamat Pengiriman</span>
            <span className="text-green-500">{fakturProformaData.alamatPengiriman}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="flex flex-column">
              <div className="flex justify-content-between">
                <span className="text-500">Tanggal Pengiriman</span>
                <span className="text-green-500">{fakturProformaData.tanggalPengiriman}</span>
              </div>
              <div className="flex justify-content-between mt-2">
                <span className="text-500">Kirim Melalui</span>
                <span className="text-green-500">{fakturProformaData.kirimMelalui}</span>
              </div>
              <div className="flex justify-content-between mt-2">
                <span className="text-500">Syarat Pembayaran</span>
                <span className="text-green-500">{fakturProformaData.syaratPembayaran}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="flex flex-column">
              <div className="flex justify-content-between">
                <span className="text-500">No Transaksi</span>
                <span className="text-green-500">{fakturProformaData.noTransaksi}</span>
              </div>
              <div className="flex justify-content-between mt-2">
                <span className="text-500">No Referensi</span>
                <span className="text-green-500">{fakturProformaData.noReferensi || '-'}</span>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <DataTable value={fakturProformaData.produk} className="mt-4">
          <Column field="nama" header="Produk" body={(rowData) => <span className="text-blue-500">{rowData.nama}</span>}></Column>
          <Column field="deskripsi" header="Deskripsi"></Column>
          <Column field="kuantitas" header="Kuantitas"></Column>
          <Column field="unit" header="Unit"></Column>
          <Column field="hargaSatuan" header="Harga Satuan" body={(rowData) => formatRupiah(rowData.hargaSatuan)}></Column>
          <Column field="diskon" header="Diskon" body={(rowData) => `${rowData.diskon}%`}></Column>
          <Column field="pajak" header="Pajak"></Column>
          <Column field="jumlah" header="Jumlah" body={(rowData) => formatRupiah(rowData.jumlah)}></Column>
        </DataTable>

        <Divider />

        <div className="grid mt-4">
          <div className="col-8">
            <div className="grid">
              <div className="col-12">Pesan: apalah apalah</div>
              <div className="col-12">Catatan: gatugatau</div>
              <div className="col-12">Lampiran: <a href="#" className="text-blue-500">image.jpg</a> 66.0 KB</div>
            </div>
          </div>
          <div className="col-4">
            <div className="grid">
              <div className="col-6 font-bold">Subtotal</div>
              <div className="col-6 text-right">{formatRupiah(fakturProformaData.subtotal)}</div>
              <div className="col-6 font-bold">Diskon 10%</div>
              <div className="col-6 text-right">{formatRupiah(fakturProformaData.diskon)}</div>
              <div className="col-6 font-bold">Total</div>
              <div className="col-6 text-right">{formatRupiah(fakturProformaData.total)}</div>
              <div className="col-6 font-bold">Sisa Tagihan</div>
              <div className="col-6 text-right">{formatRupiah(fakturProformaData.sisaTagihan)}</div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex justify-content-end mt-4">
          <Button label="Hapus" className="p-button-danger mr-2" />
          <Button label="Ubah" className="p-button-secondary mr-2" />
          <Button label="Cetak dan Lihat" className="p-button-secondary mr-2" />
          <Button label="Terima Pembayaran" className="p-button-success" />
        </div>
      </Card>
    </div>
  );
};

export default FakturProformaPage;
