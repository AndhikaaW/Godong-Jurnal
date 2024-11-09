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
  TerimaPembayaranData,
  ItemTagihan,
  initialTerimaPembayaranData,
  dropdownOptions,
  hitungTotal,
  formatRupiah,
} from '../../../../models/TerimaPembayaranModel';

const TerimaPembayaran: React.FC = () => {
  const [pembayaranData, setPembayaranData] = useState<TerimaPembayaranData>(initialTerimaPembayaranData);

  const handleInputChange = (field: keyof TerimaPembayaranData, value: any) => {
    setPembayaranData(prev => ({ ...prev, [field]: value }));
  };

  // Update total saat ada perubahan
  useEffect(() => {
    const total = hitungTotal(pembayaranData.subtotal, pembayaranData.potongan);
    setPembayaranData(prev => ({
      ...prev,
      total,
      sisaTagihan: total
    }));
  }, [pembayaranData.subtotal, pembayaranData.potongan]);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Terima Pembayaran</h2>

      {/* Header Form */}
      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="namaPelanggan" className="block mb-1">Nama Pelanggan</label>
            <Dropdown
              id="namaPelanggan"
              value={pembayaranData.namaPelanggan}
              onChange={(e) => handleInputChange('namaPelanggan', e.value)}
              options={dropdownOptions.pelanggan}
              placeholder="Pilih Pelanggan"
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="caraPembayaran" className="block mb-1">Cara Pembayaran</label>
            <Calendar
              id="caraPembayaran"
              value={pembayaranData.tanggalPembayaran}
              onChange={(e) => handleInputChange('tanggalPembayaran', e.value)}
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="setorKe" className="block mb-1">Setor Ke</label>
            <Dropdown
              id="setorKe"
              value={pembayaranData.setorKe}
              onChange={(e) => handleInputChange('setorKe', e.value)}
              options={dropdownOptions.setorKe}
              placeholder="Pilih Akun Pembayaran"
              className="w-full"
            />
          </div>
          <div className="text-right">
            <span className="text-xl">Total Jumlah</span>
            <div className="text-2xl text-green-500 font-bold">
              {formatRupiah(pembayaranData.total)}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Form */}
      <div className="grid">
        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="tanggalPembayaran" className="block mb-1">Tanggal Pembayaran</label>
            <Calendar
              id="tanggalPembayaran"
              value={pembayaranData.tanggalPembayaran}
              onChange={(e) => handleInputChange('tanggalPembayaran', e.value)}
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="noTransaksi" className="block mb-1">No Transaksi</label>
            <InputText
              id="noTransaksi"
              value={pembayaranData.noTransaksi}
              onChange={(e) => handleInputChange('noTransaksi', e.target.value)}
              placeholder="(Auto)"
              className="w-full"
              disabled
            />
          </div>
        </div>
        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="tag" className="block mb-1">Tag</label>
            <Dropdown
              id="tag"
              value={pembayaranData.tag}
              onChange={(e) => handleInputChange('tag', e.value)}
              options={dropdownOptions.tag}
              placeholder="Pilih Tag"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Tabel Tagihan */}
      <div className="mb-4">
        <DataTable value={pembayaranData.itemTagihan} className="p-datatable-sm">
          <Column field="no" header="No" />
          <Column field="deskripsi" header="Deskripsi" />
          <Column 
            field="tanggalJatuhTempo" 
            header="Tanggal Jatuh Tempo"
            body={(rowData) => rowData.tanggalJatuhTempo?.toLocaleDateString()}
          />
          <Column 
            field="total" 
            header="Total"
            body={(rowData) => formatRupiah(rowData.total)}
          />
          <Column 
            field="sisaTagihan" 
            header="Sisa Tagihan"
            body={(rowData) => formatRupiah(rowData.sisaTagihan)}
          />
          <Column 
            field="jumlah" 
            header="Jumlah"
            body={(rowData) => formatRupiah(rowData.jumlah)}
          />
        </DataTable>
      </div>

      {/* Footer Form */}
      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="catatan" className="block mb-1">Catatan</label>
            <InputText
              id="catatan"
              value={pembayaranData.catatan}
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
            <small className="block mt-1 text-gray-500">
              File yang dapat diunggah: PDF, JPG, PNG, ZIP, RAR (Maks 10.00 MB)
            </small>
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Subtotal</span>
            <InputNumber
              value={pembayaranData.subtotal}
              mode="currency"
              currency="IDR"
              locale="id-ID"
              readOnly
            />
          </div>
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Diskon 0%</span>
            <span>{formatRupiah(0)}</span>
          </div>
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Total</span>
            <div className="flex align-items-center gap-2">
              <span>Potongan</span>
              <InputNumber
                value={pembayaranData.potongan}
                onValueChange={(e) => handleInputChange('potongan', e.value)}
                mode="decimal"
                minFractionDigits={2}
                className="w-5rem"
              />
            </div>
            <InputNumber
              value={pembayaranData.total}
              mode="currency"
              currency="IDR"
              locale="id-ID"
              readOnly
            />
          </div>
          <div className="mb-3">
            <Dropdown
              value={pembayaranData.pilihAkun}
              onChange={(e) => handleInputChange('pilihAkun', e.value)}
              options={dropdownOptions.akun}
              placeholder="Pilih Akun"
              className="w-full"
            />
          </div>
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Sisa Tagihan</span>
            <InputNumber
              value={pembayaranData.sisaTagihan}
              mode="currency"
              currency="IDR"
              locale="id-ID"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-content-end gap-2 mt-4">
        <Button label="Batalkan" className="p-button-secondary" />
        <Button label="Buat" className="p-button-success" />
      </div>
    </div>
  );
};

export default TerimaPembayaran;