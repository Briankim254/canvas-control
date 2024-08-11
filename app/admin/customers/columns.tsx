"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { deleteCustomer } from "@/server/actions";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: "Name",
    cell: ({ row }) => {
      const customer = row.original.firstName + " " + row.original.lastName;
      return (
        <div>
          <div className="font-semibold">
            <Link href={`/admin/customers/customer/${row.original.id}`}>
              {customer}
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {new Date(row.original.createdOn).toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "orders",
    header: "NO of orders",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("orders") || "N/A"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/customers/customer/${customer.id}`}>
                View customer
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await deleteCustomer(customer.id);
                revalidatePath("/admin/customers");
              }}
            >
              <button className="w-full text-left text-red-500">Delete</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
