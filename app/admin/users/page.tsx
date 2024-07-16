import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import {  getUsers } from "@/server/actions";

async function getData() {
  const data = await getUsers();
  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
