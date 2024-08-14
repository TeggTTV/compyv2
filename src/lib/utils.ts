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

export const isLocal = process.env.NEXT_PUBLIC_VERCEL_ENV === "local";
export const domain = isLocal ? "localhost:3000" : "compy-app.vercel.app";
export const protocol = isLocal ? "http://" : "https://";

export type UiRoutes = "/admin" | "/dashboard" | "/login" | "/register";
export type ApiRoute = "/api/register" | "/api/login";

export const getFullUrl = (
    route: UiRoutes | ApiRoute,
    query?: string
): string => `${protocol}${domain}${route}${query ? `?${query}` : ""}`;

// Useage:
const url = getFullUrl("/admin", "name=john");