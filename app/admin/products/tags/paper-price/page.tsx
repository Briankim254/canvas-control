import { Separator } from "@/components/ui/separator";
import { PaperPriceForm } from "./paper-price-form";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Frame } from "lucide-react";
import { getSession } from "@/auth";

export default async function SettingsDisplayPage() {
  const session = await getSession();
  const user = session?.user;
  const paperSizes = await fetch(`${process.env.BASE_URL}/products/sizes`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  ).then(
    (res) => res.json()
  );
  const paper = await fetch(`${process.env.BASE_URL}/products/paper`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  ).then(
    (res) => res.json()
  );
  const paperPrices = await fetch(
    `${process.env.BASE_URL}/products/paper-prices`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  ).then((res) => res.json());
  if (paperPrices.message !== "success") {
    const paperPrices = [];
  }
  if (paperSizes.message !== "success") {
    const paperSizes = [];
  }
  if (paper.message !== "success") {
    const paper = [];
  }

  const data = paperPrices.data;
  const sizeData = paperSizes.data;
  const paperData = paper.data;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Paper Prices</h3>
          <p className="text-sm text-muted-foreground">
            Customize the paper prices for your store.
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
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Frame</SheetTitle>
                <SheetDescription>
                  Fill out the form below to add a new frame.
                </SheetDescription>
              </SheetHeader>
              <PaperPriceForm paper={paperData} printSizes={sizeData} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator />
      {data.map((item: any) => (
        <div key={item.id} className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">{item.paperName}</h3>
            <p className="text-sm text-muted-foreground">
              {item.sizeName} - {item.price}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline" className="h-8">
                  <span className="sm:whitespace-nowrap hidden sm:block">
                    Edit
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Edit Price</SheetTitle>
                  <SheetDescription>
                    Fill out the form below to edit the price.
                  </SheetDescription>
                </SheetHeader>
                <PaperPriceForm
                  pricing={item}
                  paper={paperData}
                  printSizes={sizeData}
                />
              </SheetContent>
            </Sheet>
            <Button size="sm" variant="outline" className="h-8">
              <span className="sm:whitespace-nowrap hidden sm:block">
                Delete
              </span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
