import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface ResponseData {
    user?: any;
    notifications?: any;
    message: string;
}

export default function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient();
    let sessionToken = JSON.parse(req.body).sessionToken;

    try {
        const allUsers = prisma.user.findMany().then((users) => {
            const session = prisma.session
                .findUnique({
                    where: {
                        token: sessionToken,
                    },
                })
                .then((session) => {
                    users.forEach(async (user) => {
                        if (user.id === session?.userId) {
                            const notifications = await prisma.notification
                                .findMany({
                                    where: {
                                        userId: user.id,
                                    },
                                })
                                .then((notifications) => {
                                    res.status(200).json({
                                        message: "Retreived user data",
                                        user: user,
                                        notifications: notifications,
                                    });
                                    return [user, notifications];
                                });
                            return [user, notifications];
                        } else {
                            res.status(401).json({
                                message: "Unauthorized",
                            });
                        }
                    });
                });
        });
    } catch (error) {
        res.status(500).json({ message: "Error while getting users" });
    }
}
