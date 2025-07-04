'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../utils/auth';
import toast, { Toaster } from 'react-hot-toast';
import { LoginService, SignupService } from '@/app/services/api';
import { ShopContext } from '@/app/context/ShopContext';
import Spinner from '@/app/components/PageLoader';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('you@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState(''); 
    const { token, setToken, setRole } = useContext(ShopContext)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     const token = getToken();
    //     if (token) {
    //         router.replace('/pages/Home'); // Redirect to home if already logged in
    //     }
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
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
                    setLoading(false)
                } else {
                    toast('Registration failed: ' + response.message);
                    setLoading(false)
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
                    setLoading(false)

                } else {
                    console.log(response)
                    toast('Login failed: ' + response.message);
                    setLoading(false)
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
                            className={`w-full py-2 rounded-md transition 
    ${loading ? "bg-purple-400 cursor-not-allowed opacity-70" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                    </svg>
                                    {isRegister ? "Signing up..." : "Logging in..."}
                                </span>
                            ) : (
                                isRegister ? "Register" : "Login"
                            )}

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
            <Toaster />

        </div>
    );
};

export default Login;
