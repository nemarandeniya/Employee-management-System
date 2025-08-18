import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSideBar from '../Components/Dashboard/AdminSideBar'
import Navbar from '../Components/Dashboard/Navbar'
import AdminSummery from '../Components/Dashboard/AdminSummery'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
    const { user } = useAuth()

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <AdminSideBar />
            <div className="flex-1 ml-[200px]">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard