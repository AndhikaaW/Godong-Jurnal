import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export default function TambahGudangBaru() {
  return (
    <div className="card p-4">
      <h1 className="text-3xl font-bold mb-4">Gudang</h1>
      <h2 className="text-2xl font-semibold mb-4">Tambah Gudang Baru</h2>
      
      <div className="formgrid grid">
        <div className="field col-12 md:col-6">
          <label htmlFor="namaGudang" className="block mb-2">Nama Gudang *</label>
          <InputText id="namaGudang" className="w-full" maxLength={255} />
          <small className="block mt-1 text-right text-color-secondary">0/255</small>
        </div>
        
        <div className="field col-12 md:col-6">
          <label htmlFor="kodeGudang" className="block mb-2">Kode Gudang</label>
          <InputText id="kodeGudang" className="w-full" placeholder="Contoh: 1 - 10001" />
        </div>
        
        <div className="field col-12">
          <label htmlFor="penanggungJawab" className="block mb-2">Penanggung Jawab Gudang (1/5)</label>
          <Dropdown id="penanggungJawab" className="w-full" placeholder="Pilih Penanggung Jawab" />
          <small className="block mt-1 text-color-secondary">Pengguna yang dipilih akan menerima email pengingat produk yang sudah mencapai batas minimum stok, juga batch yang akan atau sudah kadaluwarsa.</small>
        </div>
        
        <div className="field col-12">
          <label htmlFor="alamat" className="block mb-2">Alamat</label>
          <InputTextarea id="alamat" rows={3} className="w-full" />
        </div>
        
        <div className="field col-12">
          <label htmlFor="keterangan" className="block mb-2">Keterangan</label>
          <InputTextarea id="keterangan" rows={3} className="w-full" />np
        </div>
      </div>
      
      <div className="flex justify-content-end mt-4">
        <Button label="Batalkan" className="p-button-text mr-2" />
        <Button label="Simpan" icon="pi pi-check" />
      </div>
    </div>
  );
}
