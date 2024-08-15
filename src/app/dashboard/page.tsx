"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

function Dashboard() {

    const [sessionToken, setSessionToken] = useState("");
    const cookies = getCookie("access_token");
    console.log(cookies);
    
    
    
    // check cookies for sessionToken
    // useEffect(() => {
    //     setSessionToken(document.cookie.split("=")[1]);
    // }, []);

    // useEffect(() => {

    // }, [sessionToken]);
    
	return (
        <>
                
        </>
    );
}

export default Dashboard;
