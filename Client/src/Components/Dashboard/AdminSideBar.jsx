import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt, FaUsers, FaBuilding, FaCogs, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa'

const AdminSideBar = () => {
    return (
        <div className='bg-gray-800 text-white h-screen fixed left-0 bottom-0 top-0 space-y-2 w-[200px]'>
            <div className='bg-teal-600 h-16 flex items-center justify-center'>
                <h3 className='text-xl text-center font-aguafina'>Employee MS</h3>
            </div>
            <div>
                <NavLink to="/admin-dashboard" className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-3 block py-2.5 px-4 rounded`} end>
                    {/* Without end, any route that starts with /admin-dashboard would also be active. */}
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employees" className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-3 block py-2.5 px-4 rounded`}>
                    <FaUsers />
                    <span>Employees</span>
                </NavLink>
                <NavLink to="/admin-dashboard/departments" className={({ isActive }) => `${isActive ? "bg-teal-500" : " "} flex items-center space-x-3 block py-2.5 px-4 rounded`}>
                    <FaBuilding />
                    <span>Departments</span>
                </NavLink>
                <NavLink to="/admin-dashboard" className='flex items-center space-x-3 block py-2.5 px-4 rounded'>
                    <FaCalendarAlt />
                    <span>Leave</span>
                </NavLink>
                <NavLink to="/admin-dashboard" className='flex items-center space-x-3 block py-2.5 px-4 rounded'>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/admin-dashboard" className='flex items-center space-x-3 block py-2.5 px-4 rounded'>
                    <FaCogs />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}


export default AdminSideBar