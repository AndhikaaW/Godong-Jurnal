"use client"
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import {
  ReturnPenjualanData,
  initialReturnData,
  dropdownOptions,
  hitungJumlahProduk,
  hitungSubtotal,
  hitungTotal,
  formatRupiah
} from '../../../../models/AddReturnPenjualanAllModel';

const AddReturnPenjualan: React.FC = () => {
  const [returnData, setReturnData] = useState<ReturnPenjualanData>(initialReturnData);

  const handleInputChange = (field: keyof ReturnPenjualanData, value: any) => {
    setReturnData(prev => ({ ...prev, [field]: value }));
  };

  const handleProdukChange = (index: number, field: string, value: any) => {
    const newProduk = [...returnData.produk];
    newProduk[index] = { ...newProduk[index], [field]: value };

    if (['qtyRetur', 'hargaSatuan', 'diskon', 'pajak'].includes(field)) {
      newProduk[index].jumlah = hitungJumlahProduk(newProduk[index]);
    }

    setReturnData(prev => ({ 
      ...prev, 
      produk: newProduk 
    }));
  };

  useEffect(() => {
    const subtotal = hitungSubtotal(returnData.produk);
    const total = hitungTotal(subtotal);
    setReturnData(prev => ({
      ...prev,
      subtotal,
      totalRetur: total
    }));
  }, [returnData.produk]);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Buat Retur Penjualan</h2>

      {/* Form Header */}
      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="namaPelanggan" className="block mb-1">Nama Pelanggan</label>
            <InputText
              id="namaPelanggan"
              value={returnData.namaPelanggan}
              onChange={(e) => handleInputChange('namaPelanggan', e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alamatPenagihan" className="block mb-1">Alamat Penagihan</label>
            <InputText
              id="alamatPenagihan"
              value={returnData.alamatPenagihan}
              onChange={(e) => handleInputChange('alamatPenagihan', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="email" className="block mb-1">Email</label>
            <InputText
              id="email"
              value={returnData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tanggalTransaksi" className="block mb-1">Tanggal Transaksi</label>
            <Calendar
              id="tanggalTransaksi"
              value={returnData.tanggalTransaksi}
              onChange={(e) => handleInputChange('tanggalTransaksi', e.value)}
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
      </div>

      {/* Form Middle */}
      <div className="grid">
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="tanggalRetur" className="block mb-1">Tanggal Retur</label>
            <Calendar
              id="tanggalRetur"
              value={returnData.tanggalRetur}
              onChange={(e) => handleInputChange('tanggalRetur', e.value)}
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="noRetur" className="block mb-1">No Retur</label>
            <InputText
              id="noRetur"
              value={returnData.noRetur}
              onChange={(e) => handleInputChange('noRetur', e.target.value)}
              className="w-full"
              disabled
            />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="tag" className="block mb-1">Tag</label>
            <Dropdown
              id="tag"
              value={returnData.tag}
              onChange={(e) => handleInputChange('tag', e.value)}
              options={dropdownOptions.tag}
              placeholder="Pilih Tag"
              className="w-full"
            />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="gudang" className="block mb-1">Gudang</label>
            <Dropdown
              id="gudang"
              value={returnData.gudang}
              onChange={(e) => handleInputChange('gudang', e.value)}
              options={dropdownOptions.gudang}
              placeholder="Pilih Gudang"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Tabel Produk */}
      <DataTable value={returnData.produk} className="mb-4">
        <Column 
          field="nama" 
          header="Produk"
          body={(rowData) => rowData.nama}
        />
        <Column 
          field="qtyFaktur" 
          header="Qty Faktur"
          body={(rowData) => rowData.qtyFaktur}
        />
        <Column 
          field="qtyRetur" 
          header="Qty Retur" 
          body={(rowData) => (
            <InputNumber
              value={rowData.qtyRetur}
              onChange={(e) => handleProdukChange(0, 'qtyRetur', e.value)}
              min={0}
              max={rowData.qtyFaktur}
            />
          )}
        />
        <Column 
          field="unit" 
          header="Unit"
          body={(rowData) => rowData.unit}
        />
        <Column 
          field="hargaSatuan" 
          header="Harga Satuan"
          body={(rowData) => formatRupiah(rowData.hargaSatuan)}
        />
        <Column 
          field="diskon" 
          header="Diskon"
          body={(rowData) => `${rowData.diskon}%`}
        />
        <Column 
          field="pajak" 
          header="Pajak"
          body={(rowData) => `${rowData.pajak}%`}
        />
        <Column 
          field="jumlah" 
          header="Jumlah"
          body={(rowData) => formatRupiah(rowData.jumlah)}
        />
      </DataTable>

      {/* Footer Form */}
      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="pesan" className="block mb-1">Pesan</label>
            <InputText
              id="pesan"
              value={returnData.pesan}
              onChange={(e) => handleInputChange('pesan', e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="catatan" className="block mb-1">Catatan</label>
            <InputText
              id="catatan"
              value={returnData.catatan}
              onChange={(e) => handleInputChange('catatan', e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lampiran" className="block mb-1">Lampiran</label>
            <FileUpload
              mode="basic"
              name="lampiran"
              url="./upload"
              accept="image/*"
              maxFileSize={1000000}
              chooseLabel="Pilih File"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="flex justify-content-between align-items-center mb-3">
            <span>Subtotal</span>
            <InputNumber
              value={returnData.subtotal}
              mode="currency"
              currency="IDR"
              locale="id-ID"
              readOnly
            />
          </div>
          <div className="flex justify-content-between align-items-center mb-3">
            <span>Total Retur</span>
            <InputNumber
              value={returnData.totalRetur}
              mode="currency"
              currency="IDR"
              locale="id-ID"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-content-end gap-2">
        <Button label="Batalkan" className="p-button-secondary" />
        <Button label="Simpan" className="p-button-success" />
      </div>
    </div>
  );
};

export default AddReturnPenjualan;
