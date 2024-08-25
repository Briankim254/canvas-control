"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { ArrowDownUp, CalendarIcon, CheckIcon, Info } from "lucide-react";
import { frame } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateFramePrice } from "@/server/actions";
import { useState } from "react";

const framePriceFormSchema = z.object({
  frameId: z.coerce.number().min(1),
  sizeId: z.string().min(1),
  price: z.coerce.number().min(1),
});

export type framePriceFormValues = z.infer<typeof framePriceFormSchema>;

export function FramePriceForm({ frames, frameSizes }: any) {
  const form = useForm<framePriceFormValues>({
    resolver: zodResolver(framePriceFormSchema),
    defaultValues: {
      sizeId: "",
      price: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: framePriceFormValues) {
    setIsLoading(true);
    try {
      const res: any = await CreateFramePrice(data);
      if (res.error) {
        setIsLoading(false);
        toast.error(res.error);
        return;
      }

      setIsLoading(false);
      toast.success("Frmae Price created successfully");
      form.reset;
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while creating Frame price");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-4">
        <FormField
          control={form.control}
          name="frameId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Frame</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? frames.find(
                            (aFrame: any) => aFrame.id === field.value
                          )?.name
                        : "Select Frame"}
                      <ArrowDownUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput placeholder="Search Frame..." />
                    <CommandEmpty>No frame found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {frames.map((aFrame: any) => (
                          <CommandItem
                            value={aFrame.name}
                            key={aFrame.id}
                            onSelect={() => {
                              form.setValue("frameId", aFrame.id);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                aFrame.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {aFrame.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the frame that you wish to add a price on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sizeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <span>Size</span>{" "}
                <HoverCard>
                  <HoverCardTrigger>
                    <Info className=" h-3" />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {frameSizes.map((size: any) => (
                      <div key={size.id}>
                        <div>
                          {size.paper_size} - Ksh {size.price}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>{size.inches}</p>
                          <p>{size.millimeters}</p>
                          <p>
                            Created on:{" "}
                            {new Date(size.created_on).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </HoverCardContent>
                </HoverCard>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {frameSizes.map((size: any) => (
                    <SelectItem value={size.id.toString()} key={size.id}>
                      <div>
                        <div>
                          {size.paper_size} - {size.centimeters}
                        </div>
                        <span className="text-muted-foreground">
                          {" "}
                          (Ksh {size.price})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The category of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" min={0} type="number" {...field} />
              </FormControl>
              <FormDescription>
                The price of the frame for the selected size.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? "Creating Frame Price..." : "Create Frame Price"}
        </Button>
      </form>
    </Form>
  );
}
