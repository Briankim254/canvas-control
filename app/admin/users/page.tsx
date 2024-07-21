import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  columns } from "./columns";
import { DataTable } from "./data-table";
import { getUsers } from "@/server/actions";

async function getData() {
  const data = await getUsers();
  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <div className="mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              List of all Admin users
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
