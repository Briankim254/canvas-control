import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.BASE_URL}/customers`).then((res) =>
    res.json() || []
  );
  console.log(res);
  if (res.message !== "success") {
    const data = res.data || [];
  }

  const data = res.data || [];

  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Link href="/admin/customers/create">
            <Button className="m-3 h-8 gap-1 mx-2">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className=" sm:whitespace-nowrap">Add Customer</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mx-auto py-5">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              List of all Customers and sum of their orders{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
