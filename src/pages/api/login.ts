import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "../../lib/Secret";

import { cookies } from "next/headers";

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
        if (!loggedIn) {
            res.status(400).json({
                message: "400",
            });
        } else {
            // create session

            let sessionToken = await hash(
                userData!.username + userData!.email,
                10
            );

            let sessionTokenExpiry = new Date(
                new Date().getTime() + 1000 * 60 * 60 * 24 * 7 // 7 days
            );

            await prisma.user
                .update({
                    where: {
                        id: userData!.id,
                    },
                    data: {
                        sessionToken: sessionToken,
                        sessionTokenExpiry: sessionTokenExpiry,
                    },
                })
                .then(async () => {
                    await prisma.session
                        .create({
                            data: {
                                token: sessionToken,
                                expiresAt: sessionTokenExpiry,
                                createdAt: new Date(),
                                userId: userData!.id,
                            },
                        })
                        .then(async () => {
                            res.setHeader("cookie", [
                                `sessionToken=${sessionToken};sessionTokenExpiry=${sessionTokenExpiry};`,
                            ]);

                            res.status(200).json({
                                message: "200",
                            });
                        })
                        .catch((error) => {
                            console.error(
                                "Problem while creating session:",
                                error
                            );
                        });
                })
                .catch((error) => {
                    console.error(
                        "Problem while updating user token params:",
                        error
                    );
                });

            res.status(500).json({
                message: "500",
            });
        }
        await prisma.$disconnect();
    }
}
