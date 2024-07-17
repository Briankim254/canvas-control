import { getArtist } from "@/server/actions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/profile-form";
import { EditArtistForm } from "./edit-artist-form";

async function getData(id: string) {
  const data = await getArtist(id);
  return data;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const artist = await getData(params.id);
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 p-6 md:p-10 md:flex-row">
      <div className="flex-1 bg-muted rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={artist?.image || "/placeholder-user.jpg"} />
            <AvatarFallback>
              {artist?.name
                ?.split(" ")
                .map((name) => name[0])
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
            <h3 className="text-lg font-semibold">Phone</h3>
            <p className="text-muted-foreground">{artist?.phone || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Country</h3>
            <p className="text-muted-foreground">{artist?.country || "N/A"}</p>
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
              {artist?.createdAt?.toString()}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md bg-muted rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Artist Profile</h2>
        {artist && <EditArtistForm artist={artist} />}
      </div>
    </div>
  );
}
