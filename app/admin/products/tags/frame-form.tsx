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
import { CreateFrame, CreateSize } from "@/server/actions";
import { useState } from "react";

const sizeFormSchema = z.object({
  name: z.string().max(40).min(4),
  image: z.instanceof(FileList),
});

export type frameFormValues = z.infer<typeof sizeFormSchema>;

export function FrameForm(props: any) {
  const form = useForm<frameFormValues>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: {
      name: props?.frame || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const fileRef = form.register("image");

  async function onSubmit(values: frameFormValues) {
    const data = new FormData();
    data.append("name", values.name);
    if (values.image.length > 0) {
      data.append("image", values.image[0]);
    }
    setIsLoading(true);
    const res: any = await CreateFrame(data);
    if (res?.error) {
      setIsLoading(false);
      toast.error(res.error);
      return;
    }

    setIsLoading(false);
    toast.success("Frame created successfully");
    form.reset;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paper Size Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Frame name goes here"
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
          name="image"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Upload Product image"
                    {...fileRef}
                  />
                </FormControl>
                <FormDescription>
                  The image should be a high-quality image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? "Creating Frame..." : "Create Frame"}
        </Button>
      </form>
    </Form>
  );
}
