"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { apiEndpoints } from '@/app/api/api';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { Tag } from 'primereact/tag';
import { Chip } from 'primereact/chip';
import { Divider } from 'primereact/divider';

interface ContactDetail {
  id: number;
  kode: string;
  nama_tampilan: string;
  nama_lengkap: string;
  nama_perusahaan: string;
  alamat_penagihan: string;
  alamat_pengiriman: string;
  email: string;
  no_handphone: string;
  no_telepon: string;
  no_fax: string;
  npwp: string;
  identitas: string;
  nomor_identitas: string;
  info_lainnya: string;
  data_tipe_kontak: Array<{
    master_contact: {
      nama: string;
    };
  }>;
  data_grub_contacts: Array<{
    grup_kontak: {
      nama: string;
    };
  }>;
  data_bank_contacts: Array<{
    nama_bank: string;
    cabang_bank: string;
    pemegang_akun_bank: string;
    nomor_rekening: string;
    master_nama_bank: {
      nama_bank: string;
    };
  }>;
  sebutan_kontak: {
    name: string;
  };
  identitas_kontak: {
    name: string;
  };
  akun_piutang: {
    kode:number;
    nama:string;
  };
  akun_hutang: {
    kode:number;
    nama:string;
  }
  hutang_max: number;
  syarat_pembayaran_utama: string;
}

const ContactDetailPage: React.FC = () => {
  const router = useRouter();
  const [contact, setContact] = useState<ContactDetail | null>(null);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    if (id) {
      axios.get(`${apiEndpoints.getKontakById(id)}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        setContact(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact details:", error);
      });
    }
  }, []);

  const getTypeSeverity = (type: string) => {
    switch (type) {
      case 'Pelanggan':
        return 'warning';
      case 'Supplier':
        return 'info';
      case 'Karyawan':
        return 'success';
      case 'Lainnya':
        return 'help';
      default:
        return 'secondary';
    }
  };

  if (!contact) {
    return <div>Loading...</div>;
  }

  const renderInfoTable = (data: { [key: string]: string }) => (
    <div className="p-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex py-2 border-bottom-1 surface-border">
          <div className="w-6 font-medium">{key}</div>
          <div className="w-6">{value}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="card">
      <h1 className="text-3xl font-bold mb-4">Informasi kontak</h1>
      <TabView>
        <TabPanel header="Profil">
          <Card className="mb-4">
            <div className="flex align-items-center justify-content-between flex-wrap">
              <h2 className="text-xl font-semibold">{contact.nama_tampilan}</h2>
              <div className="flex flex-wrap gap-1">
                {contact.data_tipe_kontak.map((type, index) => (
                  <Tag 
                    key={index} 
                    value={type.master_contact.nama}
                    style={{height:"20px"}} 
                    severity={getTypeSeverity(type.master_contact.nama) as "warning" | "info" | "success" | "danger" | null | undefined}
                  />
                ))}
                <Divider layout="vertical"/>
                {contact.data_grub_contacts.map((group, index) => (
                  <Chip 
                    key={index} 
                    style={{height:"20px"}}
                    label={group.grup_kontak.nama} 
                    className="bg-primary text-white"
                  />
                ))}
              </div>
            </div>
          </Card>
          
          <div className="grid">
            <div className="col-12 md:col-6">
              <Card title="Informasi umum" className="h-full">
                {renderInfoTable({
                  'Nama kontak': contact.nama_lengkap,
                  'Nama Perusahaan': contact.nama_perusahaan,
                  'Email': contact.email,
                  'Nomor handphone': contact.no_handphone,
                  'Nomor telepon': contact.no_telepon,
                  'Fax': contact.no_fax,
                  'NPWP': contact.npwp,
                  'Sebutan': contact.sebutan_kontak?.name || '-',
                  'Identitas': contact.identitas_kontak?.name || '-'
                })}
              </Card>
            </div>
            <div className="col-12 md:col-6">
              <Card title="Informasi tambahan" className="h-full">
                {renderInfoTable({
                  'Identitas': contact.identitas,
                  'Nomor identitas': contact.nomor_identitas,
                  'Alamat penagihan': contact.alamat_penagihan,
                  'Alamat pengiriman': contact.alamat_pengiriman,
                  'Info lainnya': contact.info_lainnya
                })}
              </Card>
            </div>
          </div>

          <Card title="Info bank" className="mt-4">
            {contact.data_bank_contacts.map((bank, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold mb-2">Bank {index + 1}</h3>
                {renderInfoTable({
                  'Nama bank': bank.master_nama_bank.nama_bank,
                  'Kantor cabang bank': bank.cabang_bank,
                  'Nomor rekening': bank.nomor_rekening,
                  'Pemegang akun bank': bank.pemegang_akun_bank
                })}
              </div>
            ))}
          </Card>

          <Card title="Pemetaan akun" className="mt-4">
            {renderInfoTable({
              'Akun hutang': `(${contact.akun_hutang.kode}) ${contact.akun_hutang.nama}`,
              'Akun piutang': `(${contact.akun_piutang.kode}) ${contact.akun_piutang.nama}`,
              'Hutang maksimum': `Rp${contact.hutang_max.toLocaleString()},00`,
              'Syarat pembayaran utama': contact.syarat_pembayaran_utama
            })}
          </Card>

          <Button 
            label="Kembali" 
            icon="pi pi-arrow-left" 
            className="mt-4"
            onClick={() => router.back()}
          />
        </TabPanel>
        <TabPanel header="Transaksi">
          <p>Konten transaksi akan ditampilkan di sini.</p>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default ContactDetailPage;