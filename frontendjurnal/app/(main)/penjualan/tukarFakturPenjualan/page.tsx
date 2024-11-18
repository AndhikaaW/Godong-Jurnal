"use client"
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const TukarFakturPenjualan: React.FC = () => {
  const [formData, setFormData] = useState({
    namaPelanggan: '',
    email: '',
    alamatPenagihan: '',
    tanggalTransaksi: null,
    tanggalJatuhTempo: null,
    noTransaksi: '',
    syaratPembayaran: '',
    hargaTermasukPajak: false,
    pesan: '',
    catatan: '',
  });

  const [penagihanData, setPenagihanData] = useState([
    { 
      nomorInvoice: '',
      deskripsi: '',
      tanggalJatuhTempo: '',
      status: '',
      jumlahTagihan: 0,
      sisaTagihan: 0
    }
  ]);

  const contohFaktur = [
    { label: 'Faktur #001', value: 'Faktur #001' },
    { label: 'Faktur #002', value: 'Faktur #002' },
    { label: 'Faktur #003', value: 'Faktur #003' },
  ];

  const handleFakturChange = (index: number, field: string, value: any) => {
    const newPenagihanData = [...penagihanData];
    newPenagihanData[index] = { ...newPenagihanData[index], [field]: value };
    setPenagihanData(newPenagihanData);
  };

  const tambahBarisKosong = () => {
    setPenagihanData([...penagihanData, {
      nomorInvoice: '',
      deskripsi: '',
      tanggalJatuhTempo: '',
      status: '',
      jumlahTagihan: 0,
      sisaTagihan: 0
    }]);
  };

  useEffect(() => {
    if (penagihanData.length === 0 || penagihanData[penagihanData.length - 1].nomorInvoice !== '') {
      tambahBarisKosong();
    }
  }, [penagihanData]);

  const hapusFaktur = (index: number) => {
    const newPenagihanData = penagihanData.filter((_, i) => i !== index);
    setPenagihanData(newPenagihanData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="p-4">
      <h1 className="text-sm text-green-600">Penjualan</h1>
      <h2 className="text-2xl font-bold mb-4">Tukar Faktur Penjualan</h2>
      
      <Card className="mb-4">
        <div className="grid">
          <div className="col-12 md:col-6 mb-4">
            <label className="block mb-2">Nama Pelanggan</label>
            <Dropdown 
              value={formData.namaPelanggan} 
              options={[]} 
              onChange={(e) => handleInputChange('namaPelanggan', e.value)} 
              placeholder="Pilih Pelanggan"
              className="w-full"
            />
          </div>
          <div className="col-12 md:col-6 mb-4">
            <label className="block mb-2">Email</label>
            <InputText 
              value={formData.email} 
              onChange={(e) => handleInputChange('email', e.target.value)} 
              placeholder="Enter Email"
              className="w-full"
            />
          </div>
          <div className="col-12 md:col-6 mb-4">
            <label className="block mb-2">Alamat Penagihan</label>
            <InputText 
              value={formData.alamatPenagihan} 
              onChange={(e) => handleInputChange('alamatPenagihan', e.target.value)} 
              placeholder="Contoh: Jl.Serayu Madiun"
              className="w-full"
            />
          </div>
          <div className="col-12 md:col-3 mb-4">
            <label className="block mb-2">Tanggal Transaksi</label>
            <Calendar 
              value={formData.tanggalTransaksi} 
              onChange={(e) => handleInputChange('tanggalTransaksi', e.value)} 
              dateFormat="dd/mm/yy"
              className="w-full"
            />
          </div>
          <div className="col-12 md:col-3 mb-4">
            <label className="block mb-2">No Transaksi</label>
            <InputText 
              value={formData.noTransaksi} 
              onChange={(e) => handleInputChange('noTransaksi', e.target.value)} 
              placeholder="[Auto]"
              className="w-full"
            />
          </div>
          <div className="col-12 md:col-3 mb-4">
            <label className="block mb-2">Tanggal Jatuh Tempo</label>
            <Calendar 
              value={formData.tanggalJatuhTempo} 
              onChange={(e) => handleInputChange('tanggalJatuhTempo', e.value)} 
              dateFormat="dd/mm/yy"
              className="w-full"
            />
          </div>
          <div className="col-12 md:col-3 mb-4">
            <label className="block mb-2">Syarat Pembayaran</label>
            <Dropdown 
              value={formData.syaratPembayaran} 
              options={[{ label: 'Custom', value: 'Custom' }]} 
              onChange={(e) => handleInputChange('syaratPembayaran', e.value)} 
              placeholder="Custom"
              className="w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <Checkbox 
            checked={formData.hargaTermasukPajak} 
            onChange={(e) => handleInputChange('hargaTermasukPajak', e.checked)} 
          />
          <label className="ml-2">Harga Termasuk Pajak</label>
        </div>

        <DataTable value={penagihanData} className="mb-4">
          <Column field="nomorInvoice" header="Penagihan Penjualan" body={(rowData, { rowIndex }) => (
            <Dropdown 
              options={contohFaktur} 
              value={rowData.nomorInvoice} 
              onChange={(e) => handleFakturChange(rowIndex, 'nomorInvoice', e.value)} 
              placeholder="Pilih faktur" 
              className="w-full"
            />
          )} />
          <Column field="deskripsi" header="Deskripsi" body={(rowData, { rowIndex }) => (
            rowData.nomorInvoice && (
              <InputText 
                value={rowData.deskripsi} 
                onChange={(e) => handleFakturChange(rowIndex, 'deskripsi', e.target.value)} 
                placeholder="Masukkan Keterangan" 
                className="w-full" 
              />
            )
          )} />
          <Column field="tanggalJatuhTempo" header="Tgl Jatuh Tempo" body={(rowData, { rowIndex }) => (
            rowData.nomorInvoice && (
              <Calendar 
                value={rowData.tanggalJatuhTempo} 
                onChange={(e) => handleFakturChange(rowIndex, 'tanggalJatuhTempo', e.value)} 
                dateFormat="dd/mm/yy"
                className="w-full"
              />
            )
          )} />
          <Column field="status" header="Status" body={(rowData) => (
            rowData.nomorInvoice && (
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md">{rowData.status || 'Open'}</span>
            )
          )} />
          <Column field="jumlahTagihan" header="Jumlah Tagihan" body={(rowData, { rowIndex }) => (
            rowData.nomorInvoice && (
              <InputText 
                value={`Rp ${rowData.jumlahTagihan.toFixed(2)}`} 
                onChange={(e) => handleFakturChange(rowIndex, 'jumlahTagihan', parseFloat(e.target.value.replace('Rp ', '')))} 
                className="w-full" 
              />
            )
          )} />
          <Column field="sisaTagihan" header="Sisa Tagihan" body={(rowData, { rowIndex }) => (
            rowData.nomorInvoice && (
              <InputText 
                value={`Rp ${rowData.sisaTagihan.toFixed(2)}`} 
                onChange={(e) => handleFakturChange(rowIndex, 'sisaTagihan', parseFloat(e.target.value.replace('Rp ', '')))} 
                className="w-full" 
              />
            )
          )} />
          <Column header="Aksi" body={(_, { rowIndex }) => (
            <Button icon="pi pi-trash" className="p-button-danger p-button-text" onClick={() => hapusFaktur(rowIndex)} />
          )} />
        </DataTable>

        <Divider className="my-4" />

        <div className="grid">
          <div className="col-12 md:col-6 mb-4">
            <label className="block mb-2">Pesan</label>
            <InputText 
              value={formData.pesan}
              onChange={(e) => handleInputChange('pesan', e.target.value)}
              placeholder="Pesan" 
              className="w-full" 
            />
          </div>
          <div className="col-12 md:col-6 mb-4">
            <label className="block mb-2">Catatan</label>
            <InputText 
              value={formData.catatan}
              onChange={(e) => handleInputChange('catatan', e.target.value)}
              placeholder="Catatan" 
              className="w-full" 
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Lampiran</label>
          <FileUpload mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} chooseLabel="Choose" />
          <small className="block mt-1 text-gray-500">File dalam format Excel, Word, PDF, JPG, PNG, atau ZIP (maksimum 5 file dan 10 MB per file)</small>
        </div>

        <Divider className="my-4" />

        <div className="flex justify-content-between align-items-center">
          <span className="text-xl font-bold">Sisa Tagihan: Rp 0,00</span>
          <div>
            <Button label="Batalkan" className="p-button-danger mr-2" />
            <Button label="Simpan" className="p-button-success" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TukarFakturPenjualan;
