import React, { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'
import Container from '@/Pages/Container'

function Create() {
    const { errors } = usePage().props

    const [data, setData] = useState({
        name: ''
    })

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(`/roles`, data ,{
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
                    <span className='text-gray-400 font-normal text-sm'>Dashboard <span className='text-[#5D666A]'>/ Role</span></span>
                    <h1 className='font-ubuntu font-bold '>Add Role</h1>
                </div>

                <Link href='/roles' className="btn btn-outline btn-sm rounded-md">Back</Link>
            </div>

            <div className='mt-10 flex flex-col rounded-lg shadow-md bg-white border border-[#cfd8dc] md:max-w-lg'>
                <div className='w-[calc(100%-32px)] p-4 -mt-5 rounded-lg mx-auto bg-[#263238] text-white text-lg font-bold'>Add Role</div>

                <form className='w-full' onSubmit={handleSubmit}>
                    <label className="form-control w-[calc(100%-32px)] mx-auto">
                        <div className="label">
                            <span className="label-text">Role name</span>
                        </div>
                        <input 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full"
                        name='name'
                        autoComplete='name'
                        value={data.name}
                        onChange={handleInputChange}/>
                        {errors.name && <div className='text-red-500 italic'>{errors.name}</div>}
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

export default Create