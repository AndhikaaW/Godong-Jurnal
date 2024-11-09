"use client"
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';

import {
  DepositData,
  TransaksiDeposit,
  initialDepositData,
  sampleTransaksiData
} from '../../../../models/AddDepositModel';

const AddDeposit: React.FC = () => {
  const [depositData, setDepositData] = useState<DepositData>(initialDepositData);
  const [transaksiList] = useState<TransaksiDeposit[]>(sampleTransaksiData);

  const handleInputChange = (field: keyof DepositData, value: any) => {
    setDepositData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card p-3">
      <div className="flex justify-content-between align-items-center mb-4">
        <h1 className="text-xl font-bold m-0">Tambah Deposit</h1>
        <span className="text-right text-green-500 font-bold">
          Total
          <br />
          Rp 0.00
        </span>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="field mb-4">
            <label htmlFor="pelanggan" className="block font-bold mb-2">* Pelanggan</label>
            <Dropdown
              id="pelanggan"
              value={depositData.pelanggan}
              onChange={(e) => handleInputChange('pelanggan', e.value)}
              options={[]}
              placeholder="Pilih Pelanggan"
              className="w-full"
            />
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="field mb-4">
            <label htmlFor="setorKe" className="block font-bold mb-2">Setor Ke</label>
            <Dropdown
              id="setorKe"
              value={depositData.setorKe}
              onChange={(e) => handleInputChange('setorKe', e.value)}
              options={[]}
              placeholder="Setor Ke"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="field mb-4">
            <label htmlFor="caraPembayaran" className="block font-bold mb-2">Cara Pembayaran</label>
            <Dropdown
              id="caraPembayaran"
              value={depositData.caraPembayaran}
              onChange={(e) => handleInputChange('caraPembayaran', e.value)}
              options={[{ label: 'Kas Tunai', value: 'kas_tunai' }]}
              placeholder="Kas Tunai"
              className="w-full"
            />
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="field mb-4">
            <label htmlFor="tanggalPembayaran" className="block font-bold mb-2">Tanggal Pembayaran</label>
            <Calendar
              id="tanggalPembayaran"
              value={depositData.tanggalPembayaran}
              onChange={(e) => handleInputChange('tanggalPembayaran', e.value)}
              dateFormat="dd/mm/yy"
              className="w-full"
            />
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="field mb-4">
            <label htmlFor="tanggalJatuhTempo" className="block font-bold mb-2">Tanggal Jatuh Tempo</label>
            <Calendar
              id="tanggalJatuhTempo"
              value={depositData.tanggalJatuhTempo}
              onChange={(e) => handleInputChange('tanggalJatuhTempo', e.value)}
              dateFormat="dd/mm/yy"
              className="w-full"
            />
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="field mb-4">
            <label htmlFor="noTransaksi" className="block font-bold mb-2">No Transaksi</label>
            <InputText
              id="noTransaksi"
              value={depositData.noTransaksi}
              disabled
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid mb-4">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="field">
            <label htmlFor="tag" className="block font-bold mb-2">Tag</label>
            <Dropdown
              id="tag"
              value={depositData.tag}
              onChange={(e) => handleInputChange('tag', e.value)}
              options={[{ label: 'Custom', value: 'Custom' }]}
              placeholder="Custom"
              className="w-full"
            />
          </div>
        </div>
      </div>

      <DataTable value={transaksiList} className="mb-4">
        <Column field="nomor" header="Nomor" />
        <Column field="deskripsi" header="Deskripsi" body={(rowData) => (
          <InputText value={rowData.deskripsi} placeholder="Masukkan Keterangan" className="w-full" />
        )} />
        <Column field="tanggalTransaksi" header="Tanggal Transaksi" />
        <Column field="total" header="Total" body={(rowData) => (
          `Rp ${rowData.total.toLocaleString('id-ID')}`
        )} />
        <Column field="sisaTagihan" header="Sisa Tagihan" body={(rowData) => (
          `Rp ${rowData.sisaTagihan.toLocaleString('id-ID')}`
        )} />
        <Column field="tambahDeposit" header="Tambah Deposit" body={(rowData) => (
          `Rp ${rowData.tambahDeposit.toLocaleString('id-ID')}`
        )} />
      </DataTable>

      <div className="grid">
        <div className="col-12 md:col-6">
          <div className="field mb-4">
            <label htmlFor="catatan" className="block font-bold mb-2">Catatan</label>
            <InputTextarea
              id="catatan"
              value={depositData.catatan}
              onChange={(e) => handleInputChange('catatan', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>
        </div>
        <div className="col-12 md:col-6">
          <div className="text-right mb-4">
            <small className="block text-blue-500 cursor-pointer mb-2">
              Masukkan Jumlah Potongan ℹ
            </small>
            <div className="text-right">
              <span className="font-bold mr-4">Total</span>
              <span className="font-bold">Rp 1.000.000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-content-end">
        <Button label="Batal" className="p-button-text p-button-danger mr-2" />
        <Button label="Tambah DP" className="p-button-success" />
      </div>
    </div>
  );
};

export default AddDeposit;
