/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';
import axios from 'axios';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [sidebar, setSidebar] = useState<any[]>([]);
    useEffect(() => {
        const fetchSifatKredit = async () => {
            try {
                const response = await axios.get('http://192.168.1.35:8000/api/getsidebar');
                setSidebar(response.data);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            } finally {
                // setIsLoading(false);
            }
        };
        fetchSifatKredit();
    }, []);

    // const model: AppMenuItem[] = [
    //     {
    //         label: 'Home',
    //         items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    //     },
    // ];
    console.log(sidebar)
    const model: AppMenuItem[] = sidebar.map((item):any => ({
        label: item.label,
        items: [{
            label: item.label,
            // icon: `data:image/jpeg;base64,${item.icon}`,
            icon: item.icon ? (
                <img
                    src={`data:image/svg+xml;base64,${item.icon}`} 
                    alt={item.label}
                    style={{ width: '15px', height: '15px' }}
                />
            ) : 'pi pi-fw pi-file',
            to: item.to || item.to_path
        }]
    }));

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
