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
import { CreatePaper } from "@/server/actions";
import { useState } from "react";

const framePriceFormSchema = z.object({
  name: z.string().max(40).min(4),
});

export type paperFormValues = z.infer<typeof framePriceFormSchema>;
export function PaperForm(props: any) {
  const form = useForm<paperFormValues>({
    resolver: zodResolver(framePriceFormSchema),
    defaultValues: {
      name: props?.paper?.name || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: paperFormValues) {
    setIsLoading(true);
    const res: any = (await props?.paper)
      ? toast.warning("not ready!")
      : CreatePaper(data);
    if (res.error) {
      setIsLoading(false);
      toast.error(res.error);
      return;
    }

    setIsLoading(false);
    toast.success(`Paper ${props?.paper ? "updated" : "created"} successfully!`);
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Paper name goes here"
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
        {props?.paper ? (
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading ? "Updating paper..." : "Update Paper"}
          </Button>
        ) : (
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading ? "Creating paper..." : "Create Paper"}
          </Button>
        )}
      </form>
    </Form>
  );
}
