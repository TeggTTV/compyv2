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
            console.log(user);
            
            if (
                user.email === req.body.email ||
                user.username === req.body.username
            ) {
                console.log("User found");
                
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

        if (!loggedIn) {
            res.status(400).json({
                message: "Couldn't find a user with those credentials.",
            });
        } else {
            res.status(200).json({
                message: "You have successfully logged in",
            });
        }
    }
}
