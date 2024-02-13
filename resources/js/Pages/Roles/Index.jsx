import React, { useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import { FaEdit, FaTrashRestore } from "react-icons/fa";

import Container from '../Container';
import AddRole from '@/Components/AddRole';
import FlashMessage from '@/Components/FlashMessage';

function Index({ roles }) {
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const { flash } = usePage().props;

  const handleAddRoleClick = () => {
    setIsAddRoleModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddRoleModalOpen(false);
  };

  function handleDelete() {
    confirm('Are you sure?');
  }

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
  {roles.map(role => (
    <tr key={role.id}>
      <td>{role.user_id ? users.find(user => user.id === role.user_id).name : ''}</td>
      <td>{role.name}</td>
      <td>
        <button onClick={() => handleDelete(role.id)}><FaTrashRestore /></button>
      </td>
    </tr>
  ))}
</tbody>


</table>

        </div>
      </div>
      
      {isAddRoleModalOpen && (
        <AddRole isOpen={isAddRoleModalOpen} onClose={handleModalClose} />
      )}

    </Container>
  );
}

export default Index;
