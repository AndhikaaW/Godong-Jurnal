export interface PemesananPembelian {
    tanggal: string;
    no: string;
    supplier: string;
    tanggalJatuhTempo: string;
    status: 'Open' | 'Closed';
    jumlahDP: string;
    total: string;
    tag: string;
}

export const pemesananPembelianData: PemesananPembelian[] = [
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Order #10001', 
        supplier: 'Rahma', 
        tanggalJatuhTempo: '02/10/2024', 
        status: 'Closed', 
        jumlahDP: 'Rp0,00', 
        total: 'Rp77.700,00', 
        tag: 'Rahma' 
    },
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Order #10002', 
        supplier: 'Harum', 
        tanggalJatuhTempo: '02/10/2024', 
        status: 'Closed', 
        jumlahDP: 'Rp0,00', 
        total: 'Rp77.700,00', 
        tag: 'Harum' 
    }
];

export const pemesananPembelianColumns = [
    { field: 'tanggal', header: 'Tanggal' },
    { field: 'no', header: 'No' },
    { field: 'supplier', header: 'Supplier' },
    { field: 'tanggalJatuhTempo', header: 'Tanggal Jatuh Tempo' },
    { field: 'status', header: 'Status' },
    { field: 'jumlahDP', header: 'Jumlah DP' },
    { field: 'total', header: 'Total' },
    { field: 'tag', header: 'Tag' }
];
