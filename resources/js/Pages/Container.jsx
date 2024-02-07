import React from 'react'
import Sidebar from '@/Components/Sidebar';
import { CgMenuLeft } from "react-icons/cg";

const Container = ({children}) => {
    return (
        <div className="drawer font-ubuntu lg:drawer-open bg-[#eceff180]">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="text-4xl p-3 lg:hidden">
                    <CgMenuLeft />
                </label>
                <main className='p-3'>{children}</main>
            </div> 
    
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <Sidebar/>
            </div>
        </div>
    )
  }

export default Container
