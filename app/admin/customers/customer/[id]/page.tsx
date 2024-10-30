import { Separator } from "@/components/ui/separator";
import { EditArtistForm } from "./edit-customer-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "../../data-table";
import { columns } from "./columns";
import { toast } from "sonner";
import { UserData } from "@/server/actions";

async function getData(id: string) {
  const data = await fetch(`${process.env.BASE_URL}/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
    },
  }).then((res) => res.json());
  if (data.message !== "success") {
    console.log(data.message);
    return [];
  }
  return data;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const customer = data?.data || [];
  return (
    <>
      <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 p-6 md:p-10 md:flex-row">
        <div className="flex-1 bg-muted rounded-lg p-6 md:p-8">
          <div className="flex items-center ">
            <div className="grid gap-1">
              <div className="text-xl font-bold">
                {customer?.firstName} {customer?.lastName}
              </div>
              <div className="text-muted-foreground">{customer?.email}</div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-muted-foreground">
                {customer?.phone || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Number of Orders</h3>
              <p className="text-muted-foreground">
                {customer?._count?.orders || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Joined</h3>
              <p className="text-muted-foreground">
                {new Date(customer?.createdOn).toDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-muted rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">customer Profile</h2>
          {customer && <EditArtistForm customer={customer} id={params.id} />}
        </div>
      </div>
      <div className="mx-auto py-5 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              List of all orders by this customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={customer?.orders || []} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
