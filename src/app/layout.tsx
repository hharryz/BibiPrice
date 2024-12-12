import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteLib } from "@/lib/site";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const geistSans = localFont({
  src: "../static/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../static/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const staatliches = localFont({
  src: "../static/fonts/Staatliches.woff",
  variable: "--font-staatliches",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: siteLib.name,
    template: `%s - ${siteLib.name}`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${staatliches.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
