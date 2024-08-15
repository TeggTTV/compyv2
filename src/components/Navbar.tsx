"use client";

import { Bell, User } from "lucide-react";

import { Avatar, Badge } from "@nextui-org/react";
import { useEffect, useState } from "react";

import Link from "next/link";
import { getFullUrl, isLoggedIn } from "../lib/utils";
import { getCookie } from "cookies-next";
import { Bounce, toast } from "react-toastify";

function Navbar() {
    const [notis, setNotis] = useState<{ title: string; description: string; seen: boolean; onclick: () => void; }[]>([]);
    const [userNotis] = useState([]);
    const [notiOpen, setNotiOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lastNotisRefreshed, setLastNotisRefreshed] = useState(Date.now());

    async function getNotis() {
        if (isLoggedIn()) {
            // check if notis have been refreshed in the last 10 seconds
            if (Date.now() - lastNotisRefreshed < 10000) {
                toast.warning('Notifications have been refreshed recently. Please wait a few seconds before refreshing again.', {
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
                return;
            }
            const notisGet = await fetch(getFullUrl("/api/getUserData"), {
                method: 'POST',
                body: JSON.stringify(
                    {
                        sessionToken: getCookie("sessionToken"),
                    }
                ),
            })

            const data = await notisGet.json();
            const notifications = data.notifications as { title: string; description: string; seen: boolean; onclick: () => void; }[];

            setNotis(notifications);

            setLastNotisRefreshed(Date.now());
        } else {
            setNotis([basicNoti]);
        }
    }

    let basicNoti = {
        title: "Welcome! 🎉",
        description: "Make sure to create an accout if you don't have one already. You will be able to track your progress and save your favorite games.",
        seen: false,
        onclick: () => {
            // toast('Welcome! 🎉');
        },
    };

    const options = [{
        name: "Account Settings", onClick: () => {
            openUserProfile();
        },
        signedIn: true
    }, {
        name: "My Games", onClick: () => {
            // addNoti("My Games",
            //     "You have 3 new games to play.");
        }
        , signedIn: true
    }];

    function openUserProfile() {

    }

    // function addNoti(title: string, desc: string) {
    //     setNotis([...notis, { title, desc }]);
    // }

    function getUnseenNotis(notis: { seen: boolean, title: string | null }[]) {
        return notis.filter((noti) => (!noti.seen && noti.title !== null));
    }

    // function getNotiCount(notis: { seen: boolean, title: string | null }[]) {
    //     return getUnseenNotis(notis).length;
    // }


    function handleNotiClick() {
        if (!notiOpen) {
            getNotis();
            setNotiOpen(true);
            setUserOpen(false);
        } else {
            setNotiOpen(false);
            setUserOpen(false);
        }
    }

    function userClick() {
        if (!userOpen) {
            // userMenu.classList.remove("hidden");
            setUserOpen(true);
            setNotiOpen(false);
        } else {
            // userMenu.classList.add("hidden");
            setUserOpen(false);
            setNotiOpen(false);
        }
    }

    function handleMobileMenu() {
        if (!mobileMenuOpen) {
            setMobileMenuOpen(true);
            setNotiOpen(false);
            setUserOpen(false);
        } else {
            setMobileMenuOpen(false);
            setNotiOpen(false);
            setUserOpen(false);
        }
    }

    const [signedIn, setSignedIn] = useState(false);


    return (
        <header className="w-full">
            <nav className="h-20 z-20 w-full flex items-center justify-center px-10 py-4 bg-gray-900">
                <div className="max-w-[100rem] w-full h-full flex justify-between dark:bg-gray-900">
                    <div className="flex justify-between gap-20">
                        <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}
                            href={"/"}
                            className="self-center font-medium dark:text-gray-100"
                        >
                            compy.
                        </Link>

                        <div className="self-center hidden md:inline-block">
                            <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}
                                href="/dashboard"
                                className="text-gray-900 px-3 rounded-2xl text-sm font-medium dark:text-gray-100"
                                aria-current="page"
                            >
                                Dashboard
                            </Link>
                            <a
                                href="#"
                                className="text-gray-500 px-3 rounded-2xl text-sm font-medium dark:text-gray-100"
                            >
                                Search Games
                            </a>
                            <a
                                href="#"
                                className="text-gray-500 px-3 rounded-2xl text-sm font-medium dark:text-gray-100 dark:bg-blue-700 inline-block py-1"
                            >
                                Join Game
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center justify-center">

                        <div className="cursor-pointer text-gray-500 py-2 rounded-2xl text-sm font-medium dark:text-gray-100 relative">
                            <Badge
                                content={
                                    getUnseenNotis(notis).length > 0
                                        ? getUnseenNotis(notis).length
                                        : ""
                                }
                                className={
                                    getUnseenNotis(notis).length > 0
                                        ? "text-white pointer-events-none"
                                        : "hidden"
                                }
                                color={
                                    getUnseenNotis(notis).length > 0
                                        ? "primary"
                                        : "success"
                                }
                            >
                                <Bell
                                    id="notificationBell"
                                    onClick={handleNotiClick}
                                />
                            </Badge>
                            {/* notifcation menu that opens on bell click */}

                        </div>
                        <div className="cursor-pointer text-gray-500 py-2 rounded-2xl text-sm font-medium dark:text-gray-100 relative">
                            <Badge
                                content={
                                    userNotis.length > 0 ? userNotis.length : ""
                                }
                                className={
                                    userNotis.length > 0
                                        ? "text-white pointer-events-none"
                                        : "hidden"
                                }
                                color={
                                    userNotis.length > 0 ? "primary" : "success"
                                }
                            >
                                <User id="userIcon" onClick={userClick} />
                            </Badge>
                            {/* notifcation menu that opens on bell click */}
                        </div>

                        <div className="md:hidden flex justify-center" onClick={handleMobileMenu}>
                            <div className="flex items-center text-gray-100">
                                <svg
                                    className="block h-4 w-4 fill-current"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Mobile menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {notiOpen ? (
                <div
                    id="noti-menu"
                    className="w-64 z-20 absolute origin-top-right bg-white divide-y divide-gray-100 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none right-10"
                >

                    {notis.length === 0 ? '' : notis.map((noti: {
                        title: string;
                        description: string;
                        seen: boolean;
                        onclick: () => void;
                    }, index: number) => (

                        <div key={index} className="px-1 py-1">
                            <div
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                    noti.onclick();
                                }}
                                onMouseOver={() => {
                                    setNotis(
                                        notis.map((e, i) => {
                                            if (i === index) {
                                                return {
                                                    ...e as any,
                                                    seen: true,
                                                };
                                            }
                                            return e;
                                        }) as any
                                    );
                                }}
                            >
                                <div className="text-lg font-medium flex items-center justify-between">
                                    {noti.title}

                                    {noti.seen ? (
                                        ""
                                    ) : (
                                        <span className="inline-block relative bg-primary rounded-full w-3 h-3"></span>
                                    )}
                                </div>
                                <div className="text-sm font-light">
                                    {noti.description}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="px-1 py-1 ">
                        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {notis.length === 0 ? (<div>Sign in to see your notifcations.</div>) : ('View All')}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            {userOpen && (
                <div
                    id="user-menu"
                    className="w-52 z-20 absolute origin-top-right bg-white divide-y divide-gray-100 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none right-10"

                >
                    <div className="px-1 py-1">
                        <div className="block px-4 py-2 text-sm text-gray-700">
                            <div className="h-14 mb-2 flex items-center justify-between">
                                <div className="text-lg font-medium ">
                                    Account
                                </div>
                                <div className="text-lg font-light flex items-center">

                                    {signedIn ? (
                                        <Avatar
                                        // src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                                        />

                                    ) : (

                                        <Avatar
                                        // src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                                        />
                                    )}
                                </div>
                            </div>
                            {options.map(
                                (option, index) => {
                                    if (!option.signedIn)
                                        return (
                                            <div key={index} className="text-sm font-light hover:text-primary">
                                                {userNotis.find(
                                                    (e) => {
                                                        return (
                                                            e ===
                                                            option.name
                                                        );
                                                    }
                                                ) ? (
                                                    <div
                                                        className="w-full text-sm font-light py-2 px-2 -ml-1"
                                                        onClick={option.onClick}
                                                    >
                                                        {option.name}
                                                        {/* <div className="inline-block bg-primary rounded-full w-3 h-3"></div> */}
                                                    </div>
                                                ) : (
                                                    <div className="w-full text-sm font-light py-2 px-2 -ml-1" onClick={
                                                        option.onClick
                                                    }>
                                                        {option.name}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                }
                            )}

                            <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}
                                href={signedIn ? "/logout" : "/login"}
                                className="text-sm font-light hover:text-primary asdsada">
                                {signedIn ? (
                                    <div
                                        className="w-full text-sm font-light py-2 px-2 -ml-1 "
                                    >
                                        Logout
                                    </div>
                                ) : (
                                    <div
                                        className="w-full text-sm font-light py-2 px-2 -ml-1"
                                    >
                                        Login
                                    </div>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {mobileMenuOpen ? (
                <div className="relative z-50">
                    <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" onClick={
                        () => {
                            setMobileMenuOpen(false);
                            setNotiOpen(false);
                            setUserOpen(false);
                        }
                    }></div>
                    <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-60 max-w-sm py-6 px-6 bg-gray-900 border-r overflow-y-auto">
                        <div className="flex items-center mb-8">
                            <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}
                                className="mr-auto text-3xl font-bold leading-none text-gray-100"
                                href="/"
                            >
                                compy.
                            </Link>
                            <div className="" onClick={() => setMobileMenuOpen(false)}>
                                <svg
                                    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <ul>
                                <li className="mb-1">
                                    <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}
                                        className="block p-4 text-sm font-semibold text-gray-200 hover:bg-gray-50 hover:text-primary rounded"
                                        href="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}
                                        className="block p-4 text-sm font-semibold text-gray-200 hover:bg-gray-50 hover:text-primary rounded"
                                        href="dashboard"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <a
                                        className="block p-4 text-sm font-semibold text-gray-200 hover:bg-gray-50 hover:text-primary rounded"
                                        href="#"
                                    >
                                        Search Games
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a
                                        className="block p-4 text-sm font-semibold text-gray-200 hover:bg-gray-50 hover:text-primary rounded"
                                        href="#"
                                    >
                                        Join Game
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-auto">
                            {signedIn ? (
                                <div className="pt-6">
                                    <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}
                                        className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold text-primary bg-gray-100 hover:bg-gray-200 rounded-xl"
                                        // className="block p-4 text-sm font-semibold text-primary rounded"
                                        href="/logout"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="pt-6">
                                    <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}

                                        className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl"
                                        // className="block p-4 text-sm font-semibold text-primary rounded"
                                        href="/login"
                                    >
                                        Login
                                    </Link>
                                    <Link onClick={() => { setNotiOpen(false); setUserOpen(false); setMobileMenuOpen(false); }}
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
                    </nav>
                </div>
            ) : ("")}

        </header>
    );
}

export default Navbar;
