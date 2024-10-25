"use client";

import { useEffect, useState } from "react";
import {
  HandCoins,
  Home,
  Package,
  Palette,
  Settings,
  ShoppingCart,
  Users2,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { User } from "next-auth";
import { Input } from "./ui/input";
import Link from "next/link";

export function SearchCommandDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="⌘+K"
        onFocus={() => setOpen(true)}
        readOnly
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] text-end px-2 text-lg text-muted-foreground font-medium font-mono"
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <Link
              href="/admin/orders"
              onClick={() => setTimeout(() => setOpen(false), 500)}
            >
              <CommandItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </CommandItem>
            </Link>
            <Link
              href="/admin/customers"
              onClick={() => setTimeout(() => setOpen(false), 500)}
            >
              <CommandItem>
                <HandCoins className="mr-2 h-4 w-4" />
                <span>Customers</span>
              </CommandItem>
            </Link>
            <Link
              href="/admin/products"
              onClick={() => setTimeout(() => setOpen(false), 500)}
            >
              <CommandItem>
                <Package className="mr-2 h-4 w-4" />
                <span>Products</span>
              </CommandItem>
            </Link>
            <Link
              href="/admin/artists"
              onClick={() => setTimeout(() => setOpen(false), 500)}
            >
              <CommandItem>
                <Palette className="mr-2 h-4 w-4" />
                <span>Artists</span>
              </CommandItem>
            </Link>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Admin Basics">
            <Link
              href="/admin/users"
              onClick={() => setTimeout(() => setOpen(false), 500)}
            >
              <CommandItem>
                <Users2 className="mr-2 h-4 w-4" />
                <span>users</span>
                <CommandShortcut>⌘U</CommandShortcut>
              </CommandItem>
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setTimeout(() => setOpen(false), 500)}
            >
              <CommandItem>
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
            </Link>
            <Link
              href="/admin/settings"
              onClick={() => setTimeout(() => setOpen(false), 500)}
            >
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </Link>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
