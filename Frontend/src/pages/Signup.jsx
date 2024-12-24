import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }

        if (password.length < 6) {
            return handleError('Password must be at least 6 characters long');
        }

        setLoading(true);
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Invalid input. Please check your details.');
                } else if (response.status === 500) {
                    throw new Error('Server error. Please try again later.');
                }
                throw new Error('Failed to signup. Please try again later.');
            }

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess(message || 'Signup successful');
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(message || 'Signup failed. Please check your inputs.');
            }
        } catch (err) {
            handleError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center mt-36">
            <form
                onSubmit={handleSignup}
                className="h-[60vh] w-[40vw] bg-purple-400 bg-opacity-75 flex flex-col justify-center items-center rounded-xl"
            >
                <h1 className="text-center text-lg font-medium mb-8">Signup</h1>

                <div className="flex justify-center mb-6 w-full px-8">
                    <label htmlFor="name" className="block text-gray-600 font-medium w-1/3 text-right mr-4">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name..."
                        value={signupInfo.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex justify-center mb-6 w-full px-8">
                    <label htmlFor="email" className="block text-gray-600 font-medium w-1/3 text-right mr-4">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email..."
                        value={signupInfo.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex justify-center mb-6 w-full px-8">
                    <label htmlFor="password" className="block text-gray-600 font-medium w-1/3 text-right mr-4">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password..."
                        value={signupInfo.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg p-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`self-center w-3/4 bg-blue-500 text-white py-2 rounded-lg font-medium transition duration-300 ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-600 hover:scale-105'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Signing Up...' : 'Signup'}
                </button>

                <span className="block text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline hover:text-blue-700">
                        Login
                    </Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
