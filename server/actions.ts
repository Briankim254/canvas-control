"use server";

import { Payment } from "@/app/admin/users/columns";
import { auth } from "@/auth";
import { artistFormSchema } from "@/app/admin/artists/create/create-artist-form";
import prisma from "@/prisma/client";
import { User, Artist, Customer, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { ProfileFormValues } from "@/components/profile-form";
import { CustomerFormSchema } from "@/app/admin/customers/create/create-customer-form";
import { ProductFormSchema } from "@/app/admin/products/create/page";

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

export const createUser = async (data: User): Promise<User> => {
  const user = await prisma.user.create({
    data,
  });
  revalidatePath("/admin/users");
  redirect("/admin/users");
};

export const updateUser = async (id: string, data: User): Promise<User> => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
};

export const updateUserPartial = async (
  id: string,
  formData: ProfileFormValues
) => {
  // const session = await auth();
  // if (!session ) {
  //   throw new Error("Unauthorized");
  // }
  // if (session && session.user.role !== "SUPER_ADMIN") {
  //   throw new Error("Unauthorized");
  // }
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: formData,
  });
  revalidatePath("/admin/users/user/" + user.id);
  revalidatePath("/admin/users");
  return user;
};

export const deleteUser = async (id: string): Promise<User> => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};

export const getArtists = async (): Promise<Artist[]> => {
  const artist = await prisma.artist.findMany();
  return artist;
};

export const getArtist = async (id: string) => {
  const artist = await prisma.artist.findUnique({
    where: {
      id: id,
    },
  });
  return artist;
};

export const getCountries = async () => {
  const countries = await fetch("https://api.first.org/data/v1/countries");
  return countries;
};

export const createArtist = async (data: artistFormSchema) => {
  const artist = await prisma.artist.create({
    data,
  });
  revalidatePath("/admin/artists");
  redirect("/admin/artists");
};

export const updateArtistPartial = async (
  id: string,
  formData: artistFormSchema
) => {
  const artist = await prisma.artist.update({
    where: {
      id: id,
    },
    data: formData,
  });
  revalidatePath("/admin/artists/artist/" + artist.id);
  return artist;
};

export const getCustomers = async () => {
  const customers = await prisma.customer.findMany({
    include: {
      _count: {
        select: { orders: true },
      },
    },
  });
  const customersWithAlias = customers.map((customer) => ({
    ...customer,
    orders: customer._count.orders,
  }));
  return customersWithAlias;
};

export const getCustomer = async (id: string) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
    include: {
      _count: {
        select: { orders: true },
      },
      orders: true,
    },
  });
  return customer;
};

export const createCustomer = async (data: CustomerFormSchema) => {
  const customer = await prisma.customer.create({
    data,
  });
  revalidatePath("/admin/customers");
  redirect("/admin/customers");
};

export const CreateProduct = async (data: ProductFormSchema) => {
  const product = await prisma.product.create({
    data,
  });
  revalidatePath("/admin/products");
  redirect("/admin/products");
};

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      _count: {
        select: { orderProducts: true },
      },
    },
  });
  const productsWithAlias = products.map((product) => ({
    ...product,
    orders: product._count.orderProducts,
  }));
  return productsWithAlias;
};

export const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product;
};

export const getProductOrders = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      _count: {
        select: { orderProducts: true },
      },
      orderProducts: {
        select: {
          order: true,
        },
      },
    },
  });
  return product;
};

export const updateProductPartial = async (
  id: string,
  formData: ProductFormSchema
) => {
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: formData,
  });
  revalidatePath("/admin/products/product/" + product.id);
  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/product/" + product.id);
  return product;
};