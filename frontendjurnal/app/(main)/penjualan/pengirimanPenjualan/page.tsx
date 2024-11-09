"use client"
import React from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { PengirimanPenjualan, pengirimanPenjualanData } from '@/models/PengirimanPenjualan';

const PengirimanPenjualanPage: React.FC = () => {
  const data: PengirimanPenjualan = pengirimanPenjualanData;

  return (
    <div className="p-4">
      <h1 className="text-sm text-green-600">Penjualan</h1>
      <h2 className="text-2xl font-bold mb-2 flex align-items-center mt-1">
        Pengiriman Penjualan #{data.nomorPengiriman}
        <span className="ml-2 text-sm bg-orange-500 text-white px-2 py-1 rounded-md">{data.status}</span>
      </h2>
      <Card className="mb-4">
        <h3 className="text-xl font-bold mb-3">Detail Pengiriman Penjualan</h3>
        <div className="grid">
          <div className="col-4 mb-3">
            <div className="flex justify-content-between">
              <span className="text-500">Pelanggan</span>
              <span className="text-blue-500">{data.pelanggan}</span>
            </div>
          </div>
          <div className="col-8 mb-3"></div>
          <div className="col-4 mb-3">
            <div className="flex justify-content-between">
              <span className="text-500">Email</span>
              <span className="text-green-500">{data.email}</span>
            </div>
          </div>
          <div className="col-8 mb-3 text-right">
            <a href="#" className="text-blue-500 text-sm">Lihat jurnal Entry</a>
          </div>
        </div>
        <Divider className="my-3" style={{border: '1px dotted #ccc'}} />
        <div className="grid">
          <div className="col-4">
            <div className="flex justify-content-between mb-2">
              <span className="text-500">Alamat Pengiriman</span>
              <span className="text-green-500">{data.alamatPengiriman}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="flex justify-content-between mb-2">
              <span className="text-500">Tanggal Pengiriman</span>
              <span className="text-green-500">{data.tanggalPengiriman}</span>
            </div>
            <div className="flex justify-content-between mb-2">
              <span className="text-500">Kirim Melalui</span>
              <span className="text-green-500">{data.kirimMelalui}</span>
            </div>
            <div className="flex justify-content-between mb-2">
              <span className="text-500">No Pelacakan</span>
              <span className="text-green-500">{data.noPelacakan}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="flex justify-content-between mb-2">
              <span className="text-500">No Transaksi</span>
              <span className="text-green-500">{data.noTransaksi}</span>
            </div>
            <div className="flex justify-content-between mb-2">
              <span className="text-500">No Referensi</span>
              <span className="text-green-500">{data.noReferensi}</span>
            </div>
            <div className="flex justify-content-between mb-2">
              <span className="text-500">No Pemesanan</span>
              <span className="text-blue-500">{data.noPemesanan}</span>
            </div>
            <div className="flex justify-content-between mb-2">
              <span className="text-500">Tag</span>
              <span className="text-green-500">{data.tag}</span>
            </div>
          </div>
        </div>
        <DataTable value={data.produk} className="mt-4">
          <Column field="nama" header="Produk"></Column>
          <Column field="deskripsi" header="Deskripsi"></Column>
          <Column field="kuantitas" header="Kuantitas"></Column>
          <Column field="unit" header="Unit"></Column>
        </DataTable>
        <div className="mt-4">
          <div className="mb-2">
            <span className="font-semibold mr-2">Pesan:</span>
            <span>{data.pesan}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold mr-2">Catatan:</span>
            <span>{data.catatan}</span>
          </div>
          <div>
            <span className="font-semibold">Lampiran ({data.lampiran.length}):</span>
            {data.lampiran.map((item, index) => (
              <div key={index} className="flex items-center mt-2">
                <i className="pi pi-file-pdf text-2xl mr-2"></i>
                <a href="#" className="text-blue-500 mr-2">{item.nama}</a>
                <span className="text-500">{item.ukuran}</span>
                <Button icon="pi pi-download" className="p-button-text p-button-rounded ml-2" />
              </div>
            ))}
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-content-end mt-4">
          <Button label="Hapus" className="p-button-danger mr-2" />
          <Button label="Ubah" className="p-button-secondary mr-2" />
          <Button label="Lihat Pengiriman" className="p-button-secondary mr-2" />
          <Button label="Cetak Surat Jalan" className="p-button-secondary mr-2" />
          <Button label="Buat Penagihan" className="p-button-success" />
        </div>
      </Card>
    </div>
  );
};

export default PengirimanPenjualanPage;
