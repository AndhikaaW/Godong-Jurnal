"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Sidebar {
    sidebar_id: number;
    label: string;
    icon: string | null;
    to_path: string;
}
const Coba = () => {
    const [sidebar, setSidebar] = useState<Sidebar[]>([]);
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
    console.log(sidebar)
    return (
        <div>
            {sidebar.map((sidebar, index) => (
                <div>
                    {sidebar.label ? (
                        <img
                            src={`data:image/jpeg;base64,${sidebar.icon}`}
                            alt={sidebar.label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="avatar-fallback">img</div>
                    )}
                </div>
            ))}
            {/* <h3>Data yang dipilih:</h3>
            <pre>{JSON.stringify(sidebar, null, 2)}</pre> */}

        </div>
    )
}

export default Coba