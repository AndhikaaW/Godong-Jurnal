"use client"
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import axios from 'axios';
import { apiEndpoints } from '@/app/api/api';

interface ItemsMenu {
    id: number;
    kode: string;
    kode_menu: string;
    nama: string;
    description: string;
    link_to:string
}

interface Laporan {
    id: number;
    kode: string;
    name: string;
    items_menu: ItemsMenu[];
}

interface ReportCardProps {
    title: string;
    description: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description }) => (
    <div className='w-full flex flex-column card p-3' style={{height:"180px"}}>
        <div className='text-lg font-bold mb-3'>{title}</div>
        <p className="mb-4 text-sm">{description}</p>
        <div className="flex align-items-end h-full">
            <Button label="LIHAT LAPORAN" size='small' className="p-button-success" />
        </div>
    </div>
);

const Laporan: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [laporan, setLaporan] = useState<Laporan[]>([]);

    useEffect(() => {
        axios
            .get(apiEndpoints.getLaporan)
            .then((response) => {
                setLaporan(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="w-full h-full flex flex-column">
            <div className="poppins-bold text-3xl mb-4 ">Laporan</div>
            <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                className=""
                pt={{
                    inkbar:{className:" bg-green-400"},
                    root:{className:" border-round"},
                    nav : {className:"bg-transparent pl-5 pr-5"},
                    panelContainer :{className:"border-1 border-round-bottom border-gray-200"}
                }}
            >
                {laporan.map((item, index) => (
                    <TabPanel key={index} header={item.name} className='' pt={{
                        headerAction: () => ({
                            className: `text-gray-400 ${index === activeIndex ? 'text-gray-900 border-green-400  bg-gray-200' : 'bg-transparent hover:border-green-400'}`,
                        })
                    }}>
                        <div className="w-full">
                            <div className="grid">
                                {item.items_menu.map((menuItem, idx) => (
                                    <div key={idx} className="col-12 lg:col-6">
                                        <ReportCard title={menuItem.nama} description={menuItem.description} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabPanel>
                ))}
            </TabView>
        </div>
    );
};

export default Laporan;