import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Sidebar } from "@/components/sidebar";
import HeaderSheet from "@/components/HeaderSheet";
import { ModeToggle } from "@/components/ui/mode-trigger";
import { redirect } from "next/navigation";
import { SearchCommandDialog } from "@/components/custom-command";
import { getSession, logout } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package2 } from "lucide-react";
import { dancing_script } from "@/lib/fonts"; 


const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/signin");
  }
  // if (user?.verification == "UNVERIFIED") {
  //   redirect("/guest/verify");
  // }

  return (
    <>
      <TooltipProvider delayDuration={200}>
        <div className="grid min-h-screen w-full">
          <div className="hidden md:block fixed top-0 left-0 h-full w-[200px] border-r bg-muted/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <span className={`text-2xl tracking-wider text-purple-600 ${dancing_script.className}`}>Pixels & Paint</span>
                </Link>
              </div>
              <div className="flex-1">
                <Sidebar />
              </div>
            </div>
          </div>
          <div className="md:ml-[200px] flex-1 overflow-auto">
            <header className="flex h-14 items-center border-b px-4 gap-3 lg:h-[60px] lg:px-6">
              <HeaderSheet />
              <div className="relative ml-auto flex-1 md:grow-0">
                <SearchCommandDialog user={user} />
              </div>
              <ModeToggle />
              {user ? (
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="overflow-hidden rounded-full"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {user.fname.charAt(0).toUpperCase() +
                              user.lname.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        {user?.fname} {user?.lname}
                        <div className="text-sm text-muted-foreground">
                          {user?.email}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/admin/settings">
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <form
                        action={async () => {
                          "use server";
                          await logout();
                          redirect("/");
                        }}
                      >
                        <DropdownMenuItem>
                          <button className="w-full text-left text-red-500">
                            Sign Out
                          </button>
                        </DropdownMenuItem>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <SignInButton />
              )}
            </header>
            <div className="py-3">{children}</div>
          </div>
        </div>

        {/* <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Sidebar />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <HeaderSheet />
              <div className="relative ml-auto flex-1 md:grow-0">
                <SearchCommandDialog user={user} />
              </div>
              <ModeToggle />
              {user ? (
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="overflow-hidden rounded-full"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {user.fname.charAt(0).toUpperCase() +
                              user.lname.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        {user?.fname} {user?.lname}
                        <div className="text-sm text-muted-foreground">
                          {user?.email}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/admin/settings">
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <form
                        action={async () => {
                          "use server";
                          await logout();
                          redirect("/");
                        }}
                      >
                        <DropdownMenuItem>
                          <button className="w-full text-left text-red-500">
                            Sign Out
                          </button>
                        </DropdownMenuItem>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <SignInButton />
              )}
            </header>
            {children}
          </div>
        </div> */}
      </TooltipProvider>
    </>
  );
};

export default LayoutPage;

async function SignInButton() {
  return (
    <Link href="/signin">
      <Button>Sign In</Button>
    </Link>
  );
}
