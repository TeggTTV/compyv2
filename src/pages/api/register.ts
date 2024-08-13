// pages/api/hello.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { encrypt } from "../../lib/Secret";

type ResponseData = {
    message: string;
};

export default function POST(
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
                        args.data["password"] = encrypt(args.data["password"], process.env.SECRET_KEY as string);
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

            const result = prisma.user
                .create({
                    data: {
                        username: data.username,
                        password: data.password,
                        email: data.email,
                    },
                })
                .then((result) => {
                    res.status(200).json({
                        message: "Data processed successfully.",
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
