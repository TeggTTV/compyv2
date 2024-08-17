"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Bell } from "lucide-react";
import Link from "next/link";
import Inbox from "./Inbox";

function Dashboard() {

    const [selected, setSelected] = useState("inbox");
    const [signedIn, setSignedIn] = useState(true);

    const svgStyles = "w-5 h-5 fill-gray-200";

    const list = [
        {
            id: "play",
            svg: <svg className={selected === "play" ? "w-5 h-5 fill-primary" : svgStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>,
            name: "Play",
            page: <div className=""></div>,
        },
        {
            id: "create",
            svg: <svg className={selected === "create" ? "w-5 h-5 fill-primary" : svgStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>,
            name: "Create",
            page: <div className=""></div>,
        },
        {
            id: "discover",
            svg: <svg className={selected === "discover" ? "w-5 h-5 fill-primary" : svgStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2 -76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>,
            name: "Discover",
            page: <div className=""></div>,
        },
        {
            id: "inbox",
            svg: <svg className={selected === "inbox" ? "w-5 h-5 fill-primary" : svgStyles} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" /></svg>,
            name: "Inbox",
            page: <Inbox />,
        }
    ]

    return (
        <>
            <div className="flex w-full h-screen ">
                <div className="h-full left-0 bottom-0 flex flex-col min-w-60 w-72 max-w-sm py-6 px-6 bg-gray-900">
                    {list.map((item) => (
                        <div key={item.id} onClick={() => setSelected(item.id)} className="flex items-center gap-4 pl-4 pr-4 w-full h-12 text-gray-200 cursor-pointer hover:bg-gray-700">
                            {item.svg}
                            <p className="text-sm font-semibold">{item.name}</p>
                        </div>
                    ))}

                    <div className="mt-auto">
                        {signedIn ? (
                            <div className="pt-6">
                                <Link onClick={() => { }}
                                    className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold text-primary bg-gray-100 hover:bg-gray-200 rounded-xl"
                                    // className="block p-4 text-sm font-semibold text-primary rounded"
                                    href="/logout"
                                >
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <div className="pt-6">
                                <Link onClick={() => { }}

                                    className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl"
                                    // className="block p-4 text-sm font-semibold text-primary rounded"
                                    href="/login"
                                >
                                    Login
                                </Link>
                                <Link onClick={() => { }}
                                    className="block px-4 py-3 mb-2 leading-loose text-xs text-center font-semibold text-white bg-primary hover:bg-blue-600  rounded-xl"
                                    // className="block p-4 text-sm font-semibold text-gray-200 rounded"
                                    href="/register"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                        <p className="my-4 text-xs text-center text-gray-400">
                            <span>Copyright © 2024</span>
                        </p>
                    </div>
                </div>
                <div className="w-full bg-gray-800">
                    <div className="flex h-full ">
                        {list.map((item) => {
                            if (selected === item.id) {
                                return (
                                    <div key={item.id}>
                                        {item.page}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div >
        </>
    );
}

export default Dashboard;
