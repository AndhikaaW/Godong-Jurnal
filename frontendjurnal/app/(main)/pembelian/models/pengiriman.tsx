export interface Pengiriman {
    tanggal: string;
    no: string;
    supplier: string;
    status: 'Open' | 'Closed';
    tag: string;
}

export const pengirimanData: Pengiriman[] = [
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Delivery #10001', 
        supplier: 'Rahma', 
        status: 'Closed', 
        tag: 'Rahma' 
    },
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Delivery #10002', 
        supplier: 'Harum', 
        status: 'Closed', 
        tag: 'Harum' 
    }
];

export const pengirimanColumns = [
    { field: 'tanggal', header: 'Tanggal' },
    { field: 'no', header: 'No' },
    { field: 'supplier', header: 'Supplier' },
    { field: 'status', header: 'Status' },
    { field: 'tag', header: 'Tag' }
];
