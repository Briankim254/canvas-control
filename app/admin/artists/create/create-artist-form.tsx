/* eslint-disable react/no-unescaped-entities */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Phone } from "lucide-react";
import { createArtist } from "@/server/actions";
import { AnimatedBeamArtist } from "@/components/beam";
import Link from "next/link";

const ArtistFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
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
export function CreateArtistForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ArtistFormSchema>>({
    resolver: zodResolver(ArtistFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      phone: "",
      country: "",
      city: "",
    },
  });

  const [open, setOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof ArtistFormSchema>) {
    setIsLoading(true);

    const res = await createArtist(values);

    if (res.error) {
      toast.error(res.error);
    } else if (res.message == "success") {
      form.reset();
      setOpen(true);
    } else {
      toast.error("Failed to create artist");
    }
    setIsLoading(false);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Legal account fistname" {...field} />
                </FormControl>
                <FormDescription>
                  This is the artist's first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Legal account lastname" {...field} />
                </FormControl>
                <FormDescription>
                  This is the artist's last name.
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
                  <Input placeholder="valid email address" {...field} />
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
                  <Input placeholder="valid Phone number" {...field} />
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
                  <Input placeholder="country" {...field} />
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
                  <Input placeholder="city" {...field} />
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
                    placeholder="Tell us a little bit about the artist"
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Artist Created!</DialogTitle>
            <DialogDescription>
              An email has been sent to the artist with instructions on how to
              complete their onboarding process.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-5">
            <AnimatedBeamArtist />
          </div>
          <DialogFooter>
            <Link href="/admin/artists">
              <Button>Back to Artists</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
