export interface FakturPembelian {
    tanggal: string;
    no: string;
    supplier: string;
    tanggalJatuhTempo: string;
    status: 'Open' | 'Closed';
    sisaTagihan: string;
    total: string;
    tag: string;
}

export const fakturPembelianData: FakturPembelian[] = [
    { 
        tanggal: '13/08/2024', 
        no: 'Purchase Inv #10002', 
        supplier: 'Harum', 
        tanggalJatuhTempo: '13/08/2024', 
        status: 'Open', 
        sisaTagihan: 'Rp00', 
        total: 'Rp00', 
        tag: 'Harum' 
    },
    { 
        tanggal: '13/08/2024', 
        no: 'Purchase Inv #10001', 
        supplier: 'Rahma', 
        tanggalJatuhTempo: '13/08/2024', 
        status: 'Open', 
        sisaTagihan: 'Rp00', 
        total: 'Rp00', 
        tag: 'Rahma' 
    }
];

export const fakturPembelianColumns = [
    { field: 'tanggal', header: 'Tanggal' },
    { field: 'no', header: 'No' },
    { field: 'supplier', header: 'Supplier' },
    { field: 'tanggalJatuhTempo', header: 'Tanggal Jatuh Tempo' },
    { field: 'status', header: 'Status' },
    { field: 'sisaTagihan', header: 'Sisa Tagihan' },
    { field: 'total', header: 'Total' },
    { field: 'tag', header: 'Tag' }
];
