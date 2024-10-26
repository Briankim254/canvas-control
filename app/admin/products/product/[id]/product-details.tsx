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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ArtProductDetailsComponent(props: { product: any }) {
  const { product } = props;

  interface DetailItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
  }

  const DetailItem = ({ icon, label, value }: DetailItemProps) => (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className=" space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-muted-foreground">
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
          <span className="text-xl font-bold">Ksh {product.basePrice}</span>
          <p className="text-sm text-muted-foreground">
            with {product.stock} in Stock
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Product Image */}
        <Card className="md:col-span-2 lg:col-span-2 row-span-2">
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

        {/* Description */}
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.description}</p>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <DetailItem
              icon={<Scan size={20} />}
              label="Size"
              value={product.defaultSize}
            />
            <DetailItem
              icon={<Origami size={20} />}
              label="Paper"
              value={product.defaultPaper}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
