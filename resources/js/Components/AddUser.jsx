import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';

const AddUser = ({ isOpen, onClose }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const modalRef = useRef();

    const openModal = () => {
        modalRef.current.showModal();
    };

    const closeModal = () => {
        modalRef.current.close();
        onClose(); // Panggil fungsi onClose yang mungkin digunakan di komponen induk
    };

    useEffect(() => {
        if (isOpen) {
        openModal();
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        const data = {
            name, email, phone, password, confPassword
        };
    
        try {
            await axios.post('/users', data);
            onClose()
        } catch (error) {
            console.log(error)
        }
    };

  return (
    <>
      {/* Modal */}
    <dialog ref={modalRef} className="modal">
        <div className="modal-box font-ubuntu">
            <h2 className='font-semibold text-center text-2xl'>Form Add User</h2>
            <form className='w-full'>
            {/* {renderErrors()} */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">User name?</span>
                    </div>
                    <input 
                    type="text" 
                    placeholder="Type here" 
                    className="input input-bordered w-full"
                    onChange={(name) => setName(name.target.value)}/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">User email?</span>
                    </div>
                    <input 
                    type="email" 
                    placeholder="Type here" 
                    className="input input-bordered w-full" 
                    onChange={(email) => setEmail(email.target.value)}/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Phone number?</span>
                    </div>
                    <input 
                    type="text" 
                    placeholder="Type here" 
                    className="input input-bordered w-full" 
                    onChange={(phone) => setPhone(phone.target.value)}/>
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
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Confirm Password</span>
                        </div>
                        <input 
                        type="password" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                        onChange={(confPassword) => setConfPassword(confPassword.target.value)}/>
                    </label>
                </div>
                <label className='form-control w-full'>
                    <button 
                    className='btn btn-neutral hover:text-white mt-5'
                    onClick={handleSubmit}>Save</button>
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
