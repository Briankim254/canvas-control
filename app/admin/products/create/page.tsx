import React from "react";
import { CreateProductForm } from "./create-product-form";
import { UserData } from "@/server/actions";
import { getSession } from "@/auth";

async function CreatArtist() {
  const session = await getSession();
  const user = session?.user;
  const categories = await fetch(`${process.env.BASE_URL}/products/categories`,
    {
      headers: {
        "Authorization": `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      const categories = res.data.map((category: { id: any; name: any }) => ({
        value: category.id,
        label: category.name,
      }));
      return categories;
    });
  const artists = await fetch(`${process.env.BASE_URL}/artists`,
    {
      headers: {
        "Authorization": `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      const artists = res.data.map((artist: { id: any; name: any }) => ({
        value: artist.id,
        label: artist.name,
      }));
      return artists;
    });
  const paper = await fetch(`${process.env.BASE_URL}/products/paper`,
    {
      headers: {
        "Authorization": `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const sizes = await fetch(`${process.env.BASE_URL}/products/sizes`,
    {
      headers: {
        "Authorization": `Bearer ${user?.token}` || "",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const frames = await fetch(`${process.env.BASE_URL}/products/frames`,
    {
      headers: {
        "Authorization": `Bearer ${user?.token}` || "",
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
        "Authorization": `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const styles = await fetch(`${process.env.BASE_URL}/products/tags?tag=style`,
    {
      headers: {
        "Authorization": `Bearer ${user?.token}` || "",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const mediums = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=medium`,
    {
      headers: {
        "Authorization": `Bearer ${user?.token}` || "",
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
        "Authorization": `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const themes = await fetch(`${process.env.BASE_URL}/products/tags?tag=theme`,
    {
      headers: {
        "Authorization": `Bearer ${user?.token}` || "",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  return (
    <>
      <CreateProductForm
        categories={categories}
        artists={artists}
        paper={paper}
        sizes={sizes}
        frames={frames}
        subjects={subjects}
        styles={styles}
        mediums={mediums}
        colors={colors}
        themes={themes}
      />
    </>
  );
}

export default CreatArtist;
