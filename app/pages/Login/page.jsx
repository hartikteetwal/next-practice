'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../utils/auth';
import toast, { Toaster } from 'react-hot-toast';
import { LoginService, SignupService } from '@/app/services/api';
import { ShopContext } from '@/app/context/ShopContext';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('you@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState(''); 
    const {token,setToken,setRole} = useContext(ShopContext)

    // useEffect(() => {
    //     const token = getToken();
    //     if (token) {
    //         router.replace('/pages/Home'); // Redirect to home if already logged in
    //     }
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password, name);
        if (!email || !password || (isRegister && !name)) {
            toast('Please fill in all fields.');
            return;
          }
        try {
            if (isRegister) {
                const response = await SignupService(email, password, name);
                console.log("Response from SignupService:", response);
                if (response.success) {
                    toast('Registration successful!');
                    setIsRegister(false);
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.role);
           
                        router.replace('/pages/Home');
             
                    setToken(response.token)
                    setRole(response.role)

                } else {
                    toast('Registration failed: ' + response.message);
                }
            } else {
                const response = await LoginService(email, password);
                if (response.success) {
                    toast('Login successful!');
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.role);
            
                        router.replace('/pages/Home');
              
                    setToken(response.token)
                    setRole(response.role)

                } else {
                    console.log(response)
                    toast('Login failed: ' + response.message);
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast('An error occurred during registration. Please try again.');
        }
    }

    return (
        <div className="flex min-h-screen md:flex-row flex-col bg-gray-100">
            {/* Left Section */}
            <div className="md:w-1/2 w-full h-1/2 md:h-auto bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold p-10">
                <div className="text-center">
                    <h1>Welcome to ECOWEAR</h1>
                    <p className="text-lg mt-4 font-normal">Your fashion partner</p>
                </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        {isRegister ? 'Register' : 'Login'}
                    </h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {isRegister && (
                            <div>
                                <label className="block mb-1 text-gray-600">Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Your name"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block mb-1 text-gray-600">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-600">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                        >
                            {isRegister ? 'Register' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            {isRegister ? 'Already have an account?' : 'New user?'}
                            <button
                                type="button"
                                className="text-purple-600 ml-1 hover:underline"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {isRegister ? 'Login here' : 'Register here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
