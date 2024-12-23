import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';



function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
   
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
                    // const url = `https://deploy-mern-app-1-api.vercel.app/auth/login`;
                    const url = "http://localhost:5000/auth/login"
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(loginInfo)
                    });
                    const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
  return (
    <div className='flex justify-center mt-36 '>
    <form onSubmit={handleLogin} className="h-[60vh] w-[40vw] bg-purple-400 bg-opacity-75 flex flex-col justify-center items-center rounded-xl shadow-xl shadow-green-800">
            <div className='-mt-10 my-10'>
                <h1 className='text-center text-2xl font-medium underline'>Login</h1>
                
            </div>
        
        <div className="flex justify-center gap-x-10 mb-6">
            <label
                htmlFor="email"
                className="block text-gray-600 font-medium mb-2"
            >
                Email
            </label>
            <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={loginInfo.email}
                className="border border-gray-300 rounded-lg p-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex justify-center gap-x-4 mb-6">
            <label
                htmlFor="password"
                className="block text-gray-600 font-medium mb-2"
            >
                Password
            </label>
            <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={loginInfo.password}
                className="border border-gray-300 rounded-lg p-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <button
            type="submit"
            className="self-center w-1/2 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300 "
        >
            Login
        </button>
        <span className="block text-center mt-4 text-gray-600">
        Does't have an account ?
        <Link
                to="/signup"
                className="text-blue-700 hover:underline hover:text-blue-900"
            >Signup</Link>
        </span>
    </form>
    <ToastContainer />
</div>
  )
}

export default Login