"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  HandCoins,
  Home,
  LineChart,
  Package,
  Palette,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { SiMedibangpaint } from "react-icons/si";
import { usePathname } from "next/navigation";
import { dancing_script } from "@/lib/fonts";

function HeaderSheet() {
  const pathname = usePathname();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span
                  className={`text-2xl tracking-wider text-purple-600 ${dancing_script.className}`}
                >
                  Pixels & Paint
                </span>
              </Link>
            </div>
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                ${
                  pathname === "/admin/dashboard"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
              ${
                pathname === "/admin/orders"
                  ? "text-accent-foreground bg-accent"
                  : ""
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/admin/products"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                ${
                  pathname === "/admin/products"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="/admin/customers"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
              ${
                pathname === "/admin/customers"
                  ? "text-accent-foreground bg-accent"
                  : ""
              }`}
            >
              <HandCoins className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="/admin/users"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
              ${
                pathname === "/admin/users"
                  ? "text-accent-foreground bg-accent"
                  : ""
              }`}
            >
              <Users2 className="h-5 w-5" />
              Portal Users
            </Link>
            <Link
              href="/admin/artists"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
              ${
                pathname === "/admin/atists"
                  ? "text-accent-foreground bg-accent"
                  : ""
              }`}
            >
              <Palette className="h-5 w-5" />
              Artists
            </Link>
            <Link
              href="/admin/settings"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                ${
                  pathname === "/admin/settings"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HeaderSheet;
