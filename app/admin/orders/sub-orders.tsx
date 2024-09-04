"use client";

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  FileBox,
  ListFilter,
  Loader,
  MoreVertical,
  PackageSearch,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession } from "@/auth";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function SubOrders({
  orders,
  user,
  totalRevenueThisMonth,
  totalRevenueThisWeek,
  totalRevenuePrevMonth,
  totalRevenuePrevWeek,
}: {
  orders: any;
  user: any;
  totalRevenueThisMonth: any;
  totalRevenueThisWeek: any;
  totalRevenuePrevMonth: any;
  totalRevenuePrevWeek: any;
}) {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchingOrderDetails = async (order: any) => {
    try {
      setLoading(true);
      setOrderDetails(null);
      const response = await fetch(
        `https://adm-api.pixelsnpaint.art/api/orders/order/${order.orderId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}` || "",
          },
        }
      );
      if (!response.ok) {
        toast.error(`Error fetching order details: ${response.statusText}`);
        setLoading(false);
      }
      const orderDetails = await response.json();
      setOrderDetails(orderDetails.data);
      setLoading(false);
      console.log(orderDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      handleFetchingOrderDetails(orders[0]);
    }
  }, [orders]);

  // get percentage increase/decrease from previous month and week and format to 2 decimal places and add a + or - sign
  const percentageIncreasePrevMonth = (
    (totalRevenueThisMonth - totalRevenuePrevMonth) /
    totalRevenuePrevMonth
  ).toFixed(2);
  const percentageIncreasePrevWeek = (
    (totalRevenueThisWeek - totalRevenuePrevWeek) /
    totalRevenuePrevWeek
  ).toFixed(2);

  const formattedPercentageIncreasePrevMonth =
    totalRevenuePrevMonth !== 0
      ? `${
          Number(percentageIncreasePrevMonth) > 0 ? "+" : ""
        }${percentageIncreasePrevMonth}%`
      : "N/A";

  const formattedPercentageIncreasePrevWeek =
    totalRevenuePrevWeek !== 0
      ? `${
          Number(percentageIncreasePrevWeek) > 0 ? "+" : ""
        }${percentageIncreasePrevWeek}%`
      : "N/A";

  const absoluteChangePrevMonth = totalRevenueThisMonth - totalRevenuePrevMonth;
  const absoluteChangePrevWeek = totalRevenueThisWeek - totalRevenuePrevWeek;
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Your Orders</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless Management
                and Insightful Analysis.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">
                Ksh {totalRevenueThisWeek}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {formattedPercentageIncreasePrevWeek} from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={Math.abs(absoluteChangePrevWeek)}
                aria-label={`${
                  absoluteChangePrevWeek > 0 ? "+" : ""
                }${absoluteChangePrevWeek} change`}
              />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">
                Ksh {totalRevenueThisMonth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {formattedPercentageIncreasePrevMonth} from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={Math.abs(absoluteChangePrevMonth)}
                aria-label={`${
                  absoluteChangePrevMonth > 0 ? "+" : ""
                }${absoluteChangePrevMonth} change`}
              />
            </CardFooter>
          </Card>
        </div>
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>All</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Fulfilled</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={orders}
              columns={columns}
              onRowClick={handleFetchingOrderDetails}
            />
          </CardContent>
        </Card>
      </div>
      <div>
        {orderDetails ? (
          <Card className="overflow-hidden" id="order-details">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Order {orderDetails.orderNumber}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy
                      className="h-3 w-3"
                      onClick={() =>
                        toast.promise(
                          navigator.clipboard.writeText(
                            orderDetails.orderNumber
                          ),
                          {
                            loading: "Copying ID...",
                            success: "ID copied!",
                            error: "Failed to copy ID",
                          }
                        )
                      }
                    />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                <CardDescription>Date: --- </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Badge variant="outline" className="h-8 gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    {orderDetails.orderStatus}
                  </span>
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Trash</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Glimmer Lamps x <span>2</span>
                    </span>
                    <span>$250.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Aqua Filters x <span>1</span>
                    </span>
                    <span>$49.00</span>
                  </li>
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Ksh {orderDetails.productsTotal || "0.00"}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      Ksh {orderDetails.shipping.shippingFee || "0.00"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>Ksh {orderDetails.orderTotal || "0.00"}</span>
                  </li>
                </ul>
              </div>
              {orderDetails.shipping && (
                <>
                  <Separator className="my-4" />
                  <div className="">
                    <div className="grid gap-3">
                      <div className="font-semibold">Shipping Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">
                            Shipping Type
                          </dt>
                          <dd>{orderDetails.shipping.shippingType || "N/A"}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">
                            Pick Up Location
                          </dt>
                          <dd>
                            {orderDetails.shipping.pickupStation || "N/A"}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">
                            Delivery Area
                          </dt>
                          <dd>{orderDetails.shipping.deliveryArea || "N/A"}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">
                            Additional Notes
                          </dt>
                          <dd>
                            {orderDetails.shipping.additionalNotes || "N/A"}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </>
              )}
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>{orderDetails.customer.customerName}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:"> --- </a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">--- </a>
                    </dd>
                  </div>
                </dl>
              </div>
              {orderDetails.payment && (
                <>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          {orderDetails.payment.paymentChannel}
                        </dt>
                        <dd>{orderDetails.payment.mpesaTransactionId}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Amount</dt>
                        <dd>Ksh {orderDetails.payment.paymentTotal}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Date</dt>
                        <>
                          {new Date(
                            orderDetails.payment.paymentInitiatedDate
                          ).toDateString()}
                        </>
                      </div>
                    </dl>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">--</time>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="overflow-hidden" id="order-details">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Order Details
                </CardTitle>
                <CardDescription>
                  {loading
                    ? "Loading order details..."
                    : "Click on an order to view details."}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              {loading && <Loader className="h-16 w-16 mx-auto animate-spin" />}
              {!loading && <FileBox className="h-20 w-20 mx-auto" />}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
