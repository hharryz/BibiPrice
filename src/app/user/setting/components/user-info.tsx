"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import updateForm, { FormData } from "./update";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { toast } from "sonner";

function ItemBox({
  item,
  type,
  value,
  onChange,
}: {
  item: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div key={item} className="flex flex-row gap-4 items-center">
      <div className="w-20 text-base font-semibold">{item}</div>
      <Input placeholder={item} type={type} value={value} onChange={onChange} />
    </div>
  );
}

export default function UserInfoCard() {
  return (
    <SessionProvider>
      <_UserInfoCard />
    </SessionProvider>
  );
}

function _UserInfoCard() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      username: session?.user?.name || "",
      email: session?.user?.email || "",
      password: "",
      confirmPassword: "",
    });
  }, [session]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>用户信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 m-1">
          <ItemBox
            item="用户名"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <ItemBox
            item="邮箱"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <ItemBox
            item="密码"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <ItemBox
            item="确认密码"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-4 border-t px-6 py-4">
        <Button>编辑</Button>
        <Button
          onClick={async () => {
            try {
              await updateForm(formData);
            } catch (error) {
              console.error(error);
              toast("保存失败", {
                description: "请检查用户名、密码是否符合要求！",
              });
            }
          }}
        >
          保存
        </Button>
      </CardFooter>
    </Card>
  );
}
