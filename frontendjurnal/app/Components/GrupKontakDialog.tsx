import React, { useState, useEffect, useRef } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import axios from 'axios';
import { apiEndpoints } from "../api/api"; // Adjust this path to match your project structure

interface ContactGroup {
    kode: string;
    nama: string;
    jumlah_kontak: number;
}

export default function ContactGroupManagement() {
    const [visible, setVisible] = useState(false);
    const [groups, setGroups] = useState<ContactGroup[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingGroup, setEditingGroup] = useState<ContactGroup | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<ContactGroup | null>(null);
    const op = useRef<OverlayPanel>(null);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        setLoading(true);
        try {
            const response = await axios.get(apiEndpoints.getGrubKontak);
            setGroups(response.data.map((group: any) => ({
                ...group,
                jumlah_kontak: group.jumlah_kontak || 0
            })));
        } catch (error) {
            console.error('Error fetching groups:', error);
            setErrorMessage('Gagal mengambil data grup kontak');
        }
        setLoading(false);
    };

    const headerElement = (
        <div className="flex w-full justify-content-between align-items-center">
            <span className="font-bold">Pengaturan Grup Kontak</span>
        </div>
    );

    const isNameUnique = (name: string, excludeKode?: string) => {
        return !groups.some(group => 
            group.nama.toLowerCase() === name.toLowerCase() && group.kode !== excludeKode
        );
    };

    const handleAddNewGroup = async () => {
        if (newGroupName.trim() === "") {
            setErrorMessage("Nama grup harus diisi");
            return;
        }
        if (!isNameUnique(newGroupName)) {
            setErrorMessage("Nama grup harus berbeda dengan yang lain");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(apiEndpoints.inputGrupContact, { nama: newGroupName });
            
            // Ensure the new group data has the same format as existing data
            const newGroup: ContactGroup = {
                nama: response.data.data.nama,
                kode: response.data.data.kode,
                jumlah_kontak: 0  // Set default to 0 for new group
            };
            
            setGroups(prevGroups => [...prevGroups, newGroup]);
            setNewGroupName("");
            setErrorMessage("");
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding group:', error);
            setErrorMessage('Gagal menambahkan grup kontak');
        }
        setLoading(false);
    };

    const handleDeleteGroup = async (kode: string) => {
        setLoading(true);
        try {
            await axios.delete(`${apiEndpoints.deleteGrupContact}/${kode}`);
            setGroups(groups.filter(group => group.kode !== kode));
            op.current?.hide();
        } catch (error) {
            console.error('Error deleting group:', error);
            setErrorMessage('Gagal menghapus grup kontak');
        }
        setLoading(false);
    };

    const handleEditGroup = (group: ContactGroup) => {
        setEditingGroup(group);
        setErrorMessage("");
    };

    const handleSaveEdit = async () => {
        if (editingGroup) {
            if (editingGroup.nama.trim() === "") {
                setErrorMessage("Nama grup harus diisi");
                return;
            }
            if (!isNameUnique(editingGroup.nama, editingGroup.kode)) {
                setErrorMessage("Nama grup harus berbeda dengan yang lain");
                return;
            }
            setLoading(true);
            try {
                const response = await axios.put(`${apiEndpoints.updateGrupContact}/${editingGroup.kode}`, { nama: editingGroup.nama });
                const updatedGroup = {
                    ...response.data.data,
                    jumlah_kontak: editingGroup.jumlah_kontak // Preserve the existing contact count
                };
                setGroups(groups.map(group => 
                    group.kode === editingGroup.kode ? updatedGroup : group
                ));
                setEditingGroup(null);
                setErrorMessage("");
            } catch (error) {
                console.error('Error updating group:', error);
                setErrorMessage('Gagal memperbarui grup kontak');
            }
            setLoading(false);
        }
    };

    const actionBodyTemplate = (rowData: ContactGroup) => {
        return (
            <div className="flex">
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-text p-button-info mr-2" 
                    onClick={() => handleEditGroup(rowData)} 
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-text p-button-danger" 
                    onClick={(e) => {
                        setSelectedGroup(rowData);
                        op.current?.toggle(e);
                    }} 
                />
            </div>
        );
    };

    const deleteConfirmationContent = () => {
        if (!selectedGroup) return null;

        const contactCount = selectedGroup.jumlah_kontak || 0;
        const message = contactCount === 0
            ? "Menghapus grup tidak akan menghapus kontak di dalamnya."
            : `Grup memiliki ${contactCount} Kontak. Menghapus grup tidak akan menghapus kontak di dalamnya.`;

        return (
            <div className="p-2" style={{width:"200px"}}>
                <div className="text-lg">Hapus grup?</div>
                <p className="text-sm mt-2">{message}</p>
                <div className="flex justify-content-end">
                    <Button label="Batalkan" className="p-button-text" onClick={() => op.current?.hide()} />
                    <Button label="Hapus" severity="danger" onClick={() => handleDeleteGroup(selectedGroup.kode)} />
                </div>
            </div>
        );
    };

    const filteredGroups = groups.filter(group => 
        group.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="col">
            <Button label="Atur Grup Kontak" severity="success" className="text-sm h-full" onClick={() => setVisible(true)} />
            <Dialog 
                visible={visible} 
                modal 
                header={headerElement} 
                draggable={false} 
                style={{ width: '50rem' }} 
                onHide={() => {
                    setVisible(false);
                    setShowAddForm(false);
                    setNewGroupName("");
                    setErrorMessage("");
                    setEditingGroup(null);
                }}
            >
                <div className="w-full flex flex-column mt-1">
                    <div className="grid mb-3">
                        <div className="col-8">
                            <span className="p-input-icon-left w-full">
                                <i className="pi pi-search" />
                                <InputText 
                                    className="w-full" 
                                    placeholder="Cari grup kontak" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </span>
                        </div>
                        <div className="col-4">
                            <Button 
                                label="Buat grup" 
                                severity="success" 
                                className="w-full" 
                                onClick={() => setShowAddForm(true)} 
                                disabled={showAddForm || loading} 
                            />
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-content-center">
                            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
                        </div>
                    ) : filteredGroups.length > 0 || showAddForm ? (
                        <DataTable value={[...(showAddForm ? [{ kode: '', nama: '', jumlah_kontak: 0 }] : []), ...filteredGroups]} className="mt-3">
                            <Column header="Nama grup" body={(rowData) => 
                                rowData.kode === '' ? (
                                    <InputText 
                                        value={newGroupName} 
                                        onChange={(e) => setNewGroupName(e.target.value)}
                                        placeholder="Masukkan nama grup"
                                        className="w-full"
                                    />
                                ) : editingGroup && editingGroup.kode === rowData.kode ? (
                                    <InputText 
                                        value={editingGroup.nama}
                                        onChange={(e) => setEditingGroup({...editingGroup, nama: e.target.value})}
                                        className="w-full"
                                    />
                                ) : rowData.nama
                            } />
                            <Column field="kode" header="Kode" />
                            <Column field="jumlah_kontak" header="Jumlah kontak" />
                            <Column body={(rowData) => 
                                rowData.kode === '' ? (
                                    <div className="flex justify-content-end">
                                        <Button 
                                            label="Batalkan" 
                                            className="p-button-text mr-2" 
                                            onClick={() => {
                                                setShowAddForm(false);
                                                setNewGroupName("");
                                                setErrorMessage("");
                                            }} 
                                        />
                                        <Button 
                                            label="Simpan" 
                                            severity="success" 
                                            onClick={handleAddNewGroup} 
                                            disabled={loading} 
                                        />
                                    </div>
                                ) : editingGroup && editingGroup.kode === rowData.kode ? (
                                    <div className="flex justify-content-end">
                                        <Button 
                                            label="Batalkan" 
                                            className="p-button-text mr-2" 
                                            onClick={() => {
                                                setEditingGroup(null);
                                                setErrorMessage("");
                                            }} 
                                        />
                                        <Button 
                                            label="Simpan" 
                                            severity="success" 
                                            onClick={handleSaveEdit} 
                                            disabled={loading} 
                                        />
                                    </div>
                                ) : actionBodyTemplate(rowData)
                            } style={{ width: '150px' }} />
                        </DataTable>
                    ) : (
                        <div className="flex flex-column align-items-center justify-content-center mt-5">
                            <i className="pi pi-users text-5xl text-blue-500 mb-3"></i>
                            <span className="text-lg font-medium mb-2">Belum ada grup kontak</span>
                            <span className="text-sm text-gray-500">Daftar grup kontak Anda akan ditampilkan di sini.</span>
                        </div>
                    )}
                    {errorMessage && <small className="p-error mt-2">{errorMessage}</small>}
                </div>
                <div className="flex justify-content-end mt-3">
                    <Button label="Selesai" onClick={() => setVisible(false)} />
                </div>
            </Dialog>
            <OverlayPanel ref={op} >
                {deleteConfirmationContent()}
            </OverlayPanel>
        </div>
    );
}