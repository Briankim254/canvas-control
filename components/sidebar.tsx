"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HandCoins,
  Home,
  Package,
  PaintBucket,
  Palette,
  Settings,
  ShoppingCart,
  Users,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/admin/dashboard" ? "bg-muted text-primary" : ""
          }`}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/admin/orders"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/admin/orders" ? "bg-muted text-primary" : ""
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          Orders
        </Link>
        <Link
          href="/admin/products"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            pathname === "/admin/products"
              ? "bg-muted text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          <Package className="h-4 w-4" />
          Products
        </Link>
        <Link
          href="/admin/customers"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/admin/customers" ? "bg-muted text-primary" : ""
          }`}
        >
          <Users className="h-4 w-4" />
          Customers
        </Link>
        <Link
          href="/admin/users"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/admin/users" ? "bg-muted text-primary" : ""
          }`}
        >
          <Users2 className="h-4 w-4" />
          Users
        </Link>
        <Link
          href="/admin/artists"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/admin/artists" ? "bg-muted text-primary" : ""
          }`}
        >
          <Palette className="h-4 w-4" />
          Artists
        </Link>
        <Link
          href="/admin/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === "/admin/settings" ? "bg-muted text-primary" : ""
          }`}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        
      </nav>
    </>
  );
}
