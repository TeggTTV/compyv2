"use client";
import { useRouter } from 'next/navigation';
import { getFullUrl, isLoggedIn } from "../../lib/utils";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export default function Logout() {
    const router = useRouter();
    async function handleLogout() {

        if (!isLoggedIn()) {
            router.push("/login");
            return;
        }

        const response = await fetch(getFullUrl("/api/logout"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionToken: getCookie("sessionToken"),
            }),
        }).then((response) => {
            
            response.json().then((data) => {
                if (data.message === "200") {
                    deleteCookie("sessionToken");
                    deleteCookie("sessionTokenExpiry");
                    router.push("/login");
                }
            });
        });
    }

    return (
        <>
            <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gray-900">
                <div className="bg-gray-800 p-10 rounded-md w-full sm:w-96">
                    <h1 className="text-3xl font-semibold text-center text-gray-200">
                        Logout
                    </h1>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Are you sure you want to logout?
                    </p>
                    <div className="mt-5 flex justify-center">
                        <button
                            onClick={() => handleLogout()}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}