"use client";
import Link from "next/link";
import { redirect, useRouter } from 'next/navigation'
import { FormEvent, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { getFullUrl, wait } from "../../lib/utils";

function Register() {
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const router = useRouter()

    async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()


        let formData = new FormData(event.currentTarget);

        let newData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')?.toString()
        }

        const response = await fetch(getFullUrl("/api/register"), {
            method: 'POST',
            body: JSON.stringify(newData),
        })

        const data = await response.json()
        // if data.message is "Email already exists" show error message

        setUsernameExists(false);
        setEmailExists(false);

        switch (data.message) {
            case "User_email_key":
                // setEmailExists(true);
                toast.error('Email already in use.', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                break;
            case "User_username_key":
                // setUsernameExists(true);
                toast.error('Username already taken.', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                break;

            case "Account created successfully":
                toast.success('Account created successfully', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                wait(1000).then(() => {
                    router.push("/login");
                });
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
                        Create your account
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
                        <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <div>
                                <span className="font-medium">To make your password stronger, you can follow these rules:</span>
                                <ul className="mt-1.5 list-disc list-inside">
                                    <li>At least 10 characters (and up to 100 characters)</li>
                                    <li>At least one uppercase character</li>
                                    <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
                                </ul>
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
                        <Link href="login" className="font-semibold leading-6 text-primary hover:text-blue-600">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register;