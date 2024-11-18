/* eslint-disable react/no-unescaped-entities */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import React, { useState } from "react";
import { Check, ChevronsUpDown, Info, Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { ChevronLeft, PlusCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { CreateProduct } from "@/server/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/ui/singe-image-upload";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductFormSchema = z.object({
  image: typeof window === "undefined" ? z.any() : z.instanceof(File),
  title: z.string().min(3),
  description: z
    .string()
    .min(3, "Description is too short")
    .max(200, "Description is too long"),
  artist: z.string().nonempty(),
  category: z.coerce.number(),
  subject: z.string().nonempty(),
  medium: z.string().nonempty(),
  style: z.string().nonempty(),
  palette: z.string().nonempty(),
  theme: z.string().nonempty(),
  defaultPaper: z.string().nonempty(),
  stock: z.coerce.number(),
});

const variantSchema = z.object({
  size: z.coerce.number().min(1, "Please select a size"),
  price: z.coerce.number().min(1, "Required. Price must be greater than 0"),
});

export type ProductFormSchema = z.infer<typeof ProductFormSchema>;

export function CreateProductForm(props: {
  categories: any;
  artists: any;
  paper: any;
  sizes: any;
  frames: any;
  subjects: any;
  styles: any;
  mediums: any;
  colors: any;
  themes: any;
}) {
  const {
    categories,
    artists,
    paper,
    sizes,
    frames,
    subjects,
    styles,
    mediums,
    colors,
    themes,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      title: "",
      description: "",
      artist: "",
      subject: "",
      medium: "",
      style: "",
      palette: "",
      theme: "",
      defaultPaper: "",
      stock: 0,
    },
  });

  type Variant = {
    size: number;
    price: number;
  };

  type NewVariant = {
    size: string;
    price: string;
  };

  interface HandleVariantChange {
    (index: number, field: string, value: string | number): void;
  }

  interface HandleDeleteVariant {
    (index: number): void;
  }

  const [files, setFiles] = useState<File[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [newVariant, setNewVariant] = useState<NewVariant>({
    size: "",
    price: "",
  });
  const [open, setOpen] = useState(false);
  const ismobile = useIsMobile();

  const handleAddVariant = () => {
    const parsedVariant = variantSchema.safeParse(newVariant);
    if (!parsedVariant.success) {
      toast.error(parsedVariant.error.errors[0].message);
      return;
    }
    setVariants([
      ...variants,
      { size: Number(newVariant.size), price: Number(newVariant.price) },
    ]);
    setNewVariant({ size: "", price: "" });
    toast.success("Variant added successfully");
    setOpen(false);
  };

  const handleVariantChange: HandleVariantChange = (index, field, value) => {
    const updatedVariants = variants.map((variant, i) =>
      i === index ? { ...variant, [field]: value } : variant
    );
    setVariants(updatedVariants);
  };

  const handleNewVariantChange = (name: string, value: string) => {
    setNewVariant({ ...newVariant, [name]: value });
  };

  const handleDeleteVariant: HandleDeleteVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
    toast.warning("Variant deleted");
  };

  const handleFileUpload = (uploadedFiles: File[]) => {
    if (uploadedFiles.length > 0) {
      const selectedFile = uploadedFiles[0];

      if (selectedFile.type.startsWith("image/")) {
        setFiles([selectedFile]);
        form.setValue("image", selectedFile);
      } else {
        toast.error("Please upload an image file.");
      }
    }
  };
  async function onSubmit(values: z.infer<typeof ProductFormSchema>) {
    const data = new FormData();
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("stock", values.stock.toString());
    data.append("category", values.category.toString());
    data.append("subject", values.subject);
    data.append("medium", values.medium);
    data.append("style", values.style);
    data.append("palette", values.palette);
    data.append("theme", values.theme);
    data.append("defaultPaper", values.defaultPaper);
    data.append("artist", values.artist);
    if (values.image) {
      data.append("image", values.image);
    }
    if (variants.length > 0) {
      data.append("variants", JSON.stringify(variants));
    }

    setIsLoading(true);
    const res: any = await CreateProduct(data);
    if (res?.error) {
      setIsLoading(false);
      toast.error(res.error);
      return;
    }
    setIsLoading(false);
    toast.success("Product created successfully");
    form.reset;
    setFiles([]);
    setVariants([]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <main className="items-center gap-4 py-8 sm:px-6 sm:py-0 md:gap-8 overflow-auto max-w-6xl mx-auto ">
          <div className=" grid max-w-6xl flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/products">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link href="/admin/products">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                </Link>
                <Button disabled={isLoading} type="submit" size="sm">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Saving..." : "Save Product"}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Accurate product information is important
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div>
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full"
                                  placeholder="Product name goes here"
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
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={5}
                                  placeholder="Tell us a little bit about the product"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                You can be as detailed as you want here.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Add product variants based on size and price
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {!ismobile && (
                            <TableHead className="w-[100px]">SKU</TableHead>
                          )}
                          <TableHead>Price(ksh)</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {variants.length > 0 ? (
                          variants.map((variant, index) => (
                            <TableRow key={index}>
                              {!ismobile && (
                                <TableCell className="font-semibold text-muted-foreground">
                                  #{index + 1}
                                </TableCell>
                              )}
                              <TableCell>
                                <Label
                                  htmlFor={`price-${index}`}
                                  className="sr-only"
                                >
                                  Price
                                </Label>
                                <Input
                                  id={`price-${index}`}
                                  type="number"
                                  defaultValue={variant.price}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Select
                                  onValueChange={(value) =>
                                    handleVariantChange(index, "size", value)
                                  }
                                  defaultValue={variant.size.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a Size" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {sizes.map((size: any) => (
                                      <SelectItem
                                        value={size.id.toString()}
                                        key={size.id}
                                      >
                                        <div>
                                          <div>
                                            {size.name}{" "}
                                            {!ismobile && (
                                              <span className="text-muted-foreground">
                                                - {size.centimeters}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteVariant(index);
                                  }}
                                >
                                  <Trash size={10} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Info className="h-4 w-4" />
                                <span>No Product variants added yet</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" className="gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Variant
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Variant</DialogTitle>
                          <DialogDescription>
                            Make changes to your Variant here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="size" className="text-right">
                              Size
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleNewVariantChange("size", value)
                              }
                              defaultValue={newVariant.size}
                              required
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a Size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sizes.map((size: any) => (
                                  <SelectItem
                                    value={size.id.toString()}
                                    key={size.id}
                                  >
                                    <div>
                                      <div>
                                        {size.name}{" "}
                                        <span className="text-muted-foreground">
                                          - {size.centimeters}
                                        </span>
                                      </div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="price" className="text-right">
                              Price
                            </Label>
                            <Input
                              required
                              id="price"
                              name="price"
                              type="number"
                              onChange={(e) =>
                                handleNewVariantChange("price", e.target.value)
                              }
                            />{" "}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button className="w-full" onClick={handleAddVariant}>
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Product Attributes</CardTitle>
                    <CardDescription>
                      Add product attributes for better categorization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {subjects.map((subject: any) => (
                                    <SelectItem
                                      value={subject.id.toString()}
                                      key={subject.id}
                                    >
                                      {subject.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The subject of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="medium"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Medium</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select medium" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {mediums.map((medium: any) => (
                                    <SelectItem
                                      value={medium.id.toString()}
                                      key={medium.id}
                                    >
                                      {medium.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The medium of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="style"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Style</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select style" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {styles.map((style: any) => (
                                    <SelectItem
                                      value={style.id.toString()}
                                      key={style.id}
                                    >
                                      {style.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The style of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="palette"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Palette</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select palette" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {colors.map((color: any) => (
                                    <SelectItem
                                      value={color.id.toString()}
                                      key={color.id}
                                    >
                                      {color.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The palette of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="theme"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Theme</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select theme" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {themes.map((theme: any) => (
                                    <SelectItem
                                      value={theme.id.toString()}
                                      key={theme.id}
                                    >
                                      {theme.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The theme of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>Add images of the product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                              <FileUpload onChange={handleFileUpload} />
                            </FormControl>
                            <FormDescription>
                              The image should be a high-quality image.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div>
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Category</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? categories.find(
                                            (category: any) =>
                                              category.value === field.value
                                          )?.label
                                        : "Select category"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search for an categorys..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No categorys found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {categories.map((category: any) => (
                                          <CommandItem
                                            value={category.label}
                                            key={category.value}
                                            onSelect={() => {
                                              form.setValue(
                                                "category",
                                                category.value
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                category.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {category.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                This is the category of this product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Product Artist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="artist"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Artist</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? artists.find(
                                            (artist: any) =>
                                              artist.value === field.value
                                          )?.label
                                        : "Select Artist"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search for an artist..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No artists found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {artists.map((artist: any) => (
                                          <CommandItem
                                            value={artist.label}
                                            key={artist.value}
                                            onSelect={() => {
                                              form.setValue(
                                                "artist",
                                                artist.value
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                artist.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {artist.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                This is the artist of this product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Product Defaults</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-1">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock Count</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Stock count"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                The number of items available for sale.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="defaultPaper"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Paper</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a Paper" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {paper.map((paper: any) => (
                                    <SelectItem
                                      value={paper.id.toString()}
                                      key={paper.id}
                                    >
                                      {paper.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The category of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Link href="/admin/products">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
              </Link>
              <Button type="submit" size="sm">
                Save Product
              </Button>
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
}
