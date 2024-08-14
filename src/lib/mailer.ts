import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

export const sendMail = async ({ email, emailType, id }: any) => {
    const primsaClient = new PrismaClient();
    try {
        // only numbers and letters
        const hashedToken = await bcryptjs.hash(id.toString().replace(/[^a-zA-Z0-9]/g, ""), 10);

        if (emailType === "VERIFY") {
            await primsaClient.user.update({
                where: {
                    email: email,
                },
                data: {
                    verifyEmailToken: hashedToken,
                    verifyEmailExpiry: new Date(Date.now() + 3600000), // 1 hour
                },
            });
        } else if (emailType === "RESET") {
            await primsaClient.user.update({
                where: {
                    email: email,
                },
                data: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordExpiry: new Date(Date.now() + 3600000), // 1 hour
                },
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "566b975bc50a17",
                pass: "07cbc98a0b7257",
            },
        });

        const mailOptions = {
            from: "joeyjedu@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>${
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password"
            } by clicking the link below</p>
            <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">Click here</a>or copy paste the link below to your browser. <br></br>${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error);
    }
};
