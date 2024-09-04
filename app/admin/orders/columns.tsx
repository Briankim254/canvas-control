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

export const columns: ColumnDef<any>[] = [
  {
    enableHiding: false,
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "shippingType",
    header: "Type",
    cell: ({ row }) => {
      const order = row.original;
      return <div>{order.shippingType}</div>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Badge
          className="text-xs"
          variant={product.orderStatus === "pending" ? "outline" : "secondary"}
        >
          {product.orderStatus}
        </Badge>
      );
    },
  },
  {
    accessorKey: "orderTotal",
    header: "Amount",
    cell: ({ row }) => {
      const order = row.original;
      return <div>ksh {order.orderTotal}</div>;
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.createdAt);
  //     const formatted =   date.toString();
  //     return <div>{formatted}</div>;
  //   },
  // },
  {
    enableHiding: false,
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

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
            <Link href={`/admin/oders/order/${order.id}`}>
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
            {/* <DropdownMenuItem
              onClick={() => {
                toast.promise(deleteProduct(product.id), {
                  loading: "Deleting product...",
                  success: "Product deleted!",
                  error: "Failed to delete product",
                });
              }}
            >
              Delete
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() =>
                toast.promise(navigator.clipboard.writeText(order.id), {
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
