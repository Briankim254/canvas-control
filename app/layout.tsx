import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiMedibangpaint } from "react-icons/si";
import { auth, signIn, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Canvas Control",
  description: "A pixels & paint Product",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <>
          <div className=" w-full max-w-7xl">
            <div
              x-data="{ open: false }"
              className="flex flex-col max-w-screen-xl p-5 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
            >
              <div className="flex flex-row items-center justify-between lg:justify-start">
                <SiMedibangpaint className="text-blue-600 w-8 h-8 mr-2" />
                <a
                  className="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8"
                  href="/groups/header/"
                >
                  {" "}
                  Pixels&Paint{" "}
                </a>
                <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-8 h-8"
                  >
                    <path
                      x-show="!open"
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      x-show="open"
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                      style={{ display: "none" }}
                    ></path>
                  </svg>
                </button>
              </div>
              <nav
                className={`flex-col flex-grow  md:flex md:justify-start md:flex-row`}
              >
                <ul className="space-y-2 list-none lg:space-y-0 lg:items-center lg:inline-flex">
                  <li>
                    <a
                      href="/"
                      className="px-2 lg:px-6 py-6 text-sm border-b-2 border-transparent hover:border-blue-600 leading-[22px] md:px-3 text-gray-500 hover:text-blue-500"
                    >
                      {" "}
                      Home{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="px-2 lg:px-6 py-6 text-sm border-b-2 border-transparent leading-[22px] md:px-3 text-gray-500 hover:text-blue-500 hover:border-blue-600"
                    >
                      {" "}
                      FAQ{" "}
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="https://www.wickedtemplates.com/"
                      className="px-2 lg:px-6 py-6 text-sm border-b-2 border-transparent hover:border-blue-600 leading-[22px] md:px-3 text-gray-500 hover:text-blue-500"
                    ></a>
                  </li> */}
                </ul>
                <div className="ml-auto">
                  {user ? (
                    <div className="flex-grow">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                          >
                            <Image
                              src={user.image || "/placeholder-user.jpg"}
                              width={36}
                              height={36}
                              alt="Avatar"
                              className="overflow-hidden rounded-full"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>
                            {user.name }
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuItem>Support</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <form
                              action={async () => {
                                "use server";
                                await signOut();
                              }}
                            >
                              <button
                                className="text-red-500 hover:text-red-600"
                                type="submit"
                              >
                                Logout
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <div className="flex-grow">
                      <SignInButton />
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
          {children}
        </>
      </body>
    </html>
  );
}

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit">Sign In</Button>
    </form>
  );
}
