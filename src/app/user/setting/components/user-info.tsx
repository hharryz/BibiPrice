"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import updateForm, {FormData} from "./update";


function ItemBox({ item, type, value, onChange }: { item: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div key={item} className="flex flex-row gap-4 items-center">
      <div className="w-20 text-base font-semibold">{item}</div>
      <Input placeholder={item} 
      type={type}
      value={value}
      onChange={onChange}
      />
    </div>
  )
}

export default function UserInfoCard() {

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>用户信息</CardTitle>
        {/* <CardDescription>
          Used to identify your store in the marketplace.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        {/* <div>
          <Image width={96} height={96}
            src="https://avatars.githubusercontent.com/u/6876151?v=4"
            alt="user"
            className="w-24 h-24 rounded-full"
          />
        </div> */}
        <div className="space-y-3 m-1">
          <ItemBox item="用户名" type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
          <ItemBox item="邮箱" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <ItemBox item="密码" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <ItemBox item="确认密码" type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-4 border-t px-6 py-4">
        <Button>编辑</Button>
        <Button onClick={async () => {
          console.log(formData);
          await updateForm(formData)}}>保存</Button>
      </CardFooter>
    </Card>
  );
}
