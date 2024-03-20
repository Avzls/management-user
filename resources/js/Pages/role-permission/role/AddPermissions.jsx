import React, { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import Container from '@/Pages/Container'

function AddPermissions({role, permissions, rolePermissions, assignedPermissions}) {
    const { errors } = usePage().props

    const [data, setData] = useState({
      permission: assignedPermissions
    })

    const handleInputChange = (e) => {
      const { value, checked } = e.target;

      setData(prevData => ({
        ...prevData,
        permission: checked ? [...prevData.permission, value] : prevData.permission.filter(item => item !== value)
      }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/roles/${role.id}/give-permissions`, data ,{
            onError: (errors) => {
                console.log(errors)
            },
        })
    }

    return (
        <Container>
            <Head title="Add Role" />

            <div className='flex justify-between'>
                <div>
                    <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ Permission</span></span>
                    <h1 className='font-ubuntu font-bold '>Edit Role</h1>
                </div>

                <Link href='/roles' className="btn btn-outline btn-sm rounded-md">Back</Link>
            </div>

            <div className='mt-10 flex flex-col rounded-lg shadow-md bg-white border border-[#cfd8dc] md:max-w-lg'>
                <div className='w-[calc(100%-32px)] p-4 -mt-5 rounded-lg mx-auto bg-[#263238] text-white text-lg font-bold'>Add Permission</div>

                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="form-control w-[calc(100%-32px)] mx-auto">
                      <div className='space-x-5'>
                        {permissions.map(permission => (
                        <label className='cursor-pointer' key={permission.id}>
                          <input 
                          type="checkbox" 
                          className='mr-2'
                          name='permission[]'
                          defaultValue={permission.name}
                          onChange={handleInputChange}
                          defaultChecked={rolePermissions.includes(permission.id)}
                          />
                          { permission.name }
                        </label>
                        ))}
                      </div>
                    </div>
                    <label className='form-control w-[calc(100%-32px)] mx-auto mb-3'>
                        <button 
                        className='btn btn-neutral hover:text-white mt-5'
                        type='submit'>Save</button>
                    </label>
                </form>
            </div>
        </Container>
    )
}

export default AddPermissions