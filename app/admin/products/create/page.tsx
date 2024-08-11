import React from "react";
import { CreateProductForm } from "./create-product-form";

async function CreatArtist() {
  const categories = await fetch(`${process.env.BASE_URL}/products/categories`)
    .then((res) => res.json())
    .then((res) => {
      const categories = res.data.map((category: { id: any; name: any }) => ({
        value: category.id,
        label: category.name,
      }));
      return categories;
    });
  const artists = await fetch(`${process.env.BASE_URL}/artists`)
    .then((res) => res.json())
    .then((res) => {
      const artists = res.data.map((artist: { id: any; name: any }) => ({
        value: artist.id,
        label: artist.name,
      }));
      return artists;
    });
  const paper = await fetch(`${process.env.BASE_URL}/products/paper`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const sizes = await fetch(`${process.env.BASE_URL}/products/sizes`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const frames = await fetch(`${process.env.BASE_URL}/products/frames`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const subjects = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=subject-matter`
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const styles = await fetch(`${process.env.BASE_URL}/products/tags?tag=style`)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const mediums = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=medium`
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const colors = await fetch(
    `${process.env.BASE_URL}/products/tags?tag=color-palette`
  )
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
  const themes = await fetch(`${process.env.BASE_URL}/products/tags?tag=theme`)
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
