import { sendMail } from "./../../lib/mailer";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { encrypt } from "../../lib/Secret";

type ResponseData = {
    message: string;
};

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prisma = new PrismaClient().$extends({
        query: {
            user: {
                $allOperations({
                    operation,
                    args,
                    query,
                }: {
                    operation: string;
                    args: any;
                    query: any;
                }) {
                    if (
                        ["create", "update"].includes(operation) &&
                        args.data["password"]
                    ) {
                        args.data["password"] = encrypt(
                            args.data["password"],
                            process.env.SECRET_KEY as string
                        );
                    }
                    return query(args);
                },
            },
        },
    });
    const { method } = req;

    switch (method) {
        case "POST":
            let data = req.body;
            data = JSON.parse(data);

            // make request to db to see all users
            const allUsers = await prisma.user.findMany();
            // check if user exists
            let userExists = false;
            allUsers.forEach((user) => {
                if (
                    user.email === data.email ||
                    user.username === data.username
                ) {
                    res.status(400).json({
                        message:
                            user.email === data.email
                                ? "User_email_key"
                                : "User_username_key",
                    });
                    userExists = true;
                }
            });

            if (userExists) {
                return;
            }

            const result = prisma.user
                .create({
                    data: {
                        username: data.username,
                        password: data.password,
                        email: data.email,
                        Notification: {
                            create: {
                                title: "Welcome to compy! 🚀",
                                description:
                                    "We are so excited to have you here. We are sure you will love it here.",
                                createdAt: new Date(),
                                onClick: "",
                            },
                        }
                    },
                })
                .then(async (result) => {
                    // await sendMail({
                    //     id: result.id,
                    //     email: data.email,
                    //     emailType: "VERIFY",
                    // });

                    res.status(200).json({
                        message: "Account created successfully",
                    });
                })
                .catch((error) => {
                    // check if error is because of  Unique constraint failed on the constraint: `User_email_key`
                    if (error.code === "P2002") {
                        res.status(400).json({
                            message: error.meta.target,
                        });
                    } else {
                        res.status(400).json({
                            message: "Something went wrong",
                        });
                    }
                    console.log(error);
                });

            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
