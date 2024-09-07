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
import { toast } from "sonner";
import { getSession } from "@/auth";

async function getData() {
  const session = await getSession();
  const user = session?.user;
  const res = await fetch(`${process.env.BASE_URL}/artists`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  }).then((res) => res.json());
  if (res.message !== "success") {
    toast.error("Failed to fetch data");
    return [];
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
          <Link href="/admin/artists/create">
            <Button className="m-3 h-8 gap-1 mx-2">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className=" sm:whitespace-nowrap">Add Artist</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mx-auto py-5">
        <Card>
          <CardHeader>
            <CardTitle>Artists</CardTitle>
            <CardDescription>List of all artists </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
