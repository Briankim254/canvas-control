"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Brush,
  HandCoins,
  Home,
  Package,
  PaintBucket,
  Palette,
  Settings,
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
            className="transition-all group-hover:scale-110 hover:-rotate-45 hover:hue-rotate-90  group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <PaintBucket className="h-5 w-5 " />
            <span className="sr-only">Pixels & Paint</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/dashboard"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/dashboard"
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
                href="/admin/orders"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/orders"
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
                href="/admin/products"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/products"
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
                href="/admin/customers"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/customers"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
              >
                <HandCoins className="h-5 w-5" />
                <span className="sr-only">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/users"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/users"
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/artists"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/artists"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
              >
                <Palette className="h-5 w-5" />
                <span className="sr-only">Artists</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Artists</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                  pathname === "/admin/settings"
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
