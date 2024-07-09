import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SiMedibangpaint } from "react-icons/si";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
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
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-8 h-8">
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
                        {user.name}
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
      <section className="flex items-center flex-1">
        <div className="flex flex-col w-full ">
          <h1 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
            <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
              Coming
            </span>

            <span className="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
              Soon
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-center text-gray-700 dark:text-white md:text-xl">
            We are currently working on this page. Please check back soon.
            <br />
            <br />
            In the meantime, you can check out our other pages.
          </p>
        </div>
      </section>
    </>
  );
}

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(undefined, { redirectTo: "/dashboard" });
      }}
    >
      <Button type="submit">Sign In</Button>
    </form>
  );
}
