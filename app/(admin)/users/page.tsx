import { useMutation } from "@tanstack/react-query";
import { Payment, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"; 

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ]
}

export default async function Dashboard() {

  // const {data, mutate:server_getUser ,isPending}= useMutation({
  //   mutationFn: getPayments,
  // });

  const data = await getData()

  return (
    <>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </>
  );
}
