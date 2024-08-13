import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { decrypt, encrypt } from "../../lib/Secret";

type ResponseData = {
    message: string;
};

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // cehck db for users with same email or username
    // if user does not exist return error

    const prisma = new PrismaClient();
    
    req.body = JSON.parse(req.body);

    const allUsers = await prisma.user.findMany();
    allUsers.forEach((user) => {
        if (
            user.email === req.body.email ||
            user.username === req.body.username
        ) {
            // check if password matches
            console.log(
                encrypt(user.password, process.env.SECRET_KEY as string),
                encrypt(req.body.password, process.env.SECRET_KEY as string)
            );

            if (
                decrypt(user.password, process.env.SECRET_KEY as string) ===
                req.body.password
            ) {
                res.status(200).json({
                    message: "Login successful",
                });
            }
        }
    });

    res.status(401).json({
        message: "Invalid credentials",
    });
}
