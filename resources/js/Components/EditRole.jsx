import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';

const EditRole = ({ isOpen, onClose, role }) => {
    const [name, setName] = useState(''); // Menyimpan nama role
    const [newRole, setNewRole] = useState(''); // Menyimpan role baru
    const [roles, setRoles] = useState([]); // Menyimpan data roles dari backend
    const modalRef = useRef(); // Ref untuk dialog modal

    // Fungsi untuk membuka modal
    const openModal = () => {
        modalRef.current.showModal();
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        modalRef.current.close();
        onClose(); 
    };

    // Efek yang dijalankan saat komponen dibuka
    useEffect(() => {
        if (isOpen) {
            openModal();
            setName(role.name); // Set nilai awal untuk field nama dari prop role
            setNewRole(role.role); // Set nilai awal untuk field role dari prop role
        }
    }, [isOpen, role]);

    // Efek yang dijalankan saat komponen dimuat
    useEffect(() => {
        // Ambil data roles dari backend dan simpan dalam state roles
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/roles');
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchData();
    }, []); // Pastikan untuk menjalankan efek sekali saat komponen dimuat

    // Fungsi untuk menangani pengiriman formulir
    const handleSubmit = () => {
        const data = {
            name,
            role: newRole // Menggunakan nilai baru untuk role
        };

        Inertia.put(`/roles/${role.id}`, data).then(() => {
            onClose();
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            {/* Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box font-ubuntu">
                    <h2 className='font-semibold text-center text-2xl'>Edit Role Form</h2>
                    <form className='w-full'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Role Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                disabled
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">New Role</span>
                            </div>
                            <select
                                className="input input-bordered w-full"
                                value={newRole}
                                onChange={(event) => setNewRole(event.target.value)}>
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className='form-control w-full'>
                            <button
                                className='btn btn-neutral hover:text-white mt-5'
                                onClick={handleSubmit}>Save</button>
                        </label>
                    </form>
                </div>

                <div method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>Close</button>
                </div>
            </dialog>
        </>
    );
};

export default EditRole;
