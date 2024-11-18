"use client"
import React from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { PenagihanPenjualan } from '../../../../models/PenagihanPenjualan';

// Helper function
function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PenagihanPenjualanPage() {
  const data = PenagihanPenjualan;

  return (
    <div className="p-4">
      <div className="text-2xl font-bold text-green-600 mb-2">Penjualan</div>
      <Card className="mb-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <h2 className="text-xl font-bold">Penagihan Penjualan {data.nomorPenagihan}</h2>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Dibayar</span>
        </div>
        
        <div className="grid">
          <div className="col-12 md:col-8">
            <h3 className="text-lg font-semibold mb-2">Detail Penagihan Penjualan</h3>
            <div className="grid">
              <div className="col-3 font-medium">Pelanggan</div>
              <div className="col-9">{data.pelanggan}</div>
              <div className="col-3 font-medium">Email</div>
              <div className="col-9">{data.email}</div>
              <div className="col-3 font-medium">Alamat Penagihan</div>
              <div className="col-9">{data.alamatPenagihan}</div>
              <div className="col-3 font-medium">Tanggal Transaksi</div>
              <div className="col-9">{data.tanggalTransaksi}</div>
              <div className="col-3 font-medium">Tanggal Jatuh Tempo</div>
              <div className="col-9">{data.tanggalJatuhTempo}</div>
              <div className="col-3 font-medium">Syarat Pembayaran</div>
              <div className="col-9">{data.syaratPembayaran}</div>
              <div className="col-3 font-medium">No Transaksi</div>
              <div className="col-9">{data.noTransaksi}</div>
              <div className="col-3 font-medium">No Referensi</div>
              <div className="col-9">{data.noReferensi}</div>
              <div className="col-3 font-medium">Gudang</div>
              <div className="col-9">{data.gudang}</div>
              <div className="col-3 font-medium">Tag</div>
              <div className="col-9">{data.tag}</div>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 mb-2">
                Sisa Tagihan: {formatRupiah(data.sisaTagihan)}
              </div>
              <a href="#" className="text-blue-500">Lihat Jurnal Entry</a>
            </div>
          </div>
        </div>

        <DataTable value={data.produk} className="mt-4">
          <Column field="nama" header="Produk"></Column>
          <Column field="deskripsi" header="Deskripsi"></Column>
          <Column field="kuantitas" header="Kuantitas"></Column>
          <Column field="unit" header="Unit"></Column>
          <Column field="hargaSatuan" header="Harga Satuan" body={(rowData) => formatRupiah(rowData.hargaSatuan)}></Column>
          <Column field="diskon" header="Diskon"></Column>
          <Column field="pajak" header="Pajak"></Column>
          <Column field="jumlah" header="Jumlah" body={(rowData) => formatRupiah(rowData.jumlah)}></Column>
        </DataTable>

        <div className="mt-4">
          <div className="text-sm">Pesan: {data.pesan}</div>
          <div className="text-sm">Catatan: {data.catatan}</div>
          <div className="text-sm">Lampiran (1): {data.lampiran}</div>
        </div>

        <div className="flex justify-content-end mt-4">
          <div className="w-6">
            <div className="flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>{formatRupiah(data.subtotal)}</span>
            </div>
            <div className="flex justify-content-between mb-2">
              <span>PPN 11.0%</span>
              <span>{formatRupiah(data.total - data.subtotal)}</span>
            </div>
            <div className="flex justify-content-between font-bold">
              <span>Total</span>
              <span>{formatRupiah(data.total)}</span>
            </div>
            <div className="flex justify-content-between font-bold text-green-600">
              <span>Sisa Tagihan</span>
              <span>{formatRupiah(data.sisaTagihan)}</span>
            </div>
          </div>
        </div>
      </Card>

      <TabView>
        <TabPanel header="ProForma">
          {/* Konten ProForma */}
        </TabPanel>
        <TabPanel header="Pembayaran">
          <DataTable value={data.pembayaran}>
            <Column field="tanggal" header="Tanggal"></Column>
            <Column field="no" header="No"></Column>
            <Column field="pelanggan" header="Pelanggan"></Column>
            <Column field="tanggalJatuhTempo" header="Tanggal Jatuh Tempo"></Column>
            <Column field="status" header="Status" body={(rowData) => <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">{rowData.status}</span>}></Column>
            <Column field="jumlah" header="Jumlah" body={(rowData) => formatRupiah(rowData.jumlah)}></Column>
          </DataTable>
        </TabPanel>
      </TabView>

      <div className="flex justify-content-end mt-4">
        <Button label="Hapus" className="p-button-danger mr-2" />
        <Button label="Ubah" className="p-button-secondary mr-2" />
        <Button label="Bagikan" className="p-button-secondary mr-2" />
        <Button label="Print Dot Matrix" className="p-button-secondary mr-2" />
        <Button label="Tindakan" className="p-button-success" />
      </div>
    </div>
  );
}
