"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { CreateSize, UpdateSize } from "@/server/actions";
import { useState } from "react";

const sizeFormSchema = z.object({
  size: z.string().max(40).min(1),
  inches: z.string().max(40).min(4),
  millimeters: z.string().max(40).min(4),
  centimeters: z.string().max(40).min(4),
});

export type sizeFormValues = z.infer<typeof sizeFormSchema>;

export function SizeForm(props: any) {
  const form = useForm<sizeFormValues>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: {
      size: props?.size?.name || "",
      inches: props?.size?.inches || "",
      millimeters: props?.size?.millimeters || "",
      centimeters: props?.size?.centimeters || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: sizeFormValues) {
    setIsLoading(true);
    const res: any = (await props?.size)
      ? UpdateSize(props.size.id, data)
      : CreateSize(data);
    if (res.error) {
      setIsLoading(false);
      toast.error(res.error);
      return;
    }

    setIsLoading(false);
    toast.success(
      `${props?.size ? "Size updated" : "Size created"} successfully`
    );
    form.reset;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-4">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paper Size Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Size name goes here"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The name should be descriptive and unique.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inches"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inches</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Inches goes here"
                  {...field}
                />
              </FormControl>
              <FormDescription>The size in inches.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="millimeters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Millimeters</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Millimeters goes here"
                  {...field}
                />
              </FormControl>
              <FormDescription>The size in millimeters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="centimeters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Centimeters</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Centimeters goes here"
                  {...field}
                />
              </FormControl>
              <FormDescription>The size in centimeters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {props?.size ? (
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading ? "Updating Size..." : "Update Size"}
          </Button>
        ) : (
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading ? "Creating Size..." : "Create Size"}
          </Button>
        )}
      </form>
    </Form>
  );
}
