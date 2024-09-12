import { Separator } from "@/components/ui/separator";
import { FrameForm } from "./frame-form";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Frame } from "lucide-react";
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
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/auth";

export default async function SettingsProfilePage() {
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
  if (frames.message !== "success") {
    toast.error("Failed to fetch frames");
    const frames = [];
  }
  const data = frames.data;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Frames</h3>
          <p className="text-sm text-muted-foreground">
            This is where you can update frame information.
          </p>
        </div>
        <div>
          <Sheet>
            <SheetTrigger
              className={`${buttonVariants({
                variant: "default",
                size: "sm",
              })} h-8 gap-1`}
            >
              <Frame className="h-3.5 w-3.5" />
              <span className="sm:whitespace-nowrap hidden sm:block">
                Add Frame
              </span>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Frame</SheetTitle>
                <SheetDescription>
                  Fill out the form below to add a new frame.
                </SheetDescription>
              </SheetHeader>
              <FrameForm />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator />
      <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
        {data.map((data: any) => (
          <div className="p-6" key={data.id}>
            <Image
              src={data.image || "/placeholder.png"}
              alt={data.name}
              className="aspect-square rounded-md object-cover"
              height="200"
              width="200"
            />
            <h1 className="mx-auto mb-8 font-semibold leading-none tracking-tighter">
              {data.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
