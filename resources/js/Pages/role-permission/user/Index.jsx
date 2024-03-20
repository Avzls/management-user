import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import { FaEdit, FaTrashRestore } from "react-icons/fa";

import Container from '@/Pages/Container'
import FlashMessage from '@/Components/FlashMessage';

function Index({users, roleNames}) {
    const { flash } = usePage().props

    function handleDelet(e) {
        const isConfirmed = window.confirm('Are you sure?');
    
        if (!isConfirmed) {
        e.preventDefault(); // Mencegah navigasi atau permintaan penghapusan
        } 
    }
    return (
        <Container>
            <Head title="Users" />

            <div className='flex justify-between'>
            <div>
                <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ User</span></span>
                <h1 className='font-ubuntu font-bold '>User</h1>
            </div>

            <Link href={`users/create`} className="btn btn-outline btn-sm rounded-md">Add User</Link>
            </div>

            <FlashMessage flash={flash}/>

            <div className='mt-10 flex flex-col rounded-lg shadow-md bg-white border border-[#cfd8dc]'>
            <div className='w-[calc(100%-32px)] p-4 -mt-5 rounded-lg mx-auto bg-[#263238] text-white text-lg font-bold'>User Table</div>
            <div className='relative overflow-x-auto '>
                <table className="table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                    <tr key={user.id} className='hover'>
                        <th>{user.name}</th>
                        <td>{user.email}</td>
                        <td>
                            {roleNames[user.id].map(name => (
                                <div key={name} className="badge badge-neutral mx-1">{name}</div>
                            ))}
                        </td>
                        <td className='flex space-x-2 text-lg hover'>
                            <Link href={`/users/${user.id}/edit`} as='button'>
                                <FaEdit className='cursor-pointer'/>
                            </Link>
                            <Link href={`/users/${user.id}`} method='delete' as='button' onClick={handleDelet}>
                                <FaTrashRestore className='cursor-pointer'/>
                            </Link>
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
