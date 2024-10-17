export interface PenawaranPembelian {
    tanggal: string;
    no: string;
    supplier: string;
    status: 'Open' | 'Closed';
    total: string;
    tag: string;
}

export const penawaranPembelianData: PenawaranPembelian[] = [
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Quotes #10001', 
        supplier: 'Affan', 
        status: 'Closed', 
        total: 'Rp530.000.000', 
        tag: 'Mobil baru'
    },
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Quotes #10002', 
        supplier: 'Harum', 
        status: 'Closed', 
        total: 'Rp44.000', 
        tag: ''
    }
];

export const penawaranPembelianColumns = [
    { field: 'tanggal', header: 'Tanggal' },
    { field: 'no', header: 'No' },
    { field: 'supplier', header: 'Supplier' },
    { field: 'status', header: 'Status' },
    { field: 'total', header: 'Total' },
    { field: 'tag', header: 'Tag' }
];
