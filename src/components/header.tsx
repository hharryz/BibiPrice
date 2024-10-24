import Link from "next/link";
import { CircleUser, Package2, Search } from "lucide-react";

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
import { Input } from "@/components/ui/input";

import { siteLib } from "@/config/site";
import { auth } from "@/auth";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {
          siteLib.navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground w-10 justify-center text-base"
            >
              {item.label}
            </Link>
          ))
        }
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{
              session ? session.user?.email : "访客"
              }</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/user/sign">注册/登录</Link></DropdownMenuItem>
            <DropdownMenuItem>设置</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>退出</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
