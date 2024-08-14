import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { decrypt, encrypt } from "../../lib/Secret";
import { redirect } from "next/navigation";

type ResponseData = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient();
    req.body = JSON.parse(req.body);
    let loggedIn = false;
    let userData = undefined;

    try {
        const allUsers = await prisma.user.findMany();
        allUsers.forEach((user) => {
            if (
                user.email === req.body.email ||
                user.username === req.body.username
            ) {
                if (
                    decrypt(user.password, process.env.SECRET_KEY as string) ===
                    req.body.password
                ) {
                    userData = user;
                    loggedIn = true;
                }
            }
        });
    } catch (error) {
        console.error(
            "There has been a problem with your fetch operation:",
            error
        );
    } finally {
        res.setHeader("Set-Cookie", [`loggedIn=true;`]);
        res.setHeader("Set-Cookie", [
            `loggedInData=${JSON.stringify(userData)};`,
        ]);

        res.status(200).json({
            message: loggedIn
                ? "You have successfully logged in"
                : "Invalid login credentials",
        });
    }
}
