"use server";

import { Payment } from "@/app/admin/users/columns";
import { auth } from "@/auth";
import { artistFormSchema } from "@/app/admin/artists/create/create-artist-form";
import prisma from "@/prisma/client";
import { User, Artist } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { ProfileFormValues } from "@/components/profile-form";

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
  revalidatePath("/admin/artists/create");
  redirect("/admin/artists");
  return artist;
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
