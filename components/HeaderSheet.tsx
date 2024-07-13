"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  Home,
  LineChart,
  Package,
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
              href="/"
              className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base
                ${pathname === "" ? "text-accent-foreground bg-accent" : ""}`}
            >
              <SiMedibangpaint className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Pixels & Paint</span>
            </Link>
            <Link
              href="/"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                ${pathname === "/" ? "text-accent-foreground bg-accent" : ""}`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/orders"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
              ${
                pathname === "/orders" ? "text-accent-foreground bg-accent" : ""
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/products"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                ${
                  pathname === "/products"
                    ? "text-accent-foreground bg-accent"
                    : ""
                }`}
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="/customers"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
              ${
                pathname === "/customers"
                  ? "text-accent-foreground bg-accent"
                  : ""
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="/users"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
              ${
                pathname === "/users" ? "text-accent-foreground bg-accent" : ""
              }`}
            >
              <Users2 className="h-5 w-5" />
              Users
            </Link>
            <Link
              href="/settings"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground
                ${
                  pathname === "/settings"
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
