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
import { updateCustomer } from "@/server/actions";

const CustomerFormSchema = z.object({
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(10).max(17),
});

export type CustomerFormValues = z.infer<typeof CustomerFormSchema>;

export function EditArtistForm({ customer , id }: { customer: any, id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  const form = useForm<z.infer<typeof CustomerFormSchema>>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      email: customer.email || "",
      phone: customer.phone || "",
    },
  });

  async function onSubmit(values: z.infer<typeof CustomerFormSchema>) {
    setIsLoading(true);
    try {
      toast.promise(
        updateCustomer(values, id).then((data) => {
          return data;
        }),
        {
          loading: "Loading...",
          description: "Saving changes...",
          success: (data) => `Changes saved successfully`,
          error: (error) => {
            return `${error}`;
          },
        }
      );
    } catch (error) {
      toast.error("Failed to save changes to customer");
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="your customer frist name" {...field} />
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="your customer last name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the customer's last name.
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
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </>
  );
}
