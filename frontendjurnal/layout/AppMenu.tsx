/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import axios from 'axios';
import { apiEndpoints } from '@/app/api/api';

interface sidebar{
    sidebar_id: number,
    label: string,
    to_path: string,
    icon:string; 
}
const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [sidebar, setSidebar] = useState<sidebar[]>([]);
    useEffect(() => {
        axios
        .get(apiEndpoints.getsidebar, {
            headers: {
                'ngrok-skip-browser-warning': 'true',  // Add this header
            },
        })
          .then((response) => {
            setSidebar(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
    console.log(sidebar)
    const model: AppMenuItem[] = sidebar.map((item, index):any => {
        // Tambahkan submenu khusus untuk menu Penjualan
        if (item.label.toLowerCase() === 'penjualan') {
            return {
                items: [{
                    label: item.label,
                    icon: item.icon ? (
                        <img
                            src={`data:image/svg+xml;base64,${item.icon}`} 
                            alt={item.label}
                            style={{ width: '15px', height: '15px' }}
                        />
                    ) : 'pi pi-fw pi-file',
                    items: [
                        {
                            label: 'Dashboard Penjualan',
                            to: '/penjualan'
                        },
                        {
                            label: 'Add Deposit',
                            to: '/penjualan/addDeposit'
                        },
                        {
                            label: 'Add Penagihan Penjualan',
                            to: '/penjualan/addPenagihanPenjualan'
                        },
                        {
                            label: 'Add Penawaran Penjualan',
                            to: '/penjualan/addPenawaranPenjualan'
                        },
                        {
                            label: 'Add Pemesanan Penjualan',
                            to: '/penjualan/addPemesananPenjualan'
                        },
                        {
                            label: 'Add Terima Pembayaran',
                            to: '/penjualan/addTerimaPembayaran'
                        },
                        {
                            label: 'Add Return Penjualan',
                            to: '/penjualan/addReturnPenjualan'
                        },
                        {
                            label: 'Penagihan Penjualan',
                            to: '/penjualan/penagihanPenjualan'
                        },
                        {
                            label: 'Pengiriman Penjualan',
                            to: '/penjualan/pengirimanPenjualan'
                        },
                        {
                            label: 'Terima Pembayaran',
                            to: '/penjualan/terimaPembayaran'
                        },
                        {
                            label: 'Faktur Proforma',
                            to: '/penjualan/fakturProforma'
                        },
                        {
                            label: 'Tukar Faktur Penjualan',
                            to: '/penjualan/tukarFakturPenjualan'
                        }
                    ]
                }],
            };
        }

        // Return normal menu item untuk menu lainnya
        return {
            items: [{
                label: item.label,
                icon: item.icon ? (
                    <img
                        src={`data:image/svg+xml;base64,${item.icon}`} 
                        alt={item.label}
                        style={{ width: '15px', height: '15px' }}
                    />
                ) : 'pi pi-fw pi-file',
                to: item.to_path
            }],
        };
    });

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
