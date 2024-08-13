"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

function Register() {
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        let formData = new FormData(event.currentTarget);

        let newData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(newData),
        })

        const data = await response.json()
        // if data.message is "Email already exists" show error message

        setUsernameExists(false);
        setEmailExists(false);

        switch (data.message) {
            case "User_email_key":
                setEmailExists(true);
                break;
            case "User_username_key":
                setUsernameExists(true);
                break;
            default:
                setEmailExists(false);
                setUsernameExists(false);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
                        Register for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onFormSubmit} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-200">
                                {usernameExists ? (
                                    <div className="flex justify-between">Username <span className="text-red-500 text-sm">Username exists</span></div>
                                ) : (
                                    <div className="">Username</div>
                                )}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    required
                                    autoComplete="username"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm 
                                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                    focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none pl-3"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-200">
                                {emailExists ? (
                                    <div className="flex justify-between">Email address <span className="text-red-500 text-sm">Email already exists</span></div>
                                ) : (
                                    <div className="">Email address</div>
                                )}
                            </label>
                            {/* if emailExists is true, show error message */}

                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm 
                                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                    focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 outline-none pl-3"
                                />
                            </div>
                        </div>



                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-primary hover:text-blue-600">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary
                                    sm:text-sm sm:leading-6 outline-none pl-3"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                id="register-btn"
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="signin" className="font-semibold leading-6 text-primary hover:text-blue-600">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register;