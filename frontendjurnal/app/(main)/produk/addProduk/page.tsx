"use client"
import { useState } from 'react';
import axios from 'axios';

export default function ProductInput() {
  const [formData, setFormData] = useState({
    kode: '',
    barcode: '',
    nama: '',
    unit: '',
    kategori: '',
    type: '',
    deskripsi: '',
    harga_beli: '',
    akun_beli: '',
    akun_diskon: '',
    harga_jual: '',
    akun_jual: '',
    pajak_jual: '',
    quantity: '',
    min_stock: '',
    gambar: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      const response = await axios.post('http://192.168.1.38:8000/api/inputProduk', formData);
      setMessage('Product added successfully');
      console.log(response.data);
    } catch (error) {
      setMessage('Error adding product');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Kode:</label>
          <input type="text" name="kode" value={formData.kode} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Barcode:</label>
          <input type="text" name="barcode" value={formData.barcode} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Nama:</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Unit:</label>
          <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Kategori:</label>
          <input type="text" name="kategori" value={formData.kategori} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Type:</label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block">Deskripsi:</label>
          <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} className="border p-2 w-full"></textarea>
        </div>
        <div>
          <label className="block">Harga Beli:</label>
          <input type="number" name="harga_beli" value={formData.harga_beli} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Akun Beli:</label>
          <input type="text" name="akun_beli" value={formData.akun_beli} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Akun Diskon:</label>
          <input type="text" name="akun_diskon" value={formData.akun_diskon} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Harga Jual:</label>
          <input type="number" name="harga_jual" value={formData.harga_jual} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Akun Jual:</label>
          <input type="text" name="akun_jual" value={formData.akun_jual} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Pajak Jual:</label>
          <input type="text" name="pajak_jual" value={formData.pajak_jual} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Quantity:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Min Stock:</label>
          <input type="number" name="min_stock" value={formData.min_stock} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Gambar :</label>
          <input type="text" name="gambar" value={formData.gambar} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-4 text-center font-bold">{message}</p>}
    </div>
  );
}