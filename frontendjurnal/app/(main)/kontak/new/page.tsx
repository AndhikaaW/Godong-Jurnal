'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { apiEndpoints } from '../../../api/api';
import { FileText, Landmark, Map } from 'lucide-react';
import { MultiSelect } from 'primereact/multiselect';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';

interface ContactType {
    id: number;
    kode: string;
    nama: string;
}

interface GrupKontak {
    id: number;
    kode: string;
    nama: string;
}

interface SebutanKontak {
    id: number;
    kode: string;
    name: string;
}

interface IdentitasKontak {
    id: number;
    kode: string;
    name: string;
}

interface Bank {
    id: number;
    kode: string;
    nama_bank: string;
}

interface BankAccount {
    namaBank: Bank | null;
    cabangBank: string;
    pemegangAkunBank: string;
    nomorRekening: string;
}

const AddKontak: React.FC = () => {
    const [displayName, setDisplayName] = useState<string>('');
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [contactTypes, setContactTypes] = useState<ContactType[]>([]);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [grupKontaks, setGrupKontaks] = useState<GrupKontak[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<ContactType[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<GrupKontak[]>([]);
    const [sebutanKontaks, setSebutanKontaks] = useState<SebutanKontak[]>([]);
    const [selectedSebutan, setSelectedSebutan] = useState<SebutanKontak | null>(null);
    const [identitasKontaks, setIdentitasKontaks] = useState<IdentitasKontak[]>([]);
    const [selectedIdentitas, setSelectedIdentitas] = useState<IdentitasKontak | null>(null);
    const [namaAwal, setNamaAwal] = useState<string>('');
    const [namaTengah, setNamaTengah] = useState<string>('');
    const [namaAkhir, setNamaAkhir] = useState<string>('');
    const [nomorIdentitas, setNomorIdentitas] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [namaPerusahaan, setNamaPerusahaan] = useState<string>('');
    const [noHandphone, setNoHandphone] = useState<string>('');
    const [noTelepon, setNoTelepon] = useState<string>('');
    const [fax, setFax] = useState<string>('');
    const [npwp, setNpwp] = useState<string>('');
    const [alamatPenagihan, setAlamatPenagihan] = useState<string>('');
    const [showDetailedAddress, setShowDetailedAddress] = useState<boolean>(false);
    const [no, setNo] = useState<string>('');
    const [rt, setRt] = useState<string>('');
    const [rw, setRw] = useState<string>('');
    const [kodePos, setKodePos] = useState<string>('');
    const [kelurahan, setKelurahan] = useState<string>('');
    const [kecamatan, setKecamatan] = useState<string>('');
    const [kabupaten, setKabupaten] = useState<string>('');
    const [provinsi, setProvinsi] = useState<string>('');
    const [alamatPengiriman, setAlamatPengiriman] = useState<string>('');
    const [infoLainnya, setInfoLainnya]= useState<string>('')
    const [samaAlamatPenagihan, setSamaAlamatPenagihan] = useState<boolean>(false);
    const [akuns, setAkuns] = useState<{ id: number; kode: number; nama: string }[]>([]);
    const [selectedAkunPiutang, setSelectedAkunPiutang] = useState<{ id: number; kode: number; nama: string } | null>(null);
    const [enableMaxDebt, setEnableMaxDebt] = useState<boolean>(false);
    const [maxDebt, setMaxDebt] = useState<number | null>(null);
    const [selectedAkunHutang, setSelectedAkunHutang] = useState<{ id: number; kode: number; nama: string } | null>(null);
    const [selectedSyaratPembayaran, setSelectedSyaratPembayaran] = useState<string | null>(null);

    const [banks, setBanks] = useState<Bank[]>([]);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([{ namaBank: null, cabangBank: '', pemegangAkunBank: '', nomorRekening: '' }]);

    const checkFormValidity = useCallback(() => {
        const requiredFields = [
            displayName,
            selectedTypes.length > 0,
            selectedGroups.length > 0,
            namaAwal,
            email,
            noHandphone,
            alamatPenagihan,
            alamatPengiriman,
            selectedAkunPiutang,
            selectedAkunHutang,
            selectedSyaratPembayaran
        ];

        const isValid = requiredFields.every(field => field);
        setIsFormValid(isValid);
    }, [
        displayName,
        selectedTypes,
        selectedGroups,
        namaAwal,
        email,
        noHandphone,
        alamatPenagihan,
        alamatPengiriman,
        selectedAkunPiutang,
        selectedAkunHutang,
        selectedSyaratPembayaran
    ]);

    useEffect(() => {
        checkFormValidity();
    }, [checkFormValidity]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contactTypesResponse, grupKontaksResponse, sebutanKontaksResponse, identitasKontaksResponse, banksResponse, akunsResponse] = await Promise.all([
                    axios.get<ContactType[]>(apiEndpoints.getJenisKontak, { headers: { 'ngrok-skip-browser-warning': 'true' } }),
                    axios.get<GrupKontak[]>(apiEndpoints.getGrubKontak, { headers: { 'ngrok-skip-browser-warning': 'true' } }),
                    axios.get<SebutanKontak[]>(apiEndpoints.getSebutanKontak, { headers: { 'ngrok-skip-browser-warning': 'true' } }),
                    axios.get<IdentitasKontak[]>(apiEndpoints.getIdentitasKontak, { headers: { 'ngrok-skip-browser-warning': 'true' } }),
                    axios.get<Bank[]>(apiEndpoints.getBank, { headers: { 'ngrok-skip-browser-warning': 'true' } }),
                    axios.get<{ id: number; kode: number; nama: string }[]>(apiEndpoints.getAkun, { headers: { 'ngrok-skip-browser-warning': 'true' } })
                ]);
                setContactTypes(contactTypesResponse.data);
                setGrupKontaks(grupKontaksResponse.data);
                setSebutanKontaks(sebutanKontaksResponse.data);
                setIdentitasKontaks(identitasKontaksResponse.data);
                setBanks(banksResponse.data);
                setAkuns(akunsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (samaAlamatPenagihan) {
            setAlamatPengiriman(alamatPenagihan);
        }
    }, [samaAlamatPenagihan, alamatPenagihan]);

    const handleAddBank = () => {
        if (bankAccounts.length < 3) {
            setBankAccounts([...bankAccounts, { namaBank: null, cabangBank: '', pemegangAkunBank: '', nomorRekening: '' }]);
        }
    };

    const handleRemoveBank = (index: number) => {
        const newBankAccounts = bankAccounts.filter((_, i) => i !== index);
        setBankAccounts(newBankAccounts);
    };

    const handleBankAccountChange = (index: number, field: keyof BankAccount, value: any) => {
        const newBankAccounts = [...bankAccounts];
        newBankAccounts[index] = { ...newBankAccounts[index], [field]: value };
        setBankAccounts(newBankAccounts);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        const fullAlamatPenagihan = showDetailedAddress ? `${alamatPenagihan}, No: ${no}, RT: ${rt}, RW: ${rw}, Kode Pos: ${kodePos}, ${kelurahan}, ${kecamatan}, ${kabupaten}, ${provinsi}` : alamatPenagihan;

        const fullAlamatPengiriman = samaAlamatPenagihan ? fullAlamatPenagihan : alamatPengiriman;

        const fullNama = `${namaAwal} ${namaTengah} ${namaAkhir}`.trim();

        const contactData = {
            nama_tampilan: displayName,
            tipe_kontak: selectedTypes.map(type => type.kode),
            grup_kontak: selectedGroups.map(group => group.kode),
            nama_lengkap: fullNama,
            sebutan: selectedSebutan?.kode,
            identitas: selectedIdentitas?.kode,
            nomor_identitas: nomorIdentitas,
            email,
            nama_perusahaan: namaPerusahaan,
            no_handphone: noHandphone,
            no_telepon: noTelepon,
            no_fax: fax,
            npwp,
            info_lainnya: infoLainnya,
            alamat_penagihan: fullAlamatPenagihan,
            alamat_pengiriman: fullAlamatPengiriman,
            akun_piutang: selectedAkunPiutang?.id,
            akun_hutang: selectedAkunHutang?.id,
            syarat_pembayaran_utama: selectedSyaratPembayaran,
            hutang_max: enableMaxDebt ? maxDebt : null,

        };

        const bankData = bankAccounts.map((account) => ({
            nama_bank: account.namaBank?.kode,
            cabang_bank: account.cabangBank,
            pemegang_akun_bank: account.pemegangAkunBank,
            nomor_rekening: account.nomorRekening
        }));

        try {
            const response = await axios.post(apiEndpoints.inputDataContact, {
                ...contactData,
                bank_accounts: bankData
            });
            console.log('Data submitted successfully:', response.data);
            
            // Show success toast
            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: 'Data kontak berhasil ditambahkan',
                life: 3000
            });

            // Redirect to /kontak page after a short delay
            router.push('/kontak?status=success');;
        } catch (error) {
            console.error('Error submitting data:', error);
            
            // Show error toast
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal menambahkan data kontak',
                life: 3000
            });
        }
    };
    if (isLoading) {
        return (
            <div className="flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <ProgressSpinner />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-column w-full h-full">
            <div>
                <Link href="/kontak" className="text-lg">
                    Kontak
                </Link>
            </div>
            <div className="w-full poppins-bold text-black-alpha-90 text-3xl">Buat Kontak</div>
            <div className="card flex flex-column p-4 m-0 w-full mt-4">
                <div className="flex align-content-center">
                    <i className="pi pi-user text-xl text-green-400"></i>
                    <p className="ml-3 poppins-bold text-xl">Info Kontak</p>
                </div>
                <div className="flex flex-column w-full gap-2 pl-5 pt-4">
                    <div className="w-full">
                        <label htmlFor="displayName">Nama Tampilan</label>
                        <InputText className="w-full mt-2" id="displayName" value={displayName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="contactType">Tipe Kontak</label>
                        <div className="w-full flex flex-wrap gap-4 mt-2">
                            {contactTypes.map((type) => (
                                <div key={type.kode} className="flex align-items-center">
                                    <Checkbox
                                        inputId={type.kode}
                                        name="type"
                                        value={type}
                                        onChange={(e) => {
                                            if (e.checked) {
                                                setSelectedTypes([...selectedTypes, type]);
                                            } else {
                                                setSelectedTypes(selectedTypes.filter(t => t.kode !== type.kode));
                                            }
                                        }}
                                        checked={selectedTypes.some(t => t.kode === type.kode)}
                                    />
                                    <label htmlFor={type.kode} className="ml-2">
                                        {type.nama}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="w-full">
                        <label htmlFor="grupKontak">Grup Kontak (Max 3)</label>
                        <MultiSelect
                            id="grupKontak"
                            value={selectedGroups}
                            onChange={(e) => setSelectedGroups(e.value.slice(0, 3))}
                            options={grupKontaks}
                            optionLabel="nama"
                            placeholder="Pilih Grup Kontak (Max 3)"
                            filter
                            className="w-full mt-2"
                            maxSelectedLabels={3}
                        />
                    </div>
                </div>
                <div className="flex align-content-center" style={{ marginTop: '55px' }}>
                    <FileText color="#A3D784" />
                    <p className="ml-3 poppins-bold text-xl">Info Umum</p>
                </div>
                <div className="w-full">
                    <div className="flex flex-column w-full gap-3 pl-5 pt-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="sebutanKontak">Nama Lengkap</label>
                                <Dropdown id="sebutanKontak" value={selectedSebutan} onChange={(e) => setSelectedSebutan(e.value)} options={sebutanKontaks} optionLabel="name" placeholder="[Kosong]" filter className="w-full mt-2" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="namaAwal">Nama Awal</label>
                                <InputText id="namaAwal" value={namaAwal} onChange={(e) => setNamaAwal(e.target.value)} className="w-full mt-2" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="namaTengah">Nama Tengah</label>
                                <InputText id="namaTengah" value={namaTengah} onChange={(e) => setNamaTengah(e.target.value)} className="w-full mt-2" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="namaAkhir">Nama Akhir</label>
                                <InputText id="namaAkhir" value={namaAkhir} onChange={(e) => setNamaAkhir(e.target.value)} className="w-full mt-2" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label htmlFor="identitasKontak">Identitas</label>
                                <Dropdown id="identitasKontak" value={selectedIdentitas} onChange={(e) => setSelectedIdentitas(e.value)} options={identitasKontaks} optionLabel="name" placeholder="[Kosong]" filter className="w-full mt-2" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="nomorIdentitas">Nomor Identitas</label>
                                <InputText id="nomorIdentitas" value={nomorIdentitas} onChange={(e) => setNomorIdentitas(e.target.value)} className="w-full mt-2" placeholder="Masukkan Nomor Identitas" />
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-2" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="namaPerusahaan">Nama Perusahaan</label>
                            <InputText id="namaPerusahaan" value={namaPerusahaan} onChange={(e) => setNamaPerusahaan(e.target.value)} className="w-full mt-2" />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label htmlFor="noHandphone">No Handphone</label>
                                <InputText id="noHandphone" value={noHandphone} onChange={(e) => setNoHandphone(e.target.value)} className="w-full mt-2" placeholder="Contoh : 081 88126645" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="noTelepon">No Telepon</label>
                                <InputText id="noTelepon" value={noTelepon} onChange={(e) => setNoTelepon(e.target.value)} className="w-full mt-2" placeholder="Contoh : 0890 114455" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label htmlFor="fax">Fax</label>
                                <InputText id="fax" value={fax} onChange={(e) => setFax(e.target.value)} className="w-full mt-2" placeholder="Contoh : 081 88126645" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="npwp">NPWP</label>
                                <InputText id="npwp" value={npwp} onChange={(e) => setNpwp(e.target.value)} className="w-full mt-2" placeholder="Contoh : 081 88126645" />
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="alamatPenagihan">Alamat Penagihan</label>
                            <InputText id="alamatPenagihan" value={alamatPenagihan} onChange={(e) => setAlamatPenagihan(e.target.value)} className="w-full mt-2" placeholder="Contoh : jl kanjoro madiun" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox inputId="showDetailedAddress" checked={showDetailedAddress} onChange={(e) => setShowDetailedAddress(e.checked ?? false)} />
                            <label htmlFor="showDetailedAddress" className="text-sm">
                                Tambah Rincian
                            </label>
                        </div>
                        {showDetailedAddress && (
                            <>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label htmlFor="no">No</label>
                                        <InputText id="no" value={no} onChange={(e) => setNo(e.target.value)} className="w-full mt-2" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="rt">RT</label>
                                        <InputText id="rt" value={rt} onChange={(e) => setRt(e.target.value)} className="w-full mt-2" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="rw">RW</label>
                                        <InputText id="rw" value={rw} onChange={(e) => setRw(e.target.value)} className="w-full mt-2" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="kodePos">Kode POS</label>
                                        <InputText id="kodePos" value={kodePos} onChange={(e) => setKodePos(e.target.value)} className="w-full mt-2" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label htmlFor="kelurahan">Kelurahan / Desa</label>
                                        <InputText id="kelurahan" value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} className="w-full mt-2" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="kecamatan">Kecamatan</label>
                                        <InputText id="kecamatan" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} className="w-full mt-2" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <label htmlFor="kabupaten">Kabupaten / Kota</label>
                                        <InputText id="kabupaten" value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} className="w-full mt-2" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="provinsi">Provinsi</label>
                                        <InputText id="provinsi" value={provinsi} onChange={(e) => setProvinsi(e.target.value)} className="w-full mt-2" />
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="w-full">
                            <label htmlFor="alamatPengiriman">Alamat Pengiriman</label>
                            <InputText id="alamatPengiriman" value={alamatPengiriman} onChange={(e) => setAlamatPengiriman(e.target.value)} className="w-full mt-2" placeholder="Contoh : jl kanjoro madiun" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox inputId="samaAlamatPenagihan" checked={samaAlamatPenagihan} onChange={(e) => setSamaAlamatPenagihan(e.checked ?? false)} />
                            <label htmlFor="samaAlamatPenagihan" className="text-sm">
                                Sama dengan Alamat Penagihan
                            </label>
                        </div>
                        <div className="w-full">
                            <label htmlFor="infoLainnya">Info Lainnya</label>
                            <InputText id="infoLainnya" value={infoLainnya} onChange={(e) => setInfoLainnya(e.target.value)} className="w-full mt-2" placeholder="Contoh : jl kanjoro madiun" />
                        </div>
                    </div>
                </div>
                <div className="flex align-content-center" style={{ marginTop: '55px' }}>
                    <Landmark color="#A3D784" />
                    <p className="ml-3 poppins-bold text-xl">Info Bank</p>
                </div>
                <div className="w-full">
                    {bankAccounts.map((account, index) => (
                        <div key={index} className="w-full mb-3 pl-5 border rounded">
                            <div className="flex w-full mb-2 align-items-center" style={{ height: '40px' }}>
                                <h3 className="text-lg font-semibold">Akun Bank {index + 1}</h3>
                                {index > 0 && <Button icon="pi pi-trash" className="p-button-danger p-button-text" onClick={() => handleRemoveBank(index)} />}
                            </div>
                            <div className="grid gap-4 p-0 m-0">
                                <div className="col-6 p-0 m-0 ">
                                    <label htmlFor={`namaBank${index}`}>Nama Bank</label>
                                    <Dropdown
                                        id={`namaBank${index}`}
                                        value={account.namaBank}
                                        onChange={(e) => handleBankAccountChange(index, 'namaBank', e.value)}
                                        options={banks}
                                        optionLabel="nama_bank"
                                        placeholder="Pilih Bank"
                                        className="w-full mt-2"
                                    />
                                </div>
                                <div className="col p-0 m-0">
                                    <label htmlFor={`cabangBank${index}`}>Cabang Bank</label>
                                    <InputText id={`cabangBank${index}`} value={account.cabangBank} onChange={(e) => handleBankAccountChange(index, 'cabangBank', e.target.value)} className="w-full mt-2" />
                                </div>
                                <div className="col-6 p-0 m-0">
                                    <label htmlFor={`pemegangAkunBank${index}`}>Pemegang Akun Bank</label>
                                    <InputText id={`pemegangAkunBank${index}`} value={account.pemegangAkunBank} onChange={(e) => handleBankAccountChange(index, 'pemegangAkunBank', e.target.value)} className="w-full mt-2" />
                                </div>
                                <div className="col p-0 m-0">
                                    <label htmlFor={`nomorRekening${index}`}>Nomor Rekening</label>
                                    <InputText id={`nomorRekening${index}`} value={account.nomorRekening} onChange={(e) => handleBankAccountChange(index, 'nomorRekening', e.target.value)} className="w-full mt-2" />
                                </div>
                            </div>
                        </div>
                    ))}
                    {bankAccounts.length < 3 && <Button label="Tambah Bank Lainnya" icon="pi pi-plus" className="p-button-success ml-5" onClick={handleAddBank} type='button' />}
                </div>
                <div className="flex align-content-center" style={{ marginTop: '55px' }}>
                <Map color="#A3D784" />
                <p className="ml-3 poppins-bold text-xl">Pemetaan Akun</p>
            </div>
            <div className="w-full">
                <div className="grid gap-2 pl-4 m-0">
                    <div className="col-6">
                        <label htmlFor="akunPiutang">Akun Piutang</label>
                        <Dropdown
                            id="akunPiutang"
                            value={selectedAkunPiutang}
                            onChange={(e) => setSelectedAkunPiutang(e.value)}
                            options={akuns}
                            optionLabel="nama"
                            placeholder="Pilih Akun Piutang"
                            className="w-full mt-2"
                            filter
                            valueTemplate={(option) => {
                                if (option) {
                                    return <div>{`(${option.kode}) ${option.nama}`}</div>;
                                }
                                return 'Pilih Akun Piutang';
                            }}
                            itemTemplate={(option) => {
                                return <div>{`(${option.kode}) ${option.nama}`}</div>;
                            }}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="akunHutang">Akun Hutang</label>
                        <Dropdown
                            id="akunHutang"
                            value={selectedAkunHutang}
                            onChange={(e) => setSelectedAkunHutang(e.value)}
                            options={akuns}
                            optionLabel="nama"
                            placeholder="Pilih Akun Hutang"
                            className="w-full mt-2"
                            filter
                            valueTemplate={(option) => {
                                if (option) {
                                    return <div>{`(${option.kode}) ${option.nama}`}</div>;
                                }
                                return 'Pilih Akun Hutang';
                            }}
                            itemTemplate={(option) => {
                                return <div>{`(${option.kode}) ${option.nama}`}</div>;
                            }}
                        />
                    </div>
                    <div className="col-12">
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="enableMaxDebt"
                                checked={enableMaxDebt}
                                onChange={(e) => setEnableMaxDebt(e.checked || false)}
                            />
                            <label htmlFor="enableMaxDebt" className="ml-2">Aktifkan hutang maksimum</label>
                        </div>
                        {enableMaxDebt !== false && (
                            <div className="mt-2">
                                <label htmlFor="maxDebt">Hutang Maksimum</label>
                                <InputNumber
                                    id="maxDebt"
                                    value={maxDebt}
                                    onValueChange={(e) => setMaxDebt(e.value ?? null)}
                                    mode="currency"
                                    currency="IDR"
                                    locale="id-ID"
                                    className="w-full mt-2"
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="syaratPembayaran">Syarat Pembayaran Utama</label>
                        <Dropdown
                            id="syaratPembayaran"
                            value={selectedSyaratPembayaran}
                            onChange={(e) => setSelectedSyaratPembayaran(e.value)}
                            options={[
                                { label: 'Net 30', value: 'Net 30' },
                                { label: 'Net 60', value: 'Net 60' },
                                { label: 'COD', value: 'COD' }
                            ]}
                            placeholder="Pilih Pembayaran"
                            className="w-full mt-2"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-content-end mt-4 gap-2 flex-row">
                <Button className="p-button-danger" onClick={() => {
                        setIsLoading(true);
                        router.push('/kontak');
                    }}>
                        Batalkan
                    </Button>
                <Button type="submit" label="Submit" style={{ width: '100px' }} className="p-button-success" disabled={isLoading || !isFormValid} />
            </div>
            <Toast ref={toast} />
            </div>
        </form>
    );
};

export default AddKontak;
