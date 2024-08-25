"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { ArrowDownUp, CheckIcon, Info } from "lucide-react";
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
import { CreatePaperPrice } from "@/server/actions";
import { useState } from "react";

const paperPriceFormSchema = z.object({
  paperId: z.coerce.number().min(1),
  sizeId: z.string().min(1),
  price: z.coerce.number().min(1),
});

export type paperPriceFormValues = z.infer<typeof paperPriceFormSchema>;

export function PaperPriceForm({ paper, printSizes, pricing }: any) {
  const form = useForm<paperPriceFormValues>({
    resolver: zodResolver(paperPriceFormSchema),
    defaultValues: {
      sizeId: pricing ? pricing.sizeId.toString() : "",
      price: pricing ? pricing.price : 0,
      paperId: pricing ? pricing.paperId : null,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: paperPriceFormValues) {
    setIsLoading(true);
    try {
      const res: any = (await pricing)
        ? toast.warning("This is not ready!")
        : CreatePaperPrice(data);
      if (res.error) {
        setIsLoading(false);
        toast.error(res.error);
        return;
      }

      setIsLoading(false);
      toast.success(
        `Paper price ${pricing ? "updated" : "created"} successfully`
      );
      form.reset;
    } catch (error) {
      setIsLoading(false);
      toast.error(`Failed to ${pricing ? "update" : "create"} paper price`);
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-4">
        <FormField
          control={form.control}
          name="paperId"
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
                        ? paper.find((aPaper: any) => aPaper.id === field.value)
                            ?.name
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
                        {paper.map((aPaper: any) => (
                          <CommandItem
                            value={aPaper.name}
                            key={aPaper.id}
                            onSelect={() => {
                              form.setValue("paperId", aPaper.id);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                aPaper.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {aPaper.name}
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
                    {printSizes.map((size: any) => (
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
                  {printSizes.map((size: any) => (
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
              <FormDescription>The size of the print.</FormDescription>
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
                The price of the paper for the selected size.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {pricing ? (
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading ? "Updating paper Price..." : "Update paper Price"}
          </Button>
        ) : (
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading ? "Creating paper Price..." : "Create paper Price"}
          </Button>
        )}
      </form>
    </Form>
  );
}
