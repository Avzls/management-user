import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { FaEdit, FaTrashRestore } from "react-icons/fa";

import Container from '../Container';
import AddRole from '@/Components/AddRole'; // Import modal untuk menambah role
import EditRole from '@/Components/EditRole'; // Import modal untuk mengedit role
import FlashMessage from '@/Components/FlashMessage';

function Index({ roles }) {
    const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
    const [editRole, setEditRole] = useState(null); // State untuk menyimpan data role yang akan disunting
    const { flash } = usePage().props;

    const handleAddRoleClick = () => {
        setIsAddRoleModalOpen(true); // Buka modal untuk menambah role
    };

    const handleEditRoleClick = (role) => {
        setEditRole(role);
        setIsEditRoleModalOpen(true); // Buka modal untuk mengedit role
    };

    const handleModalClose = () => {
        setIsAddRoleModalOpen(false);
        setIsEditRoleModalOpen(false); // Tutup modal edit role jika ada
    };

    const handleDelete = () => {
        confirm('Are you sure?');
    };

    return (
        <Container>
            <Head title="Roles" />

            <div className='flex justify-between'>
                <div>
                    <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ Roles</span></span>
                    <h1 className='font-ubuntu font-bold'>Roles</h1>
                </div>

                <button className="btn btn-outline btn-sm rounded-md" onClick={handleAddRoleClick}>Add Role</button>
            </div>

            <FlashMessage flash={flash}/>
            <div className='mt-10 flex flex-col rounded-lg shadow-md bg-white border border-[#cfd8dc]'>
                <div className='w-[calc(100%-32px)] p-4 -mt-5 rounded-lg mx-auto bg-[#263238] text-white text-lg font-bold'>Roles Table</div>
                <div className='relative overflow-x-auto'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>User Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                role.users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{role.name}</td>
                                        <td>
                                            <button className="btn btn-sm mr-2" onClick={() => handleEditRoleClick(role)}>
                                                <FaEdit />
                                            </button>
                                            <button className="btn btn-sm" onClick={handleDelete}>
                                                <FaTrashRestore />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddRoleModalOpen && (
                <AddRole isOpen={isAddRoleModalOpen} onClose={handleModalClose} />
            )}

            {isEditRoleModalOpen && (
                <EditRole isOpen={isEditRoleModalOpen} onClose={handleModalClose} role={editRole} />
            )}

        </Container>
    );
}

export default Index;
