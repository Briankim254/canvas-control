"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Artist, Product, User } from "@prisma/client";
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
import Image from "next/image";
import { toast } from "sonner";
import { deleteProduct } from "@/server/actions";

export const columns: ColumnDef<Product>[] = [
  {
    enableHiding: false,
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
    enableHiding: false,
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="aspect-square rounded-md object-cover"
          height="64"
          width="64"
        />
      );
    },
  },
  {
    enableHiding: false,
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      return <Badge variant={"outline"}>{product.status}</Badge>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return <div>${product.price}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    enableHiding: false,
    accessorKey: "orders",
    header: "Total Sales",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formatted = new Intl.DateTimeFormat("en-US").format(date);
      return <div>{formatted}</div>;
    },
  },
  {
    enableHiding: false,
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

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
            <Link href={`/admin/products/product/${product.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toast.warning("Not implemented yet");
              }}
            >
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.promise(deleteProduct(product.id), {
                  loading: "Deleting product...",
                  success: "Product deleted!",
                  error: "Failed to delete product",
                });
              }}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast.promise(navigator.clipboard.writeText(product.id), {
                  loading: "Copying ID...",
                  success: "ID copied!",
                  error: "Failed to copy ID",
                })
              }
            >
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
