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
import { userAgent } from "next/server";
import { getSession } from "@/auth";

async function getData(id: string, token: string) {
  const data = await fetch(`${process.env.BASE_URL}/products/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}` || "",
    },
  }).then((res) => res.json());
  return data;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const user = session?.user;
  const data = await getData(params.id, user?.token);
  const product = data?.data;
  const orders = data?.orders || [];
  const artist = data?.artist;
  const categories = await fetch(
    `${process.env.BASE_URL}/products/categories`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      const categories = res.data?.map((category: { id: any; name: any }) => ({
        value: category.id,
        label: category.name,
      }));
      return categories;
    });
  const artists = await fetch(`${process.env.BASE_URL}/artists`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const artists = res.data.map((artist: { id: any; name: any }) => ({
        value: artist.id,
        label: artist.name,
      }));
      return artists;
    });
  const paper = await fetch(`${process.env.BASE_URL}/products/paper`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const sizes = await fetch(`${process.env.BASE_URL}/products/sizes`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const frames = await fetch(`${process.env.BASE_URL}/products/frames`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const subjects = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=subject-matter`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const styles = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=style`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const mediums = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=medium`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const colors = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=color-palette`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const themes = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=theme`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  return (
    <>
      <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 p-6 md:p-10 md:flex-row">
        {product && (
          <EditProductForm
            product={product}
            themes={themes}
            colors={colors}
            mediums={mediums}
            styles={styles}
            subjects={subjects}
            frames={frames}
            sizes={sizes}
            paper={paper}
            artists={artists}
            categories={categories}
          />
        )}
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
            <DataTable columns={columns} data={orders} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
