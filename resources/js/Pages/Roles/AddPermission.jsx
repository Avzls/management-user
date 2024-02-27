import React,{ useState } from 'react'
import { Head, usePage, Link, router  } from '@inertiajs/react';
import { FaEdit, FaPencilAlt, FaTrashRestore } from "react-icons/fa";

import Container from '../Container';
import AddRole from '@/Components/AddRole';
import FlashMessage from '@/Components/FlashMessage';


const AddPermission = () => {
  const { role, success } = usePage().props;

  const [permission, setPermission] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    Inertia.post(`roles/${Role.id}/give-permissions`, { permission })
      .then(() => {
        // Handle success, for example, display success message
        console.log(success);
      })
      .catch((errors) => {
        // Handle validation errors
        setErrors(errors.permission || []);
      });
  };

  return (
    <div>
      <h2>Add Permission to Role: {role.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Permission:
          <input type="text" value={permission} onChange={(e) => setPermission(e.target.value)} />
        </label>
        {errors.map((error, index) => (
          <div key={index} className="text-red-500">{error}</div>
        ))}
        <button type="submit">Add Permission</button>
      </form>
    </div>
  );
};

export default AddPermission;
