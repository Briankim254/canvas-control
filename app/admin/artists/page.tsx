import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getArtists } from "@/server/actions";
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
  const data = await getArtists();
  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button className="m-3 h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <Link
              className="sr-only sm:not-sr-only sm:whitespace-nowrap"
              href="/admin/artists/create"
            >
              Add Artist
            </Link>
          </Button>
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
