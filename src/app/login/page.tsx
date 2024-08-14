"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { FormEvent } from "react";
import { Bounce, toast } from "react-toastify";
import { getFullUrl, wait } from "../../lib/utils";

function Login() {
    const router = useRouter();

    async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        let formData = new FormData(event.currentTarget);

        let newData = {
            username: formData.get('usernameEmail'),
            password: formData.get('password')
        }
        const response = await fetch(getFullUrl("/api/login"), {
            method: 'POST',
            body: JSON.stringify(newData),
        }).then((response) => {
            response.json().then((data) => {
                if (data.message === "Invalid login credentials") {
                    toast.error('Invalid login credentials. Please try again.', {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                } else if (data.message === "You have successfully logged in") {
                    toast.success('You have successfully logged in', {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                    wait(1000).then(() => {
                        router.push("/dashboard");
                    });
                }


            }).catch((error) => {
                toast.error('There was an error while logging in. Please try again.', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                console.error("There has been a problem with your fetch operation:", error);
            });
        }).catch((error) => {
            console.error("There has been a problem with your fetch operation:", error);
        });
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onFormSubmit} method="GET" className="space-y-6">
                        <div>
                            <label htmlFor="usernameEmail" className="block text-sm font-medium leading-6 text-gray-200">
                                Username / usernameEmail address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="usernameEmail"
                                    name="usernameEmail"
                                    type="usernameEmail"
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
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link href="register" className="font-semibold leading-6 text-primary hover:text-blue-600">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;