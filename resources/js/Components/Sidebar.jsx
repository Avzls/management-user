import React from 'react'
import { Link } from '@inertiajs/react';

const Sidebar = () => {
  return (
    <>
      <ul className="menu text-[#607D8B] space-y-3 font-semibold p-4 w-72 h-[calc(100vh-32px)] bg-base-200 my-4  border border-[#cfd8dc] rounded-2xl lg:bg-white lg:ml-4 lg:w-80">
      <h1 className='text-center text-[#263238] mb-7 font-bold text-lg'>Brand Name</h1>
          {/* Sidebar content here */}
          <span className=' text-[#5D666A]'>GENERAL</span>
          <li>
            <Link className='text-sm font-semibold' href='/dashboard'>Dashboard</Link>
          </li>
          <span className=' text-[#5D666A]'>MANAGEMENT USERS</span>
          <li>
              <Link className='text-sm font-semibold' href='/users'>Users</Link>
          </li>
          <li>
              <Link className='text-sm font-semibold' href='/roles'>Roles</Link>
          </li>
          <li>
              <Link className='text-sm font-semibold' href='/permissions'>Permission</Link>
          </li>
          <span className=' text-[#5D666A]'>AUTHENTICATE</span>
          <li>
          <button className="btn leading-loose">Logout</button>
          </li>
      </ul>
    </>
  )
}

export default Sidebar
