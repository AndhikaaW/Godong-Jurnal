export interface TukarFakturPembelian {
    tanggal: string;
    no: string;
    supplier: string;
    tanggalJatuhTempo: string;
    status: 'Open' | 'Closed';
    sisaTagihan: string;
    total: string;
}

export const tukarFakturPembelianData: TukarFakturPembelian[] = [
    { 
        tanggal: '13/08/2024', 
        no: 'Purchase Inv #10002', 
        supplier: 'Harum', 
        tanggalJatuhTempo: '13/08/2024', 
        status: 'Open', 
        sisaTagihan: 'Rp00', 
        total: 'Rp00'
    },
    { 
        tanggal: '13/08/2024', 
        no: 'Purchase Inv #10001', 
        supplier: 'Rahma', 
        tanggalJatuhTempo: '13/08/2024', 
        status: 'Open', 
        sisaTagihan: 'Rp00', 
        total: 'Rp00'
    }
];

export const tukarFakturPembelianColumns = [
    { field: 'tanggal', header: 'Tanggal' },
    { field: 'no', header: 'No' },
    { field: 'supplier', header: 'Supplier' },
    { field: 'tanggalJatuhTempo', header: 'Tanggal Jatuh Tempo' },
    { field: 'status', header: 'Status' },
    { field: 'sisaTagihan', header: 'Sisa Tagihan' },
    { field: 'total', header: 'Total' }
];
