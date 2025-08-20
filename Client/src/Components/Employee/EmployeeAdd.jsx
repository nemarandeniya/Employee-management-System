import React, { useEffect, useState } from 'react'
import { getDepartments } from '../../Utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmployeeAdd = () => {
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const navigate = useNavigate

    useEffect(() => {
        const fetchDepartments = async () => {
            const departments = await getDepartments()
            setDepartments(departments)
        }
        fetchDepartments()
    }, [])


    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
            //prevData -->before update , ...prevData--> keep old data
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        //file thiyena hinda ob ekkta gnwnw.data dynamically formDataOb ekta append krnw
        const formDataOb = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataOb.append(key, formData[key])
        })
        //Object.keys(formData) → array of property names
        //ex: formDataOb.append("emp_name", "John") me wge hama property ekk through ynw

        try {
            const response = await axios.post('http://localhost:3000/api/employee/add', formDataOb, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-[750px]'>
            <h2 className='text-center text-2xl font-bold mb-6'>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='emp_name' className='text-sm font-medium text-gray-700'>Name :</label>
                        <input type='text' name='emp_name' placeholder='Employee name' onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email :</label>
                        <input type='email' name='email' placeholder='Employee email' onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='emp_id' className='text-sm font-medium text-gray-700'>Employee ID :</label>
                        <input type='text' name='emp_id' placeholder='Employee Id' onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='dob' className='text-sm font-medium text-gray-700'>Date Of Birth :</label>
                        <input type='date' name='dob' placeholder='Employee dob' onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='gender' className='text-sm font-medium text-gray-700'>Gender :</label>
                        <select name='gender' className='mt-1  w-full p-2 border border-gray-300 rounded-md' onChange={handleChange}>
                            <option value="" className="text-gray-400" disabled selected>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='status' className='text-sm font-medium text-gray-700'>Marital Status :</label>
                        <select name='status' onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md'>
                            <option value="" className="text-gray-400" disabled selected>Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='designation' className='text-sm font-medium text-gray-700'>Designation :</label>
                        <input type='text' name='designation' onChange={handleChange} placeholder='Employee Designation' className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='department' className='text-sm font-medium text-gray-700'>Department :</label>
                        <select name='department' className='mt-1  w-full p-2 border border-gray-300 rounded-md' onChange={handleChange}>
                            <option value="" className="text-gray-400" disabled selected>Select Department</option>
                            {departments.map(dep => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='salary' className='text-sm font-medium text-gray-700'>Salary :</label>
                        <input type='number' name='salary' placeholder='Employee Salary' onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='password' className='text-sm font-medium text-gray-700'>Password :</label>
                        <input type='password' onChange={handleChange} name='password' placeholder='************' className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='role' className='text-sm font-medium text-gray-700'>Role :</label>
                        <select name='role' onChange={handleChange} className='mt-1  w-full p-2 border border-gray-300 rounded-md'>
                            <option value="" className="text-gray-400" disabled selected>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div className='mb-4 w-1/2'>
                        <label htmlFor='image' className='text-sm font-medium text-gray-700'>Employee Image :</label>
                        <input type='file' onChange={handleChange} name='image' placeholder='Upload Image' className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                    </div>
                </div>
                <button type='submit' className='w-full bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded'>
                    Add Employee
                </button>
            </form>
        </div>
    )
}

export default EmployeeAdd