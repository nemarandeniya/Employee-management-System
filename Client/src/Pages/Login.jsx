import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { email, password })
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate('/employee-dashboard')
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error")
            }
        }
    }
    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-r from-lime-800 from-50% to-gray-100 to-50% space-y-6 ">
            <div className="rounded-[16px]  bg-slate-50 border shadow p-6 w-70 mb-8 mt-8">
                <h2 className='text-4xl  text-center font-bold mb-4 italic font-mozilla'>Login</h2><br />
                {error && <p className='text-red-500'>{error}</p>}
                <form className=' mb-8 mt-8 mr-8 ml-8' onSubmit={handleSubmit}>

                    <div className="flex space-x-3 ">
                        <label htmlFor='email' className='text-gray-950'>
                            Email :
                        </label>
                        <input type='email' placeholder='Enter Email' autoComplete='off' name='email' className='border border-gray-300 rounded px-2 py-1' onChange={(e) => setEmail(e.target.value)} />
                    </div><br />
                    <div className="flex space-x-3">
                        <label htmlFor='password' className='text-gray-950 '>
                            Password :
                        </label>
                        <div className="col-8">
                            <input type='password' placeholder='Enter Password' autoComplete='off' name='password' className='border border-gray-300 rounded px-2 py-1' required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div><br />
                    <div className="mb-4 flex items-center justify-between">
                        <label className='inline-flex items-center'>
                            <input type='checkbox' className='form-checkbox' />
                            <span className='ml-2 text-gray-700'>Remember me</span>
                        </label>
                        <a href='#' className='text-teal-600'>Forgot Password</a>
                    </div>
                    <div className="mb-3">
                        <button type='submit' className='btn bg-lime-500 font-bold rounded-[16px] text-white py-2 w-full '>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login