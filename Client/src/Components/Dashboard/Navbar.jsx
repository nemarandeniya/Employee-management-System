import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const { user } = useAuth()
    return (
        <div className='flex justify-between items-center h-16 bg-teal-600'>
            <p className='ms-3 text-white'>Welcome {user.name}</p>
            <button className='px-4 text-white py-2 me-2 bg-teal-700 rounded hover:bg-teal-800'>Logout</button>
        </div>
    )
}

export default Navbar