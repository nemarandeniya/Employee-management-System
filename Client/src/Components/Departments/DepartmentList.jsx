import React from 'react'
import { Link } from 'react-router-dom'

const DepartmentList = () => {
    return (
        <div>
            <div className='text-center mb-4'>
                <h3 className='text-2xl font-bold'>Manage Deparment</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type='text' placeholder='Search By Name' className='px-4 py-0.5' />
                <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Deparment</Link>
            </div>
        </div>
    )
}

export default DepartmentList