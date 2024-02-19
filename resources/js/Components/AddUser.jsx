import { useForm } from '@inertiajs/react';
import React, { useRef, useEffect} from 'react';

const AddUser = ({ isOpen, onClose }) => {

    const modalRef = useRef();

    // open addUser modal
    const openModal = () => {
        modalRef.current.showModal();
    };

    // close addUser modal
    const closeModal = () => {
        modalRef.current.close();
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
        openModal();
        }
    }, [isOpen]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        confPassword: ''
    })

    function submit(e) {
        e.preventDefault()
        
        post('/users', {
            onSuccess: () => {
                modalRef.current.close();
            }
        })
    }

return (
    <>
    <dialog ref={modalRef} className="modal">
        <div className="modal-box font-ubuntu">
            <h2 className='font-semibold text-center text-2xl'>Form Add User</h2>

            <form className='w-full' onSubmit={submit}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">User name?</span>
                    </div>
                    <input 
                    type="text" 
                    placeholder="Type here" 
                    className="input input-bordered w-full"
                    autoComplete='username'
                    value={data.name} 
                    onChange={e => setData('name', e.target.value)}/>
                    {errors.name && <div className='text-red-500 italic'>{errors.name}</div>}
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">User email?</span>
                    </div>
                    <input 
                    type="email" 
                    placeholder="Example@gmail.com" 
                    className="input input-bordered w-full" 
                    value={data.email} 
                    onChange={e => setData('email', e.target.value)}/>
                    {errors.email && <div className='text-red-500 italic'>{errors.email}</div>}
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Phone number?</span>
                    </div>
                    <input 
                    type="text" 
                    placeholder="0123456789" 
                    className="input input-bordered w-full" 
                    value={data.phone} 
                    onChange={e => setData('phone', e.target.value)}/>
                    {errors.phone && <div className='text-red-500 italic'>{errors.phone}</div>}
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
                        autoComplete='new-password'
                        value={data.password} 
                        onChange={e => setData('password', e.target.value)}/>
                        {errors.password && <div className='text-red-500 italic'>{errors.password}</div>}
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Confirm Password</span>
                        </div>
                        <input 
                        type="password" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                        autoComplete='new-password'
                        value={data.confPassword} 
                        onChange={e => setData('confPassword', e.target.value)}/>
                        {errors.confPassword && <div className='text-red-500 italic'>{errors.confPassword}</div>}
                    </label>
                </div>

                <label className='form-control w-full'>
                    <button 
                    className='btn btn-neutral hover:text-white mt-5' type='submit' disabled={processing}>Save</button>
                </label>
            </form>
        </div>
        
        <div method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
        </div>
    </dialog>
    </>
  );
};

export default AddUser;
