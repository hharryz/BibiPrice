"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authMagicLink, authPassword } from "./sign-request";

import { AuthError } from "next-auth";

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoadingMagicLink, setIsLoadingMagicLink] =
    React.useState<boolean>(false);
  const [isLoadingPassword, setIsLoadingPassword] =
    React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  async function submitMagicLink(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoadingMagicLink(true);

    try {
      await authMagicLink(email).then(() => {
        setIsLoadingMagicLink(false);
      });
    } catch (error) {
      if (error instanceof AuthError) {
        console.log("[Error in UserAuthForm] Magic Link", error);
      }
      throw error;
    }

    setTimeout(() => {
      setIsLoadingMagicLink(false);
    }, 3000);
  }

  async function submitPassword(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoadingPassword(true);

    try {
      await authPassword(email, password).then(() => {
        setIsLoadingPassword(false);
      });
    } catch (error) {
      if (error instanceof AuthError) {
        console.log("[Error in UserAuthForm] Password", error);
      }
      throw error;
    }

    setTimeout(() => {
      setIsLoadingPassword(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form onSubmit={onSubmit}> */}
      {/* <form> */}
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoadingMagicLink}
          />
        </div>
        <Button disabled={isLoadingMagicLink} onClick={submitMagicLink}>
          {isLoadingMagicLink && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          MagicLink验证
        </Button>
      </div>
      {/* </form> */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Input
        id="email"
        placeholder="请输入密码..."
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        disabled={isLoadingPassword}
      />
      <Button disabled={isLoadingPassword} onClick={submitPassword}>
        {isLoadingPassword && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        密码登录
      </Button>
    </div>
  );
}
