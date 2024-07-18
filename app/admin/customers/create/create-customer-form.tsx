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
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Phone } from "lucide-react";
import { createCustomer } from "@/server/actions";

const CustomerFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  address: z.string().min(2).max(100),
  phone: z.string().min(10).max(17),
  city: z.string().min(2).max(80),
});

export type CustomerFormSchema = z.infer<typeof CustomerFormSchema>;

export function CreateArtistForm() {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  const form = useForm<z.infer<typeof CustomerFormSchema>>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CustomerFormSchema>) {
    setIsLoading(true);
    try {
      toast.promise(
        createCustomer(values).then((data) => {
          return data;
        }),
        {
          loading: "Loading...",
          description: "Creating new artist",
          success: (data) => "Artist created successfully.",
          error: "Error",
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to create artist.");
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
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="your account username" {...field} />
                </FormControl>
                <FormDescription>
                  This is the customer's valid name.
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
                  This is the customer's email address.
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
                  This is the customer's phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="your address" {...field} />
                </FormControl>
                <FormDescription>
                  This is the customer's address.
                </FormDescription>
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
                <FormDescription>This is the customer's city.</FormDescription>
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
