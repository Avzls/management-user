import React,{useState} from 'react'
import { Head, Link, router } from '@inertiajs/react'
import axios from 'axios'

import Container from '../Container'

function Edit({user}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    // const [confPassword, setConfPassword] = useState('')

    const handleSubmit =  () => {
        const data = {
            id:user.id, name, email, phone, password
        };
    
        router.patch(`/users/${user.id}`, data)
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

                <div className='w-full'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">User name?</span>
                        </div>
                        <input 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full"
                        onChange={(name) => setName(name.target.value)} defaultValue={user.name}/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">User email?</span>
                        </div>
                        <input 
                        type="email" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                        onChange={(email) => setEmail(email.target.value)} defaultValue={user.email}/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Phone number?</span>
                        </div>
                        <input 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                        onChange={(phone) => setPhone(phone.target.value)} defaultValue={user.phone}/>
                    </label>
                    <div className='flex space-x-3'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input 
                            type="password" 
                            placeholder="Type here" 
                            className="input input-bordered w-full" 
                            onChange={(password) => setPassword(password.target.value)}/>
                        </label>
                    </div>

                    <label className='form-control w-full'>
                        <button 
                        className='btn btn-neutral hover:text-white mt-5'
                        onClick={handleSubmit}>Save</button>
                    </label>
                    
                </div>
            </div>
        </Container>
    )
}

export default Edit
