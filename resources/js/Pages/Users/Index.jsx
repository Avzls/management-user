import React, { useState } from 'react';
import { Head, usePage, Link, router  } from '@inertiajs/react';
import { FaEdit, FaTrashRestore } from "react-icons/fa";

import Container from '../Container';
import AddUser from '@/Components/AddUser';
import FlashMessage from '@/Components/FlashMessage';

function Index({users}) {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  // const [errors, setErrors] = useState([])
  const { flash } = usePage().props

  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddUserModalOpen(false);
  };

  function handleDelet() {
    confirm('are you sure')
  }
  return (
    <Container>
        <Head title="Users" />

        <div className='flex justify-between'>
          <div>
            <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ User</span></span>
            <h1 className='font-ubuntu font-bold '>User</h1>
          </div>

          <button className="btn btn-outline btn-sm rounded-md" onClick={handleAddUserClick}>Add User</button>
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
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className='hover'>
                    <th>{user.name}</th>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className='flex space-x-2 text-lg hover'>
                      <Link href={`/users/${user.id}/edit`}>
      
                        <FaEdit className='cursor-pointer'/>
                      </Link>
                      <Link href={`/users/${user.id}`} method='delete'>
                        <FaTrashRestore className='cursor-pointer' onClick={handleDelet}/>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {isAddUserModalOpen && (
            <AddUser isOpen={isAddUserModalOpen} onClose={handleModalClose} />
        )}

    </Container>
  )
}

export default Index
