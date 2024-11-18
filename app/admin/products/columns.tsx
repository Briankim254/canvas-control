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
import Image from "next/image";
import { toast } from "sonner";
// import { deleteProduct } from "@/server/actions";

export const columns: ColumnDef<any>[] = [
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "defaultPaper",
    header: "Default Paper",
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Badge variant={"secondary"}>{product?.variants?.length || 0}</Badge>
      );
    },
  },
  {
    accessorKey: "basePrice",
    header: "Base Price",
    cell: ({ row }) => {
      const product = row.original;
      return <div>Ksh {product.basePrice}</div>;
    },
  },
  {
    id: "id",
    header: "Artist",
    cell: ({ row }) => {
      const product = row.original;
      return <div>{product?.artist?.fullName}</div>;
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
              <DropdownMenuItem>View Product</DropdownMenuItem>
            </Link>
            <Link href={`/admin/products/product/edit/${product.id}`}>
              <DropdownMenuItem>Edit Product</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
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
