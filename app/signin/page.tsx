"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authenticate } from "@/lib/actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { resolvedTheme } = useTheme();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    const res = await authenticate(formData);
    if (res?.error) {
      toast.error(res?.error);
    }

    if (res?.success) {
      toast.success("Welcome back!");
    }
    setLoading(false);
  }

  return (
    <div className="w-full lg:grid lg:min-full lg:grid-cols-2 xl:min-h-full">
      <div className="flex flex-col gap-1 items-center justify-center h-screen">
        <Link href="/">
          <Image
            src={
              resolvedTheme?.includes("dark")
                ? "/logo-white.png"
                : "/P&PLogo-2.png"
            }
            alt="Image"
            width="200"
            height="200"
            className="h-full w-full object-cover object-center lg:hidden"
          />
        </Link>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your work email below to login.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>email</FormLabel>
                        <FormControl>
                          <Input placeholder="me@example.com" {...field} />
                        </FormControl>
                        <FormDescription>Enter your email.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>Enter your password.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col flex-grow">
                  <Button
                    aria-disabled={loading}
                    type="submit"
                    className="w-full"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={
            resolvedTheme?.includes("dark")
              ? "/logo-white.png"
              : "/P&PLogo-2.png"
          }
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
