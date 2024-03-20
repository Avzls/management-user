import React from 'react'
import { Head, usePage, Link, router } from '@inertiajs/react';
import { FaEdit, FaTrashRestore } from "react-icons/fa";

import Container from '@/Pages/Container'
import FlashMessage from '@/Components/FlashMessage';

function Index({permissions}) {
    /* 
        - call flash in props
        - flash built by controller
        - add flash in handleInertiaReques.php file (see docs shared data in inertia)
    */
    const { flash } = usePage().props

    function handleClick(permissionId) {
        const isConfirmed = window.confirm('Are you sure?');
    
        if (isConfirmed) {
            router.visit(`/permissions/${permissionId}`, {method: 'DELETE'})
        }
    }
    return (
            <Container>
                <Head title="Permissions" />

                <div className='flex justify-between'>
                <div>
                    <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ Permission</span></span>
                    <h1 className='font-ubuntu font-bold '>Permission</h1>
                </div>

                <Link href='/permissions/create' className="btn btn-outline btn-sm rounded-md">Add Permission</Link>
                </div>

                <FlashMessage flash={flash}/>

                <div className='mt-10 flex flex-col rounded-lg shadow-md bg-white border border-[#cfd8dc] md:max-w-lg'>
                <div className='w-[calc(100%-32px)] p-4 -mt-5 rounded-lg mx-auto bg-[#263238] text-white text-lg font-bold'>Role Table</div>
                <div className='relative overflow-x-auto '>
                    <table className="table">
                    <thead>
                        <tr>
                            <th>Permission Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                        <tbody>
                            {permissions.map(permission => (
                                <tr key={permission.id} className='hover'>
                                    <th>{permission.name}</th>
                                    <td className=' text-lg'>
                                    <Link href={`/permissions/${permission.id}/edit`} as='button'>
                                        <FaEdit className='cursor-pointer'/>
                                    </Link>
                                    <button onClick={() => handleClick(permission.id)} className='inline-block ml-2'>
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
