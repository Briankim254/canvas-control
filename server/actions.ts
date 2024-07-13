"use server";

import { Payment } from "@/app/(admin)/users/columns";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

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
  return user;
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
  formData: Partial<User>
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
      id : id
     },
    data: formData,
  });
      revalidatePath("/admin/users/user/" + user.id);
      return user;
};

export const deleteUser = async (id: string): Promise<User> => {
  const user = await prisma.user.delete({
    where: { id },
  });
  return user;
};

export const getPayments = async (): Promise<Payment[]> => {
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
  ];
};
