'use client';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

export default function BuatFakturPembelian() {
    const [supplier, setSupplier] = useState(null);
    const [tanggalTransaksi, setTanggalTransaksi] = useState(null);
    const [tanggalJatuhTempo, setTanggalJatuhTempo] = useState(null);
    const [syaratPembayaran, setSyaratPembayaran] = useState(null);
    const [gudang, setGudang] = useState(null);
    const [tag, setTag] = useState(null);
    const [produk, setProduk] = useState(null);
    const [unit, setUnit] = useState(null);
    const [pajak, setPajak] = useState(null);

    const suppliers = [{ name: 'PBN', code: 'PBN' }];
    const syaratPembayaranOptions = [{ name: 'Net 30', code: 'NET30' }];
    const gudangOptions = [{ name: 'Pilih Gudang', code: 'GUDANG1' }];
    const tagOptions = [{ name: 'Pilih Tag', code: 'TAG1' }];
    const produkOptions = [{ name: 'HONDA VULTURY', code: 'HV001' }];
    const unitOptions = [{ name: 'Unit', code: 'UNIT' }];
    const pajakOptions = [{ name: 'PPN', code: 'PPN' }];

    return (
        <div className="card p-4">
            <h2 className="text-2xl font-bold mb-4">Buat Faktur Pembelian</h2>
            <div className="grid">
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="supplier" className="block mb-2">Supplier *</label>
                    <Dropdown id="supplier" value={supplier} options={suppliers} onChange={(e) => setSupplier(e.value)} optionLabel="name" placeholder="PBN" className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <InputText id="email" placeholder="Masukkan email" className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="noTransaksi" className="block mb-2">No Transaksi</label>
                    <InputText id="noTransaksi" className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="tanggalTransaksi" className="block mb-2">Tanggal Transaksi</label>
                    <Calendar id="tanggalTransaksi" value={tanggalTransaksi} onChange={(e) => setTanggalTransaksi(e.value)} showIcon className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="noReferensiSupplier" className="block mb-2">No Referensi Supplier</label>
                    <InputText id="noReferensiSupplier" placeholder="Masukkan No Referensi Supplier" className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="alamatPengiriman" className="block mb-2">Alamat pengiriman</label>
                    <InputTextarea id="alamatPengiriman" rows={5} className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="tanggalJatuhTempo" className="block mb-2">Tanggal Jatuh Tempo</label>
                    <Calendar id="tanggalJatuhTempo" value={tanggalJatuhTempo} onChange={(e) => setTanggalJatuhTempo(e.value)} showIcon className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="syaratPembayaran" className="block mb-2">Syarat Pembayaran</label>
                    <Dropdown id="syaratPembayaran" value={syaratPembayaran} options={syaratPembayaranOptions} onChange={(e) => setSyaratPembayaran(e.value)} optionLabel="name" placeholder="Pilih Syarat Pembayaran" className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="gudang" className="block mb-2">Gudang</label>
                    <Dropdown id="gudang" value={gudang} options={gudangOptions} onChange={(e) => setGudang(e.value)} optionLabel="name" placeholder="Pilih Gudang" className="w-full" />
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <label htmlFor="tag" className="block mb-2">Tag</label>
                    <Dropdown id="tag" value={tag} options={tagOptions} onChange={(e) => setTag(e.value)} optionLabel="name" placeholder="Pilih Tag" className="w-full" />
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Produk</h3>
                <div className="grid">
                    <div className="col-12 md:col-2">
                        <Dropdown value={produk} options={produkOptions} onChange={(e) => setProduk(e.value)} optionLabel="name" placeholder="Pilih Produk" className="w-full" />
                    </div>
                    <div className="col-12 md:col-3">
                        <InputText placeholder="Black, Diesel 2 GD, FTV 4 Cylinder in-line" className="w-full" />
                    </div>
                    <div className="col-12 md:col-1">
                        <InputNumber value={1} className="w-full" />
                    </div>
                    <div className="col-12 md:col-1">
                        <Dropdown value={unit} options={unitOptions} onChange={(e) => setUnit(e.value)} optionLabel="name" placeholder="Unit" className="w-full" />
                    </div>
                    <div className="col-12 md:col-2">
                        <InputNumber value={500000000} mode="currency" currency="IDR" locale="id-ID" className="w-full" />
                    </div>
                    <div className="col-12 md:col-1">
                        <Dropdown value={pajak} options={pajakOptions} onChange={(e) => setPajak(e.value)} optionLabel="name" placeholder="PPN" className="w-full" />
                    </div>
                    <div className="col-12 md:col-2">
                        <InputNumber value={555000000} mode="currency" currency="IDR" locale="id-ID" className="w-full" readOnly />
                    </div>
                </div>
            </div>

            <div className="mt-4 grid">
                <div className="col-12 md:col-6">
                    <label htmlFor="pesan" className="block mb-2">Pesan</label>
                    <InputTextarea id="pesan" rows={3} className="w-full" />
                    <label htmlFor="catatan" className="block mt-2 mb-2">Catatan</label>
                    <InputTextarea id="catatan" rows={3} className="w-full" />
                </div>
                <div className="col-12 md:col-6">
                    <div className="flex justify-content-between mb-2">
                        <span>Subtotal</span>
                        <span>Rp 500.000.000,00</span>
                    </div>
                    <div className="flex justify-content-between mb-2">
                        <span>PPN 11.0%</span>
                        <span>Rp 55.000.000</span>
                    </div>
                    <div className="flex justify-content-between mb-2">
                        <span className="font-bold">Total</span>
                        <span className="font-bold">Rp 555.000.000,00</span>
                    </div>
                    <div className="flex justify-content-between mb-2">
                        <span>Sisa Tagihan</span>
                        <span>Rp 555.000.000</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-content-end mt-4">
                <Button label="Batalkan" className="p-button-text mr-2" />
                <Button label="Simpan" className="p-button-success" />
            </div>
        </div>
    );
}
