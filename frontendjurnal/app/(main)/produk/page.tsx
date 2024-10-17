"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { FileUpload } from 'primereact/fileupload';
import { Badge } from 'primereact/badge';
import { InputSwitch } from 'primereact/inputswitch';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import LoadingNavigator from '@/app/Components/LoadingNavigator';
import AddCategoryDialog from '@/app/Components/KategoriProdukDialog';
import { Sidebar } from 'primereact/sidebar';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';

interface Category {
    name: string;
    count: number;
}

interface Product {
    name: string;
    code: string;
    category: string;
    totalStock: number;
    qtyAvailable: string;
    unit: string;
    buyPrice: number;
    sellPrice: number;
    minLimit: number;
    avgPrice: number;
    lastBuyPrice: number;
}

interface Warehouse {
    kodeGudang: string;
    namaGudang: string;
    penanggungJawab: string;
    alamat: string;
    status: 1 | 2; // 1 for inactive, 2 for active
}

interface StockCard {
    title: string;
    total: number;
    color: string;
}

interface ColumnDef {
    field: keyof Product;
    header: string;
}

interface CustomFilterMetaData {
    value: any;
    matchMode: FilterMatchMode;
}

interface CustomOperatorFilterMetaData {
    operator: FilterOperator;
    constraints: CustomFilterMetaData[];
}

type CustomFilterMeta = {
    [key: string]: CustomFilterMetaData | CustomOperatorFilterMetaData;
};

const ProductPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showCategoryDialog, setShowCategoryDialog] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const menu = React.useRef<Menu>(null);
    const router = useRouter()
    const [visibleFilter, setVisibleFilter] = useState<boolean>(false);
    const [filterKeyword, setFilterKeyword] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('');
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [filterIncludeAll, setFilterIncludeAll] = useState<boolean>(true);
    const [filterShowArchived, setFilterShowArchived] = useState<boolean>(false);

    const openCategoryDialog = () => {
        setShowCategoryDialog(true);
    };

    const closeCategoryDialog = () => {
        setShowCategoryDialog(false);
    };

    const handleCategoriesChange = (updatedCategories: Category[]) => {
        setCategories(updatedCategories);
    };

    const actionItems: MenuItem[] = [
        {
            label: 'PRODUK',
            items: [{
                label: 'Tambah produk baru',
                command: () => {
                    setIsLoading(true);
                    router.push('/produk/addProduk');
                }
            }]
        },
        {
            label: 'GUDANG',
            items: [
                {
                    label: 'Tambah gudang baru',
                    command: () => {
                        setIsLoading(true);
                        router.push('/produk/addGudang');
                    }
                },
                {
                    label: 'Sesuaikan stok (stock opname)',
                    command: () => {
                        setIsLoading(true);
                        router.push('/produk/stockOpname');
                    }
                },
                {
                    label: 'Transfer gudang',
                    command: () => {
                        setIsLoading(true);
                        router.push('/produk/transferGudang');
                    }
                }
            ]
        },
        {
            label: 'ATURAN HARGA',
            items: [{
                label: 'Buat aturan harga baru',
                command: () => {
                    setIsLoading(true);
                    router.push('/produk/addAturanHarga');
                }
            }]
        }
    ];

    const [products, setProducts] = useState<Product[]>([
        { name: 'Indomie Goreng', code: '1 - 10001', category: 'Makanan', totalStock: 10, qtyAvailable: '-', unit: 'Buah', buyPrice: 20000, sellPrice: 22000, minLimit: 5, avgPrice: 21000, lastBuyPrice: 20000 },
        { name: 'Innova Venturer', code: '1 - 10002', category: 'Kendaraan', totalStock: 5, qtyAvailable: '-', unit: 'Unit', buyPrice: 500000000, sellPrice: 520000000, minLimit: 1, avgPrice: 510000000, lastBuyPrice: 500000000 }
    ]);
    
    const [warehouses, setWarehouses] = useState<Warehouse[]>([
        { kodeGudang: '1 - 10001', namaGudang: 'Warehouse 1', penanggungJawab: 'Affan', alamat: 'Ponorogo', status: 2 },
        { kodeGudang: '1 - 10002', namaGudang: 'Warehouse 2', penanggungJawab: 'Hanum', alamat: 'Ngawi', status: 1 },
        { kodeGudang: '1 - 10003', namaGudang: 'Warehouse 3', penanggungJawab: 'Rahma', alamat: 'Trenggalek', status: 2 },
        { kodeGudang: '1 - 10004', namaGudang: 'Warehouse 4', penanggungJawab: 'Tian', alamat: 'Pacitan', status: 1 }
    ]);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [showInactiveWarehouses, setShowInactiveWarehouses] = useState(false);
    const [productFilters, setProductFilters] = useState<CustomFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [warehouseFilters, setWarehouseFilters] = useState<CustomFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const [filteredWarehouses, setFilteredWarehouses] = useState<Warehouse[]>(warehouses);

    useEffect(() => {
        const filtered = warehouses.filter(warehouse => 
            showInactiveWarehouses ? true : warehouse.status === 2
        );
        setFilteredWarehouses(filtered);
    }, [showInactiveWarehouses, warehouses]);

    const stockCards: StockCard[] = [
        { title: 'Stok tersedia', total: 0, color: 'bg-green-100' },
        { title: 'Stok segera habis', total: 0, color: 'bg-yellow-100' },
        { title: 'Stok habis', total: 0, color: 'bg-red-100' },
        { title: 'Gudang', total: warehouses.length, color: 'bg-blue-100' }
    ];

    const [selectedColumns, setSelectedColumns] = useState<ColumnDef[]>([
        { field: 'name', header: 'Nama produk' },
        { field: 'code', header: 'Kode produk' },
        { field: 'category', header: 'Kategori produk' },
        { field: 'totalStock', header: 'Total stok' },
        { field: 'unit', header: 'Unit' },
        { field: 'avgPrice', header: 'Harga rata-rata' },
        { field: 'lastBuyPrice', header: 'Harga beli terakhir' },
        { field: 'buyPrice', header: 'Harga beli' },
        { field: 'sellPrice', header: 'Harga jual' }
    ]);

    const columns: ColumnDef[] = [
        { field: 'name', header: 'Nama produk' },
        { field: 'code', header: 'Kode produk' },
        { field: 'category', header: 'Kategori produk' },
        { field: 'totalStock', header: 'Total stok' },
        { field: 'qtyAvailable', header: 'Qty tersedia' },
        { field: 'minLimit', header: 'Batas minimum' },
        { field: 'unit', header: 'Unit' },
        { field: 'avgPrice', header: 'Harga rata-rata' },
        { field: 'lastBuyPrice', header: 'Harga beli terakhir' },
        { field: 'buyPrice', header: 'Harga beli' },
        { field: 'sellPrice', header: 'Harga jual' }
    ];

    const onColumnToggle = (event: MultiSelectChangeEvent) => {
        const selectedColumns = event.value as ColumnDef[];
        setSelectedColumns(selectedColumns);
    };

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };

    const onProductGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...productFilters };
        (_filters['global'] as CustomFilterMetaData).value = value;
        setProductFilters(_filters);
    };

    const onWarehouseGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...warehouseFilters };
        (_filters['global'] as CustomFilterMetaData).value = value;
        setWarehouseFilters(_filters);
    };

    const statusBodyTemplate = (rowData: Warehouse) => {
        return <Badge value={rowData.status === 2 ? 'Aktif' : 'Tidak Aktif'} 
                      severity={rowData.status === 2 ? 'success' : 'danger'} />;
    };

    const ProductTableHeader = (
        <div className="flex flex-column">
            <div className="grid">
                <div className="col-5">
                    <div className="grid">
                        <div className="col-fixed" style={{ width: '220px' }}>
                            <MultiSelect value={selectedColumns} options={columns} optionLabel="header" 
                                        className="w-full" onChange={onColumnToggle} display="chip" 
                                        placeholder="Pilih kolom yang ditampilkan" />
                        </div>
                        <div className="col">
                        <Button label="Atur Kategori Produk" onClick={openCategoryDialog} className="text-sm w-full h-full p-0" />
                        {/* ... kode lainnya ... */}
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="flex justify-content-end gap-1">
                        <div className="p-input-icon-left" style={{ width: '200px' }}>
                            <i className="pi pi-search" />
                            <InputText 
                                value={(productFilters['global'] as CustomFilterMetaData).value as string}
                                onChange={onProductGlobalFilterChange}
                                placeholder="Cari produk" 
                                className="w-full"
                            />
                        </div>
                        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Impor" />
                        <Button label="Expor" className="p-button-success" />
                        <Button label="Filter" className="p-button-success" icon="pi pi-filter" onClick={() => setVisibleFilter(true)} />
                    </div>
                </div>
            </div>
        </div>
    );

    const WarehouseTableHeader = (
        <div className="flex justify-content-between align-items-center">
            <div className="flex align-items-center">
                <InputSwitch 
                    checked={showInactiveWarehouses} 
                    onChange={(e) => setShowInactiveWarehouses(e.value)} 
                    className="mr-2"
                />
                <span>Tampilkan gudang tidak aktif</span>
            </div>
            <div className="flex align-items-center">
                <div className="p-input-icon-left mr-2" style={{ width: '200px' }}>
                    <i className="pi pi-search" />
                    <InputText 
                        value={(warehouseFilters['global'] as CustomFilterMetaData).value as string}
                        onChange={onWarehouseGlobalFilterChange}
                        placeholder="Cari gudang" 
                        className="w-full"
                    />
                </div>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Impor" />
            </div>
        </div>
    );

    const tabViewStyle = {
        inkbar: { className: 'bg-green-400' },
        root: { className: 'border-round' },
        nav: { className: 'bg-transparent pl-5 pr-5' },
        panelContainer: { className: 'border-1 border-round-bottom border-gray-200' }
    };
    
    if (isLoading) {
        return (
            <div className="flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <ProgressSpinner />
            </div>
        );
    }

    const FilterSidebar = (
        <Sidebar visible={visibleFilter} position="right" style={{width: '350px'}} onHide={() => setVisibleFilter(false)} className="p-sidebar-sm">
            <h3>Filter</h3>
            <div className="field">
                <label htmlFor="keyword" className="block">Kata kunci</label>
                <InputText id="keyword" value={filterKeyword} onChange={(e) => setFilterKeyword(e.target.value)} className="w-full" />
            </div>
            <div className="field">
                <label htmlFor="type" className="block">Tipe produk</label>
                <Dropdown id="type" value={filterType} options={[]} onChange={(e) => setFilterType(e.value)} placeholder="Pilih tipe" className="w-full" />
            </div>
            <div className="field">
                <label htmlFor="category" className="block">Kategori produk</label>
                <Dropdown id="category" value={filterCategory} options={[]} onChange={(e) => setFilterCategory(e.value)} placeholder="Pilih kategori" className="w-full" />
            </div>
            <div className="field-radiobutton">
                <RadioButton inputId="includeAll" name="includeOption" value={true} onChange={(e) => setFilterIncludeAll(e.value)} checked={filterIncludeAll} />
                <label htmlFor="includeAll">Mencakup semua</label>
            </div>
            <div className="field-radiobutton">
                <RadioButton inputId="includeOne" name="includeOption" value={false} onChange={(e) => setFilterIncludeAll(e.value)} checked={!filterIncludeAll} />
                <label htmlFor="includeOne">Salah satu</label>
            </div>
            <div className="field-checkbox">
                <Checkbox inputId="showArchived" checked={filterShowArchived} onChange={(e) => setFilterShowArchived(e.checked ?? false)} />
                <label htmlFor="showArchived">Tampilkan arsip</label>
            </div>
            <div className="flex justify-content-between">
                <Button label="Reset filter" className="p-button-text" onClick={() => {
                    setFilterKeyword('');
                    setFilterType('');
                    setFilterCategory('');
                    setFilterIncludeAll(true);
                    setFilterShowArchived(false);
                }} />
                <Button label="Terapkan" className="p-button-success" onClick={() => {
                    // Implementasi logika filter di sini
                    setVisibleFilter(false);
                }} />
            </div>
        </Sidebar>
    );

    return (
        <div className="p-4">
            <div className="grid p-0 mb-4">
                <div className="col poppins-bold text-3xl">Produk</div>
                <div className="col flex justify-content-end p-0 m-0">
                    <Menu model={actionItems} popup ref={menu} style={{width:"250px"}} />
                    <Button 
                        label="Tindakan" 
                        icon="pi pi-angle-down"
                        className="p-button-success" 
                        onClick={(e) => menu.current?.toggle(e)}
                        style={{ height: '35px' }}
                    />
                </div>
            </div>

            <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                pt={tabViewStyle}
            >
                <TabPanel
                    header="Barang & Jasa"
                    pt={{
                        headerAction: () => ({
                            style: { height: '40px' },
                            className: `text-gray-400 ${activeIndex === 0 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
                        })
                    }}
                >
                    <div className="grid">
                        {stockCards.map((card, index) => (
                            <div key={index} className="col-3" style={{ height: '130px' }}>
                                <div className="card h-full p-0 w-full flex flex-column">
                                    <div className={`w-full ${card.color} border-round-top-xl text-base p-2`}>{card.title}</div>
                                    <div className="w-full p-2 text-sm">{card.title === 'Gudang' ? 'Terdaftar' : 'Total Produk'}</div>
                                    <div style={{ width: '20px' }} className="ml-2">
                                        <Badge size="large" className={`${card.color}`} value={card.total}></Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <TabView pt={tabViewStyle}>
                        <TabPanel header="Daftar Produk">
                            <DataTable 
                                value={products} 
                                paginator 
                                header={ProductTableHeader} 
                                rows={10} 
                                filters={productFilters}
                                globalFilterFields={['name', 'code', 'category']}
                                className="p-datatable-sm mt-4 text-sm"
                            >
                                {selectedColumns.map((col) => (
                                    <Column
                                        key={col.field}
                                        field={col.field}
                                        header={col.header}
                                        body={(rowData: Product) => {
                                          if (['buyPrice', 'sellPrice', 'avgPrice', 'lastBuyPrice'].includes(col.field)) {
                                            return formatCurrency(rowData[col.field] as number);
                                        }
                                        return rowData[col.field];
                                    }}
                                />
                            ))}
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Daftar Penyesuaian Stock">
                        <div className="p-4">
                            <h3>Daftar Penyesuaian Stock</h3>
                            <p>Fitur ini akan menampilkan daftar penyesuaian stock.</p>
                        </div>
                    </TabPanel>
                    <TabPanel header="Membutuhkan Persetujuan">
                        <div className="p-4">
                            <h3>Membutuhkan Persetujuan</h3>
                            <p>Fitur ini akan menampilkan item yang membutuhkan persetujuan.</p>
                        </div>
                    </TabPanel>
                </TabView>
            </TabPanel>

            <TabPanel
                header="Gudang"
                pt={{
                    headerAction: () => ({
                        style: { height: '40px' },
                        className: `text-gray-400 ${activeIndex === 1 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
                    })
                }}
            >
                <div className="grid">
                {stockCards.map((card, index) => (
                            <div key={index} className="col-3" style={{ height: '130px' }}>
                                <div className="card h-full p-0 w-full flex flex-column">
                                    <div className={`w-full ${card.color} border-round-top-xl text-base p-2`}>{card.title}</div>
                                    <div className="w-full p-2 text-sm">{card.title === 'Gudang' ? 'Terdaftar' : 'Total Produk'}</div>
                                    <div style={{ width: '20px' }} className="ml-2">
                                        <Badge size="large" className={`${card.color}`} value={card.total}></Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <TabView pt={tabViewStyle}>
                    <TabPanel header="Daftar Gudang">
                        <DataTable 
                            value={filteredWarehouses} 
                            paginator 
                            rows={10} 
                            header={WarehouseTableHeader}
                            filters={warehouseFilters}
                            globalFilterFields={['kodeGudang', 'namaGudang', 'penanggungJawab', 'alamat']}
                            className="p-datatable-sm"
                        >
                            <Column field="kodeGudang" header="Kode Gudang" />
                            <Column field="namaGudang" header="Nama Gudang" />
                            <Column field="penanggungJawab" header="Penanggung Jawab" />
                            <Column field="alamat" header="Alamat" />
                            <Column field="status" header="Status" body={statusBodyTemplate} />
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Daftar Transfer Gudang">
                        <div className="p-4">
                            <h3>Daftar Transfer Gudang</h3>
                            <p>Fitur ini akan menampilkan daftar transfer antar gudang.</p>
                        </div>
                    </TabPanel>
                    <TabPanel header="Membutuhkan Persetujuan">
                        <div className="p-4">
                            <h3>Persetujuan Transfer Gudang</h3>
                            <p>Fitur ini akan menampilkan daftar transfer yang membutuhkan persetujuan.</p>
                        </div>
                    </TabPanel>
                </TabView>
            </TabPanel>

            <TabPanel
                header="Aturan Harga"
                pt={{
                    headerAction: () => ({
                        style: { height: '40px' },
                        className: `text-gray-400 ${activeIndex === 2 ? 'text-gray-900 border-green-400 bg-gray-200' : 'bg-transparent hover:border-green-400'}`
                    })
                }}
            >
                <div className="p-4">
                    <h3>Aturan Harga</h3>
                    <p>Fitur ini akan menampilkan pengaturan untuk aturan harga produk.</p>
                </div>
            </TabPanel>
        </TabView>
        <AddCategoryDialog 
                visible={showCategoryDialog}
                onHide={closeCategoryDialog}
                initialCategories={categories}
                onCategoriesChange={handleCategoriesChange}
        />
        {FilterSidebar}
    </div>
);
};

export default ProductPage;