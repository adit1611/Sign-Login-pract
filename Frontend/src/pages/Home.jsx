import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged Out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "https://sign-login-pract.vercel.app/products"; // Make sure this URL is correct
            // const url = "http://localhost:5000/products";

            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            };

            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen  flex flex-col items-center justify-center">
            <div className="bg-gray-600 bg-opacity-65 p-6 rounded-lg shadow-lg w-full max-w-3xl -mt-24">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Welcome {loggedInUser}</h1>
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
                >
                    Logout
                </button>

                <div>
                    {products?.length > 0 ? (
                        <ul className="space-y-4">
                            {products.map((item, index) => (
                                <li
                                    key={index}
                                    className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
                                >
                                    <span className="text-lg font-medium text-gray-700">{item.name}</span>
                                    <span className="text-gray-500">${item.price}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600">No products available</p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
