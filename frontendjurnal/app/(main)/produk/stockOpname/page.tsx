"use client"
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import LoadingNavigator from '@/app/Components/LoadingNavigator';

export default function TransferGudang() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedGudangAsal, setSelectedGudangAsal] = useState(null);
  const [selectedGudangTujuan, setSelectedGudangTujuan] = useState(null);
  const [loadingDestination, setLoadingDestination] = useState<string | null>(null);

  const gudangOptions = [
    { label: 'Warehouse 1', value: 'warehouse1' },
    { label: 'Warehouse 2', value: 'warehouse2' },
  ];
  const navigateTo = (path: string) => {
    setLoadingDestination(path);
  };

  const products = [
    { name: 'Indomie Goreng', gudang: 'Warehouse 1', qtySebelum: '5 Karton', totalTransfer: 2, qtySesudah: '3 Karton' },
    { name: 'Mie Sedap Soto', gudang: 'Warehouse 1', qtySebelum: '5 Karton', totalTransfer: 3, qtySesudah: '2 Karton' },
    { name: 'Ultra Milk', gudang: 'Warehouse 1', qtySebelum: '10 Karton', totalTransfer: 5, qtySesudah: '5 Karton' },
  ];


  if (loadingDestination) {
    return <LoadingNavigator destination={loadingDestination} />;
}

  return (
    <div className="card p-4">
      <h1 className="text-3xl font-bold mb-4">Transfer Gudang</h1>
      
      <div className="grid">
        <div className="col-12 md:col-6 mb-4">
          <label htmlFor="noTransaksi" className="block mb-2">No. Transaksi *</label>
          <InputText id="noTransaksi" className="w-full" placeholder="Auto" />
        </div>
        <div className="col-12 md:col-6 mb-4">
          <label htmlFor="tanggal" className="block mb-2">Tanggal</label>
          <Calendar id="tanggal" value={selectedDate} onChange={(e) => setSelectedDate(e.value!!)} showIcon className="w-full" />
        </div>
        <div className="col-12 md:col-6 mb-4">
          <label htmlFor="gudangAsal" className="block mb-2">Gudang Asal</label>
          <Dropdown id="gudangAsal" options={gudangOptions} value={selectedGudangAsal} onChange={(e) => setSelectedGudangAsal(e.value)} placeholder="Pilih Gudang" className="w-full" />
        </div>
        <div className="col-12 md:col-6 mb-4">
          <label htmlFor="gudangTujuan" className="block mb-2">Gudang Tujuan</label>
          <Dropdown id="gudangTujuan" options={gudangOptions} value={selectedGudangTujuan} onChange={(e) => setSelectedGudangTujuan(e.value)} placeholder="Pilih Gudang" className="w-full" />
        </div>
        <div className="col-12 mb-4">
          <label htmlFor="catatan" className="block mb-2">Catatan</label>
          <InputTextarea id="catatan" rows={3} className="w-full" />
        </div>
      </div>

      <DataTable value={products} className="mb-4">
        <Column field="name" header="Nama Produk" />
        <Column field="gudang" header="Gudang" />
        <Column field="qtySebelum" header="Qty Sebelum" />
        <Column field="totalTransfer" header="Total Transfer" />
        <Column field="qtySesudah" header="Qty Sesudah" />
        <Column header="Aksi" body={() => <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" />} />
      </DataTable>

      <FileUpload mode="basic" chooseLabel="Lampiran" className="mb-4" />

      <div className="flex justify-content-end">
        <Button label="Batalkan" className="p-button-secondary mr-2" onClick={() => navigateTo('/produk')} />
        <Button label="Transfer" className="p-button-success" onClick={() => navigateTo('/produk')} />
      </div>
    </div>
  );
}