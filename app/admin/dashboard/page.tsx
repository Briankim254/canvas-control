import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  PackageSearch,
  RouteOff,
  Sparkles,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession } from "@/auth";
import { toast } from "sonner";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default async function Dashboard() {
  const session = await getSession();
  const user = session?.user;
  const stats = await fetch(`${process.env.BASE_URL}/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(`Failed to fetch stats: ${error.message}`);
      console.error(error);
    });

  const recentArtists = await fetch(
    `${process.env.BASE_URL}/dashboard/recent-artists`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(`Failed to fetch recent artists: ${error.message}`);
      console.error(error);
    });

  const recentListings = await fetch(
    `${process.env.BASE_URL}/dashboard/recent-listings`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}` || "",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(`Failed to fetch recent listings: ${error.message}`);
      console.error(error);
    });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-1" className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              Ongoing Orders
            </CardTitle>
            <PackageSearch className="h-10 w-10 text-muted-foreground group-hover:animate-bounce" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.ongoingOrders}</div>
            <p className="text-xs text-muted-foreground">
              currently being processed.
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2" className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              Fulfilled Orders
            </CardTitle>
            <Sparkles className="h-10 w-10 text-muted-foreground group-hover:animate-bounce" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.fulfilledOrders}</div>
            <p className="text-xs text-muted-foreground">
              completed orders from your store.
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3" className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              Cancelled Orders
            </CardTitle>
            <RouteOff className="h-10 w-10 text-muted-foreground group-hover:animate-bounce" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.cancelledOrders}</div>
            <p className="text-xs text-muted-foreground">
              orders that were unfortunatly cancelled.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Listings</CardTitle>
              <CardDescription>
                Recent listings from your store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/products">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Image</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentListings ? (
                  recentListings?.map((listing: any) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div className="font-medium">{listing.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(listing.createdAt).toDateString()}
                        </div>
                      </TableCell>
                      <TableCell>Ksh {listing.basePrice}</TableCell>
                      <TableCell>{listing.category}</TableCell>
                      <TableCell className="text-right">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          width="64"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>
                      <p>No recent listings</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>New Artists</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {recentArtists ? (
              recentArtists?.map((artist: any) => (
                <>
                  <Separator className="my-1" />
                  <div className="flex items-center gap-4" key={artist.id}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarFallback>
                        {artist.firstName.charAt(0).toUpperCase() +
                          artist.lastName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {artist?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {artist.email}
                      </p>
                      <div className="font-medium">
                        <Badge variant="outline" className="text-xs">
                          {artist?.onboardingStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <div className="flex items-center gap-4">
                <p>No new artists</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
