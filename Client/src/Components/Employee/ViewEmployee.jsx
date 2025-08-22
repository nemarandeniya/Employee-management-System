import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ViewEmployee = () => {

    const { id } = useParams()
    const [employee, setEmployee] = useState(null)

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
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        getEmployee()
    }, [])

    return (
        //if data exist show this and if not show Loading....
        <>{employee ? (
            <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
                <h2 className='text-center text-xl font-bold mb-6'>View Employee</h2>
                <div>
                    <img src={`http://localhost:3000/${employee.userId.profileImage}`} alt='' className='rounded-full w-[440px]' />
                </div>
                <div className='flex items-center space-x-3 ms-4 mb-5 mt-5'>
                    <p className=' font-semibold'>Name :</p>
                    <p>{employee.userId.name}</p>
                </div>
                <div className='flex items-center space-x-3 ms-4 mb-5 mt-5'>
                    <p className=' font-semibold'>Employee Id :</p>
                    <p>{employee.employeeId}</p>
                </div>
                <div className='flex items-center space-x-3 ms-4 mb-5 mt-5'>
                    <p className=' font-semibold'>Date Of Birth :</p>
                    <p>{new Date(employee.dob).toLocaleDateString()}</p>
                </div>
                <div className='flex items-center space-x-3 ms-4 mb-5 mt-5'>
                    <p className=' font-semibold'>Gender :</p>
                    <p>{employee.gender}</p>
                </div>
                <div className='flex items-center space-x-3 ms-4 mb-5 mt-5'>
                    <p className=' font-semibold'>Department :</p>
                    <p>{employee.department.dep_name}</p>
                </div>
                <div className='flex items-center space-x-3 ms-4 mb-5 mt-5'>
                    <p className=' font-semibold'>Marital Status :</p>
                    <p>{employee.maritalStatus}</p>
                </div>
            </div>) : <div>Loading......</div>}</>
    )
}

export default ViewEmployee