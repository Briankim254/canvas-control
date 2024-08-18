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
    credentials: "include",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then((res) => {
    return res.json();
  });
  console.log(product);
  if (product.message != "success") {
    throw new Error("Failed to create product");
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
};

// export const getProducts = async () => {
//   const products = await prisma.product.findMany({
//     include: {
//       _count: {
//         select: { orderProducts: true },
//       },
//     },
//   });
//   const productsWithAlias = products.map((product) => ({
//     ...product,
//     orders: product._count.orderProducts,
//   }));
//   return productsWithAlias;
// };

// export const getProduct = async (id: string) => {
//   const product = await prisma.product.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   return product;
// };

// export const getProductOrders = async (id: string) => {
//   const product = await prisma.product.findUnique({
//     where: {
//       id: id,
//     },
//     include: {
//       _count: {
//         select: { orderProducts: true },
//       },
//       orderProducts: {
//         select: {
//           order: true,
//         },
//       },
//     },
//   });
//   return product;
// };

export const EditProduct = async (id: string, data: FormData) => {
  const product = await fetch(`${process.env.BASE_URL}/products/${id}`, {
    method: "PATCH",
    body: data,
  }).then((res) => res.json());

  if (product.message !== "success") {
    throw new Error("Failed to update product");
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
};

// export const deleteProduct = async (id: string) => {
//   const product = await prisma.product.delete({
//     where: {
//       id: id,
//     },
//   });
//   revalidatePath("/admin/products");
//   revalidatePath("/admin/products/product/" + product.id);
//   return product;
// };
