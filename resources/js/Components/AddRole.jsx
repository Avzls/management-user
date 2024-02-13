import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';

const AddRole = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const modalRef = useRef();

    const openModal = () => {
        modalRef.current.showModal();
    };

    const closeModal = () => {
        modalRef.current.close();
        onClose(); 
    };

    useEffect(() => {
        if (isOpen) {
            openModal();
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        const data = {
            name,
            role
        };

        try {
            await axios.post('/roles', data);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box font-ubuntu">
                    <h2 className='font-semibold text-center text-2xl'>Add Role Form</h2>
                    <form className='w-full'>
                        {/* {renderErrors()} */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Role Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                onChange={(event) => setName(event.target.value)} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Role</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                onChange={(event) => setRole(event.target.value)} />
                        </label>
                        <label className='form-control w-full'>
                            <button
                                className='btn btn-neutral hover:text-white mt-5'
                                onClick={handleSubmit}>Save</button>
                        </label>
                    </form>
                </div>

                <div method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>Close</button>
                </div>
            </dialog>
        </>
    );
};

export default AddRole;
