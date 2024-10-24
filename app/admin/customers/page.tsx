import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/auth";

async function getData() {
  const session = await getSession();
  const user = session?.user;
  const res = await fetch(`${process.env.BASE_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  }).then((res) => res.json() || []);
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
      <div className="mx-3 py-5">
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
