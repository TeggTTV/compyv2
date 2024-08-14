import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string;
};

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prismaClient = new PrismaClient();

    try {
        const reqBody = await req.body;

        const { token } = JSON.parse(reqBody);

        const user = await prismaClient.user.findFirst({
            where: {
                verifyEmailToken: token,
                verifyEmailExpiry: {
                    gte: new Date(),
                },
            },
        });

        console.log("user:", user, "token:", token);
        

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired token" });
        }

        console.log(user);

        await prismaClient.user
            .update({
                where: {
                    id: user.id,
                },
                data: {
                    isVerified: true,
                    verifyEmailToken: null,
                    verifyEmailExpiry: null,
                },
            })
            .catch((error) => {
                console.error("Updating user failed:", error);
                res.status(500).json({ message: "Server error" });
            });

        res.status(200).json({ message: "Email verified" });
    } catch (error) {
        console.error(
            "There has been a problem with your fetch operation:",
            error
        );
        res.status(500).json({ message: "Server error" });
    }
}
