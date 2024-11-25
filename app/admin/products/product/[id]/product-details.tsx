import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Palette,
  Image as ImageIcon,
  Paintbrush,
  Bookmark,
  Shapes,
  Sparkles,
  Scan,
  Origami,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ArtProductDetailsComponent(props: {
  product: any;
  frame: any;
}) {
  const { product, frame } = props;

  interface DetailItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
  }

  const DetailItem = ({ icon, label, value }: DetailItemProps) => (
    <div className="grid grid-cols-2  bg-muted rounded-lg p-3">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <div>
        <span className="font-light">{value}</span>
      </div>
    </div>
  );

  return (
    <div className=" space-y-6">
      <Link href="/admin/products">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
      </Link>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl ">{product.title}</h1>
          <p className="text- font-extralight text-muted-foreground">
            by{" "}
            <Link
              href={`/admin/artists/artist/` + product.artist.id}
              className="text-primary underline"
            >
              {product.artist.fullName}
            </Link>
          </p>
        </div>
        <div>
          <span className="text-xl font-extralight">
            {product?.variants?.length || 0} variants
          </span>
          <p className="text-sm text-muted-foreground font-extralight">
            with {product.stock} in Stock
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Product Image */}
        <div className="md:col-span-2 lg:col-span-2 row-span-2">
          <Card>
            <CardContent className="p-0">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.title}
                className="aspect-auto rounded-md object-contain w-full h-full"
                height="80"
                width="80"
              />
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-light">{product.description}</p>
          </CardContent>
        </Card>

        {/* Variants */}
        <Card className="">
          <CardHeader>
            <CardTitle>Product Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className=" grid grid-cols-1 gap-3">
              {product.variants.map((variant: any) => (
                <div
                  className="flex justify-between items-center bg-muted/50 p-2 rounded-md"
                  key={variant.id}
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {variant.paperSizeName}
                  </span>
                  <span className="text-sm font-bold">
                    {Number(variant.price).toLocaleString("en-KE", {
                      style: "currency",
                      currency: "KES",
                      trailingZeroDisplay: "stripIfInteger",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <DetailItem
              icon={<Origami size={20} />}
              label="Paper"
              value={product.defaultPaper}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-3 lg:col-span-4">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
              <DetailItem
                icon={<Bookmark size={20} />}
                label="Category"
                value={product.category}
              />
              <DetailItem
                icon={<Shapes size={20} />}
                label="Subject"
                value={product.tags.subjectMatter}
              />
              <DetailItem
                icon={<Paintbrush size={20} />}
                label="Medium"
                value={product.tags.medium}
              />
              <DetailItem
                icon={<ImageIcon size={20} />}
                label="Style"
                value={product.tags.style}
              />
              <DetailItem
                icon={<Palette size={20} />}
                label="Palette"
                value={product.tags.colorPalette}
              />
              <DetailItem
                icon={<Sparkles size={20} />}
                label="Theme"
                value={product.tags.theme}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
