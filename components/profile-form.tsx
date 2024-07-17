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
import { Textarea } from "./ui/textarea";
import { Role, User, verification } from "@prisma/client";
import { updateUserPartial } from "@/server/actions";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    }),
  verification: z.nativeEnum(verification),
  role: z.nativeEnum(Role),
});

export type ProfileFormValues = z.infer<typeof formSchema>;

export function ProfileForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      verification: user.verification || "UNVERIFIED",
      role: user.role || "DEFAULT",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      toast.promise(
        updateUserPartial(user.id, values).then((data) => {
          return data;
        }),
        {
          loading: "Loading...",
          description: "Updating profile for " + user.name,
          success: (data) => "Profile updated successfully.",
          error: "Error",
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
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
                This is your public display name.
              </FormDescription>
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
        <FormField
          control={form.control}
          name="verification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Verification</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verification status for this user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="UNVERIFIED">Unverified</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the verification status of the user.
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
}
