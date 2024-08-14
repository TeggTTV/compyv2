import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export async function postData(e: any) {
//     e.preventDefault();

//     const data = {
//         name1: encryptData(e.target.email.value),
//         username: e.target.username.value,
//         email: e.target.email.value,
//         password: e.target.password.value,
//     };

//     const url = "/api/hello";

//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }

//         const result = await response.json();
//         console.log(result.message); // Should log: "Data processed successfully."
//     } catch (error) {
//         console.error(
//             "There has been a problem with your fetch operation:",
//             error
//         );
//     }
// }

export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}