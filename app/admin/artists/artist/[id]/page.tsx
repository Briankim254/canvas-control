import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { EditArtistForm } from "./edit-artist-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/app/admin/products/data-table";
import { columns } from "@/app/admin/products/columns";
import { getSession } from "@/auth";
import { Badge } from "@/components/ui/badge";

async function getData(id: string) {
  const session = await getSession();
  const user = session?.user;
  const res = await fetch(`${process.env.BASE_URL}/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  }).then((res) => res.json());
  return res;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const artist = data.artist;
  const products = data.products;
  return (
    <>
      <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 p-6 md:p-10 md:flex-row">
        <div className="flex-1 bg-muted rounded-lg p-6 md:p-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={artist?.image || "/placeholder-user.jpg"} />
              <AvatarFallback>
                {artist?.name
                  ?.split(" ")
                  .map((name: any[]) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="text-xl font-bold">{artist?.name}</div>
              <div className="text-muted-foreground">{artist?.email}</div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold">Onbording Status</h3>
              <Badge variant={"default"} className="">
                {artist?.onboardingStatus || "N/A"}
              </Badge>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-muted-foreground">{artist?.phone || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Country</h3>
              <p className="text-muted-foreground">
                {artist?.country || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">City</h3>
              <p className="text-muted-foreground">{artist?.city || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-muted-foreground">{artist?.bio || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Joined</h3>
              <p className="text-muted-foreground">
                {new Date(artist?.createdDate).toDateString()}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Onbording Request Date</h3>
              <p className="text-muted-foreground">
                {artist?.profileCompletedDate
                  ? new Date(
                      artist?.onboardingCompletionRequestDate
                    ).toDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Onbording Completion Date
              </h3>
              <p className="text-muted-foreground">
                {artist?.profileCompletedDate
                  ? new Date(artist?.onboardingCompletionDate).toDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-muted rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Artist Profile</h2>
          {artist && <EditArtistForm artist={artist} />}
        </div>
      </div>
      <div className=" py-5">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Products created by this artist.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={products} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
