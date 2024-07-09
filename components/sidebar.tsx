// "use client"
import Image from "next/image";
import React from "react";
import { SiMedibangpaint } from "react-icons/si";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signIn, signOut } from "@/auth";
import { Button } from "./ui/button";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiPaintRoller } from "react-icons/gi";

export default async function sidebar() {
  const session = await auth();
  const user = session?.user;
  // const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <a
        className="flex gap-2 text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8"
        href="/"
      >
        <SiMedibangpaint className=" w-8 h-8 " />
        <span> Pixels&Paint </span>
      </a>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <a
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
            href="#"
          >
            <LuLayoutDashboard className="w-6 h-6" />

            <span className="mx-4 font-medium">Dashboard</span>
          </a>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <GiPaintRoller className="w-5 h-5" />

            <span className="mx-4 font-medium">Artists</span>
          </a>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <MdOutlineSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Settings</span>
          </a>

          <hr className="my-6 border-gray-200 dark:border-gray-600" />

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <LuUsers className="w-5 h-5" />

            <span className="mx-4 font-medium">Users</span>
          </a>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <MdOutlineShoppingCart className="w-5 h-5" />

            <span className="mx-4 font-medium">Customers</span>
          </a>
        </nav>

        <div className="flex items-center px-4 -mx-2">
          {user ? (
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2">
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
                        className="overflow-hidden rounded-full "
                      />
                    </Button>
                    <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
                      {user ? user.name : " "}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="text-pretty">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
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
                        Sign Out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="">
              <SignInButton />
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
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
