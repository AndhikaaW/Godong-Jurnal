"use client"
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const AddPenagihanPenjualan: React.FC = () => {
  const [penagihanData, setPenagihanData] = useState({
    namaPelanggan: '',
    email: '',
    alamatPenagihan: '',
    tanggalTransaksi: null,
    tanggalJatuhTempo: null,
    noTransaksi: '',
    noReferensiPelanggan: '',
    syaratPembayaran: '',
    gudang: '',
    tag: '',
    produk: [{ nama: '', deskripsi: '', kuantitas: 1, unit: '', hargaSatuan: 0, diskon: 0, pajak: 0, jumlah: 0 }],
    pesan: '',
    catatan: '',
    subtotal: 0,
    diskon: 0,
    total: 0,
    pemotongan: 0,
    sisaTagihan: 0
  });

  const handleInputChange = (field: string, value: any) => {
    setPenagihanData(prev => ({ ...prev, [field]: value }));
  };

  const handleProdukChange = (index: number, field: string, value: any) => {
    const newProduk = [...penagihanData.produk];
    newProduk[index] = { ...newProduk[index], [field]: value };
    setPenagihanData(prev => ({ ...prev, produk: newProduk }));
  };

  const tambahBarisKosong = () => {
    setPenagihanData(prev => ({
      ...prev,
      produk: [...prev.produk, { nama: '', deskripsi: '', kuantitas: 1, unit: 'Buah', hargaSatuan: 0, diskon: 0, pajak: 0, jumlah: 0 }]
    }));
  };

  // Pastikan selalu ada satu baris kosong di akhir
  React.useEffect(() => {
    if (penagihanData.produk.length === 0 || penagihanData.produk[penagihanData.produk.length - 1].nama !== '') {
      tambahBarisKosong();
    }
  }, [penagihanData.produk]);

  const hapusProduk = (index: number) => {
    const newProduk = penagihanData.produk.filter((_, i) => i !== index);
    setPenagihanData(prev => ({ ...prev, produk: newProduk }));
  };

  const contohProduk = [
    { 
      label: 'Laptop Asus ROG', 
      value: 'laptop-asus-rog'
    },
    { 
      label: 'Smartphone Samsung Galaxy S21', 
      value: 'samsung-galaxy-s21'
    },
    { 
      label: 'Printer Epson L3150', 
      value: 'printer-epson-l3150'
    },
    { 
      label: 'Monitor LG 27 inch', 
      value: 'monitor-lg-27'
    },
    { 
      label: 'Keyboard Mechanical Logitech', 
      value: 'keyboard-logitech'
    }
  ];

  const contohUnit = [
    { label: 'Buah', value: 'Buah' },
    { label: 'Set', value: 'Set' },
    { label: 'Paket', value: 'Paket' }
  ];

  const contohPajak = [
    { label: 'PPN 11%', value: 11 },
    { label: 'PPh 23 (2%)', value: 2 },
    { label: 'Tidak kena pajak', value: 0 }
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Buat Penagihan Penjualan</h2>
      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="namaPelanggan" className="block mb-1">Nama Pelanggan</label>
            <Dropdown id="namaPelanggan" options={[]} value={penagihanData.namaPelanggan} onChange={(e) => handleInputChange('namaPelanggan', e.value)} placeholder="Pilih Pelanggan" className="w-full" />
          </div>
          <div className="mb-3">
            <label htmlFor="alamatPenagihan" className="block mb-1">Alamat Penagihan</label>
            <InputText id="alamatPenagihan" value={penagihanData.alamatPenagihan} onChange={(e) => handleInputChange('alamatPenagihan', e.target.value)} placeholder="Contoh: Jl.Serayu Madiun" className="w-full" />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="email" className="block mb-1">Email</label>
            <InputText id="email" value={penagihanData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Enter Email" className="w-full" />
          </div>
          <div className="mb-3">
            <label htmlFor="tanggalTransaksi" className="block mb-1">Tanggal Transaksi</label>
            <Calendar id="tanggalTransaksi" value={penagihanData.tanggalTransaksi} onChange={(e) => handleInputChange('tanggalTransaksi', e.value)} className="w-full" />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="tanggalJatuhTempo" className="block mb-1">Tanggal Jatuh Tempo</label>
            <Calendar id="tanggalJatuhTempo" value={penagihanData.tanggalJatuhTempo} onChange={(e) => handleInputChange('tanggalJatuhTempo', e.value)} className="w-full" />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="noTransaksi" className="block mb-1">No Transaksi</label>
            <InputText id="noTransaksi" value={penagihanData.noTransaksi} onChange={(e) => handleInputChange('noTransaksi', e.target.value)} placeholder="(Auto)" className="w-full" />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="tag" className="block mb-1">Tag</label>
            <Dropdown id="tag" options={[]} value={penagihanData.tag} onChange={(e) => handleInputChange('tag', e.value)} placeholder="Pilih Tag" className="w-full" />
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="noReferensiPelanggan" className="block mb-1">No Referensi Pelanggan</label>
            <InputText id="noReferensiPelanggan" value={penagihanData.noReferensiPelanggan} onChange={(e) => handleInputChange('noReferensiPelanggan', e.target.value)} className="w-full" />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="syaratPembayaran" className="block mb-1">Syarat Pembayaran</label>
            <Dropdown id="syaratPembayaran" options={[]} value={penagihanData.syaratPembayaran} onChange={(e) => handleInputChange('syaratPembayaran', e.value)} placeholder="Custom" className="w-full" />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="gudang" className="block mb-1">Gudang</label>
            <Dropdown id="gudang" options={[]} value={penagihanData.gudang} onChange={(e) => handleInputChange('gudang', e.value)} placeholder="Pilih Gudang" className="w-full" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Produk</h3>
        <DataTable value={penagihanData.produk} responsiveLayout="scroll" className="p-datatable-sm">
          <Column field="nama" header="Produk" body={(rowData, { rowIndex }) => (
            <Dropdown 
              options={contohProduk} 
              value={rowData.nama} 
              onChange={(e) => handleProdukChange(rowIndex, 'nama', e.value)} 
              placeholder="Pilih produk" 
              className="w-full p-inputtext-sm"
            />
          )} />
          <Column field="deskripsi" header="Deskripsi" body={(rowData, { rowIndex }) => (
            rowData.nama && (
              <InputText 
                value={rowData.deskripsi} 
                onChange={(e) => handleProdukChange(rowIndex, 'deskripsi', e.target.value)} 
                placeholder="Keterangan" 
                className="w-full p-inputtext-sm"
              />
            )
          )} />
          <Column field="kuantitas" header="Kuantitas" body={(rowData, { rowIndex }) => (
            rowData.nama && (
              <InputNumber 
                value={rowData.kuantitas} 
                onValueChange={(e) => handleProdukChange(rowIndex, 'kuantitas', e.value)} 
                className="w-full p-inputtext-sm"
              />
            )
          )} />
          <Column field="unit" header="Unit" body={(rowData, { rowIndex }) => (
            rowData.nama && (
              <Dropdown 
                options={contohUnit} 
                value={rowData.unit} 
                onChange={(e) => handleProdukChange(rowIndex, 'unit', e.value)} 
                className="w-full p-inputtext-sm"
              />
            )
          )} />
          <Column field="hargaSatuan" header="Harga satuan" body={(rowData, { rowIndex }) => (
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
          )} />
          <Column field="diskon" header="Diskon" body={(rowData, { rowIndex }) => (
            rowData.nama && (
              <InputNumber 
                value={rowData.diskon} 
                onValueChange={(e) => handleProdukChange(rowIndex, 'diskon', e.value)} 
                suffix="%" 
                className="w-full p-inputtext-sm"
              />
            )
          )} />
          <Column field="pajak" header="Pajak" body={(rowData, { rowIndex }) => (
            rowData.nama && (
              <Dropdown 
                options={contohPajak} 
                value={rowData.pajak} 
                onChange={(e) => handleProdukChange(rowIndex, 'pajak', e.value)} 
                placeholder="Pilih Pajak" 
                className="w-full p-inputtext-sm"
              />
            )
          )} />
          <Column field="jumlah" header="Jumlah" body={(rowData) => (
            rowData.nama && (
              <InputNumber 
                value={rowData.jumlah} 
                readOnly 
                mode="currency" 
                currency="IDR" 
                locale="id-ID" 
                className="w-full p-inputtext-sm"
              />
            )
          )} />
        </DataTable>
      </div>

      <div className="grid">
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="pesan" className="block mb-1">Pesan</label>
            <InputText id="pesan" value={penagihanData.pesan} onChange={(e) => handleInputChange('pesan', e.target.value)} className="w-full" />
          </div>
          <div className="mb-3">
            <label htmlFor="catatan" className="block mb-1">Catatan</label>
            <InputText id="catatan" value={penagihanData.catatan} onChange={(e) => handleInputChange('catatan', e.target.value)} className="w-full" />
          </div>
          <div className="mb-3">
            <label htmlFor="lampiran" className="block mb-1">Lampiran</label>
            <FileUpload mode="basic" name="lampiran" url="./upload" accept="image/*" maxFileSize={1000000} />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Subtotal</span>
            <InputNumber value={penagihanData.subtotal} readOnly mode="currency" currency="IDR" locale="id-ID" />
          </div>
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Diskon</span>
            <InputNumber value={penagihanData.diskon} onValueChange={(e) => handleInputChange('diskon', e.value)} mode="currency" currency="IDR" locale="id-ID" />
          </div>
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Total</span>
            <InputNumber value={penagihanData.total} readOnly mode="currency" currency="IDR" locale="id-ID" />
          </div>
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Pemotongan</span>
            <InputNumber value={penagihanData.pemotongan} onValueChange={(e) => handleInputChange('pemotongan', e.value)} mode="currency" currency="IDR" locale="id-ID" />
          </div>
          <div className="mb-3 flex justify-content-between align-items-center">
            <span>Sisa Tagihan</span>
            <InputNumber value={penagihanData.sisaTagihan} readOnly mode="currency" currency="IDR" locale="id-ID" />
          </div>
        </div>
      </div>

      <div className="flex justify-content-end mt-4">
        <Button label="Batalkan" className="p-button-secondary mr-2" />
        <Button label="Buat" className="p-button-success" />
        <Button label="Buat dan Bagikan" className="p-button-success ml-2" />
      </div>
    </div>
  );
};

export default AddPenagihanPenjualan;
