'use client';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import axios from 'axios';
import LoadingNavigator from '@/app/Components/LoadingNavigator';

interface FormData {
    nama: string;
    kode: string;
    barcode: string;
    unit: string;
    kategori: string;
    deskripsi: string;
    tipe: 'Single' | 'Bundle';
    harga_beli: number | null;
    akun_pembelian: string;
    pajak_beli: string;
    harga_jual: number | null;
    akun_penjualan: string;
    pajak_jual: string;
    batas_stok_minimum: number | null;
    akun_persediaan: string;
}

const ProductInput: React.FC = () => {
    const [loadingDestination, setLoadingDestination] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        nama: '',
        kode: '',
        barcode: '',
        unit: '',
        kategori: '',
        deskripsi: '',
        tipe: 'Single',
        harga_beli: null,
        akun_pembelian: '',
        pajak_beli: '',
        harga_jual: null,
        akun_penjualan: '',
        pajak_jual: '',
        batas_stok_minimum: null,
        akun_persediaan: ''
    });
    const [beliProduk, setBeliProduk] = useState(true);
    const [jualProduk, setJualProduk] = useState(true);
    const [monitorPersediaan, setMonitorPersediaan] = useState(true);

    const navigateTo = (path: string) => {
        setLoadingDestination(path);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DropdownChangeEvent | RadioButtonChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: InputNumberValueChangeEvent, fieldName: keyof FormData) => {
        setFormData((prev) => ({ ...prev, [fieldName]: e.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://192.168.1.38:8000/api/inputProduk', formData);
            console.log(response.data);
            // Handle success (e.g., show a success message)
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        }
    };
    if (loadingDestination) {
        return <LoadingNavigator destination={loadingDestination} />;
    }

    return (
        <div className="card p-4">
            <div className="text-xl mb-4">Tambah produk baru</div>
            <form onSubmit={handleSubmit}>
                <div className="grid">
                    <div className="col-12">
                        <div className="p-fluid">
                            <div className="grid">
                                <div className="col-6 ">
                                    <label htmlFor="nama">Nama produk *</label>
                                    <InputText id="nama" name="nama" value={formData.nama} onChange={handleChange} required />
                                </div>
                                <div className="col-6">
                                        <label htmlFor="gambar">Gambar produk</label>
                                        <Button id='gambar' type="button" icon="pi pi-image" label="Pilih gambar produk" className="p-button-outlined" />
                                </div>
                            </div>
                            <div className="formgrid grid">
                                <div className="field col-6">
                                    <label htmlFor="kode">Kode produk / SKU</label>
                                    <InputText id="kode" name="kode" value={formData.kode} onChange={handleChange} />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="barcode">Barcode</label>
                                    <InputText id="barcode" name="barcode" value={formData.barcode} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="formgrid grid">
                                <div className="field col-6">
                                    <label htmlFor="unit">Unit</label>
                                    <Dropdown id="unit" name="unit" value={formData.unit} options={[]} onChange={handleChange} placeholder="Pilih unit atau ketik untuk tambah baru" />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="kategori">Kategori produk</label>
                                    <Dropdown id="kategori" name="kategori" value={formData.kategori} options={[]} onChange={handleChange} placeholder="Pilih kategori atau ketik untuk tambah baru" />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="deskripsi">Deskripsi</label>
                                <InputTextarea id="deskripsi" name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows={5} autoResize />
                            </div>
                            <div className="field">
                                <label>Tipe produk</label>
                                <div className="flex">
                                    <div className="flex align-items-center mr-4">
                                        <RadioButton inputId="single" name="tipe" value="Single" onChange={handleChange} checked={formData.tipe === 'Single'} />
                                        <label htmlFor="single" className="ml-2">
                                            Single
                                        </label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="bundle" name="tipe" value="Bundle" onChange={handleChange} checked={formData.tipe === 'Bundle'} />
                                        <label htmlFor="bundle" className="ml-2">
                                            Bundle
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <TabView>
                    <TabPanel header="Harga & persediaan">
                        <div className="p-fluid">
                            <div className="field-checkbox">
                                <Checkbox inputId="beliProduk" onChange={(e: CheckboxChangeEvent) => setBeliProduk(e.checked ?? false)} checked={beliProduk} />
                                <label htmlFor="beliProduk" className="ml-2">
                                    Saya beli produk ini
                                </label>
                            </div>
                            {beliProduk && (
                                <div className="formgrid grid">
                                    <div className="field col-4">
                                        <label htmlFor="harga_beli">Harga beli satuan</label>
                                        <InputNumber id="harga_beli" value={formData.harga_beli} onValueChange={(e) => handleNumberChange(e, 'harga_beli')} mode="currency" currency="IDR" locale="id-ID" />
                                    </div>
                                    <div className="field col-4">
                                        <label htmlFor="akun_pembelian">Akun pembelian</label>
                                        <Dropdown id="akun_pembelian" name="akun_pembelian" value={formData.akun_pembelian} options={[]} onChange={handleChange} placeholder="(5-50000) - Beban Pokok Pendapatan" />
                                    </div>
                                    <div className="field col-4">
                                        <label htmlFor="pajak_beli">Pajak beli</label>
                                        <Dropdown id="pajak_beli" name="pajak_beli" value={formData.pajak_beli} options={[]} onChange={handleChange} placeholder="Pilih pajak" />
                                    </div>
                                </div>
                            )}
                            <div className="field-checkbox">
                                <Checkbox inputId="jualProduk" onChange={(e: CheckboxChangeEvent) => setJualProduk(e.checked ?? false)} checked={jualProduk} />
                                <label htmlFor="jualProduk" className="ml-2">
                                    Saya jual produk ini
                                </label>
                            </div>
                            {jualProduk && (
                                <div className="formgrid grid">
                                    <div className="field col-4">
                                        <label htmlFor="harga_jual">Harga jual satuan</label>
                                        <InputNumber id="harga_jual" value={formData.harga_jual} onValueChange={(e) => handleNumberChange(e, 'harga_jual')} mode="currency" currency="IDR" locale="id-ID" />
                                    </div>
                                    <div className="field col-4">
                                        <label htmlFor="akun_penjualan">Akun penjualan</label>
                                        <Dropdown id="akun_penjualan" name="akun_penjualan" value={formData.akun_penjualan} options={[]} onChange={handleChange} placeholder="(4-40000) - Pendapatan Jasa" />
                                    </div>
                                    <div className="field col-4">
                                        <label htmlFor="pajak_jual">Pajak jual</label>
                                        <Dropdown id="pajak_jual" name="pajak_jual" value={formData.pajak_jual} options={[]} onChange={handleChange} placeholder="Pilih pajak" />
                                    </div>
                                </div>
                            )}
                            <div className="field-checkbox">
                                <Checkbox inputId="monitorPersediaan" onChange={(e: CheckboxChangeEvent) => setMonitorPersediaan(e.checked ?? false)} checked={monitorPersediaan} />
                                <label htmlFor="monitorPersediaan" className="ml-2">
                                    Monitor persediaan barang
                                </label>
                            </div>
                            {monitorPersediaan && (
                                <div className="formgrid grid">
                                    <div className="field col-6">
                                        <label htmlFor="batas_stok_minimum">Batas stok minimum</label>
                                        <InputNumber id="batas_stok_minimum" value={formData.batas_stok_minimum} onValueChange={(e) => handleNumberChange(e, 'batas_stok_minimum')} />
                                    </div>
                                    <div className="field col-6">
                                        <label htmlFor="akun_persediaan">Akun persediaan barang default</label>
                                        <Dropdown id="akun_persediaan" name="akun_persediaan" value={formData.akun_persediaan} options={[]} onChange={handleChange} placeholder="(1-10200) - Persediaan Barang" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel header="Pengaturan bundle">{/* Add bundle settings here if needed */}</TabPanel>
                </TabView>

                <div className="flex justify-content-end mt-4">
                    <Button
                        label="Batalkan"
                        type="button"
                        className="p-button-text mr-2"
                        onClick={() => 
                            navigateTo('/produk')
                        }
                    />
                    <Button label="Simpan" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default ProductInput;
