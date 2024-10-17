'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiEndpoints } from '@/app/api/api';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { SelectButton } from 'primereact/selectbutton';
import { ProgressSpinner } from 'primereact/progressspinner';
import { MultiSelect } from 'primereact/multiselect';
import GrupKontakDialog from '@/app/Components/GrupKontakDialog';
import { Sidebar } from 'primereact/sidebar';
import { Checkbox } from 'primereact/checkbox';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';

interface DataContact {
    id: number;
    kode: string;
    nama_tampilan: string;
    nama_lengkap: string;
    nama_perusahaan: string;
    alamat_penagihan: string;
    email: string;
    no_handphone: string;
    no_telepon: string;
    npwp: string;
    tipe_kontak?: string;
    saldo?: string;
    info_lainnya?: string;
}

interface TipeKontak {
    id: number;
    kode_kontak: string;
    kode_type_kontak: string;
    data_contact: DataContact[];
}

interface JenisKontak {
    id: number;
    kode: string;
    nama: string;
    tipe_kontak: TipeKontak[];
}

const InfoCard: React.FC<{ title: string }> = ({ title }) => (
    <Card className="h-auto">
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-lg font-semibold mt-1">Rp 0</div>
    </Card>
);

const Kontak: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [contacts, setContacts] = useState<JenisKontak[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedPaymentType, setSelectedPaymentType] = useState('bayar');
    const [flattenedContacts, setFlattenedContacts] = useState<DataContact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<DataContact[]>([]);
    const [nameFilter, setNameFilter] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useRef<Toast>(null);
    const tabColors = ['#FF5722', '#4CAF50', '#2196F3', '#9C27B0', '#FFEB3B'];
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [filterKeyword, setFilterKeyword] = useState('');
    const [filterGroup, setFilterGroup] = useState('');
    const [filterPhone, setFilterPhone] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [showArchivedContacts, setShowArchivedContacts] = useState(false);
    const [groupSuggestions, setGroupSuggestions] = useState<string[]>([]);

    const paymentOptions = [
        { label: 'Harus Anda Bayar', value: 'bayar' },
        { label: 'Akan Anda Terima', value: 'terima' }
    ];

    const [selectedColumns, setSelectedColumns] = useState([
        { field: 'nama_tampilan', header: 'Nama panggilan' },
        { field: 'nama_perusahaan', header: 'Nama perusahaan' },
        { field: 'alamat_penagihan', header: 'Alamat' },
        { field: 'email', header: 'Email' },
        { field: 'no_handphone', header: 'No. handphone' },
        { field: 'saldo', header: 'Saldo' }
    ]);

    const columns = [
        { field: 'nama_tampilan', header: 'Nama panggilan' },
        { field: 'nama_perusahaan', header: 'Nama perusahaan' },
        { field: 'alamat_penagihan', header: 'Alamat' },
        { field: 'email', header: 'Email' },
        { field: 'no_handphone', header: 'No. handphone' },
        { field: 'no_telepon', header: 'No. telepon' },
        { field: 'npwp', header: 'NPWP' },
        { field: 'info_lainnya', header: 'Info lainnya' },
        { field: 'saldo', header: 'Saldo' }
    ];

    const groups = ['Pelanggan', 'Pemasok', 'Karyawan', 'Lainnya'];

    const suggestGroups = (event: AutoCompleteCompleteEvent) => {
        const query = event.query.toLowerCase();
        const filteredGroups = groups.filter(group => 
            group.toLowerCase().includes(query)
        );
        setGroupSuggestions(filteredGroups);
    };

    useEffect(() => {
        const status = searchParams.get('status');
        if (status === 'success') {
            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: 'Data kontak berhasil ditambahkan',
                life: 3000
            });
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('status');
            window.history.replaceState({}, '', newUrl.toString());
        }

        axios
            .get(apiEndpoints.getKontak, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            })
            .then((response) => {
                const contactsData: JenisKontak[] = response.data;
                setContacts(contactsData);

                const flattened = contactsData.flatMap((jenis) =>
                    jenis.tipe_kontak.flatMap((tipe) =>
                        tipe.data_contact.map((contact) => ({
                            ...contact,
                            tipe_kontak: jenis.nama
                        }))
                    )
                );
                setFlattenedContacts(flattened);
                setFilteredContacts(flattened);
            })
            .catch((error) => {
                console.error('API Error:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Gagal mengambil data kontak',
                    life: 3000
                });
            });
    }, [searchParams]);

    useEffect(() => {
        const filterContacts = () => {
            let filtered = flattenedContacts;

            if (activeIndex !== contacts.length) {
                const selectedJenisKontak = contacts[activeIndex];
                filtered = filtered.filter((contact) => contact.tipe_kontak === selectedJenisKontak.nama);
            }

            if (nameFilter) {
                filtered = filtered.filter((contact) => contact.nama_tampilan.toLowerCase().includes(nameFilter.toLowerCase()));
            }

            setFilteredContacts(filtered);
        };

        filterContacts();
    }, [activeIndex, nameFilter, contacts, flattenedContacts]);

    const handleNameClick = (contact: DataContact) => {
        router.push(`/kontak/${contact.kode}`);
    };

    const nameBodyTemplate = (rowData: DataContact) => {
        return (
            <span className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={() => handleNameClick(rowData)}>
                {rowData.nama_tampilan}
            </span>
        );
    };

    const onColumnToggle = (event: { value: any }) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol: { field: string }) => sCol.field === col.field));
        setSelectedColumns(orderedSelectedColumns);
    };

    const filterSidebar = (
        <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} position="right" className="p-sidebar-sm">
            <h2 className="text-xl font-bold mb-4">Filter daftar kontak</h2>
            <div className="flex flex-column gap-4">
                <div className="flex flex-column gap-2">
                    <label htmlFor="keyword" className="font-semibold">Kata kunci</label>
                    <InputText id="keyword" value={filterKeyword} onChange={(e) => setFilterKeyword(e.target.value)} placeholder="Cari kontak" />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="group" className="font-semibold">Grup</label>
                    <AutoComplete
                        id="group"
                        value={filterGroup}
                        suggestions={groupSuggestions}
                        completeMethod={suggestGroups}
                        onChange={(e) => setFilterGroup(e.value)}
                        dropdown
                    />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="phone" className="font-semibold">Nomor telepon</label>
                    <InputText id="phone" value={filterPhone} onChange={(e) => setFilterPhone(e.target.value)} placeholder="Contoh: 012 3456789" />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <InputText id="email" value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} />
                </div>
                <div className="flex align-items-center gap-2">
                    <Checkbox inputId="archived" checked={showArchivedContacts} onChange={(e) => setShowArchivedContacts(e.checked ?? false)} />
                    <label htmlFor="archived" className="ml-2">Tampilkan kontak yang diarsipkan</label>
                </div>
                <div className="flex justify-content-between mt-4">
                    <Button label="Atur ulang" className="p-button-text" onClick={() => {
                        setFilterKeyword('');
                        setFilterGroup('');
                        setFilterPhone('');
                        setFilterEmail('');
                        setShowArchivedContacts(false);
                    }} />
                    <Button label="Terapkan" className="p-button-success" onClick={() => {
                        // Implementasikan logika filter di sini
                        setSidebarVisible(false);
                    }} />
                </div>
            </div>
        </Sidebar>
    );

    const header = (
        <div className="flex flex-column">
            <div className="grid">
                <div className="col-5">
                    <div className="grid ">
                        <div className="col-7">
                            <MultiSelect value={selectedColumns} options={columns} optionLabel="header" className='w-full' onChange={onColumnToggle}  display="chip" placeholder="Pilih kolom yang ditampilkan" />
                        </div>
                        <GrupKontakDialog />
                        {/* <Button label="Atur Grup Kontak" className="p-button-text col text-sm" onClick={() => GrupKontakDialog()} /> */}
                    </div>
                </div>
                <div className="col-7">
                    <div className="flex justify-content-end gap-2">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText value={nameFilter} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameFilter(e.target.value)} placeholder="Cari nama kontak" />
                        </span>
                        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Impor" className="mr-2" />
                        <Button label="Expor" className="p-button-success mr-2" />
                        <Button label="Filter" className="p-button-success" icon="pi pi-filter" onClick={() => setSidebarVisible(true)} />
                    </div>
                </div>
            </div>
        </div>
    );

    const cardData = [{ title: 'Total Biaya Bulan Ini' }, { title: 'Total Biaya 30 Hari Terakhir' }, { title: 'Total Biaya belum di Bayar' }];

    const shouldShowSelectButton = (index: number) => {
        const tabName = contacts[index]?.nama.toLowerCase();
        return tabName === 'karyawan' || tabName === 'lainnya' || index === contacts.length;
    };

    if (isLoading) {
        return (
            <div className="flex justify-content-center bg-black-alpha-20 align-items-center h-screen">
                <ProgressSpinner />
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-column">
            <Toast ref={toast} />
            <div className="grid p-0 mb-4">
                <div className="col poppins-bold text-3xl">Kontak</div>
                <div className="col flex justify-content-end p-0 m-0">
                    <Button
                        className="p-button-success"
                        style={{ height: '35px' }}
                        onClick={() => {
                            setIsLoading(true);
                            router.push('/kontak/new');
                        }}
                    >
                        Buat Kontak
                    </Button>
                </div>
            </div>

            <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                className=""
                pt={{
                    inkbar: { className: ' bg-green-400' },
                    root: { className: ' border-round' },
                    nav: { className: 'bg-transparent pl-5 pr-5' },
                    panelContainer: { className: 'border-1 border-round-bottom border-gray-200' }
                }}
            >
                {contacts.map((jenisKontak, index) => (
                    <TabPanel
                        key={index}
                        header={jenisKontak.nama}
                        pt={{
                            headerTitle: () => ({
                                style: { color: `${tabColors[index % tabColors.length]}` }
                            }),
                            headerAction: () => ({
                                style: { height: '40px' },
                                className: `text-gray-400 ${index === activeIndex ? 'text-gray-900 border-green-400  bg-gray-200' : 'bg-transparent hover:border-green-400'}`
                            })
                        }}
                    >
                        <div className="grid mb-4">
                            {shouldShowSelectButton(index) && (
                                <div className="col-12 ">
                                    <SelectButton value={selectedPaymentType} onChange={(e) => setSelectedPaymentType(e.value)} options={paymentOptions} unselectable={false} className="p-buttonset-sm" />
                                </div>
                            )}
                            {cardData.map((card, cardIndex) => (
                                <div key={cardIndex} className="col-12 md:col-4">
                                    <InfoCard title={card.title} />
                                </div>
                            ))}
                        </div>
                        <DataTable value={filteredContacts} paginator rows={10} header={header} emptyMessage="Tidak ada data kontak">
                            {selectedColumns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} body={col.field === 'nama_tampilan' ? nameBodyTemplate : undefined} />
                            ))}
                        </DataTable>
                    </TabPanel>
                ))}
                <TabPanel
                    header="Semua"
                    pt={{
                        headerAction: () => ({
                            style: { height: '40px' },
                            className: `text-gray-400 ${activeIndex === contacts.length ? 'text-gray-900 border-green-400  bg-gray-200' : 'bg-transparent hover:border-green-400'}`
                        })
                    }}
                >
                    <div className="grid mb-4">
                        <div className="col-12 ">
                            <SelectButton value={selectedPaymentType} onChange={(e) => setSelectedPaymentType(e.value)} options={paymentOptions} className="p-buttonset-sm" />
                        </div>
                        {cardData.map((card, cardIndex) => (
                            <div key={cardIndex} className="col-12 md:col-4">
                                <InfoCard title={card.title} />
                            </div>
                        ))}
                    </div>
                    <DataTable value={filteredContacts} paginator rows={10} header={header} emptyMessage="Tidak ada data kontak">
                        {selectedColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.field === 'nama_tampilan' ? nameBodyTemplate : undefined} />
                        ))}
                    </DataTable>
                </TabPanel>
            </TabView>
            {filterSidebar}
        </div>
    );
};

export default Kontak;