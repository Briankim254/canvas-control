import { PlusCircle, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { toast } from "sonner";
import { getSession } from "@/auth";

async function getData(token: any) {
  const res = await fetch(`${process.env.BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}` || "",
    },
  }).then((res) => res.json());
  if (res.message !== "success") {
    toast.error("Failed to fetch products");
    const data = [];
  }
  const data = res.data;
  return data;
}
export default async function Products() {
  const session = await getSession();
  const user = session?.user;
  const data = await getData(user.token);
  return (
    <>
      <div className="justify-end flex m-3 items-center gap-2">
        <Link href="/admin/products/tags" className="">
          <Button size="sm" className="h-8 gap-1 ">
            <Settings2 className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap hidden sm:block">
              Manage Tags
            </span>
          </Button>
        </Link>
        <Link href="/admin/products/create" className="">
          <Button size="sm" className="h-8 gap-1 ">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sm:whitespace-nowrap hidden sm:block">
              Add Product
            </span>
          </Button>
        </Link>
      </div>
      <Card className="m-3">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={data} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
}
