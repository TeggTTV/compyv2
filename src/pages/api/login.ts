import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "../../lib/Secret";

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
                req.body.username === user.username ||
                req.body.username === user.email
            ) {
                if (
                    decrypt(
                        user.password,
                        process.env.SECRET_KEY as string
                    ).toString() === req.body.password.toString()
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

        if (!loggedIn) {
            res.status(400).json({
                message: "Couldn't find a user with those credentials.",
            });
        } else {
            res.status(200).json({
                message: "You have successfully logged in",
            });
            
            await prisma.$disconnect();

        }
    }
}
