/* eslint-disable react/no-unescaped-entities */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2, Phone } from "lucide-react";
import {
  createArtist,
  getCountries,
  updateArtistPartial,
} from "@/server/actions";
import { Artist } from "@prisma/client";

const ArtistFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  bio: z
    .string()
    .min(5, {
      message: "Bio must be at least 5 characters.",
    })
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    }),
  phone: z.string().min(10).max(17),
  country: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
});

export type artistFormSchema = z.infer<typeof ArtistFormSchema>;
// type Country = {
//   country: string;
//   region: string;
// };

export function EditArtistForm({ artist }: { artist: Artist }) {
  // const [countries, setCountries] = useState([]);
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     const data = await fetch("https://api.first.org/data/v1/countries");
  //     const countries = await data.json();
  //     setCountries(countries.data);
  //   };
  //   fetchCountries();
  // }, []);
  // console.log(countries);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ArtistFormSchema>>({
    resolver: zodResolver(ArtistFormSchema),
    defaultValues: {
      name: artist.name || "",
      email: artist.email || "",
      bio: artist.bio || "",
      phone: artist.phone || "",
      country: artist.country || "",
      city: artist.city || "",
    },
  });

  async function onSubmit(values: z.infer<typeof ArtistFormSchema>) {
    setIsLoading(true);
    try {
      toast.promise(
        updateArtistPartial(artist.id, values).then((data) => {
          return data;
        }),
        {
          loading: "Loading...",
          description: "Updating profile for " + artist.name,
          success: (data) => "Artist updated successfully.",
          error: "Error",
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update artist.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="your account username" {...field} />
                </FormControl>
                <FormDescription>
                  This is the artist's public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your email address" {...field} />
                </FormControl>
                <FormDescription>
                  This is the artist's email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="your phone number" {...field} />
                </FormControl>
                <FormDescription>
                  This is the artist's phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="your country" {...field} />
                </FormControl>
                <FormDescription>This is the artist's country.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="your city" {...field} />
                </FormControl>
                <FormDescription>This is the artist's city.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can be as creative as you want here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </>
  );
}
