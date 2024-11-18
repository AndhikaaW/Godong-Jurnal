-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2024 at 03:51 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `godong-jurnal`
--

-- --------------------------------------------------------

--
-- Table structure for table `bundle_product`
--

CREATE TABLE `bundle_product` (
  `id` int NOT NULL,
  `kode_bundle` varchar(100) NOT NULL,
  `kode_product` varchar(100) NOT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bundle_product`
--

INSERT INTO `bundle_product` (`id`, `kode_bundle`, `kode_product`, `quantity`) VALUES
(1, 'BNDL001', 'PRD090', 5),
(2, 'BNDL002', 'PRD090', 10);

-- --------------------------------------------------------

--
-- Table structure for table `data_bank_kontak`
--

CREATE TABLE `data_bank_kontak` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `kode_kontak` varchar(100) NOT NULL,
  `nama_bank` varchar(100) NOT NULL,
  `cabang_bank` varchar(100) NOT NULL,
  `pemegang_akun_bank` varchar(100) NOT NULL,
  `nomor_rekening` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `data_bank_kontak`
--

INSERT INTO `data_bank_kontak` (`id`, `kode`, `kode_kontak`, `nama_bank`, `cabang_bank`, `pemegang_akun_bank`, `nomor_rekening`) VALUES
(19, 'BANK000000001', 'DATA000000001', 'BANK01', 'Ponorogo', 'Hanum', '123123123123'),
(20, 'BANK000000002', 'DATA000000001', 'BANK01', 'Madiun', 'Hanum', '2109313123'),
(21, 'BANK000000002', 'DATA000000002', 'BANK01', 'Ponorogo', 'Hanum', '123123123123'),
(22, 'BANK000000003', 'DATA000000002', 'BANK01', 'Madiun', 'Hanum', '2109313123'),
(23, 'BANK000000003', 'DATA000000003', 'BANK01', 'ponorogo', 'Hanum', '123123123123'),
(24, 'BANK000000004', 'DATA000000004', 'BANK02', 'ponorogo', 'Keith', '123123123123'),
(25, 'BANK000000005', 'DATA000000004', 'BANK01', 'Madiun', 'Lister', '01029302193901'),
(26, 'BANK000000006', 'DATA000000004', 'BANK01', 'Surakarta', 'MOM', '213123123123212'),
(27, 'BANK000000005', 'DATA000000005', 'BANK01', 'Klaten', 'Angga', '3123123213123213123'),
(28, 'BANK000000006', 'DATA000000006', 'BANK01', 'world 1', 'hanum', '35413206857448');

-- --------------------------------------------------------

--
-- Table structure for table `data_grub_kontak`
--

CREATE TABLE `data_grub_kontak` (
  `id` int NOT NULL,
  `kode_kontak` varchar(50) NOT NULL,
  `kode_grub` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `data_grub_kontak`
--

INSERT INTO `data_grub_kontak` (`id`, `kode_kontak`, `kode_grub`) VALUES
(33, 'DATA000000006', 'GRUP02'),
(34, 'DATA000000006', 'GRUP03');

-- --------------------------------------------------------

--
-- Table structure for table `data_kontak`
--

CREATE TABLE `data_kontak` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `nama_tampilan` varchar(100) NOT NULL,
  `nama_lengkap` varchar(200) NOT NULL,
  `sebutan` varchar(20) NOT NULL,
  `identitas` varchar(100) NOT NULL,
  `nomor_identitas` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nama_perusahaan` varchar(100) NOT NULL,
  `no_handphone` varchar(100) NOT NULL,
  `no_telepon` varchar(100) NOT NULL,
  `no_fax` varchar(100) NOT NULL,
  `npwp` varchar(100) NOT NULL,
  `alamat_penagihan` text NOT NULL,
  `alamat_pengiriman` text NOT NULL,
  `info_lainnya` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `akun_piutang` int NOT NULL,
  `akun_hutang` int NOT NULL,
  `hutang_max` int DEFAULT NULL,
  `syarat_pembayaran_utama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `data_kontak`
--

INSERT INTO `data_kontak` (`id`, `kode`, `nama_tampilan`, `nama_lengkap`, `sebutan`, `identitas`, `nomor_identitas`, `email`, `nama_perusahaan`, `no_handphone`, `no_telepon`, `no_fax`, `npwp`, `alamat_penagihan`, `alamat_pengiriman`, `info_lainnya`, `akun_piutang`, `akun_hutang`, `hutang_max`, `syarat_pembayaran_utama`) VALUES
(23, 'DATA000000001', 'Hanum', 'Hanum bin Amin', 'SEBUTAN02', 'IDENTITAS01', '350218111037777777', 'affannaufalsyarifa@gmail.com', 'Affan Code', '082132186213', '082132186213', '0809898089890', '3123123123213', 'Jl. Raya Trenceng RT02/RW01, Desa Mrican, Kecamatan Jenangan, Kabupaten Ponorogo', 'Jl. Raya Trenceng RT02/RW01, Desa Mrican, Kecamatan Jenangan, Kabupaten Ponorogo', 'Bapaknya Amin namanya', 1, 1, NULL, 'COD'),
(24, 'DATA000000002', 'Hanum', 'Hanum bin Amin', 'SEBUTAN02', 'IDENTITAS01', '350218111037777777', 'affannaufalsyarifa@gmail.com', 'Affan Code', '082132186213', '082132186213', '0809898089890', '3123123123213', 'Jl. Raya Trenceng RT02/RW01, Desa Mrican, Kecamatan Jenangan, Kabupaten Ponorogo', 'Jl. Raya Trenceng RT02/RW01, Desa Mrican, Kecamatan Jenangan, Kabupaten Ponorogo', 'Bapaknya Amin namanya', 1, 1, 1213213, 'COD'),
(25, 'DATA000000003', 'Nurhadi', 'Nurhadi bin Somikun', 'SEBUTAN01', 'IDENTITAS01', '350218111037777777', 'nurhadiuhuy@gmail.com', 'Nurhadi Tani Sejahtera', '082132186213', '082132186213', '0809898089890', '3123123123213', 'Desa Mrican', 'Desa Mrican', 'Pake Sarep', 1, 1, 100000, 'Net 60'),
(26, 'DATA000000004', 'ListerKTH', 'Lister Al Keith', 'SEBUTAN01', 'IDENTITAS01', '3502181110331231', 'listerkth@gmail.com', 'Lister House', '082132186213', '082132186213', '0809898089890', '31231231989798', 'Jl. Raya Trenceng RT02/RW01, Desa Mrican, Kecamatan Jenangan, Kabupaten Ponorogo', 'Jl. Raya Trenceng RT02/RW01, Desa Mrican, Kecamatan Jenangan, Kabupaten Ponorogo', 'Lister Keith GG', 1, 2, 1000000, 'Net 60'),
(27, 'DATA000000005', 'Mas Ferry', 'Mas Ferry Marstech', 'SEBUTAN01', 'IDENTITAS01', '3502181110331231', 'affannaufalsyarifa@gmail.com', 'Ferry inc', '082132186213', '082132186213', '0809898089890', '3123123123213', 'Jl. Raya Trenceng RT02/RW01, Desa Mrican, Kecamatan Jenangan, Kabupaten Ponorogo, No: , RT: , RW: , Kode Pos: , , , ,', 'Jl. Raya Trenceng RT02/RW01, Desa Mrican, Kecamatan Jenangan, Kabupaten Ponorogo, No: , RT: , RW: , Kode Pos: , , , ,', 'Mas ferry', 1, 2, 10000000, 'Net 30'),
(28, 'DATA000000006', 'hanum comel', 'Hanum Tyas Comell', 'SEBUTAN02', 'IDENTITAS01', '3521782367398290', 'hanumwsihdxjk@gmail.com', 'gengs company', '0898374748', '0829273876190', '1545642105', '2578522154548', 'Jl raya', 'Jl raya', 'bumi world', 2, 1, NULL, 'Net 60');

-- --------------------------------------------------------

--
-- Table structure for table `data_produk`
--

CREATE TABLE `data_produk` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `barcode` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `kategori` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `type` varchar(100) NOT NULL,
  `gambar` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `data_produk`
--

INSERT INTO `data_produk` (`id`, `kode`, `barcode`, `nama`, `unit`, `kategori`, `deskripsi`, `type`, `gambar`) VALUES
(1, 'PRD001', '1234567890123', 'Produk A', 'pcs', 'KATEGORI00001', 'Ini adalah deskripsi produk A.', 'TIPE01', 'url_gambar.jpg'),
(2, 'PRD002', '1234567890987', 'Produk B', 'kg', 'KATEGORI00001', 'Ini adalah deskripsi produk B.', 'TIPE01', 'url_gambar_b.jpg'),
(3, 'PRD003', '1234567890987', 'Produk C', 'kg', 'KATEGORI00001', 'Ini adalah deskripsi produk B.', 'TIPE01', 'url_gambar_b.jpg'),
(4, 'PRD009', '1234567890987', 'Produk C', 'kg', 'KATEGORI00001', 'Ini adalah deskripsi produk B.', 'TIPE01', 'url_gambar_b.jpg'),
(5, 'PRD010', '1234567890987', 'Produk E', 'kg', 'KATEGORI00001', 'Ini adalah deskripsi produk B.', 'TIPE01', 'url_gambar_b.jpg'),
(6, 'PRD090', '1234567890987', 'Produk E', 'kg', 'KATEGORI00001', 'Ini adalah deskripsi produk B.', 'TIPE01', 'url_gambar_b.jpg'),
(7, 'PRODUCT100', 'PRODUCT100', 'Tian', 'PCS', 'KATEGORI00001', 'Uhuy', 'TIPE01', 'osuhwhdouahdoashodhasdhsadhsaodsai');

-- --------------------------------------------------------

--
-- Table structure for table `data_tipe_kontak`
--

CREATE TABLE `data_tipe_kontak` (
  `id` int NOT NULL,
  `kode_kontak` varchar(50) NOT NULL,
  `kode_type_kontak` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `data_tipe_kontak`
--

INSERT INTO `data_tipe_kontak` (`id`, `kode_kontak`, `kode_type_kontak`) VALUES
(14, 'DATA000000001', 'KONTAK02'),
(15, 'DATA000000002', 'KONTAK02'),
(16, 'DATA000000003', 'KONTAK02'),
(17, 'DATA000000004', 'KONTAK02'),
(18, 'DATA000000004', 'KONTAK01'),
(19, 'DATA000000004', 'KONTAK03'),
(20, 'DATA000000004', 'KONTAK04'),
(21, 'DATA000000005', 'KONTAK01'),
(22, 'DATA000000006', 'KONTAK02'),
(23, 'DATA000000006', 'KONTAK04');

-- --------------------------------------------------------

--
-- Table structure for table `grup_kontak`
--

CREATE TABLE `grup_kontak` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `grup_kontak`
--

INSERT INTO `grup_kontak` (`id`, `kode`, `nama`) VALUES
(30, 'GRUP02', 'barang'),
(31, 'GRUP03', 'hanum comel'),
(32, 'GRUP04', 'Bapakksayaa');

-- --------------------------------------------------------

--
-- Table structure for table `harga_product`
--

CREATE TABLE `harga_product` (
  `id` int NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `harga_beli` int NOT NULL,
  `akun_beli` int NOT NULL,
  `akun_diskon` int NOT NULL,
  `harga_jual` int NOT NULL,
  `akun_jual` int NOT NULL,
  `pajak_jual` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `harga_product`
--

INSERT INTO `harga_product` (`id`, `product_id`, `harga_beli`, `akun_beli`, `akun_diskon`, `harga_jual`, `akun_jual`, `pajak_jual`) VALUES
(4, 'PRD090', 50000, 1, 2, 75000, 1, 'PPN'),
(5, 'PRODUCT100', 1001, 1, 2, 10000, 1, 'PPN');

-- --------------------------------------------------------

--
-- Table structure for table `identitas_kontak`
--

CREATE TABLE `identitas_kontak` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `identitas_kontak`
--

INSERT INTO `identitas_kontak` (`id`, `kode`, `name`) VALUES
(1, 'IDENTITAS01', 'KTP'),
(2, 'IDENTITAS02', 'PASPORT'),
(3, 'IDENTITAS03', 'SIM'),
(4, 'IDENTITAS04', 'KK');

-- --------------------------------------------------------

--
-- Table structure for table `inventaris_product`
--

CREATE TABLE `inventaris_product` (
  `id` int NOT NULL,
  `kode_produk` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `min_stock` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `inventaris_product`
--

INSERT INTO `inventaris_product` (`id`, `kode_produk`, `quantity`, `min_stock`) VALUES
(1, 'PRD090', 100, 10),
(2, 'PRODUCT100', 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `items_menu_product`
--

CREATE TABLE `items_menu_product` (
  `id` int NOT NULL,
  `kode` varchar(50) NOT NULL,
  `kode_menu` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `link_to` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `items_menu_product`
--

INSERT INTO `items_menu_product` (`id`, `kode`, `kode_menu`, `nama`, `description`, `link_to`) VALUES
(1, 'items01', 'MENU01', 'Neraca', 'Menampilkan apa yang dimiliki (aset), apa saja utangnya (liabilitas), dan apa yang sudah diinvestasikan ke perusahaan ini (ekuitas) pada tanggal tertentu.', '/items/neraca'),
(2, 'ITEMS02', 'MENU02', 'Daftar Penjualan', 'Menampilkan transaksi penjualan secara kronologis berdasarkan tipenya dalam periode tertentu. Template laporan ini bisa Anda custom sesuai kebutuhan.', '/items/daftarPenjualan');

-- --------------------------------------------------------

--
-- Table structure for table `jurnal`
--

CREATE TABLE `jurnal` (
  `ID` bigint NOT NULL,
  `Faktur` varchar(20) DEFAULT NULL,
  `Tgl` date NOT NULL DEFAULT '0000-00-00',
  `Rekening` varchar(20) DEFAULT NULL,
  `NoReff` varchar(10) DEFAULT NULL,
  `keterangan` varchar(80) DEFAULT NULL,
  `Debet` double(16,2) DEFAULT '0.00',
  `Kredit` double(16,2) DEFAULT '0.00',
  `CabangEntry` char(3) DEFAULT '104',
  `UserName` varchar(20) DEFAULT '',
  `Datetime` datetime DEFAULT '0000-00-00 00:00:00',
  `RekeningLama` varchar(20) DEFAULT '',
  `JenisJurnal` varchar(10) DEFAULT '',
  `Rekonsiliasi` char(1) DEFAULT 'T'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `master_akun`
--

CREATE TABLE `master_akun` (
  `id` int NOT NULL,
  `kode` int NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `master_akun`
--

INSERT INTO `master_akun` (`id`, `kode`, `nama`) VALUES
(1, 1, 'Hutang Usaha'),
(2, 2, 'Piutang Usaha');

-- --------------------------------------------------------

--
-- Table structure for table `master_gudang`
--

CREATE TABLE `master_gudang` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `penanggung_jawab` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master_kategori`
--

CREATE TABLE `master_kategori` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `keterangan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `master_kategori`
--

INSERT INTO `master_kategori` (`id`, `kode`, `keterangan`) VALUES
(1, 'KATEGORI00001', 'Makanan');

-- --------------------------------------------------------

--
-- Table structure for table `master_kontak`
--

CREATE TABLE `master_kontak` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `master_kontak`
--

INSERT INTO `master_kontak` (`id`, `kode`, `nama`) VALUES
(1, 'KONTAK01', 'Pelanggan'),
(2, 'KONTAK02', 'Supplier'),
(3, 'KONTAK03', 'Karyawan'),
(4, 'KONTAK04', 'Lainnya');

-- --------------------------------------------------------

--
-- Table structure for table `master_nama_bank`
--

CREATE TABLE `master_nama_bank` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `nama_bank` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `master_nama_bank`
--

INSERT INTO `master_nama_bank` (`id`, `kode`, `nama_bank`) VALUES
(1, 'BANK01', 'Bank Mandiri'),
(2, 'BANK02', 'Bank Jatim (BPD Jatim)');

-- --------------------------------------------------------

--
-- Table structure for table `master_tipe_produk`
--

CREATE TABLE `master_tipe_produk` (
  `id` int NOT NULL,
  `keterangan` varchar(100) NOT NULL,
  `kode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `master_tipe_produk`
--

INSERT INTO `master_tipe_produk` (`id`, `keterangan`, `kode`) VALUES
(1, 'Single', 'TIPE01'),
(2, 'Bundle', 'TIPE02');

-- --------------------------------------------------------

--
-- Table structure for table `menu_product`
--

CREATE TABLE `menu_product` (
  `id` int NOT NULL,
  `kode` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menu_product`
--

INSERT INTO `menu_product` (`id`, `kode`, `name`) VALUES
(1, 'MENU01', 'Sekilas Bisnis'),
(2, 'MENU02', 'Penjualan');

-- --------------------------------------------------------

--
-- Table structure for table `sebutan_kontak`
--

CREATE TABLE `sebutan_kontak` (
  `id` int NOT NULL,
  `kode` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sebutan_kontak`
--

INSERT INTO `sebutan_kontak` (`id`, `kode`, `name`) VALUES
(1, 'SEBUTAN01', 'Bapak'),
(2, 'SEBUTAN02', 'Ibuk');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar`
--

CREATE TABLE `sidebar` (
  `sidebar_id` int NOT NULL,
  `label` varchar(50) DEFAULT NULL,
  `to_path` varchar(50) DEFAULT NULL,
  `icon` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sidebar`
--

INSERT INTO `sidebar` (`sidebar_id`, `label`, `to_path`, `icon`) VALUES
(1, 'Beranda', '/beranda', 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXNlIj48cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiLz48cGF0aCBkPSJNMyAxMGEyIDIgMCAwIDEgLjcwOS0xLjUyOGw3LTUuOTk5YTIgMiAwIDAgMSAyLjU4MiAwbDcgNS45OTlBMiAyIDAgMCAxIDIxIDEwdjlhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ6Ii8+PC9zdmc+'),
(2, 'Dasbor', '/dasbor', 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXNlIj48cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiLz48cGF0aCBkPSJNMyAxMGEyIDIgMCAwIDEgLjcwOS0xLjUyOGw3LTUuOTk5YTIgMiAwIDAgMSAyLjU4MiAwbDcgNS45OTlBMiAyIDAgMCAxIDIxIDEwdjlhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ6Ii8+PC9zdmc+'),
(3, 'Laporan', '/laporan', ''),
(4, 'Manajemen Anggaran', '/manajemen_anggaran', ''),
(5, 'Kas dan Bank', '/kas_dan_bank', ''),
(6, 'Penjualan', '/penjualan', ''),
(7, 'Pembelian', '/pembelian', ''),
(8, 'Biaya', '/biaya', ''),
(9, 'Godong Pay', '/godong_pay', ''),
(10, 'Kontak', '/kontak', ''),
(11, 'Produk', '/produk', ''),
(12, 'Produksi', '/produksi', ''),
(13, 'Pemenuhan', '/pemenuhan', ''),
(14, 'Aset', '/aset', ''),
(15, 'Daftar Akun', '/daftar_akun', ''),
(16, 'Aplikasi', '/aplikasi', ''),
(17, 'Daftar Lainnya', '/daftar_lainnya', ''),
(18, 'Integrasi', '/integrasi', ''),
(19, 'Pengaturan', '/pengaturan', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bundle_product`
--
ALTER TABLE `bundle_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_kode_product_bundle` (`kode_product`);

--
-- Indexes for table `data_bank_kontak`
--
ALTER TABLE `data_bank_kontak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_kode_kontak` (`kode_kontak`),
  ADD KEY `foreign_key_nama_bank` (`nama_bank`);

--
-- Indexes for table `data_grub_kontak`
--
ALTER TABLE `data_grub_kontak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_data_kontak` (`kode_kontak`),
  ADD KEY `foreign_key_grup_kontak_data_grub` (`kode_grub`);

--
-- Indexes for table `data_kontak`
--
ALTER TABLE `data_kontak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_kontak_foreign` (`kode`),
  ADD KEY `foreign_akun_piutang` (`akun_piutang`),
  ADD KEY `foreign_akun_hutang` (`akun_hutang`),
  ADD KEY `foreign_identitas_kontak` (`identitas`),
  ADD KEY `foreign_sebutan_kontak` (`sebutan`);

--
-- Indexes for table `data_produk`
--
ALTER TABLE `data_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index_kode_produk` (`kode`) USING BTREE,
  ADD KEY `foreign_key_kategori_produk` (`kategori`),
  ADD KEY `foreign_key_type_produk` (`type`);

--
-- Indexes for table `data_tipe_kontak`
--
ALTER TABLE `data_tipe_kontak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_data` (`kode_kontak`),
  ADD KEY `foreign_key_type` (`kode_type_kontak`);

--
-- Indexes for table `grup_kontak`
--
ALTER TABLE `grup_kontak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_index_grup_kontak` (`kode`);

--
-- Indexes for table `harga_product`
--
ALTER TABLE `harga_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_kode_product` (`product_id`);

--
-- Indexes for table `identitas_kontak`
--
ALTER TABLE `identitas_kontak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_index_kode_identitas_kontak` (`kode`);

--
-- Indexes for table `inventaris_product`
--
ALTER TABLE `inventaris_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_kode_product_inventaris` (`kode_produk`);

--
-- Indexes for table `items_menu_product`
--
ALTER TABLE `items_menu_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_key_items_menu_product` (`kode_menu`);

--
-- Indexes for table `jurnal`
--
ALTER TABLE `jurnal`
  ADD PRIMARY KEY (`Tgl`,`ID`),
  ADD KEY `FakturOnly` (`Faktur`),
  ADD KEY `FakturTgl` (`Faktur`,`Tgl`);

--
-- Indexes for table `master_akun`
--
ALTER TABLE `master_akun`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kode_akun_foreign` (`kode`) USING BTREE;

--
-- Indexes for table `master_gudang`
--
ALTER TABLE `master_gudang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_kategori`
--
ALTER TABLE `master_kategori`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foreign_index_master_kategori` (`kode`);

--
-- Indexes for table `master_kontak`
--
ALTER TABLE `master_kontak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipe_kontak_foreign` (`kode`);

--
-- Indexes for table `master_nama_bank`
--
ALTER TABLE `master_nama_bank`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_index_kode_bank` (`kode`);

--
-- Indexes for table `master_tipe_produk`
--
ALTER TABLE `master_tipe_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_index_tipe_produk` (`kode`) USING BTREE;

--
-- Indexes for table `menu_product`
--
ALTER TABLE `menu_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foreign_index_items_menu_product` (`kode`);

--
-- Indexes for table `sebutan_kontak`
--
ALTER TABLE `sebutan_kontak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign_index_sebutan_kontak` (`kode`) USING BTREE;

--
-- Indexes for table `sidebar`
--
ALTER TABLE `sidebar`
  ADD PRIMARY KEY (`sidebar_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bundle_product`
--
ALTER TABLE `bundle_product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `data_bank_kontak`
--
ALTER TABLE `data_bank_kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `data_grub_kontak`
--
ALTER TABLE `data_grub_kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `data_kontak`
--
ALTER TABLE `data_kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `data_produk`
--
ALTER TABLE `data_produk`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `data_tipe_kontak`
--
ALTER TABLE `data_tipe_kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `grup_kontak`
--
ALTER TABLE `grup_kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `harga_product`
--
ALTER TABLE `harga_product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `identitas_kontak`
--
ALTER TABLE `identitas_kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventaris_product`
--
ALTER TABLE `inventaris_product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `items_menu_product`
--
ALTER TABLE `items_menu_product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jurnal`
--
ALTER TABLE `jurnal`
  MODIFY `ID` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_akun`
--
ALTER TABLE `master_akun`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_gudang`
--
ALTER TABLE `master_gudang`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_kategori`
--
ALTER TABLE `master_kategori`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `master_kontak`
--
ALTER TABLE `master_kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `master_nama_bank`
--
ALTER TABLE `master_nama_bank`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `master_tipe_produk`
--
ALTER TABLE `master_tipe_produk`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `menu_product`
--
ALTER TABLE `menu_product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sebutan_kontak`
--
ALTER TABLE `sebutan_kontak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sidebar`
--
ALTER TABLE `sidebar`
  MODIFY `sidebar_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bundle_product`
--
ALTER TABLE `bundle_product`
  ADD CONSTRAINT `foreign_key_kode_product_bundle` FOREIGN KEY (`kode_product`) REFERENCES `data_produk` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `data_bank_kontak`
--
ALTER TABLE `data_bank_kontak`
  ADD CONSTRAINT `foreign_key_kode_kontak` FOREIGN KEY (`kode_kontak`) REFERENCES `data_kontak` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `foreign_key_nama_bank` FOREIGN KEY (`nama_bank`) REFERENCES `master_nama_bank` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `data_grub_kontak`
--
ALTER TABLE `data_grub_kontak`
  ADD CONSTRAINT `foreign_key_data_kontak` FOREIGN KEY (`kode_kontak`) REFERENCES `data_kontak` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `foreign_key_grup_kontak_data_grub` FOREIGN KEY (`kode_grub`) REFERENCES `grup_kontak` (`kode`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `data_kontak`
--
ALTER TABLE `data_kontak`
  ADD CONSTRAINT `foreign_akun_hutang` FOREIGN KEY (`akun_hutang`) REFERENCES `master_akun` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `foreign_akun_piutang` FOREIGN KEY (`akun_piutang`) REFERENCES `master_akun` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `foreign_identitas_kontak` FOREIGN KEY (`identitas`) REFERENCES `identitas_kontak` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `foreign_sebutan_kontak` FOREIGN KEY (`sebutan`) REFERENCES `sebutan_kontak` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `data_produk`
--
ALTER TABLE `data_produk`
  ADD CONSTRAINT `foreign_key_kategori_produk` FOREIGN KEY (`kategori`) REFERENCES `master_kategori` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `foreign_key_type_produk` FOREIGN KEY (`type`) REFERENCES `master_tipe_produk` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `data_tipe_kontak`
--
ALTER TABLE `data_tipe_kontak`
  ADD CONSTRAINT `foreign_key_data` FOREIGN KEY (`kode_kontak`) REFERENCES `data_kontak` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `foreign_key_type` FOREIGN KEY (`kode_type_kontak`) REFERENCES `master_kontak` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `harga_product`
--
ALTER TABLE `harga_product`
  ADD CONSTRAINT `foreign_key_kode_product` FOREIGN KEY (`product_id`) REFERENCES `data_produk` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `inventaris_product`
--
ALTER TABLE `inventaris_product`
  ADD CONSTRAINT `foreign_key_kode_product_inventaris` FOREIGN KEY (`kode_produk`) REFERENCES `data_produk` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `items_menu_product`
--
ALTER TABLE `items_menu_product`
  ADD CONSTRAINT `foreign_key_items_menu_product` FOREIGN KEY (`kode_menu`) REFERENCES `menu_product` (`kode`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
