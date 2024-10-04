"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { apiEndpoints } from '@/app/api/api';
import { Button } from 'primereact/button';

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
  akun_piutang: number;
  akun_hutang: number;
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

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Informasi kontak</h1>
      <div className="flex mb-4">
        <div className="mr-2">Profil</div>
        <div>Transaksi</div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">TI</h2>
        <div className="flex space-x-2">
          {contact.data_tipe_kontak.map((type, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 rounded-full text-sm">
              {type.master_contact.nama}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Informasi umum</h3>
          <table className="w-full">
            <tbody>
              <tr><td>Nama kontak</td><td>{contact.nama_lengkap}</td></tr>
              <tr><td>Nama Perusahaan</td><td>{contact.nama_perusahaan}</td></tr>
              <tr><td>Email</td><td>{contact.email}</td></tr>
              <tr><td>Nomor handphone</td><td>{contact.no_handphone}</td></tr>
              <tr><td>Nomor telepon</td><td>{contact.no_telepon}</td></tr>
              <tr><td>Fax</td><td>{contact.no_fax}</td></tr>
              <tr><td>NPWP</td><td>{contact.npwp}</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="w-full">
            <tbody>
              <tr><td>Identitas</td><td>{contact.identitas}</td></tr>
              <tr><td>Nomor identitas</td><td>{contact.nomor_identitas}</td></tr>
              <tr><td>Alamat penagihan</td><td>{contact.alamat_penagihan}</td></tr>
              <tr><td>Alamat pengiriman</td><td>{contact.alamat_pengiriman}</td></tr>
              <tr><td>Info lainnya</td><td>{contact.info_lainnya}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Info bank</h3>
        <table className="w-full">
          <tbody>
            <tr><td>Nama bank</td><td>BCA Personal</td></tr>
            <tr><td>Kantor cabang bank</td><td>Madiun</td></tr>
            <tr><td>Nomor rekening</td><td>213132132123213</td></tr>
            <tr><td>Pemegang akun bank</td><td>Sri</td></tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Pemetaan akun</h3>
        <table className="w-full">
          <tbody>
            <tr><td>Akun hutang</td><td>{`(2-20100) Hutang Usaha`}</td></tr>
            <tr><td>Akun piutang</td><td>{`(1-10100) Piutang Usaha`}</td></tr>
            <tr><td>Hutang maksimum</td><td>{`Rp${contact.hutang_max.toLocaleString()},00`}</td></tr>
            <tr><td>Syarat pembayaran utama</td><td>{contact.syarat_pembayaran_utama}</td></tr>
          </tbody>
        </table>
      </div>
      <Button 
        className="mt-4 p-button-primary"
        onClick={() => router.back()}
        label="Kembali"
      />
    </div>
  );
};

export default ContactDetailPage;