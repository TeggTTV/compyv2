import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type ResponseData = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient();
    try {
        const data = req.body;
        await prisma.user.findMany().then((users) => {
            console.log("All users:", users);

            users.forEach((user) => {
                console.log(user.sessionToken, data.sessionToken);

                if (user.sessionToken === data.sessionToken) {
                    prisma.user
                        .update({
                            where: { id: user.id },
                            data: {
                                sessionToken: null,
                                sessionTokenExpiry: null,
                            },
                        })
                        .then(() => {
                            prisma.session
                                .delete({
                                    where: {
                                        token: data.sessionToken,
                                    },
                                })
                                .then((session) => {
                                    console.log("User logged out and Session deleted:", session);      
                                    res.status(200).json({ message: "200" });
                                });
                        });
                }
            });
        });
    } catch (error) {
    } finally {
        await prisma.$disconnect();
    }
}
