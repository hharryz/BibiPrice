import Link from "next/link";
import { CircleUser, Package2 } from "lucide-react";

import { ModeToggle } from "@/components/ui/modetoggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { siteLib } from "@/config/site";
import { auth, signOut } from "@/auth";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex flex-row font-medium items-center text-sm gap-5 md:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {siteLib.navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-muted-foreground transition-colors hover:text-foreground w-10 justify-center text-base"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
        </div>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {session ? session.user?.email : "访客"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/user/sign" className="w-full">
                注册/登录
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/user/setting" className="w-full">
                设置
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form
                className="w-full"
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">退出</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
