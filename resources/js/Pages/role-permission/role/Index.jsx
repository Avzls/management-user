import React from 'react'
import { Head, usePage, Link, router } from '@inertiajs/react';
import { FaEdit, FaTrashRestore } from "react-icons/fa";

import Container from '@/Pages/Container'
import FlashMessage from '@/Components/FlashMessage';

function Index({roles}) {
    /* 
        - call flash in props
        - flash built by controller
        - add flash in handleInertiaReques.php file (see docs shared data in inertia)
    */
    const { flash } = usePage().props

    function handleClick(roleId) {
        const isConfirmed = window.confirm('Are you sure?');
    
        if (isConfirmed) {
            router.visit(`/roles/${roleId}`, {method: 'DELETE'})
        }
    }
    return (
            <Container>
                <Head title="Roles" />

                <div className='flex justify-between'>
                <div>
                    <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ Role</span></span>
                    <h1 className='font-ubuntu font-bold '>Role</h1>
                </div>

                <Link href='/roles/create' className="btn btn-outline btn-sm rounded-md">Add Role</Link>
                </div>

                <FlashMessage flash={flash}/>

                <div className='mt-10 flex flex-col rounded-lg shadow-md bg-white border border-[#cfd8dc] md:max-w-lg'>
                <div className='w-[calc(100%-32px)] p-4 -mt-5 rounded-lg mx-auto bg-[#263238] text-white text-lg font-bold'>Role Table</div>
                <div className='relative overflow-x-auto '>
                    <table className="table">
                    <thead>
                        <tr>
                            <th>Role Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id} className='hover'>
                                    <th>{role.name}</th>
                                    <td className='flex space-x-2 text-lg'>
                                    <Link href={`/roles/${role.id}/give-permissions`} className="btn btn-sm">Add / Edit Role Permission</Link>
                                    <Link href={`/roles/${role.id}/edit`} as='button'>
                                        <FaEdit className='cursor-pointer'/>
                                    </Link>
                                    <button onClick={() => handleClick(role.id)}>
                                        <FaTrashRestore className='cursor-pointer'/>
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </Container>
    )
}

export default Index
