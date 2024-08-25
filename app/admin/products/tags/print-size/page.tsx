import { Separator } from "@/components/ui/separator";
import { SizeForm } from "./size-form";
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

export default async function SettingsNotificationsPage() {
  const size = await fetch(`${process.env.BASE_URL}/products/sizes`).then(
    (res) => res.json()
  );
  if (size.message != "success") {
    toast.error("Failed to fetch paper");
    const paper = [];
  }
  const data = size.data;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Print Sizes</h3>
          <p className="text-sm text-muted-foreground">
            Configure the print sizes for your store.
          </p>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" className="h-8 gap-1 ">
                <Frame className="h-3.5 w-3.5" />
                <span className="sm:whitespace-nowrap hidden sm:block">
                  Add Print Size
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Print Size</SheetTitle>
                <SheetDescription>
                  Fill out the form below to add a new print size.
                </SheetDescription>
              </SheetHeader>
              <SizeForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator />
      {data.map((item: any) => (
        <div key={item.id} className="flex items-center justify-between">
          <div key={item.id}>
            <h3 className="text-lg font-medium">{item.paper_size}</h3>
            <p className="text-sm text-muted-foreground">
              {item.inches} inches
            </p>
            <p className="text-sm text-muted-foreground">
              {item.millimeters} millimeters
            </p>
            <p className="text-sm text-muted-foreground">
              {item.centimeters} centimeters
            </p>
            <p className="text-sm text-muted-foreground">
              Created on: {new Date(item.created_on).toLocaleDateString()}
            </p>
          </div>
          <div key={item.id}  className="flex items-center gap-2">
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
                  <SheetTitle>Edit Print Size</SheetTitle>
                  <SheetDescription>
                    Fill out the form below to edit the print size.
                  </SheetDescription>
                </SheetHeader>
                <SizeForm size={item} />
              </SheetContent>
            </Sheet>
            <Button size="sm" variant="outline" className="h-8">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
