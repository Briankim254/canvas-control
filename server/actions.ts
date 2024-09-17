"use server";

import { artistFormSchema } from "@/app/admin/artists/create/create-artist-form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CustomerFormValues } from "@/app/admin/customers/customer/[id]/edit-customer-form";
import { getSession } from "@/auth";
import { framePriceFormValues } from "@/app/admin/products/tags/frame-price/frame-price-form";
import { paperFormValues } from "@/app/admin/products/tags/print-paper/paper-form";
import { paperPriceFormValues } from "@/app/admin/products/tags/paper-price/paper-price-form";
import { sizeFormValues } from "@/app/admin/products/tags/print-size/size-form";
import { toast } from "sonner";

export const UserData = async () => {
  const user = await getSession();
  return user.user;
};

export const createUser = async (data: any) => {
  const res = await fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
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
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
    },
    body: JSON.stringify(data),
  });
  return user;
};

export const createArtist = async (data: artistFormSchema) => {
  const artist = await fetch(`${process.env.BASE_URL}/artists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!artist.ok) {
    return { error: `${artist.statusText}` };
  }
  console.log(artist);
  const res = await artist.json();
  revalidatePath("/admin/artists");
  return res;
};

export const updateArtist = async (id: string, formData: artistFormSchema) => {
  const artist = await fetch(`${process.env.BASE_URL}/artists/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
    },
    body: JSON.stringify(formData),
  });
  revalidatePath("/admin/artists");
  redirect("/admin/artists");
};

export const updateCustomer = async (data: CustomerFormValues, id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
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
    headers: {
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
    },
  }).then((res) => res.json());

  if (customer.message !== "success") {
    throw new Error("Failed to delete customer");
  }
  revalidatePath("/admin/customers");
  revalidatePath("/admin/customers/customer/" + customer.id);
  return customer;
};

export const CreateProduct = async (data: FormData) => {
  console.log(data);
  const product = await fetch(`${process.env.BASE_URL}/products/add`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
    },
  }).then((res) => {
    console.log(res);

    if (!res.ok) {
      return { error: `${res.statusText}` };
    }
    return res.json();
  });
  console.log(product);
  if (product.message != "success" || product.error) {
    return { error: `${product.message ? product.message : product.error}` };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
};

export const EditProduct = async (id: string, data: FormData) => {
  const product = await fetch(`${process.env.BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
    },
    body: data,
  }).then((res) => res.json());

  if (product.message !== "success") {
    return { error: `${product.message}` };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
};

export const CreateFrame = async (data: FormData) => {
  console.log(data);
  const frame = await fetch(`${process.env.BASE_URL}/products/frames`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
      "Content-Type": "application/json",
    },
    body: data,
  }).then((res) => {
    if (!res.ok) {
      return { error: `${res.statusText}` };
    }
    return res.json();
  });
  if (frame.error || frame.message !== "success") {
    return { error: `${frame.message ? frame.message : frame.error}` };
  }
  revalidatePath("/admin/products/tags");
  return frame;
};

export const CreateFramePrice = async (data: framePriceFormValues) => {
  const framePrice = await fetch(
    `${process.env.BASE_URL}/products/frame-prices`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
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
  const paper = await fetch(`${process.env.BASE_URL}/products/paper`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
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
  const size = await fetch(`${process.env.BASE_URL}/products/sizes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
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
  const paperPrice = await fetch(
    `${process.env.BASE_URL}/products/paper-prices`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
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
  const size: any = await fetch(
    `${process.env.BASE_URL}/products/sizes/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${await UserData().then((user) => user.token)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((res) => {
    if (!res.ok) {
      return { error: `${res.statusText}` };
    }
    return res.json();
  });
  console.log(size);
  if (size.message != "success" || size.error) {
    return { error: `${size.message ? size.message : size.error}` };
  }
  revalidatePath("/admin/products/tags/print-size");
  return size;
};
