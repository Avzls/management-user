import React,{ useState } from 'react'
import { Head, usePage, Link, router  } from '@inertiajs/react';
import { FaEdit, FaPencilAlt, FaTrashRestore } from "react-icons/fa";

import Container from '../Container';
import AddRole from '@/Components/AddRole';
import FlashMessage from '@/Components/FlashMessage';

function Index({roles}) {
    
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const { flash } = usePage().props

    const handleAddUserClick = () => {
        setIsAddUserModalOpen(true);
    };

    const handleModalClose = () => {
        setIsAddUserModalOpen(false);
    };

    function handleDelet(e) {
        const isConfirmed = window.confirm('Are you sure?');
    
        if (!isConfirmed) {
        e.preventDefault(); // Mencegah navigasi atau permintaan penghapusan
        } 
    }
  return (
        <Container>
            <Head title="roles" />

            <div className='flex justify-between'>
            <div>
                <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ Role</span></span>
                <h1 className='font-ubuntu font-bold '>Role</h1>
            </div>

            <button className="btn btn-outline btn-sm rounded-md" onClick={handleAddUserClick}>Add Role</button>
            </div>

            <FlashMessage flash={flash}/>

            <div className='mt-10 flex flex-col rounded-lg shadow-md bg-white border border-[#cfd8dc] md:max-w-lg'>
            <div className='w-[calc(100%-32px)] p-4 -mt-5 rounded-lg mx-auto bg-[#263238] text-white text-lg font-bold'>Roles Table</div>
            <div className='relative overflow-x-auto '>
                <table className="table">
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(Role => (
                        <tr key={Role.id} className='hover'>
                            <th>{Role.name}</th>
                            <td className='flex space-x-2 text-lg hover'>
                            <Link href={`roles/${Role.id}/give-permissions`} as='button'>
                                <FaPencilAlt className='cursor-pointer'/>
                            </Link>
                            <Link href={`/roles/${Role.id}/edit`} as='button'>
                                <FaEdit className='cursor-pointer'/>
                            </Link>
                            <Link href={`/roles/${Role.id}`} method='delete' as='button' onClick={handleDelet}>
                                <FaTrashRestore className='cursor-pointer'/>
                            </Link>
                            
                            </td>
                        </tr>
                    ))}

                </tbody>
                </table>
            </div>
            </div>
            
            {isAddUserModalOpen && (
                <AddRole isOpen={isAddUserModalOpen} onClose={handleModalClose} />
            )}

        </Container>
  )
}

export default Index
