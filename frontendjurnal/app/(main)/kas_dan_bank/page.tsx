"use client"
import React, { useRef, useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Checkbox } from 'primereact/checkbox'
import { Menu } from 'primereact/menu'
import { MenuItem } from 'primereact/menuitem'
import { Badge } from 'primereact/badge'


export default function KasBank() {
  const [showInactiveAccounts, setShowInactiveAccounts] = useState(true)
  const createAccountMenu = useRef<Menu>(null)
  const importMenu = useRef<Menu>(null)

  const summaryData = [
    { label: 'Pemasukan 30 hari mendatang', value: 'Rp 00,00', count: 0, color: 'bg-green-100' },
    { label: 'Pengeluaran 30 hari mendatang', value: 'Rp 00,00', count: 0, color: 'bg-yellow-100' },
    { label: 'Saldo Kas dan Bank', value: 'Rp 00,00', count: 0, color: 'bg-blue-100' },
    { label: 'Saldo Kartu Kredit', value: 'Rp 00,00', count: 0, color: 'bg-purple-100' },
  ]

  const accountData = [
    { kodeAkun: '1-10001', namaAkun: 'Kas', hubungan: 'Hubungkan ke Bank', saldoBank: 'Rp 00,00', saldoJurnal: 'Rp 00,00' },
    { kodeAkun: '1-10002', namaAkun: 'Bank', hubungan: 'Hubungkan ke Bank', saldoBank: 'Rp 00,00', saldoJurnal: 'Rp 00,00' },
  ]

  const createAccountItems: MenuItem[] = [
    {
      label: 'AKUN',
      items: [{ label: 'Buat akun baru', command: () => {/* logika untuk membuat akun baru */} }]
    },
    {
      label: 'TRANSAKSI',
      items: [
        { label: 'Transfer Uang', command: () => {/* logika untuk transfer uang */} },
        { label: 'Terima Uang', command: () => {/* logika untuk terima uang */} },
        { label: 'Kirim Uang', command: () => {/* logika untuk kirim uang */} }
      ]
    }
  ]

  const importItems: MenuItem[] = [
    { label: 'Transfer Uang', command: () => {/* logika untuk impor transfer uang */} },
    { label: 'Terima Uang', command: () => {/* logika untuk impor terima uang */} },
    { label: 'Kirim Uang', command: () => {/* logika untuk impor kirim uang */} }
  ]

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h1 className="poppins-bold text-3xl mb-4">Kas dan Bank</h1>
        <Button label="Beri Masukan" icon="pi pi-thumbs-up" className="p-button-success" />
      </div>

      <div className="grid">
        {summaryData.map((item, index) => (
          <div key={index} className="col-12 md:col-3 mb-4">
            <div className="card h-full p-0 w-full flex flex-column">
              <div className={`w-full ${item.color} border-round-top-xl text-base p-2`}>{item.label}</div>
              <div className="w-full p-2 text-sm">Total</div>
              <div className="flex flex-row gap-4 mb-2">
                <div style={{ width: '20px' }} className="ml-2">
                    <Badge size="large" className={`${item.color} w-full`} value={item.count}></Badge>
                </div>
                  <span className="text-xl mt-1">{item.value}</span>
                </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <Checkbox 
          inputId="showInactiveAccounts" 
          checked={showInactiveAccounts} 
          onChange={(e) => setShowInactiveAccounts(e.checked || false)}
        />
        <label htmlFor="showInactiveAccounts" className="ml-2">Tampilkan akun yang diarsipkan</label>
      </div>

      <div className="flex justify-content-end mb-4">
        <Menu model={createAccountItems} popup ref={createAccountMenu} />
        <Button 
          label="Buat Akun/Transaksi" 
          iconPos="left"
          className="p-button-outlined mr-2" 
          onClick={(e) => createAccountMenu.current?.toggle(e)}
          icon="pi pi-chevron-down"
        />
      </div>

      <DataTable value={accountData} className="mb-4">
        <Column field="kodeAkun" header="Kode Akun" />
        <Column field="namaAkun" header="Nama Akun" />
        <Column field="hubungan" header="Hubungan" body={(rowData) => (
          <Button label={rowData.hubungan} className="p-button-text p-button-success" />
        )} />
        <Column field="saldoBank" header="Saldo Bank" />
        <Column field="saldoJurnal" header="Saldo di Jurnal" />
        <Column body={() => (
          <>
            <Menu model={importItems} popup ref={importMenu} />
            <Button 
              label="Impor" 
              className="p-button-text" 
              icon="pi pi-chevron-down" 
              iconPos="right"
              onClick={(e) => importMenu.current?.toggle(e)}
            />
          </>
        )} />
      </DataTable>

      <h2 className="text-xl font-bold mb-2">Kartu Kredit</h2>
      <DataTable value={[]} emptyMessage="Tidak ada data kartu kredit">
        {/* Kolom untuk kartu kredit bisa ditambahkan di sini */}
      </DataTable>
    </div>
  )
}
