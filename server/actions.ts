"use server";

import { artistFormSchema } from "@/app/admin/artists/create/create-artist-form";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { ProfileFormValues } from "@/components/profile-form";
import { CustomerFormSchema } from "@/app/admin/customers/create/create-customer-form";
import { ProductFormSchema } from "@/app/admin/products/create/create-product-form";
import { CustomerFormValues } from "@/app/admin/customers/customer/[id]/edit-customer-form";
import { error } from "console";
import { getSession } from "@/auth";
import { framePriceFormValues } from "@/app/admin/products/tags/frame-price/frame-price-form";
import { paperFormValues } from "@/app/admin/products/tags/print-paper/paper-form";
import { paperPriceFormValues } from "@/app/admin/products/tags/paper-price/paper-price-form";
import { sizeFormValues } from "@/app/admin/products/tags/print-size/size-form";

const UserData = async () => {
  const user = await getSession();
  return user;
};

export const createUser = async (data: any) => {
  const res = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (json.message == "Admin account already exists") {
    throw new Error("Admin account already exists");
  } else if (json.message !== "success") {
    throw new Error("Failed to create user");
  }
  revalidatePath("/admin/users");
  redirect("/admin/users");
};

export const updateUser = async (id: string, data: any): Promise<any> => {
  const user = await fetch(`${process.env.BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return user;
};

// export const updateUserPartial = async (
//   id: string,
//   formData: ProfileFormValues
// ) => {
// const session = await auth();
// if (!session ) {
//   throw new Error("Unauthorized");
// }
// if (session && session.user.role !== "SUPER_ADMIN") {
//   throw new Error("Unauthorized");
// }
// const user = await prisma.user.update({
//   where: {
//     id: id,
//   },
//   data: formData,
// });
//   revalidatePath("/admin/users/user/" + user.id);
//   revalidatePath("/admin/users");
//   return user;
// };

// export const deleteUser = async (id: string): Promise<User> => {
//   const user = await prisma.user.delete({
//     where: { id },
//   });
//   return user;
// };

// export const getArtists = async (): Promise<Artist[]> => {
//   const artist = await prisma.artist.findMany();
//   return artist;
// };

// export const getArtist = async (id: string) => {
//   const artist = await prisma.artist.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   return artist;
// };

export const getCountries = async () => {
  const countries = await fetch("https://api.first.org/data/v1/countries");
  return countries;
};

export const createArtist = async (data: artistFormSchema) => {
  const session = await getSession();
  const user = session.user;
  const artist = await fetch(`${process.env.BASE_URL}/artists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  console.log(artist);
  revalidatePath("/admin/artists");
  redirect("/admin/artists");
};

export const updateArtist = async (id: string, formData: artistFormSchema) => {
  const artist = await fetch(`${process.env.BASE_URL}/artists/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  revalidatePath("/admin/artists");
  redirect("/admin/artists");
};

// export const getCustomers = async () => {
//   const customers = await prisma.customer.findMany({
//     include: {
//       _count: {
//         select: { orders: true },
//       },
//     },
//   });
//   const customersWithAlias = customers.map((customer) => ({
//     ...customer,
//     orders: customer._count.orders,
//   }));
//   return customersWithAlias;
// };

// export const getCustomer = async (id: string) => {
//   const customer = await prisma.customer.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       _count: {
//         select: { orders: true },
//       },
//       orders: true,
//     },
//   });
//   return customer;
// };

export const updateCustomer = async (data: CustomerFormValues, id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  if (res.message !== "success") {
    throw new Error("Failed to update customer");
  }

  revalidatePath("/admin/customers");
  redirect("/admin/customers");
};

export const deleteCustomer = async (id: string) => {
  const customer = await fetch(`${process.env.BASE_URL}/customers/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

  if (customer.message !== "success") {
    throw new Error("Failed to delete customer");
  }
  revalidatePath("/admin/customers");
  revalidatePath("/admin/customers/customer/" + customer.id);
  return customer;
};

export const CreateProduct = async (data: FormData) => {
  const session = await getSession();
  const user = session.user;
  console.log(data);
  const product = await fetch(`${process.env.BASE_URL}/products/add`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then((res) => {
    console.log(res);
    return res.json();
  });
  console.log(product);
  if (product.message != "success") {
    return { error: `${product.message}` };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
};

export const EditProduct = async (id: string, data: FormData) => {
  const product = await fetch(`${process.env.BASE_URL}/products/${id}`, {
    method: "PATCH",
    body: data,
  }).then((res) => res.json());

  if (product.message !== "success") {
    return { error: `${product.message}` };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
};

export const CreateFrame = async (data: FormData) => {
  const session = await getSession();
  const user = session.user;
  console.log(data);
  const frame = await fetch(`${process.env.BASE_URL}/products/frames`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  // if (frame.message !== "success") {
  //   return { error: `${frame.message}` };
  // }
  // revalidatePath("/admin/products/tags");
  // return frame;
};

export const CreateFramePrice = async (data: framePriceFormValues) => {
  const session = await getSession();
  const user = session.user;
  const framePrice = await fetch(
    `${process.env.BASE_URL}/products/frame-prices`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  if (framePrice.message !== "success") {
    return { error: `${framePrice.message}` };
  }
  revalidatePath("/admin/products/tags/frame-price");
  return framePrice;
};

export const CreatePaper = async (data: paperFormValues) => {
  const session = await getSession();
  const user = session.user;
  const paper = await fetch(`${process.env.BASE_URL}/products/paper`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  if (paper.message !== "success") {
    return { error: `${paper.message}` };
  }
  revalidatePath("/admin/products/tags/print-paper");
  return paper;
};

export const CreateSize = async (data: sizeFormValues) => {
  const session = await getSession();
  const user = session.user;
  const size = await fetch(`${process.env.BASE_URL}/products/sizes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  if (size.message !== "success") {
    return { error: `${size.message}` };
  }
  revalidatePath("/admin/products/tags/print-size");
  return size;
};

export const CreatePaperPrice = async (data: paperPriceFormValues) => {
  const session = await getSession();
  const user = session.user;
  const paperPrice = await fetch(
    `${process.env.BASE_URL}/products/paper-prices`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
  if (paperPrice.message !== "success") {
    return { error: `${paperPrice.message}` };
  }
  revalidatePath("/admin/products/tags/print-paper");
  return paperPrice;
};

export const UpdateSize = async (id: string, data: sizeFormValues) => {
  const session = await getSession();
  const user = session.user;
  const size = await fetch(`${process.env.BASE_URL}/products/sizes/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  if (size.message !== "success") {
    return { error: `${size.message}` };
  }
  revalidatePath("/admin/products/tags/print-size");
  return size;
};
