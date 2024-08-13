"use client";

import { signIn, signOut, useSession } from "next-auth/react";

function Login() {

    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome back, {session.user.name}!</h1>
                <p className="text-lg">You are now logged in.</p>

                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4" onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        )
    } else {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome to compy!</h1>
                <p className="text-lg">Please sign in to continue.</p>

                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4" onClick={() => signIn()}>
                    Sign in with Google
                </button>
            </div>
        )
    }
}

export default Login;