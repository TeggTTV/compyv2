"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { FormEvent } from "react";
import { Bounce, toast } from "react-toastify";
import { getFullUrl, wait } from "../../lib/utils";
import { getCookie, setCookie } from "cookies-next";
import Navbar from "../../components/Navbar";

function Login() {
    const router = useRouter();

    async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // check if cookies are set
        if (getCookie("sessionToken") && getCookie("sessionTokenExpiry")) {
            toast.error('You are already logged in', {
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

            await wait(1500);

            router.push("/");

            return;
        }

        let formData = new FormData(event.currentTarget);

        let newData = {
            username: formData.get('usernameEmail'),
            password: formData.get('password')
        }
        await fetch(getFullUrl("/api/login"), {
            method: 'POST',
            body: JSON.stringify(newData),
        }).then((response) => {
            let cookies = response.headers.get('cookie');
            cookies?.split(";").forEach((cookie) => {
                let key = cookie.split("=")[0];
                let value = cookie.split("=")[1];
                if (key === '' || value === '') return;

                setCookie(key, value, { secure: true })
            });

            response.json().then((data) => {
                console.log(data);
                if (data.message === "400") {
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
                } else if (data.message === "200") {
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
                        router.push("/");
                    });
                } else if (data.message === "500") {
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
            <Navbar />
            <div className="flex h-[calc(100vh-80px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
                        Login to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onFormSubmit} method="GET" className="space-y-6">
                        <div>
                            <label htmlFor="usernameEmail" className="block text-sm font-medium leading-6 text-gray-200">
                                Username / Email address
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
                                Login
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