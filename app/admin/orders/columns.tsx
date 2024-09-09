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
import { statuses } from "./data";
import { DataTableColumnHeader } from "./data-table-column-header";

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status1 = row.original;
      const status = statuses.find(
        (status) => status.value === row.getValue("orderStatus")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
  {
    accessorKey: "createdDate",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdDate).toDateString();
      const formatted = date.toString();
      return <div>{formatted}</div>;
    },
  },
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
            <DropdownMenuItem
              onClick={() =>
                toast.promise(navigator.clipboard.writeText(order.orderId), {
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
