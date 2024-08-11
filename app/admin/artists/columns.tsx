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

// export type Artist = {
//   id: string;
//   name: string;
//   phone: string;
//   country: string;
//   city: string;
//   email: string;
// };

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
    enableHiding: false,
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "verificationStatus",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.original.verified;
      return (
        <Badge variant={verified ? "default" : "destructive"}>
          {verified ? "Verified" : "Not Verified"}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "signupStatus",
  //   header: "Signup Status",
  //   cell: ({ row }) => {
  //     const incomplete = row.original.incomplete;
  //     console.log(incomplete);
  //     return (
  //       <Badge variant={"outline"}>
  //         {incomplete == "incomplete" ? "Incomplete" : "Complete"}
  //       </Badge>
  //     );
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: "Registed On",
    cell: ({ row }) => {
      const date = new Date(row.original.createdDate);
      const formatted = date.toDateString();
      return <div>{formatted}</div>;
    },
  },
  {
    enableHiding: false,
    id: "actions",
    cell: ({ row }) => {
      const artist = row.original;

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
            <Link href={`/admin/artists/artist/${artist.id}`}>
              <DropdownMenuItem>View artist</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Toggle artist verification</DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(artist.id)}
            >
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
