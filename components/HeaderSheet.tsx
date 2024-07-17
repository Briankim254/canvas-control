"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  Home,
  LineChart,
  Package,
  Palette,
  PanelLeft,
  ShoppingBag,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { SiMedibangpaint } from "react-icons/si";
import { usePathname } from "next/navigation";

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
            <Link
              href="#"
              className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base
                ${pathname === "" ? "text-accent-foreground bg-accent" : ""}`}
            >
              <SiMedibangpaint className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Pixels & Paint</span>
            </Link>
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
              <ShoppingBag className="h-5 w-5" />
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
              Users
            </Link>
            <Link
              href="/admin/atists"
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
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HeaderSheet;
