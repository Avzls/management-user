import { useForm, router } from '@inertiajs/react';
import React, { useRef, useEffect} from 'react';

const AddPermission = ({ isOpen, onClose }) => {

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
    })

    function submit(e) {
        e.preventDefault()

        post('permissions', {
            onSuccess: () => {
                modalRef.current.close();
            },
            onFinish: (responseData) => {
                if (responseData && responseData.message){

                    router.visit('permissions', {
                        data: {
                            message: responseData.message
                        }
                    })
                }
            }
        })
    }

return (
    <>
    <dialog ref={modalRef} className="modal">
        <div className="modal-box font-ubuntu">
            <h2 className='font-semibold text-center text-2xl'>Form Add Permission</h2>

            <form className='w-full' onSubmit={submit}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Permission</span>
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

export default AddPermission;
