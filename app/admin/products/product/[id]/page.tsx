import { ArtProductDetailsComponent } from "./product-details";
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
  const frames = await fetch(`${process.env.BASE_URL}/products/frames`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });

  return (
    <>
      <div className="flex flex-col w-full mx-auto gap-8 p-6 md:p-10 md:flex-row">
        {product && (
          <ArtProductDetailsComponent product={product} frame={frames} />
        )}
        {!product && <div>Product not found</div>}
      </div>
    </>
  );
}
