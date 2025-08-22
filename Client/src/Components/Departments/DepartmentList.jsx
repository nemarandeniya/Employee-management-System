import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentActionBtns } from '../../Utils/DepartmentHelper'
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([])
    const [filteredDepartments, setFfilteredDepartments] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    //async only pauses the function, not React rendering.
    //Without a loading check,component may render before data exists, causing empty or broken UI.

    const onDepartmentDelete = async (id) => {
        const data = departments.filter(dep => dep._id !== id)
        setDepartments(data)
    }

    useEffect(() => {
        const getDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get('http://localhost:3000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response);

                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.departments.map((dep) => (
                        {
                            _id: dep._id,
                            sno: sno++,
                            dep_name: dep.dep_name,
                            action: (<DepartmentActionBtns _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                        }
                    ))
                    setDepartments(data)
                    setFfilteredDepartments(data)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDepLoading(false)
            }
        }
        getDepartments()
    }, [])

    const filterDepartments = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFfilteredDepartments(records)
    }

    return (

        <div>
            {depLoading ? <div>Loading Data...</div> :
                <>
                    <div className='text-center mb-[50px] mt-3'>
                        <h3 className='text-3xl font-bold'>Manage Deparment</h3>
                    </div>
                    <div className='flex justify-between items-center'>
                        <input type='text' placeholder='Search By Name' className='px-4 py-2 ms-3' onChange={filterDepartments} />
                        <Link to="/admin-dashboard/add-department" className='px-4 py-2 flex items-center bg-teal-600 rounded text-white me-3'>
                            <span className='me-2'>Add New Deparment </span> <FaPlus />
                        </Link>
                    </div>
                    <div className='mt-[40px] me-4 ms-4'>
                        <DataTable columns={columns} data={filteredDepartments} pagination />
                    </div>

                </>
            }
        </div>
    )
}

export default DepartmentList