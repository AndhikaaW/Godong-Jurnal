'use client';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useRouter } from 'next/navigation';
import LoadingNavigator from '@/app/Components/LoadingNavigator';

const AddGudang: React.FC = () => {
    const [loadingDestination, setLoadingDestination] = useState<string | null>(null);
    const router = useRouter();
    const [namaGudang, setNamaGudang] = useState('');
    const [kodeGudang, setKodeGudang] = useState('');
    const [penanggungJawab, setPenanggungJawab] = useState(null);
    const [alamat, setAlamat] = useState('');
    const [keterangan, setKeterangan] = useState('');

    const penanggungJawabOptions = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 }
    ];
    const navigateTo = (path: string) => {
        setLoadingDestination(path);
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted');
    };
    if (loadingDestination) {
        return <LoadingNavigator destination={loadingDestination} />;
    }
    return (
        <div className="card">
            <h2 className="text-2xl font-bold mb-4">Tambah Gudang Baru</h2>

            <form onSubmit={handleSubmit} className="p-fluid">
                <Card>
                    <div className="field mb-4">
                        <label htmlFor="namaGudang" className="font-bold block mb-2">
                            Nama Gudang <span className="text-red-500">*</span>
                        </label>
                        <InputText id="namaGudang" value={namaGudang} onChange={(e) => setNamaGudang(e.target.value)} required maxLength={255} />
                        <small className="block text-right text-gray-500">{namaGudang.length}/255</small>
                    </div>

                    <div className="field mb-4">
                        <label htmlFor="kodeGudang" className="font-bold block mb-2">
                            Kode Gudang
                        </label>
                        <InputText id="kodeGudang" value={kodeGudang} onChange={(e) => setKodeGudang(e.target.value)} placeholder="Contoh: 1 - 10001" />
                    </div>

                    <div className="field mb-4">
                        <label htmlFor="penanggungJawab" className="font-bold block mb-2">
                            Penanggung Jawab Gudang (1/5)
                        </label>
                        <Dropdown id="penanggungJawab" value={penanggungJawab} options={penanggungJawabOptions} onChange={(e) => setPenanggungJawab(e.value)} placeholder="Pilih Penanggung Jawab" />
                        <small className="block text-gray-500 mt-1">Pengguna yang dipilih akan menerima email pengingat produk yang sudah mencapai batas minimum stok, juga batch yang akan atau sudah kadaluwarsa.</small>
                    </div>

                    <div className="field mb-4">
                        <label htmlFor="alamat" className="font-bold block mb-2">
                            Alamat
                        </label>
                        <InputTextarea id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} rows={3} />
                    </div>

                    <div className="field mb-4">
                        <label htmlFor="keterangan" className="font-bold block mb-2">
                            Keterangan
                        </label>
                        <InputTextarea id="keterangan" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} rows={3} />
                    </div>
                </Card>
                <div className="flex justify-content-end mt-3">
                    <Button label="Batalkan" type="button" className="p-button-text mr-2" style={{ width: '150px' }} onClick={() => navigateTo('/produk')} />
                    <Button label="Simpan" icon="pi pi-check" type="submit" style={{ width: '150px' }} />
                </div>
            </form>
        </div>
    );
};

export default AddGudang;
