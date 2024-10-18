/* eslint-disable react/no-unescaped-entities */
"use client";

import { string, z } from "zod";
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
import { createUser } from "@/server/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";

const UserFormSchema = z.object({
  fName: z.string().min(2).max(50),
  lName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(2).max(80),
  role: z.string().min(2).max(80),
});

export type CustomerFormSchema = z.infer<typeof UserFormSchema>;

export function CreateArtistForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      phone: "",
      password: Math.random().toString(36).substring(2, 10),
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormSchema>) {
    setIsLoading(true);
    try {
      toast.promise(
        createUser(values).then((data) => {
          return data;
        }),
        {
          loading: "Loading...",
          description: "Creating new User",
          success: (data) => {
            return `User creation ${data}`;
          },
          error: (error) => {
            return `${error}`;
          },
        }
      );
    } catch (error) {
      toast.error("Failed to create User.");
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
            name="fName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="your account username" {...field} />
                </FormControl>
                <FormDescription>
                  This is the User's valid name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="your account username" {...field} />
                </FormControl>
                <FormDescription>
                  This is the User's valid name.
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
                  This is the User's email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="your account password" {...field} />
                </FormControl>
                <FormDescription>This is the User's password.</FormDescription>
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
                  This is the User's phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role for this user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DEFAULT">Default</SelectItem>
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="STORE_MANAGER">Store Manager</SelectItem>
                    <SelectItem value="CUSTOMER_SERVICE">
                      Customer Service
                    </SelectItem>
                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>This is the role of the user.</FormDescription>
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
