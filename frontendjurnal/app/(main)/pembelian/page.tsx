'use client';
import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { fakturPembelianData, fakturPembelianColumns, FakturPembelian } from './models/faktur';
import { tukarFakturPembelianData, tukarFakturPembelianColumns, TukarFakturPembelian } from './models/tukarFaktur';
import { pengirimanData, pengirimanColumns, Pengiriman } from './models/pengiriman';
import { pemesananPembelianData, pemesananPembelianColumns, PemesananPembelian } from './models/pemesanan';
import { penawaranPembelianData, penawaranPembelianColumns, PenawaranPembelian } from './models/penawaran';
import { permintaanPembelianData, permintaanPembelianColumns, PermintaanPembelian } from './models/permintaan';
import { persetujuanPembelianData, persetujuanPembelianColumns, PersetujuanPembelian } from './models/persetujuan';

const InfoCard: React.FC<{ title: string; amount: string }> = ({ title, amount }) => (
    <Card className="h-auto">
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-lg font-semibold mt-1">{amount}</div>
    </Card>
);

export default function Pembelian() {
    const [searchValue, setSearchValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);

    const cardData = [
        { title: 'Total Pembelian Belum di Bayar', amount: 'Rp 00,00' },
        { title: 'Total Pembelian Jatuh Tempo', amount: 'Rp 00,00' },
        { title: 'Total Pelunasan dibayar 30 Hari Terakhir', amount: 'Rp 00,00' }
    ];

    const statusOptions = [
        { label: 'Semua Status', value: null },
        { label: 'Open', value: 'Open' },
        { label: 'Closed', value: 'Closed' }
    ];

    const header = (
        <div className="flex justify-content-between align-items-center">
            <Dropdown value={selectedStatus} options={statusOptions} onChange={(e) => setSelectedStatus(e.value)} placeholder="Semua Status" className="w-10rem" />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Cari Transaksi" />
            </span>
            <div>
                <Button icon="pi pi-filter" className="p-button-outlined mr-2" />
                <Button label="Tambah" icon="pi pi-plus" className="p-button-success" />
            </div>
        </div>
    );

    const statusBodyTemplate = (rowData: FakturPembelian | TukarFakturPembelian | Pengiriman | PemesananPembelian | PenawaranPembelian | PermintaanPembelian) => {
        return <Tag value={rowData.status} severity={rowData.status === 'Open' ? 'success' : 'warning'} />;
    };

    const urgensiBodyTemplate = (rowData: PermintaanPembelian | PersetujuanPembelian) => {
        let severity: 'success' | 'warning' | 'danger';
        switch (rowData.urgensi) {
            case 'Rendah':
                severity = 'success';
                break;
            case 'Sedang':
                severity = 'warning';
                break;
            case 'Tinggi':
                severity = 'danger';
                break;
        }
        return <Tag value={rowData.urgensi} severity={severity} />;
    };

    const actionBodyTemplate = (tabIndex: number) => {
        // eslint-disable-next-line react/display-name
        return () => {
            switch(tabIndex) {
                case 0: // Faktur Pembelian
                case 3: // Pemesanan Pembelian
                case 4: // Penawaran Pembelian
                case 5: // Permintaan Pembelian
                case 6: // Membutuhkan Persetujuan
                    return (
                        <div>
                            <Button icon="pi pi-print" className="p-button-text p-button-rounded mr-2" tooltip="Cetak" />
                            <Button icon="pi pi-trash" className="p-button-text p-button-rounded p-button-danger" tooltip="Hapus" />
                        </div>
                    );
                case 1: // Tukar Faktur Pembelian
                    return null; // Tidak ada aksi
                case 2: // Pengiriman
                    return (
                        <div>
                            <Button icon="pi pi-trash" className="p-button-text p-button-rounded p-button-danger" tooltip="Hapus" />
                        </div>
                    );
                default:
                    return null;
            }
        };
    };

    const filterData = (data: any[], searchFields: string[]): any[] => {
        return data.filter((item: any) =>
            searchFields.some((field: string) =>
                item[field] && item[field].toString().toLowerCase().includes(searchValue.toLowerCase())
            )
        );
    };

    return (
        <div className="w-full h-full flex flex-column">
            <div className="grid p-0 mb-4">
                <div className="col poppins-bold text-3xl">Pembelian</div>
            </div>

            <div className="grid mb-4">
                {cardData.map((card, index) => (
                    <div key={index} className="col-12 md:col-4">
                        <InfoCard title={card.title} amount={card.amount} />
                    </div>
                ))}
            </div>

            <TabView
                className="mb-4"
                pt={{
                    inkbar: { className: 'bg-green-400' },
                    root: { className: 'border-round' },
                    nav: { className: 'bg-transparent px-0' },
                    panelContainer: { className: 'border-1 border-round-bottom border-gray-200' }
                }}
            >
                <TabPanel header="Faktur Pembelian" pt={{ headerAction: () => ({ className: 'text-gray-600 hover:text-green-600' }) }}>
                    <DataTable value={filterData(fakturPembelianData, ['nomor', 'tanggal', 'supplier', 'total'])} header={header} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        {fakturPembelianColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} 
                                    body={col.field === 'status' ? statusBodyTemplate : undefined} />
                        ))}
                        <Column body={actionBodyTemplate(0)} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </TabPanel>
                <TabPanel header="Tukar Faktur Pembelian" pt={{ headerAction: () => ({ className: 'text-gray-600 hover:text-green-600' }) }}>
                    <DataTable value={filterData(tukarFakturPembelianData, ['nomor', 'tanggal', 'supplier', 'total'])} header={header} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        {tukarFakturPembelianColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} 
                                    body={col.field === 'status' ? statusBodyTemplate : undefined} />
                        ))}
                    </DataTable>
                </TabPanel>
                <TabPanel header="Pengiriman" pt={{ headerAction: () => ({ className: 'text-gray-600 hover:text-green-600' }) }}>
                    <DataTable value={filterData(pengirimanData, ['nomor', 'tanggal', 'supplier'])} header={header} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        {pengirimanColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} 
                                    body={col.field === 'status' ? statusBodyTemplate : undefined} />
                        ))}
                        <Column body={actionBodyTemplate(2)} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </TabPanel>
                <TabPanel header="Pemesanan Pembelian" pt={{ headerAction: () => ({ className: 'text-gray-600 hover:text-green-600' }) }}>
                    <DataTable value={filterData(pemesananPembelianData, ['nomor', 'tanggal', 'supplier', 'total'])} header={header} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        {pemesananPembelianColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} 
                                    body={col.field === 'status' ? statusBodyTemplate : undefined} />
                        ))}
                        <Column body={actionBodyTemplate(3)} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </TabPanel>
                <TabPanel header="Penawaran Pembelian" pt={{ headerAction: () => ({ className: 'text-gray-600 hover:text-green-600' }) }}>
                    <DataTable value={filterData(penawaranPembelianData, ['nomor', 'tanggal', 'supplier', 'total'])} header={header} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        {penawaranPembelianColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} 
                                    body={col.field === 'status' ? statusBodyTemplate : undefined} />
                        ))}
                        <Column body={actionBodyTemplate(4)} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </TabPanel>
                <TabPanel header="Permintaan Pembelian" pt={{ headerAction: () => ({ className: 'text-gray-600 hover:text-green-600' }) }}>
                    <DataTable value={filterData(permintaanPembelianData, ['nomor', 'tanggal', 'peminta', 'total'])} header={header} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        {permintaanPembelianColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} 
                                    body={col.field === 'status' ? statusBodyTemplate : 
                                          col.field === 'urgensi' ? urgensiBodyTemplate : undefined} />
                        ))}
                        <Column body={actionBodyTemplate(5)} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </TabPanel>
                <TabPanel header="Membutuhkan Persetujuan" pt={{ headerAction: () => ({ className: 'text-gray-600 hover:text-green-600' }) }}>
                    <DataTable value={filterData(persetujuanPembelianData, ['nomor', 'tanggal', 'peminta', 'total'])} header={header} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        {persetujuanPembelianColumns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} 
                                    body={col.field === 'status' ? statusBodyTemplate : 
                                          col.field === 'urgensi' ? urgensiBodyTemplate : undefined} />
                        ))}
                        <Column body={actionBodyTemplate(6)} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </TabPanel>
            </TabView>
        </div>
    );
}
