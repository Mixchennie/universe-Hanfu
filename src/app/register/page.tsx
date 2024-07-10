// Ensure to import necessary dependencies
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'router' instead of 'navigation'
import CustomButton from '../../../components/CustomButton';
import Link from 'next/link';
import { postData, validateEmail, validatePassword } from '../../../utils';
import { Hero } from '../../../components';

const RegisterPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate email, password, and confirmPassword
        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch("https://6685036156e7503d1ae1ff0b.mockapi.io/api/Universemix", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const data = await response.json();
            console.log('Registration successful', data);

            // Redirect to login page after successful registration
            router.push('/login');
        } catch (error) {
            console.error('Error during registration', error);
            alert('Registration failed. Please try again later.');
        }
    };

    return (

            <div className="flex w-min-h-screen flex-col pt-4 items-center justify-between p-24">
                <div className="bg-primary p-8 h-20 rounded-md shadow-md w-96">
                    <form onSubmit={handleRegister}>
                        <h2 className="text-4xl text-center text-white font-semibold mb-8">Register</h2>
                        <div className={`mt-3 pl-5 border rounded-lg ${usernameFocused ? 'border-black' : 'border-gray-300'}`}>
                            <label htmlFor="username" className="block text-white text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setUsernameFocused(true)}
                                onBlur={() => setUsernameFocused(false)}
                                className="w-80 mr-3 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black"
                                required
                            />
                        </div>
                        <div className={`mt-3 pl-5 border rounded-lg border-gray-300 ${emailFocused ? 'border-black' : 'border-gray-300'}`}>
                            <label htmlFor="email" className="block text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                className="w-80 mr-3 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black"
                                required
                            />
                        </div>
                        <div className={`mt-3 pl-5 border rounded-lg border-gray-300 ${passwordFocused ? 'border-black' : 'border-gray-300'}`}>
                            <label htmlFor="password" className="block text-white">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    className="w-80 mr-3 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black"
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
                        <div className={`mt-3 pl-5 border rounded-lg border-gray-300 ${confirmPasswordFocused ? 'border-black' : 'border-gray-300'}`}>
                            <label htmlFor="confirmPassword" className="block text-white">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setConfirmPasswordFocused(true)}
                                    onBlur={() => setConfirmPasswordFocused(false)}
                                    className="w-80 mr-3 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-12 pr-3 flex items-center focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m0-4h4m-4 0H8" />
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
                                title="Register"
                                containerStyles="w-full  text-2xl px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 ease-in-out"
                                handleClick={handleRegister}
                            />

                        <div className="mt-4 text-center">
                            Already have an account? <Link href="/login" className="text-white">Login here</Link>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default RegisterPage;
