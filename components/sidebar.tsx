"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SiMedibangpaint } from "react-icons/si";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <SiMedibangpaint className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Pixels & Paint</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/orders"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/orders"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/products"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/products"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/customers"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/customers"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/users"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/users"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Users</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Users</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/settings"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </>
  );
}