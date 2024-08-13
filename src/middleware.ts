import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: ["/", "/api/webhooks/clerk"],
    secretKey: process.env.CLERK_API_SECRET,
    // encryptionkey: process.env.CLERK_ENCRYPTION_KEY,
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
