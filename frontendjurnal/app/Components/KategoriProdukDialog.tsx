import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface Category {
    name: string;
    count: number;
}

interface AddCategoryDialogProps {
    visible: boolean;
    onHide: () => void;
    initialCategories: Category[];
    onCategoriesChange: (categories: Category[]) => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
    visible,
    onHide,
    initialCategories,
    onCategoriesChange
}) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [newCategory, setNewCategory] = useState<string>('');
    const [showAddCategoryInput, setShowAddCategoryInput] = useState<boolean>(false);
    const [newCategoryInput, setNewCategoryInput] = useState<string>('');

    const handleAddCategory = () => {
        setShowAddCategoryInput(true);
    };

    const handleSaveCategory = () => {
        if (newCategoryInput.trim()) {
            const updatedCategories = [...categories, { name: newCategoryInput.trim(), count: 0 }];
            setCategories(updatedCategories);
            onCategoriesChange(updatedCategories);
            setNewCategoryInput('');
            setShowAddCategoryInput(false);
        }
    };

    const handleCancelAddCategory = () => {
        setNewCategoryInput('');
        setShowAddCategoryInput(false);
    };

    const handleDeleteCategory = (index: number) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
        onCategoriesChange(updatedCategories);
    };

    const footer = (
        <div>
            <Button label="Selesai" onClick={onHide} className="p-button-text" />
        </div>
    );

    return (
        <Dialog 
            header="Atur kategori produk" 
            visible={visible} 
            style={{ width: '50vw' }} 
            footer={footer} 
            onHide={onHide}
        >
            <div className="p-fluid">
                <div className="p-inputgroup mb-3">
                    <InputText 
                        value={newCategory} 
                        onChange={(e) => setNewCategory(e.target.value)} 
                        placeholder="Cari kategori"
                    />
                    <Button 
                        label="Tambah kategori" 
                        onClick={handleAddCategory} 
                        disabled={showAddCategoryInput}
                    />
                </div>
                {showAddCategoryInput && (
                    <div className="p-inputgroup mb-3">
                        <InputText 
                            value={newCategoryInput} 
                            onChange={(e) => setNewCategoryInput(e.target.value)} 
                            placeholder="Masukkan nama kategori baru"
                        />
                        <Button label="Batalkan" onClick={handleCancelAddCategory} className="p-button-secondary" />
                        <Button label="Simpan" onClick={handleSaveCategory} />
                    </div>
                )}
                {categories.length === 0 ? (
                    <div className="text-center p-4">
                        <i className="pi pi-inbox" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                        <p>Belum ada kategori</p>
                        <p className="text-sm text-color-secondary">Kategori produk akan muncul di sini.</p>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-content-between mb-2">
                            <span className="font-bold">Nama</span>
                            <span className="font-bold">Jumlah</span>
                        </div>
                        {categories.map((category, index) => (
                            <div key={index} className="flex justify-content-between align-items-center mb-2">
                                <span>{category.name}</span>
                                <div className="flex align-items-center">
                                    <span className="mr-3">{category.count}</span>
                                    {category.count === 0 && (
                                        <Button 
                                            icon="pi pi-trash" 
                                            className="p-button-text p-button-rounded p-button-danger" 
                                            onClick={() => handleDeleteCategory(index)}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default AddCategoryDialog;