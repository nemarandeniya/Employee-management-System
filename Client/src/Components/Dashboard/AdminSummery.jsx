import React from 'react'
import SummaryCard from './SummaryCard'
import { FaUsers, FaBuilding, FaMoneyBillWave, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa'

const AdminSummery = () => {
    return (
        <div className='p-6'>
            <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} color="bg-indigo-600" />
                <SummaryCard icon={<FaBuilding />} text="Total Departments" number={3} color="bg-green-400" />
                <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="Rs 30 000" color="bg-pink-800" />
            </div>


            <div className="mt-12">
                <h4 className='text-center text-2xl font-bold'>Leave Details</h4>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-yellow-300" />
                    <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={3} color="bg-blue-600" />
                    <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={4} color="bg-green-900" />
                    <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={2} color="bg-pink-900" />
                </div>
            </div>
        </div>
    )
}

export default AdminSummery