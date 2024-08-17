import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string;
};

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const data = JSON.parse(req.body) as {
        sessionToken: string;
        notification: {
            id: string;
        };
    };

    await new PrismaClient().notification.update({
        where: {
            id: data.notification.id,
        },
        data: {
            read: true,
        },
    });

    await new PrismaClient().$disconnect();

    try {
    } catch (error) {}

    res.status(200).json({ message: "200" });
}
