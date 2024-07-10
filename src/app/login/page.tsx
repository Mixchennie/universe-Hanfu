// Ensure to import necessary dependencies
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/navigation'
import { validateEmail, validatePassword, postData } from '../../../utils';
import { AuthResponse } from '../../../types';
import CustomButton from '../../../components/CustomButton';
import Link from 'next/link';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters');
            return;
        }

        try {
            // const data: AuthResponse = await postData('/api/login', { email, password });
            // console.log('Login successful', data);
            const response = await fetch("https://6685036156e7503d1ae1ff0b.mockapi.io/api/Universemix");
            const users = await response.json()
            console.log(users)
            const userLogin = users.find(u => u.email === email && u.password === password);
            console.log(userLogin);
            if(userLogin){
                alert("account is valid")
                const token = JSON.stringify(userLogin);
                localStorage.setItem('token', token);

                // Redirect to the home page
                router.push('/');
            }else{
                alert("account is not valid")
            }
            // Redirect to dashboard or another page after successful login
            // router.push('/dashboard');
        } catch (error) {
            console.error('Error during login', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
            <div className="flex w-min-h-screen flex-col pt-4 items-center justify-between p-24">
                <div className="bg-primary p-8 h-15 rounded-md shadow-md w-96">
                    <form onSubmit={handleLogin} className="w-full max-w-sm p-6 bg-gray-100 rounded-lg shadow-md border-2 border-black">
                        <h2 className="text-4xl text-center text-white font-semibold mb-8">Login</h2>
                        <div className={`mt-3 border rounded-lg ${emailFocused ? 'border-black' : 'border-gray-300'}`}>
                            <label htmlFor="email" className="block text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                className="w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black"
                                required
                            />
                        </div>
                        <div className={`mt-3 border rounded-lg border-gray-300 ${passwordFocused ? 'border-black' : 'border-gray-300'}`}>
                            <label htmlFor="password" className="block text-white">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    className="w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-12 pr-3 flex items-center focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m0-4h4m-4 0H8" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <CustomButton
                            title="Login"
                            containerStyles="w-full text-2xl px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 ease-in-out"
                            handleClick={handleLogin}
                        />
                        <div className="text-center text-gray-500 mt-4">- OR -</div>
                        <Link href="/register" className="block text-center  text-white hover:underline mt-2">
                            Create a new account
                        </Link>
                    </form>
                </div>
            </div>
    );
};

export default LoginPage;
