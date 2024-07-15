import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { SiMedibangpaint } from "react-icons/si";
import { Home, LineChart, Package, PanelLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderSheet from "@/components/HeaderSheet";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-trigger"; 

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
  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster closeButton richColors />
          <Analytics />
          <SpeedInsights />
          <>
            <TooltipProvider delayDuration={200}>
              <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Suspense fallback='Loading...'>
                  <Sidebar />
                </Suspense>
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                  <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <HeaderSheet />
                    <Breadcrumb className="hidden md:flex">
                      <BreadcrumbList>
                        <BreadcrumbPage>
                          <Link href="#">Dashboard</Link>
                        </BreadcrumbPage>
                      </BreadcrumbList>
                    </Breadcrumb>
                    <div className="relative ml-auto flex-1 md:grow-0">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                      />
                    </div>
                    <ModeToggle/>
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
                                <button type="submit" className="text-red-500">
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
        </ThemeProvider>
      </body>
    </html>
  );
}

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(undefined, { redirectTo: "/" });
      }}
    >
      <Button>Sign In</Button>
    </form>
  );
}
