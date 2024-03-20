import React, { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'

import Container from '@/Pages/Container'

function Edit({user, roles, userRoles}) {
    const { errors } = usePage().props

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
        role: userRoles, 
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
        setFormData({
            ...formData,
            role: selectedValues,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/users/${user.id}`, formData ,{
            onError: (errors) => {
                console.log(errors)
            },
        })
    }

    return (
        <Container>
            <Head title="Users" />

            <div className='flex justify-between'>
                <div>
                    <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ User</span></span>
                    <h1 className='font-ubuntu font-bold '>Edit User</h1>
                </div>

                <Link href='/users' className="btn btn-outline btn-sm rounded-md">Back</Link>
            </div>

            <div className='mt-10 flex flex-col rounded-lg shadow-md bg-white border border-[#cfd8dc]'>
                <div className='w-[calc(100%-32px)] p-4 -mt-5 rounded-lg mx-auto bg-[#263238] text-white text-lg font-bold'>Edit User</div>

                <form className='w-full' onSubmit={handleSubmit}>
                    <label className="form-control w-[calc(100%-32px)] mx-auto">
                        <div className="label">
                            <span className="label-text">User name?</span>
                        </div>
                        <input 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full"
                        name='name'
                        autoComplete='username'
                        defaultValue={user.name}
                        onChange={handleInputChange}/>
                        {errors.name && <div className='text-red-500 italic'>{errors.name}</div>}
                    </label>
                    <label className="form-control w-[calc(100%-32px)] mx-auto">
                        <div className="label">
                            <span className="label-text">User email?</span>
                        </div>
                        <input 
                        type="email" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                        name='email'
                        defaultValue={user.email} 
                        onChange={handleInputChange}/>
                        {errors.email && <div className='text-red-500 italic'>{errors.email}</div>}
                    </label>
                    <label className="form-control w-[calc(100%-32px)] mx-auto">
                        <div className="label">
                            <span className="label-text">Pick User Role</span>
                        </div>
                        <select
                        name='role[]'
                        multiple
                        value={formData.role}
                        className="select select-bordered" 
                        onChange={handleSelectChange}>
                            {roles.map(role => (
                                <option key={role}>{role}</option>
                            ))}
                        </select>
                    </label>
                    <label className="form-control w-[calc(100%-32px)] mx-auto">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input 
                        type="password" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                        name='password'
                        autoComplete='current-password'
                        value={formData.password} 
                        onChange={handleInputChange}/>
                        {errors.password && <div className='text-red-500 italic'>{errors.password}</div>}
                    </label>
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

export default Edit