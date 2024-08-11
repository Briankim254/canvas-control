import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { toast } from "sonner";

async function getData() {
  const res = await fetch(`${process.env.BASE_URL}/products`).then((res) =>
    res.json()
  );
  console.log(res);
  if (res.message !== "success") {
    toast.error("Failed to fetch products");
    const data = [];
  }
  const data = res.data;
  return data;
}
export default async function Products() {
  const data = await getData();
  const published = data;
  const draft = data;
  const archived = data;
  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center mx-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/admin/products/create" className="">
              <Button size="sm" className="h-8 gap-1 ">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sm:whitespace-nowrap hidden sm:block">
                  Add Product
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="all">
              <DataTable data={data} columns={columns} />
            </TabsContent>
            <TabsContent value="published">
              <DataTable data={published} columns={columns} />
            </TabsContent>
            <TabsContent value="draft">
              <DataTable data={draft} columns={columns} />
            </TabsContent>
            <TabsContent value="archived">
              <DataTable data={archived} columns={columns} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </>
  );
}
