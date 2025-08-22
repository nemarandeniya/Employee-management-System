
import React, { useEffect, useState } from 'react'
import { getDepartments } from '../../Utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        emp_name: '',
        status: '',
        designation: '',
        salary: '',
        department: ''
    })
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchDepartments = async () => {
            const departments = await getDepartments()
            setDepartments(departments)
        }
        fetchDepartments()
    }, [])

    useEffect(() => {
        const getEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response);

                if (response.data.success) {
                    const employee = response.data.employee;
                    setEmployee((prev) => ({
                        ...prev,
                        emp_name: employee.userId.name,
                        status: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department
                    }))
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        getEmployee()
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target

        setEmployee((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`http://localhost:3000/api/employee/${id}`, employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                alert("add successfully")
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
                console.log(error);

            }
        }
    }

    return (
        <>{departments && employee ? (
            <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-[750px]'>
                <h2 className='text-center text-2xl font-bold mb-6'>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <div className='mb-4 w-1/2'>
                            <label htmlFor='emp_name' className='text-sm font-medium text-gray-700'>Name :</label>
                            <input
                                type='text'
                                name='emp_name'
                                placeholder='Employee name'
                                value={employee.emp_name}
                                onChange={handleChange}
                                className='mt-1  w-full p-2 border border-gray-300 rounded-md'
                                required />
                        </div>
                        <div className='mb-4 w-1/2'>
                            <div className='mb-4 w-1/2'>
                                <label htmlFor='status' className='text-sm font-medium text-gray-700'>Marital Status :</label>
                                <select
                                    name='status'
                                    onChange={handleChange}
                                    className='mt-1  w-full p-2 border border-gray-300 rounded-md'
                                    value={employee.status} >
                                    <option value="" className="text-gray-400"
                                        disabled >Select Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className='mb-4 w-1/2'>
                            <label htmlFor='designation' className='text-sm font-medium text-gray-700'>Designation :</label>
                            <input type='text' name='designation' onChange={handleChange} placeholder='Employee Designation' className='mt-1  w-full p-2 border border-gray-300 rounded-md' required value={employee.designation} />
                        </div>
                        <div className='mb-4 w-1/2'>
                            <label htmlFor='department' className='text-sm font-medium text-gray-700'>Department :</label>
                            <select name='department' className='mt-1  w-full p-2 border border-gray-300 rounded-md' onChange={handleChange} value={employee.departments}>
                                <option value="" className="text-gray-400" disabled>Select Department</option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className='mb-4 w-1/2'>
                            <label htmlFor='salary' className='text-sm font-medium text-gray-700'>Salary :</label>
                            <input type='number' name='salary' value={employee.salary} placeholder='Employee Salary' onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                        </div>

                    </div>
                    <button type='submit' className='w-full bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded'>
                        Update Employee
                    </button>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    )
}

export default EditEmployee