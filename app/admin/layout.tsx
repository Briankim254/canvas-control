import { TooltipProvider } from "@/components/ui/tooltip";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
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

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  if (user?.verification == "UNVERIFIED") {
    redirect("/guest/verify");
  }

  return (
    <>
     
      <TooltipProvider delayDuration={200}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Sidebar />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <HeaderSheet />
              {/* <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbPage>
                    <Link href="#">Dashboard</Link>
                  </BreadcrumbPage>
                </BreadcrumbList>
              </Breadcrumb> */}
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
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <form
                          action={async () => {
                            "use server";
                            await signOut();
                          }}
                        >
                          <button type="submit" className="text-red-500 block">
                            Sign Out
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <SignInButton />
              )}
            </header>
            {children}
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default LayoutPage;

async function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(undefined, { redirectTo: "/" });
      }}
    >
      <Button type="submit">Sign In</Button>
    </form>
  );
}
