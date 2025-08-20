import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setDepartment({ ...department, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form submitted!", department)
        try {
            const response = await axios.post('http://localhost:3000/api/department/add', department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
            <h2 className='text-center font-bold mb-6'>Add New Department</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='dep_name' className='text-sm font-medium text-gray-700'>Department Name :</label>
                    <input type='text' name='dep_name' onChange={handleChange} value={department.dep_name} placeholder='Department name' className='mt-1  w-full p-2 border border-gray-300 rounded-md' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='description' className='text-sm block font-medium text-gray-700'>Description :</label>
                    <textarea name='description' placeholder='Description' onChange={handleChange} value={department.description} className='mt-1 block w-full p-2 border border-gray-300 rounded-md' rows="4" required />
                </div>
                <button type='submit' className='w-full bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded'>
                    Add Department
                </button>
            </form>
        </div>
    )
}

export default AddDepartment