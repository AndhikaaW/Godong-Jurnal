export interface PermintaanPembelian {
    tanggal: string;
    no: string;
    staffPenyetuju: string;
    tanggalJatuhTempo: string;
    status: 'Open' | 'Closed';
    totalBarang: string;
    urgensi: 'Rendah' | 'Sedang' | 'Tinggi';
    tag: string;
}

export const permintaanPembelianData: PermintaanPembelian[] = [
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Request #10001', 
        staffPenyetuju: 'Affan', 
        tanggalJatuhTempo: '02/10/2024', 
        status: 'Closed', 
        totalBarang: '1 barang', 
        urgensi: 'Sedang',
        tag: 'Mobil baru'
    },
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Request #10002', 
        staffPenyetuju: 'Harum', 
        tanggalJatuhTempo: '02/10/2024', 
        status: 'Closed', 
        totalBarang: '1 barang', 
        urgensi: 'Tinggi',
        tag: ''
    },
    { 
        tanggal: '03/09/2024', 
        no: 'Purchase Request #10003', 
        staffPenyetuju: 'Rahma', 
        tanggalJatuhTempo: '02/10/2024', 
        status: 'Open', 
        totalBarang: '1 barang', 
        urgensi: 'Rendah',
        tag: ''
    }
];

export const permintaanPembelianColumns = [
    { field: 'tanggal', header: 'Tanggal' },
    { field: 'no', header: 'No' },
    { field: 'staffPenyetuju', header: 'Staff Penyetuju' },
    { field: 'tanggalJatuhTempo', header: 'Tanggal Jatuh Tempo' },
    { field: 'status', header: 'Status' },
    { field: 'totalBarang', header: 'Total Barang' },
    { field: 'urgensi', header: 'Urgensi' },
    { field: 'tag', header: 'Tag' }
];
