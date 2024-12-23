import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    // console.log('signupinfo->', signupInfo);
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `https://sign-login-pract.vercel.app/auth/signup`;
            // const url = "http://localhost:5000/auth/signup"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
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
    <form onSubmit={handleSignup} className="h-[60vh] w-[40vw] bg-purple-400 bg-opacity-75 flex flex-col justify-center items-center rounded-xl">
            <div>
                <h1 className='text-center text-lg font-medium'>Signup</h1>
                
            </div>
        <div className="flex justify-center mt-10 gap-x-8 mb-6">
            <label
                htmlFor="name"
                className="block text-gray-600 font-medium mb-2"
            >
                Name
            </label>
            <input
                onChange={handleChange}
                type="text"
                name="name"
                autoFocus
                placeholder="Enter your name..."
                value={signupInfo.name}
                className="border border-gray-300 rounded-lg p-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
                value={signupInfo.email}
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
                value={signupInfo.password}
                className="border border-gray-300 rounded-lg p-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <button
            type="submit"
            className="self-center w-3/4 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300 "
        >
            Signup
        </button>
        <span className="block text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
                to="/login"
                className="text-blue-500 hover:underline hover:text-blue-700"
            >
                Login
            </Link>
        </span>
    </form>
    <ToastContainer />
</div>

  )
}

export default Signup
