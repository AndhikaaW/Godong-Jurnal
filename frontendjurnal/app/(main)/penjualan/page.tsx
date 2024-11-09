"use client"
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { TabView, TabPanel } from 'primereact/tabview';
import { Badge } from 'primereact/badge';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { PenjualanItem, PengirimanItem, PesananItem, PenawaranItem } from './models';
import { useRouter } from 'next/navigation';

const Penjualan: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tanggal: { value: null, matchMode: FilterMatchMode.CONTAINS },
    no: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nama: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tanggalJatuhTempo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sisaTagihan: { value: null, matchMode: FilterMatchMode.CONTAINS },
    total: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tag: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [selectedJenisPenagihan, setSelectedJenisPenagihan] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [pengirimanStatus, setPengirimanStatus] = useState(null);
  const [pengirimanFilter, setPengirimanFilter] = useState('');
  const [pesananJenis, setPesananJenis] = useState(null);
  const [pesananStatus, setPesananStatus] = useState(null);
  const [pesananFilter, setPesananFilter] = useState('');

  const [filteredPenjualanData, setFilteredPenjualanData] = useState<PenjualanItem[]>([]);
  const [filteredPesananData, setFilteredPesananData] = useState<PesananItem[]>([]);

  const jenisPenagihanOptions = [
    { label: 'Penagihan', value: 'penagihan' },
    { label: 'Faktur Proforma', value: 'fakturProforma' },
    { label: 'Tukar Faktur', value: 'tukarFaktur' }
  ];

  const statusOptions = [
    { label: 'Semua status', value: null },
    { label: 'Menunggu pembayaran', value: 'menungguPembayaran' },
    { label: 'Telat bayar', value: 'telatBayar' },
    { label: 'Dibayar', value: 'dibayar' },
    { label: 'Dibayar sebagian', value: 'dibayarSebagian' },
    { label: 'Belum dibayar', value: 'belumDibayar' }
  ];

  const pengirimanStatusOptions = [
    { label: 'Semua status', value: null },
    { label: 'Menunggu pengiriman', value: 'menungguPengiriman' },
    { label: 'Dalam perjalanan', value: 'dalamPerjalanan' },
    { label: 'Terkirim', value: 'terkirim' },
    { label: 'Dibatalkan', value: 'dibatalkan' }
  ];

  const pesananJenisOptions = [
    { label: 'Pesanan', value: 'pesanan' },
    { label: 'Pesanan Proforma', value: 'pesananProforma' },
  ];

  const pesananStatusOptions = [
    { label: 'Semua status', value: null },
    { label: 'Menunggu pembayaran', value: 'menungguPembayaran' },
    { label: 'Telat bayar', value: 'telatBayar' },
    { label: 'Selesai', value: 'selesai' }
  ];

  const penjualanData: PenjualanItem[] = [
    {
      tanggal: '13/08/2024',
      no: 'Invoice #1111',
      nama: 'Harian',
      tanggalJatuhTempo: '13/08/2024',
      status: 'Dibayar',
      sisaTagihan: 'Rp 00,00',
      total: 'Rp 00,00',
      tag: 'Harian',
    },
    {
      tanggal: '13/08/2024',
      no: 'Invoice #1112',
      nama: 'Tian',
      tanggalJatuhTempo: '13/08/2024',
      status: 'Dibayar',
      sisaTagihan: 'Rp 00,00',
      total: 'Rp 00,00',
      tag: 'Tian',
    },
  ];

  const penjualanProformaData: PenjualanItem[] = [
    {
      tanggal: '13/08/2024',
      no: '10004-Proforma-1',
      nama: 'Harum',
      tanggalJatuhTempo: '13/08/2024',
      status: 'Dibayar',
      sisaTagihan: 'Rp 00,00',
      total: 'Rp 00,00',
      tag: 'Harum',
    },
    {
      tanggal: '13/08/2024',
      no: '10005-Proforma-1',
      nama: 'Tian',
      tanggalJatuhTempo: '13/08/2024',
      status: 'Dibayar',
      sisaTagihan: 'Rp 00,00',
      total: 'Rp 00,00',
      tag: 'Tian',
    },
  ];

  const pengirimanData: PengirimanItem[] = [
    {
      tanggal: '14/08/2024',
      no: 'Pengiriman #001',
      nama: 'PT ABC',
      status: 'Dikirim',
      total: 'Rp 500.000,00',
      tag: 'Reguler',
    },
    {
      tanggal: '15/08/2024',
      no: 'Pengiriman #002',
      nama: 'CV XYZ',
      status: 'Dalam Proses',
      total: 'Rp 750.000,00',
      tag: 'Ekspres',
    },
  ];

  const pesananData: PesananItem[] = [
    {
      tanggal: '16/08/2024',
      no: 'Pesanan #101',
      nama: 'Toko Makmur',
      tanggalKirim: '20/08/2024',
      status: 'Diproses',
      total: 'Rp 1.200.000,00',
      tag: 'Retail',
    },
    {
      tanggal: '17/08/2024',
      no: 'Pesanan #102',
      nama: 'Restoran Sejahtera',
      tanggalKirim: '22/08/2024',
      status: 'Menunggu Pembayaran',
      total: 'Rp 2.500.000,00',
      tag: 'Grosir',
    },
  ];

  const pesananProformaData: PesananItem[] = [
    {
      tanggal: '13/08/2024',
      no: '10004-Proforma-1',
      nama: 'Harum',
      tanggalKirim: '13/08/2024',
      status: 'Dibayar',
      total: 'Rp 00,00',
      tag: 'Harum',
    },
    {
      tanggal: '13/08/2024',
      no: '10005-Proforma-1',
      nama: 'Tian',
      tanggalKirim: '13/08/2024',
      status: 'Dibayar',
      total: 'Rp 00,00',
      tag: 'Tian',
    },
  ];

  const penawaranData: PenawaranItem[] = [
    {
      tanggal: '18/08/2024',
      no: 'Penawaran #201',
      nama: 'PT Maju Jaya',
      tanggalBerlaku: '25/08/2024',
      status: 'Menunggu Respon',
      total: 'Rp 5.000.000,00',
      tag: 'Proyek',
    },
    {
      tanggal: '19/08/2024',
      no: 'Penawaran #202',
      nama: 'CV Berkah',
      tanggalBerlaku: '26/08/2024',
      status: 'Diterima',
      total: 'Rp 3.750.000,00',
      tag: 'Konsultasi',
    },
  ];

  const cardData = [
    { title: 'Total Penagihan Belum Di Bayar', value: 'Rp 00,00', count: 0 },
    { title: 'Total Penagihan Telat Di Bayar', value: 'Rp 00,00', count: 0 },
    { title: 'Total Pelunasan Diterima 30 Hari Terakhir', value: 'Rp 00,00', count: 0 },
  ];

  const statusBodyTemplate = (rowData: PenjualanItem | PengirimanItem | PesananItem | PenawaranItem) => {
    return <Tag value={rowData.status} severity="success" />;
  };

  const tagBodyTemplate = (rowData: PenjualanItem | PengirimanItem | PesananItem | PenawaranItem) => {
    return <Tag value={rowData.tag} severity="info" />;
  };

  const actionBodyTemplate = () => {
    return (
      <>
        <Button icon="pi pi-file" rounded text severity="secondary" className="mr-2" aria-label="Cetak" />
        <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Hapus" />
      </>
    );
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'] = { value: value, matchMode: FilterMatchMode.CONTAINS };

    setFilters(_filters);
    setGlobalFilter(value);
  };

  const tabViewStyle = {
    inkbar: { className: 'bg-green-400' },
    root: { className: 'border-round' },
    nav: { className: 'bg-transparent pl-5 pr-5' },
    panelContainer: { className: 'border-1 border-round-bottom border-gray-200' }
  };

  // Jumlah data yang membutuhkan persetujuan (contoh)
  const approvalCount = 1;

  const router = useRouter();

  const handleTambahPenagihan = () => {
    if (selectedJenisPenagihan === 'penagihan') {
      router.push('/penjualan/addPenagihanPenjualan');
    }
  };

  const renderDataTable = (data: any[], fields: string[]) => (
    <DataTable 
      value={data} 
      responsiveLayout="scroll"
      filters={filters}
      globalFilterFields={fields}
    >
      {fields.map(field => (
        <Column 
          key={field} 
          field={field} 
          header={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()} 
          body={field === 'status' ? statusBodyTemplate : field === 'tag' ? tagBodyTemplate : undefined} 
        />
      ))}
      <Column body={actionBodyTemplate} header="Aksi" />
    </DataTable>
  );

  const renderPengirimanTab = () => (
    <>
      <div className="flex justify-content-between align-items-center mb-4">
        <div className="flex align-items-center">
          <Dropdown 
            value={pengirimanStatus} 
            options={pengirimanStatusOptions} 
            onChange={(e) => setPengirimanStatus(e.value)} 
            placeholder="Semua status"
            className="mr-2"
          />
        </div>
        <div className="flex align-items-center">
          <span className="p-input-icon-left mr-2">
            <i className="pi pi-search" />
            <InputText 
              value={pengirimanFilter} 
              onChange={(e) => setPengirimanFilter(e.target.value)} 
              placeholder="Pencarian" 
            />
          </span>
        </div>
      </div>
      {renderDataTable(pengirimanData, ['tanggal', 'no', 'nama', 'status', 'total', 'tag'])}
    </>
  );

  const renderPesananTab = () => (
    <>
      <div className="flex justify-content-between align-items-center mb-4">
        <div className="flex align-items-center">
          <Dropdown 
            value={pesananJenis} 
            options={pesananJenisOptions} 
            onChange={(e) => setPesananJenis(e.value)} 
            placeholder="Pesanan"
            className="mr-2"
          />
          <Dropdown 
            value={pesananStatus} 
            options={pesananStatusOptions} 
            onChange={(e) => setPesananStatus(e.value)} 
            placeholder="Semua status"
            className="mr-2"
          />
        </div>
        <div className="flex align-items-center">
          <span className="p-input-icon-left mr-2">
            <i className="pi pi-search" />
            <InputText 
              value={pesananFilter} 
              onChange={(e) => setPesananFilter(e.target.value)} 
              placeholder="Pencarian" 
            />
          </span>
        </div>
      </div>
      {renderDataTable(filteredPesananData, ['tanggal', 'no', 'nama', 'tanggalKirim', 'status', 'total', 'tag'])}
    </>
  );

  useEffect(() => {
    if (selectedJenisPenagihan === 'fakturProforma') {
      setFilteredPenjualanData(penjualanProformaData);
    } else {
      setFilteredPenjualanData(penjualanData);
    }
  }, [selectedJenisPenagihan]);

  useEffect(() => {
    if (pesananJenis === 'pesananProforma') {
      setFilteredPesananData(pesananProformaData);
    } else {
      setFilteredPesananData(pesananData);
    }
  }, [pesananJenis]);

  return (
    <div className="p-4">
      <div className="poppins-bold text-3xl mb-4">Penjualan</div>
      <div className="grid">
        {cardData.map((card, index) => (
          <div key={index} className="col-4">
            <Card className="shadow-1">
              <div className="text-500 font-medium mb-2">{card.title}</div>
              <div className="flex align-items-center">
                <Badge value={card.count} severity="success" className="mr-2"></Badge>
                <span className="text-900 font-medium text-xl">{card.value}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Card className="shadow-1">
          <TabView 
            activeIndex={activeIndex} 
            onTabChange={(e) => setActiveIndex(e.index)}
            pt={tabViewStyle}
          >
            <TabPanel header="Penagihan" pt={{
              headerAction: () => ({
                style: { height: '40px' },
                className: `text-gray-400 ${activeIndex === 0 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
              })
            }}>
              <div className="flex justify-content-between align-items-center mb-4">
                <div className="flex align-items-center">
                  <Dropdown 
                    value={selectedJenisPenagihan} 
                    options={jenisPenagihanOptions} 
                    onChange={(e) => setSelectedJenisPenagihan(e.value)} 
                    placeholder="Penagihan"
                    className="mr-2"
                  />
                  <Dropdown 
                    value={selectedStatus} 
                    options={statusOptions} 
                    onChange={(e) => setSelectedStatus(e.value)} 
                    placeholder="Semua status"
                  />
                </div>
                <div className="flex align-items-center">
                  <span className="p-input-icon-left mr-2">
                    <i className="pi pi-search" />
                    <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="Pencarian" />
                  </span>
                  <Button icon="pi pi-file-import" label="Impor" className="mr-2" severity="success" />
                  <Button icon="pi pi-plus" label="Tambah" severity="success" onClick={handleTambahPenagihan} />
                </div>
              </div>
              {renderDataTable(filteredPenjualanData, ['tanggal', 'no', 'nama', 'tanggalJatuhTempo', 'status', 'sisaTagihan', 'total', 'tag'])}
            </TabPanel>
            <TabPanel header="Pengiriman" pt={{
              headerAction: () => ({
                style: { height: '40px' },
                className: `text-gray-400 ${activeIndex === 1 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
              })
            }}>
              {renderPengirimanTab()}
            </TabPanel>
            <TabPanel header="Pesanan" pt={{
              headerAction: () => ({
                style: { height: '40px' },
                className: `text-gray-400 ${activeIndex === 2 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
              })
            }}>
              {renderPesananTab()}
            </TabPanel>
            <TabPanel header="Penawaran" pt={{
              headerAction: () => ({
                style: { height: '40px' },
                className: `text-gray-400 ${activeIndex === 3 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
              })
            }}>
              {renderDataTable(penawaranData, ['tanggal', 'no', 'nama', 'tanggalBerlaku', 'status', 'total', 'tag'])}
            </TabPanel>
            <TabPanel 
              header={
                <div className="flex align-items-center">
                  <span className="mr-2">Membutuhkan Persetujuan</span>
                  <Badge value={approvalCount} severity="danger"></Badge>
                </div>
              }
              pt={{
                headerAction: () => ({
                  style: { height: '40px' },
                  className: `text-gray-400 ${activeIndex === 4 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
                })
              }}
            >
              <div className="flex justify-content-end align-items-center mb-4">
                <div className="flex align-items-center">
                  <span className="p-input-icon-left mr-2">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Pencarian" />
                  </span>
                  <Button icon="pi pi-file-import" label="Impor" className="mr-2" severity="success" />
                </div>
              </div>
            </TabPanel>
          </TabView>
        </Card>
      </div>
    </div>
  );
};

export default Penjualan;
