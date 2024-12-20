import { Separator } from "@/components/ui/separator";
import { PaperForm } from "./paper-form";
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
import PaperPricePage from "../(paper-price)/paper-price";

export default async function SettingsAppearancePage() {
  const session = await getSession();
  const user = session?.user;
  const paper = await fetch(`${process.env.BASE_URL}/products/paper`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  }).then((res) => res.json());
  if (paper.message !== "success") {
    toast.error("Failed to fetch paper");
    const paper = [];
  }
  const data = paper.data;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold">Print Papers</h3>
          <p className="text-sm text-muted-foreground">
            Customize the printing papers for your store.
          </p>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" className="h-8 gap-1 ">
                {/* on hover animate icon */}
                <Frame className="h-3.5 w-3.5" />
                <span className="sm:whitespace-nowrap hidden sm:block">
                  Add Print Paper
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Print Paper</SheetTitle>
                <SheetDescription>
                  Fill out the form below to add a new Print Paper.
                </SheetDescription>
              </SheetHeader>
              <PaperForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator />
      <div>
        {data.map((item: any) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Created on {new Date(item.created_on).toDateString()}
              </p>
            </div>
            {/* <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline" className="h-8 gap-1 ">
                  <span className="sm:whitespace-nowrap hidden sm:block">
                    Edit
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Add Print Paper</SheetTitle>
                  <SheetDescription>
                    Fill out the form below to add a new Print Paper.
                  </SheetDescription>
                </SheetHeader>
                <PaperForm paper={item} />
              </SheetContent>
            </Sheet>
            <Button size="sm" variant="outline" className="h-8">
              Delete
            </Button>
          </div> */}
          </div>
        ))}
      </div>
      <Separator />
      <div>
        <PaperPricePage />
      </div>
    </div>
  );
}
