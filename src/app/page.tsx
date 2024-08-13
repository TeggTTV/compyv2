import Landing from "./pages/Landing";

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default async function Home() {
  const allUsers = await db.user.findMany({ take: 10, select: { id: true, name: true } });
  console.log(allUsers);


  return (
    // router
    <>
      <Landing />
    </>
  );
}
