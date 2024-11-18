'use client'
import React from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { TerimaPembayaran, terimaPembayaranData } from '../../../../models/TerimaPembayaran';

const TerimaPembayaranPage: React.FC = () => {
  const pembayaranData: TerimaPembayaran = terimaPembayaranData;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Transaksi</h1>
      <h2 className="text-xl font-bold mb-2 flex align-items-center">
        Terima Pembayaran #{pembayaranData.nomorPembayaran}
        <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-md">{pembayaranData.status}</span>
      </h2>
      <Card className="mb-4">
        <h3 className="text-lg font-bold mb-3">Detail Pembayaran</h3>
        <div className="grid">
          <div className="col-6">
            <div className="flex justify-content-between mb-2">
              <span className="text-500">Pelanggan</span>
              <span className="text-blue-500">{pembayaranData.pelanggan}</span>
            </div>
            <div className="flex justify-content-between mb-2">
              <span className="text-500">Setor Ke</span>
              <span className="text-blue-500">{pembayaranData.setorKe} </span>
            </div>
          </div>
          <div className="col-6 text-right">
            <div className="text-500 mb-2">Jumlah</div>
            <div className="text-green-500 text-3xl font-bold">{formatRupiah(pembayaranData.jumlah)}</div>
            <a href="#" className="text-xs text-blue-500">Lihat Jurnal Entry</a>
          </div>
        </div>
        <Divider className="my-3" />
        <div className="grid " >
          <div className="col-4">
            <div className="flex flex-column">
              <span className="text-500">Cara Pembayaran</span>
              <span className="text-green-500">{pembayaranData.caraPembayaran}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="flex flex-column">
              <div className="flex justify-content-between">
                <span className="text-500">Tanggal Pembayaran</span>
                <span className="text-green-500">{pembayaranData.tanggalPembayaran}</span>
              </div>
              <div className="flex justify-content-between mt-2">
                <span className="text-500">Tanggal Jatuh Tempo</span>
                <span className="text-green-500">{pembayaranData.tanggalJatuhTempo}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="flex flex-column">
              <div className="flex justify-content-between">
                <span className="text-500">No Transaksi</span>
                <span className="text-green-500">{pembayaranData.noTransaksi}</span>
              </div>
              <div className="flex justify-content-between mt-2">
                <span className="text-500">Tag</span>
                <span className="text-green-500">{pembayaranData.tag}</span>
              </div>
            </div>
          </div>
        </div>
        <DataTable value={pembayaranData.detailPembayaran} className="mt-6">
          <Column field="no" header="No"></Column>
          <Column field="deskripsi" header="Deskripsi"></Column>
          <Column field="jumlah" header="Jumlah" body={(rowData) => formatRupiah(rowData.jumlah)}></Column>
        </DataTable>
        <div className="flex justify-content-between mt-4">
          <span className="font-bold">Total</span>
          <span className="font-bold">{formatRupiah(pembayaranData.jumlah)}</span>
        </div>
        <Divider />
        <div className="flex justify-content-end mt-4">
          <Button label="Hapus" className="p-button-danger mr-2" />
          <Button label="Ubah" className="p-button-secondary mr-2" />
          <Button label="Cetak dan Lihat" className="p-button-secondary mr-2" />
          <Button label="Atur Transaksi Berulang" className="p-button-success" />
        </div>
      </Card>
    </div>
  );
};

export default TerimaPembayaranPage;
