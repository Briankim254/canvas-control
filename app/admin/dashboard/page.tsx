import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { Dashbord1 } from "@/components/charts/dashboard1";
import { Dashboard2 } from "@/components/charts/dashboard2";
import { Dashboard3 } from "@/components/charts/dashboard3";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Orders Dashboard",
};

export default async function Dashboard() {
  return (
    <>
      <main className="">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Dashbord1 />
            <Dashboard3 />
          </div>
          <Dashboard2 />
        </div>
      </main>
    </>
  );
}
