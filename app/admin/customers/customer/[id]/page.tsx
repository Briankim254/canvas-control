import { getCustomer } from "@/server/actions";
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

async function getData(id: string) {
  const data = await getCustomer(id);
  return data;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const customer = await getData(params.id);
  return (
    <>
      <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 p-6 md:p-10 md:flex-row">
        <div className="flex-1 bg-muted rounded-lg p-6 md:p-8">
          <div className="flex items-center ">
            <div className="grid gap-1">
              <div className="text-xl font-bold">{customer?.name}</div>
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
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-muted-foreground">
                {customer?.address || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">City</h3>
              <p className="text-muted-foreground">{customer?.city || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Niumber of Orders</h3>
              <p className="text-muted-foreground">
                {customer?._count?.orders}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Joined</h3>
              <p className="text-muted-foreground">
                {customer?.createdAt?.toString()}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-muted rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">customer Profile</h2>
          {customer && <EditArtistForm customer={customer} />}
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
