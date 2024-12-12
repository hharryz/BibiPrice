import { UserAuthForm } from "./components/user-auth-form";

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-2xl font-extrabold">
            BibiPrice
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            图书比价
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Find the best price for your favorite books.
              </p>
              <footer className="text-sm">2024 ZJU B/S Project</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-3/4 pt-10 flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                注册/登录
              </h1>
              <p className="text-sm text-muted-foreground">
                请使用您的电子邮件地址登录或注册。
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
