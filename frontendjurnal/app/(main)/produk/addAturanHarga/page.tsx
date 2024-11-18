'use client';
import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import LoadingNavigator from '@/app/Components/LoadingNavigator';

export default function AddAturanHarga() {
    const [loadingDestination, setLoadingDestination] = useState<string | null>(null);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [jenisAturan, setJenisAturan] = useState(null);

    const [showKontakDialog, setShowKontakDialog] = useState(false);
    const [selectedKontaks, setSelectedKontaks] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tipeKontak, setTipeKontak] = useState('Individu');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const [showProdukDialog, setShowProdukDialog] = useState(false);
    const [selectedProduks, setSelectedProduks] = useState<any[]>([]);
    const [searchTermProduk, setSearchTermProduk] = useState('');
    const [tipeProduk, setTipeProduk] = useState('Single');
    const [searchResultsProduk, setSearchResultsProduk] = useState<any[]>([]);

    const navigateTo = (path: string) => {
        setLoadingDestination(path);
    };

    const dummyKontaks = [
        { id: 1, nama: 'Sukriyanto', tipe: 'Individu' },
        { id: 2, nama: 'Rahma', tipe: 'Individu' },
        { id: 3, nama: 'PT Maju Jaya', tipe: 'Perusahaan' },
        { id: 4, nama: 'Toko Sejahtera', tipe: 'Toko' },
        { id: 5, nama: 'TI', tipe: 'Individu' }
    ];

    const dummyProduks = [
        { id: 1, nama: 'Tian', tipe: 'Single' },
        { id: 2, nama: 'Beras', tipe: 'Single' },
        { id: 3, nama: 'Jasa Konsultasi', tipe: 'Jasa' },
        { id: 4, nama: 'Paket Hemat', tipe: 'Paket' },
        { id: 5, nama: 'Minyak Goreng', tipe: 'Single' }
    ];

    useEffect(() => {
        handleSearch();
        handleSearchProduk();
    }, [searchTerm, tipeKontak, searchTermProduk, tipeProduk, tipeProduk]);

    const handleSearchProduk = () => {
        const results = dummyProduks.filter((produk) => produk.nama.toLowerCase().includes(searchTermProduk.toLowerCase()) && produk.tipe === tipeProduk && !selectedProduks.some((selected) => selected.id === produk.id));
        setSearchResultsProduk(results);
    };

    const handleSelectProduk = (produk: any) => {
        setSelectedProduks([...selectedProduks, produk]);
        setSearchResultsProduk(searchResultsProduk.filter((result) => result.id !== produk.id));
    };

    const handleRemoveProduk = (produk: any) => {
        setSelectedProduks(selectedProduks.filter((selected) => selected.id !== produk.id));
        if (produk.nama.toLowerCase().includes(searchTermProduk.toLowerCase()) && produk.tipe === tipeProduk) {
            setSearchResultsProduk([...searchResultsProduk, produk]);
        }
    };

    const handleAddProduk = () => {
        setShowProdukDialog(false);
    };
    const produkDialogFooter = (
        <div>
            <Button label="Kembali" icon="pi pi-times" onClick={() => setShowProdukDialog(false)} className="p-button-text" />
            <Button label="Simpan" icon="pi pi-check" onClick={handleAddProduk} autoFocus />
        </div>
    );

    const handleSearch = () => {
        const results = dummyKontaks.filter((kontak) => kontak.nama.toLowerCase().includes(searchTerm.toLowerCase()) && kontak.tipe === tipeKontak && !selectedKontaks.some((selected) => selected.id === kontak.id));
        setSearchResults(results);
    };

    const handleSelectKontak = (kontak: any) => {
        setSelectedKontaks([...selectedKontaks, kontak]);
        setSearchResults(searchResults.filter((result) => result.id !== kontak.id));
    };

    const handleRemoveKontak = (kontak: any) => {
        setSelectedKontaks(selectedKontaks.filter((selected) => selected.id !== kontak.id));
        if (kontak.nama.toLowerCase().includes(searchTerm.toLowerCase()) && kontak.tipe === tipeKontak) {
            setSearchResults([...searchResults, kontak]);
        }
    };

    const handleAddKontak = () => {
        setShowKontakDialog(false);
    };

    const kontakDialogFooter = (
        <div>
            <Button label="Kembali" icon="pi pi-times" onClick={() => setShowKontakDialog(false)} className="p-button-text" />
            <Button label="Simpan" icon="pi pi-check" onClick={handleAddKontak} autoFocus />
        </div>
    );

    const jenisAturanOptions = [
        { label: 'Diskon persentase', value: 'diskon_persentase' },
        { label: 'Diskon nominal', value: 'diskon_nominal' },
        { label: 'Harga tetap', value: 'harga_tetap' }
    ];

    const emptyTableContent = (title: string) => (
        <div className="text-center p-4">
            <Image src="/path/to/empty-icon.png" alt="Empty" width="100" />
            <p className="mt-3">{`Belum ada ${title} yang dipilih`}</p>
            <p className="text-sm text-gray-500">{`Daftar ${title} mana saja yang terkait dengan rule ini akan muncul di sini.`}</p>
        </div>
    );

    if (loadingDestination) {
        return <LoadingNavigator destination={loadingDestination} />;
    }
    return (
        <div className="card p-4">
            <h2 className="text-2xl font-bold mb-4">Buat Aturan Harga</h2>

            <Card className="mb-4">
                <h3 className="text-xl font-semibold mb-3">1. Buat Aturan</h3>
                <p className="text-sm text-gray-600 mb-4">Atur price rule produk tertentu untuk kontak-kontak pilihan Anda, sesuai periode yang Anda inginkan. Silakan isi kolom-kolom di bawah ini.</p>
                <div className="formgrid grid">
                    <div className="field col-12 md:col-3">
                        <label htmlFor="namaAturan" className="block mb-2">
                            Nama aturan
                        </label>
                        <InputText id="namaAturan" className="w-full" />
                    </div>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="tanggalMulai" className="block mb-2">
                            Tanggal mulai
                        </label>
                        <Calendar id="tanggalMulai" value={startDate} onChange={(e) => setStartDate(e.value ?? null)} className="w-full" />
                    </div>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="tanggalBerakhir" className="block mb-2">
                            Tanggal berakhir
                        </label>
                        <Calendar id="tanggalBerakhir" value={endDate} onChange={(e) => setEndDate(e.value ?? null)} className="w-full" />
                    </div>
                    <div className="field col-12 md:col-3">
                        <label htmlFor="jenisAturan" className="block mb-2">
                            Jenis aturan
                        </label>
                        <Dropdown id="jenisAturan" options={jenisAturanOptions} value={jenisAturan} onChange={(e) => setJenisAturan(e.value)} className="w-full" />
                    </div>
                </div>
            </Card>

            <Card className="mb-4">
                <div className="flex justify-content-between align-items-center mb-3">
                    <h3 className="text-xl font-semibold">2. Pilih Kontak</h3>
                    <Button label="+ Tambah kontak" className="p-button-text p-button-success" onClick={() => setShowKontakDialog(true)} />
                </div>
                <p className="text-sm text-gray-600 mb-4">Tentukan siapa saja yang akan mendapat price rule sesuai periode.</p>
                <DataTable value={selectedKontaks} emptyMessage={emptyTableContent('kontak')}>
                    <Column field="nama" header="Nama/grup kontak" />
                    <Column field="tipe" header="Tipe kontak" />
                    <Column body={(rowData) => <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" onClick={() => handleRemoveKontak(rowData)} />} />
                </DataTable>
            </Card>

            <Card className="mb-4">
                <div className="flex justify-content-between align-items-center mb-3">
                    <h3 className="text-xl font-semibold">3. Pilih Produk</h3>
                    <Button label="+ Tambah produk atau jasa" className="p-button-text p-button-success" onClick={() => setShowProdukDialog(true)} />
                </div>
                <p className="text-sm text-gray-600 mb-4">Tentukan produk atau jasa apa saja yang akan terkena potongan harga price rule.</p>
                <DataTable value={selectedProduks} emptyMessage={emptyTableContent('produk')}>
                    <Column field="nama" header="Nama produk" />
                    <Column field="tipe" header="Tipe produk" />
                    <Column body={(rowData) => <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" onClick={() => handleRemoveProduk(rowData)} />} />
                </DataTable>
            </Card>

            <div className="flex justify-content-end">
                <Button label="Kembali" className="p-button-text mr-2" onClick={() => navigateTo('/produk')} />
                <Button label="Buat aturan" className="p-button-success" onClick={() => navigateTo('/produk')} />
            </div>

            <Dialog header="Pilih Kontak" visible={showKontakDialog} style={{ width: '60vw' }} footer={kontakDialogFooter} onHide={() => setShowKontakDialog(false)}>
                <div className="mb-3">
                    <label htmlFor="tipeKontak" className="block mb-2">
                        Pilih tipe kontak
                    </label>
                    <Dropdown
                        id="tipeKontak"
                        value={tipeKontak}
                        options={[
                            { label: 'Individu', value: 'Individu' },
                            { label: 'Perusahaan', value: 'Perusahaan' },
                            { label: 'Toko', value: 'Toko' }
                        ]}
                        onChange={(e) => setTipeKontak(e.value)}
                        className="w-full mb-3"
                    />

                    <div className="flex">
                        <InputText value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Cari kontak" className="w-full mr-2" />
                    </div>
                </div>

                <div className="grid">
                    <div className="col-6">
                        <h4>Hasil pencarian</h4>
                        <div style={{ height: '200px', overflowY: 'hidden', border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
                            {searchResults.length > 0 ? (
                                <ul className="list-none p-0 m-0">
                                    {searchResults.map((kontak) => (
                                        <li key={kontak.id} className="flex justify-content-between align-items-center mb-2">
                                            <span>{kontak.nama}</span>
                                            <Button icon="pi pi-plus" className="p-button-rounded p-button-text" onClick={() => handleSelectKontak(kontak)} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Tidak ada hasil pencarian</p>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <h4>Kontak dipilih</h4>
                        <div style={{ height: '200px', overflowY: 'hidden', border: '1px solid #ddd', borderRadius: '4px' }}>
                            {selectedKontaks.length > 0 ? (
                                <DataTable value={selectedKontaks} scrollable scrollHeight="200px">
                                    <Column field="nama" header="Nama individu/grup" />
                                    <Column field="tipe" header="Tipe kontak" />
                                    <Column body={(rowData) => <Button icon="pi pi-minus" className="p-button-rounded p-button-text p-button-danger" onClick={() => handleRemoveKontak(rowData)} />} />
                                </DataTable>
                            ) : (
                                <div className="p-3 text-center text-gray-500">Daftar kontak yang dipilih akan tampil disini</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <Checkbox
                        inputId="pilihSemua"
                        onChange={(e) => {
                            if (e.checked) {
                                const allKontaks = [...selectedKontaks, ...searchResults];
                                setSelectedKontaks(allKontaks);
                                setSearchResults([]);
                            } else {
                                setSearchResults([...searchResults, ...selectedKontaks]);
                                setSelectedKontaks([]);
                            }
                        }}
                        checked={selectedKontaks.length === selectedKontaks.length + searchResults.length}
                    />
                    <label htmlFor="pilihSemua" className="ml-2">
                        Pilih semua kontak
                    </label>
                </div>
            </Dialog>
            <Dialog header="Pilih Produk atau Jasa" visible={showProdukDialog} style={{ width: '60vw' }} footer={produkDialogFooter} onHide={() => setShowProdukDialog(false)}>
                <div className="mb-3">
                    <label htmlFor="tipeProduk" className="block mb-2">
                        Pilih tipe produk
                    </label>
                    <Dropdown
                        id="tipeProduk"
                        value={tipeProduk}
                        options={[
                            { label: 'Single', value: 'Single' },
                            { label: 'Paket', value: 'Paket' },
                            { label: 'Jasa', value: 'Jasa' }
                        ]}
                        onChange={(e) => setTipeProduk(e.value)}
                        className="w-full mb-3"
                    />

                    <div className="flex">
                        <InputText value={searchTermProduk} onChange={(e) => setSearchTermProduk(e.target.value)} placeholder="Cari produk" className="w-full mr-2" />
                        <Button label="Cari" onClick={handleSearchProduk} />
                    </div>
                </div>

                <div className="grid">
                    <div className="col-6">
                        <h4>Hasil pencarian</h4>
                        <div style={{ height: '200px', overflowY: 'hidden', border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
                            {searchResultsProduk.length > 0 ? (
                                <ul className="list-none p-0 m-0">
                                    {searchResultsProduk.map((produk) => (
                                        <li key={produk.id} className="flex justify-content-between align-items-center mb-2">
                                            <span>{produk.nama}</span>
                                            <Button icon="pi pi-plus" className="p-button-rounded p-button-text" onClick={() => handleSelectProduk(produk)} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Tidak ada hasil pencarian</p>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <h4>Produk dipilih</h4>
                        <div style={{ height: '200px', overflowY: 'hidden', border: '1px solid #ddd', borderRadius: '4px' }}>
                            {selectedProduks.length > 0 ? (
                                <DataTable value={selectedProduks} scrollable scrollHeight="200px">
                                    <Column field="nama" header="Nama produk" />
                                    <Column field="tipe" header="Tipe produk" />
                                    <Column body={(rowData) => <Button icon="pi pi-minus" className="p-button-rounded p-button-text p-button-danger" onClick={() => handleRemoveProduk(rowData)} />} />
                                </DataTable>
                            ) : (
                                <div className="p-3 text-center text-gray-500">Daftar produk yang dipilih akan tampil disini</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <Checkbox
                        inputId="pilihSemuaProduk"
                        onChange={(e) => {
                            if (e.checked) {
                                const allProduks = [...selectedProduks, ...searchResultsProduk];
                                setSelectedProduks(allProduks);
                                setSearchResultsProduk([]);
                            } else {
                                setSearchResultsProduk([...searchResultsProduk, ...selectedProduks]);
                                setSelectedProduks([]);
                            }
                        }}
                        checked={selectedProduks.length === selectedProduks.length + searchResultsProduk.length}
                    />
                    <label htmlFor="pilihSemuaProduk" className="ml-2">
                        Pilih semua produk
                    </label>
                </div>
            </Dialog>
        </div>
    );
}
