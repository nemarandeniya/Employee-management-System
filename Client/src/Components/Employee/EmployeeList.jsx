import React from 'react'
import DataTable from 'react-data-table-component'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const EmployeeList = () => {
    return (
        <div>
            <div className='text-center mb-[50px] mt-3'>
                <h3 className='text-3xl font-bold'>Manage Employees</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type='text' placeholder='Search By Name' className='px-4 py-2 ms-3' />
                <Link to="/admin-dashboard/add-employee" className='px-4 py-2 flex items-center bg-teal-600 rounded text-white me-3'>
                    <span className='me-2'>Add New Employee </span> <FaPlus />
                </Link>
            </div>
            <div className='mt-[40px] me-4 ms-4'>
                <DataTable pagination />
            </div>
        </div>
    )
}

export default EmployeeList