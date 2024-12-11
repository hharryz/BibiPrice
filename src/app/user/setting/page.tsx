import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import UserInfoCard from "./components/user-info";

export default async function User() {
  let user = null;
  const session = await auth();

  if (session === null) {
    return (
      <>
        <h1>请先登录！</h1>
      </>
    );
  } else {
    if (session.user?.email)
      user = await prisma.user.findUnique({
        where: {
          // id: session.user.id,
          email: session.user.email,
        },
      });
    console.log(user);
  }

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2"></div>
      <div className="mx-auto w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="grid gap-6">
          <UserInfoCard />
        </div>
      </div>
    </main>
  );
}
