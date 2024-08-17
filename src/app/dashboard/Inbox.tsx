import { useEffect, useState } from "react";
import { getFullUrl, isLoggedIn } from "../../lib/utils";
import { getCookie } from "cookies-next";

export default function Inbox() {

    const [notifications, setNotifications] = useState<{ id: string, title: string; description: string; read: boolean; onclick: () => void; }[]>([]);
    const [lastNotisRefreshed, setLastNotisRefreshed] = useState(Date.now());

    async function getNotis() {
        if (isLoggedIn()) {
            const notisGet = await fetch(getFullUrl("/api/getUserData"), {
                method: 'POST',
                body: JSON.stringify(
                    {
                        sessionToken: getCookie("sessionToken"),
                    }
                ),
            })

            const data = await notisGet.json();
            const notis = data.notifications as { id: string, title: string; description: string; read: boolean; onclick: () => void; }[];

            setLastNotisRefreshed(Date.now());

            return notis;
        }
    }

    useEffect(() => {
        getNotis().then((notis) => {
            if (notis) {
                setNotifications(notis);
            }
        });
        setInterval(getNotis, 10000);
    }, []);

    const [content, setContent] = useState(<div></div>);

    function openNotification(noti: { id: string, title: string; description: string; read: boolean; onclick: () => void; }) {
        setContent(
            <div className="flex flex-col w-full h-full bg-gray-800 p-2">
                <div className="text-white text-2xl ml-4 mt-4">
                    {noti.title}
                </div>
                <div className="mt-2 w-full h-full border-gray-500 border-t-[1px]">
                    <div className="text-white">
                        {noti.description}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col w-[30rem] h-full bg-gray-800 p-2">
                <div className="text-white text-2xl ml-4 mt-4">
                    Inbox
                </div>
                <div className="mt-2 w-full h-full border-gray-500 border-t-[1px]">
                    {notifications.map((noti, index) => (
                        <div key={index} className="w-full p-2 text-white hover:bg-gray-700 cursor-pointer" onClick={
                            () => openNotification(noti)
                        }>
                            <div className="">{noti.title}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full bg-gray-800 border-l-gray-500 border-[1px]">
                {content}
            </div>
        </div>
    );
}