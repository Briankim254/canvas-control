import { Separator } from "@/components/ui/separator";
import { FramePriceForm } from "./frame-price-form";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Frame } from "lucide-react";
import Image from "next/image";
import { getSession } from "@/auth";

export default async function SettingsAccountPage() {
  const session = await getSession();
  const user = session?.user;
  const frames = await fetch(`${process.env.BASE_URL}/products/frames`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  ).then(
    (res) => res.json()
  );

  const frameSizes = await fetch(`${process.env.BASE_URL}/products/sizes`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  ).then(
    (res) => res.json()
  );

  const framesPrice = await fetch(
    `${process.env.BASE_URL}/products/frame-prices`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  ).then((res) => res.json());
  if (framesPrice.message !== "success") {
    toast.error("Failed to fetch frame prices");
    const framesPrice = [];
  }
  const frameData = frames.data;
  const frameSizeData = frameSizes.data;
  const data = framesPrice.data;
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Frame Prices</h3>
            <p className="text-sm text-muted-foreground">
              Update frame prices here.
            </p>
          </div>
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" className="h-8 gap-1 ">
                  <Frame className="h-3.5 w-3.5" />
                  <span className="sm:whitespace-nowrap hidden sm:block">
                    Add Frame Price
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Add Frame Price</SheetTitle>
                  <SheetDescription>
                    Fill out the form below to add a new frame price.
                  </SheetDescription>
                </SheetHeader>
                <FramePriceForm frames={frameData} frameSizes={frameSizeData} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <Separator />
      <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
        {data.map((data: any) => (
          <div className="p-6" key={data.id || data.frameId}>
            <Image
              src={data.frameImage || "/placeholder.png"}
              alt={data.frameName}
              className="aspect-square rounded-md object-cover"
              height="200"
              width="200"
              key={data.id}
            />
            <h1
              className="mx-auto mb-8 font-semibold leading-none tracking-tighter"
              key={data.id}
            >
              {data.frameName}
            </h1>
            <p className="text-sm text-muted-foreground" key={data.id}>
              Ksh {data.price} - {data.sizeName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
