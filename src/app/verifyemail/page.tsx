"use client";

import { useEffect, useState } from "react";
import { getFullUrl } from "../../lib/utils";
import Link from "next/link";

function VerifyEmail() {
    const [token, setToken] = useState("");

    const [verified, setVerified] = useState(false);

    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await fetch(getFullUrl("/api/verifyemail"), {
                method: "POST",
                body: JSON.stringify({ token }),
            });

            const data = await response.json();
            console.log(data);

            if (data.message === "Email verified") {
                setVerified(true);
            } else {
                setError(true);
            }
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );

        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {verified && (
                <div>
                    <h1 className="text-4xl text-green-500">Email verified</h1>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {token.length === 0 && (
                <h1 className="text-4xl text-red-500">Invalid or expired token</h1>
            )}
            {error && (
                <h1 className="text-4xl text-red-500">Invalid or expired token</h1>
            )}
        </div>
    )
}

export default VerifyEmail;