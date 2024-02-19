import React, { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import Container from '../Container'
import axios from 'axios'

function Edit({user}) {
    const { errors } = usePage().props

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password
    })

    const handleInputChange = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/users/${user.id}`, data ,{
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
                            <span className="label-text">Phone number?</span>
                        </div>
                        <input 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                        name='phone'
                        defaultValue={user.phone} 
                        onChange={handleInputChange}/>
                        {errors.phone && <div className='text-red-500 italic'>{errors.phone}</div>}
                    </label>
                    <div className='flex space-x-3'>
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
                            defaultValue={data.password} 
                            onChange={handleInputChange}/>
                            {errors.password && <div className='text-red-500 italic'>{errors.password}</div>}
                        </label>
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

export default Edit