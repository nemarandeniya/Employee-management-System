import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { columns, EmployeeActionBtns } from '../../Utils/EmployeeHelper'
import axios from 'axios'

const EmployeeList = () => {

    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)

    useEffect(() => {
        const getEmployees = async () => {
            setEmpLoading(true)
            try {
                const response = await axios.get('http://localhost:3000/api/employee', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response);

                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.employees.map((emp) => (
                        {
                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department.dep_name,
                            name: emp.userId.name,
                            dob: new Date(emp.dob).toLocaleDateString(),
                            profileImage: <img width={60} className='rounded-full' src={`http://localhost:3000/${emp.userId.profileImage}`} />,
                            action: (<EmployeeActionBtns Id={emp._id} />),
                        }
                    ))
                    setEmployees(data)
                    // setFfilteredDepartments(data)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
        }
        getEmployees()
    }, [])


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
                <DataTable columns={columns} data={employees} pagination />
            </div>
        </div>
    )
}

export default EmployeeList