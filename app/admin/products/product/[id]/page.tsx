import { getProduct, getProductOrders } from "@/server/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "../../data-table";
import { columns } from "./columns";
import { EditProductForm } from "./edit-product-form";

async function getData(id: string) {
  const data = await getProduct(id);
  return data;
}

async function getOrderData(id: string) {
  const data = await getProductOrders(id);
  return data;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const product = await getData(params.id);
  const data = await getOrderData(params.id);
  const orders = data?.orderProducts.map((order) => ({
    ...order.order,
  }));
  return (
    <>
      <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 p-6 md:p-10 md:flex-row">
        {product && <EditProductForm product={product} />}
      </div>
      <div className="mx-auto py-5 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              List of all orders by this product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={orders || []} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
