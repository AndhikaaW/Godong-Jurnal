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
  PenawaranPenjualanData,
  ProdukPenawaran,
  initialPenawaranData,
  dropdownOptions,
  hitungJumlahProduk,
  hitungSubtotal,
  hitungTotal,
  formatRupiah,
} from '../../../../models/AddPenawaranPenjualanAllModel';

const AddPenawaranPenjualan: React.FC = () => {
  const [penawaranData, setPenawaranData] = useState<PenawaranPenjualanData>(initialPenawaranData);

  const handleInputChange = (field: keyof PenawaranPenjualanData, value: any) => {
    setPenawaranData(prev => ({ ...prev, [field]: value }));
  };

  const handleProdukChange = (index: number, field: string, value: any) => {
    const newProduk = [...penawaranData.produk];
    newProduk[index] = { ...newProduk[index], [field]: value };

    // Hitung ulang jumlah untuk produk yang diubah
    if (['kuantitas', 'hargaSatuan', 'diskon', 'pajak'].includes(field)) {
      newProduk[index].jumlah = hitungJumlahProduk(newProduk[index]);
    }

    // Jika mengubah nama produk dan ini adalah baris terakhir, tambah baris baru
    if (field === 'nama' && index === penawaranData.produk.length - 1) {
      newProduk.push({ 
        nama: '', 
        deskripsi: '', 
        kuantitas: 1, 
        unit: 'Buah', 
        hargaSatuan: 0, 
        diskon: 0, 
        pajak: 0, 
        jumlah: 0 
      });
    }

    setPenawaranData(prev => ({ 
      ...prev, 
      produk: newProduk 
    }));
  };

  const hapusProduk = (index: number) => {
    const newProduk = penawaranData.produk.filter((_, i) => i !== index);
    setPenawaranData(prev => ({ ...prev, produk: newProduk }));
  };

  // Update total saat produk berubah
  useEffect(() => {
    const subtotal = hitungSubtotal(penawaranData.produk);
    const total = hitungTotal(subtotal);
    setPenawaranData(prev => ({
      ...prev,
      subtotal,
      total
    }));
  }, [penawaranData.produk]);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Buat Penawaran Penjualan</h2>

      {/* Header Form */}
      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="namaPelanggan" className="block mb-1">Nama Pelanggan</label>
            <Dropdown
              id="namaPelanggan"
              value={penawaranData.namaPelanggan}
              onChange={(e) => handleInputChange('namaPelanggan', e.value)}
              options={[]} // Isi dengan data pelanggan
              placeholder="Pilih Pelanggan"
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alamatPenagihan" className="block mb-1">Alamat Penagihan</label>
            <InputText
              id="alamatPenagihan"
              value={penawaranData.alamatPenagihan}
              onChange={(e) => handleInputChange('alamatPenagihan', e.target.value)}
              placeholder="Contoh: Jl.Serayu Madiun"
              className="w-full"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="email" className="block mb-1">Email</label>
            <InputText
              id="email"
              value={penawaranData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter Email"
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tanggalTransaksi" className="block mb-1">Tanggal Transaksi</label>
            <Calendar
              id="tanggalTransaksi"
              value={penawaranData.tanggalTransaksi}
              onChange={(e) => handleInputChange('tanggalTransaksi', e.value)}
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
      </div>

      {/* Middle Form */}
      <div className="grid">
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="tanggalKadaluwarsa" className="block mb-1">Tanggal Kadaluwarsa</label>
            <Calendar
              id="tanggalKadaluwarsa"
              value={penawaranData.tanggalKadaluwarsa}
              onChange={(e) => handleInputChange('tanggalKadaluwarsa', e.value)}
              className="w-full"
              dateFormat="dd/mm/yy"
            />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="noTransaksi" className="block mb-1">No Transaksi</label>
            <InputText
              id="noTransaksi"
              value={penawaranData.noTransaksi}
              onChange={(e) => handleInputChange('noTransaksi', e.target.value)}
              placeholder="(Auto)"
              className="w-full"
              disabled
            />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="syaratPembayaran" className="block mb-1">Syarat Pembayaran</label>
            <Dropdown
              id="syaratPembayaran"
              value={penawaranData.syaratPembayaran}
              onChange={(e) => handleInputChange('syaratPembayaran', e.value)}
              options={dropdownOptions.syaratPembayaran}
              placeholder="Custom"
              className="w-full"
            />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="tag" className="block mb-1">Tag</label>
            <Dropdown
              id="tag"
              value={penawaranData.tag}
              onChange={(e) => handleInputChange('tag', e.value)}
              options={dropdownOptions.tag}
              placeholder="Pilih Tag"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Tabel Produk */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Produk</h3>
        <DataTable value={penawaranData.produk} responsiveLayout="scroll" className="p-datatable-sm">
          <Column
            field="nama"
            header="Produk"
            body={(rowData, { rowIndex }) => (
              <Dropdown
                options={dropdownOptions.produk}
                value={rowData.nama}
                onChange={(e) => handleProdukChange(rowIndex, 'nama', e.value)}
                placeholder="Pilih produk"
                className="w-full p-inputtext-sm"
              />
            )}
          />
          <Column
            field="deskripsi"
            header="Deskripsi"
            body={(rowData, { rowIndex }) => (
              rowData.nama && (
                <InputText
                  value={rowData.deskripsi}
                  onChange={(e) => handleProdukChange(rowIndex, 'deskripsi', e.target.value)}
                  placeholder="Masukkan Keterangan"
                  className="w-full p-inputtext-sm"
                />
              )
            )}
          />
          <Column
            field="kuantitas"
            header="Kuantitas"
            body={(rowData, { rowIndex }) => (
              rowData.nama && (
                <InputNumber
                  value={rowData.kuantitas}
                  onValueChange={(e) => handleProdukChange(rowIndex, 'kuantitas', e.value)}
                  className="w-full p-inputtext-sm"
                  min={1}
                />
              )
            )}
          />
          <Column
            field="unit"
            header="Unit"
            body={(rowData, { rowIndex }) => (
              rowData.nama && (
                <Dropdown
                  options={dropdownOptions.unit}
                  value={rowData.unit}
                  onChange={(e) => handleProdukChange(rowIndex, 'unit', e.value)}
                  className="w-full p-inputtext-sm"
                />
              )
            )}
          />
          <Column
            field="hargaSatuan"
            header="Harga Satuan"
            body={(rowData, { rowIndex }) => (
              rowData.nama && (
                <InputNumber
                  value={rowData.hargaSatuan}
                  onValueChange={(e) => handleProdukChange(rowIndex, 'hargaSatuan', e.value)}
                  mode="currency"
                  currency="IDR"
                  locale="id-ID"
                  className="w-full p-inputtext-sm"
                />
              )
            )}
          />
          <Column
            field="diskon"
            header="Diskon"
            body={(rowData, { rowIndex }) => (
              rowData.nama && (
                <InputNumber
                  value={rowData.diskon}
                  onValueChange={(e) => handleProdukChange(rowIndex, 'diskon', e.value)}
                  suffix="%"
                  className="w-full p-inputtext-sm"
                  min={0}
                  max={100}
                />
              )
            )}
          />
          <Column
            field="pajak"
            header="Pajak"
            body={(rowData, { rowIndex }) => (
              rowData.nama && (
                <Dropdown
                  options={dropdownOptions.pajak}
                  value={rowData.pajak}
                  onChange={(e) => handleProdukChange(rowIndex, 'pajak', e.value)}
                  placeholder="Pilih Pajak"
                  className="w-full p-inputtext-sm"
                />
              )
            )}
          />
          <Column
            field="jumlah"
            header="Jumlah"
            body={(rowData) => (
              rowData.nama && (
                <InputNumber
                  value={rowData.jumlah}
                  mode="currency"
                  currency="IDR"
                  locale="id-ID"
                  className="w-full p-inputtext-sm"
                  readOnly
                />
              )
            )}
          />
          <Column
            body={(rowData, { rowIndex }) => (
              rowData.nama && (
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger p-button-text"
                  onClick={() => hapusProduk(rowIndex)}
                />
              )
            )}
          />
        </DataTable>
      </div>

      {/* Footer Form */}
      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="pesan" className="block mb-1">Pesan</label>
            <InputText
              id="pesan"
              value={penawaranData.pesan}
              onChange={(e) => handleInputChange('pesan', e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="catatan" className="block mb-1">Catatan</label>
            <InputText
              id="catatan"
              value={penawaranData.catatan}
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
              value={penawaranData.subtotal}
              mode="currency"
              currency="IDR"
              locale="id-ID"
              readOnly
            />
          </div>
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Total</span>
            <InputNumber
              value={penawaranData.total}
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
        <Button label="Buat dan Bagikan" className="p-button-success" />
      </div>
    </div>
  );
};

export default AddPenawaranPenjualan; 