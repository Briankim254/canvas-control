import { getUser } from "@/server/actions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ProfileForm } from "@/components/profile-form";
import { Badge } from "@/components/ui/badge";

async function getData(id: string) {
  const data = await getUser(id);
  return data;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getData(params.id);
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-8 p-6 md:p-10 md:flex-row">
      <div className="flex-1 bg-muted rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.image || "/placeholder-user.jpg"} />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="text-xl font-bold">{user?.name}</div>
            <div className="text-muted-foreground">{user?.email}</div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid gap-4">
          <div className="flex gap-2 tex">
            <h3 className="text-md font-semibold">Role:</h3>
            <Badge variant="default">{ user?.role.replace(/_/g, ' ').toLowerCase() }</Badge>
          </div>
          <div className="flex gap-2">
            <h3 className="text-md font-semibold">Verification:</h3>
            <Badge variant="default">{user?.verification.toLowerCase()}</Badge>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-muted-foreground">{user?.bio || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Joined</h3>
            <p className="text-muted-foreground">
              {user?.createdAt?.toString()}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md bg-muted rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
        {user && <ProfileForm user={user} />}
      </div>
    </div>
  );
}
