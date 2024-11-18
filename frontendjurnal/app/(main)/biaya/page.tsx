"use client"
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { TabView, TabPanel } from 'primereact/tabview';
import { Badge } from 'primereact/badge';
import { FilterMatchMode } from 'primereact/api';

interface BiayaItem {
  tanggal: string;
  no: string;
  kategori: string;
  penerima: string;
  status: string;
  sisaTagihan: string;
  total: string;
  tag: string;
  bayar: string;
}

const Biaya: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tanggal: { value: null, matchMode: FilterMatchMode.CONTAINS },
    no: { value: null, matchMode: FilterMatchMode.CONTAINS },
    kategori: { value: null, matchMode: FilterMatchMode.CONTAINS },
    penerima: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sisaTagihan: { value: null, matchMode: FilterMatchMode.CONTAINS },
    total: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tag: { value: null, matchMode: FilterMatchMode.CONTAINS },
    bayar: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const biayaData: BiayaItem[] = [
    {
      tanggal: '13/08/2024',
      no: 'Expense #1111',
      kategori: 'Beban Pokok Pendapatan',
      penerima: '13/08/2024',
      status: 'Open',
      sisaTagihan: 'Rp 00,00',
      total: 'Rp 00,00',
      tag: 'Harian',
      bayar: 'Bayar MPay',
    },
    {
      tanggal: '13/08/2024',
      no: 'Expense #1111',
      kategori: 'Beban Pokok Pendapatan',
      penerima: '13/08/2024',
      status: 'Open',
      sisaTagihan: 'Rp 00,00',
      total: 'Rp 00,00',
      tag: 'Tian',
      bayar: 'Bayar MPay',
    },
  ];

  const cardData = [
    { title: 'Total Biaya Bulan Ini', value: 'Rp 5.000.000,00', count: 10 },
    { title: 'Total Biaya 30 Hari Terakhir', value: 'Rp 15.000.000,00', count: 25 },
    { title: 'Total Biaya belum di Bayar', value: 'Rp 2.500.000,00', count: 5 },
  ];

  const statusBodyTemplate = (rowData: BiayaItem) => {
    return <Tag value={rowData.status} severity="warning" />;
  };

  const tagBodyTemplate = (rowData: BiayaItem) => {
    return <Tag value={rowData.tag} severity="success" />;
  };

  const actionBodyTemplate = () => {
    return <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Cancel" />;
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
  const approvalCount = 3;

  return (
    <div className="p-4">
      <div className="poppins-bold text-3xl mb-4">Biaya</div>
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
            <TabPanel 
              header="Biaya"
              pt={{
                headerAction: () => ({
                  style: { height: '40px' },
                  className: `text-gray-400 ${activeIndex === 0 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
                })
              }}
            >
              <div className="flex justify-content-end align-items-center mb-4">
                <div className="flex align-items-center">
                  <span className="p-input-icon-left mr-2">
                    <i className="pi pi-search" />
                    <InputText 
                      value={globalFilter}
                      onChange={onGlobalFilterChange}
                      placeholder="Pencarian" 
                    />
                  </span>
                  <Button icon="pi pi-file-import" label="Impor" className="mr-2" severity="success" />
                  <Button icon="pi pi-plus" label="Tambah" severity="success" />
                </div>
              </div>
              <DataTable 
                value={biayaData} 
                responsiveLayout="scroll"
                filters={filters}
                globalFilterFields={['tanggal', 'no', 'kategori', 'penerima', 'status', 'sisaTagihan', 'total', 'tag', 'bayar']}
              >
                <Column field="tanggal" header="Tanggal" />
                <Column field="no" header="No" />
                <Column field="kategori" header="Kategori" />
                <Column field="penerima" header="Penerima" />
                <Column field="status" header="Status" body={statusBodyTemplate} />
                <Column field="sisaTagihan" header="Sisa Tagihan" />
                <Column field="total" header="Total" />
                <Column field="tag" header="Tag" body={tagBodyTemplate} />
                <Column field="bayar" header="Bayar" />
                <Column body={actionBodyTemplate} />
              </DataTable>
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
                  className: `text-gray-400 ${activeIndex === 1 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
                })
              }}
            >
              <div className="flex justify-content-end align-items-center mb-4">
                <div className="flex align-items-center">
                  <span className="p-input-icon-left mr-2">
                    <i className="pi pi-search" />
                    <InputText 
                      type="search" 
                      onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} 
                      placeholder="Pencarian" 
                    />
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

export default Biaya;