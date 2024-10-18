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
  MousePointerClick,
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
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { m } from "framer-motion";

export default function SubOrders({
  orders,
  ordersThisMonth,
  ordersThisWeek,
  ordersThisYear,
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
  ordersThisMonth: any;
  ordersThisWeek: any;
  ordersThisYear: any;
}) {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchingOrderDetails = useCallback(
    async (order: any) => {
      try {
        setLoading(true);
        setOrderDetails(null);
        const orderResponse = await fetch(
          `https://adm-api.pixelsnpaint.art/api/orders/order/${order.orderId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}` || "",
            },
          }
        );
        if (!orderResponse.ok) {
          toast.error(
            `Error fetching order details: ${orderResponse.statusText}`
          );
          setLoading(false);
        }
        const orderDetails = await orderResponse.json();
        setOrderDetails(orderDetails.data);

        const orderItemsResponse = await fetch(
          `https://adm-api.pixelsnpaint.art/api/orders/order/${order.orderId}/items`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}` || "",
            },
          }
        );
        if (!orderItemsResponse.ok) {
          toast.error(
            `Error fetching order items: ${orderItemsResponse.statusText}`
          );
          setLoading(false);
        }
        const orderItems = await orderItemsResponse.json();
        setOrderItems(orderItems.data);

        setLoading(false);
      } catch (error) {
      }
    },
    [user?.token]
  );

  useEffect(() => {
    if (orders.length > 0) {
      handleFetchingOrderDetails(orders[0]);
    }
  }, [orders, handleFetchingOrderDetails]);

  // get percentage increase/decrease from previous month and week and format to 2 decimal places and add a + or - sign
  const percentageIncreasePrevMonth = (
    ((totalRevenueThisMonth - totalRevenuePrevMonth) / totalRevenuePrevMonth) *
    100
  ).toFixed(2);
  const percentageIncreasePrevWeek = (
    ((totalRevenueThisWeek - totalRevenuePrevWeek) / totalRevenuePrevWeek) *
    100
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

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Your Orders</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless Management
                and Insightful Analysis.Click on an order to see more.{" "}
                <MousePointerClick />
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
            {Math.abs(Number(percentageIncreasePrevWeek)) > 100 ? null : (
              <CardFooter>
                <Progress
                  value={Math.abs(Number(percentageIncreasePrevWeek))}
                  aria-label={`${
                    Number(percentageIncreasePrevWeek) > 0 ? "+" : ""
                  }${Number(percentageIncreasePrevWeek)} change`}
                />
              </CardFooter>
            )}
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
            {Math.abs(Number(percentageIncreasePrevMonth)) > 100 ? null : (
              <CardFooter>
                <Progress
                  value={Math.abs(Number(percentageIncreasePrevMonth))}
                  aria-label={`${
                    Number(percentageIncreasePrevMonth) > 0 ? "+" : ""
                  }${Number(percentageIncreasePrevMonth)} change`}
                />
              </CardFooter>
            )}
          </Card>
        </div>
        <div className="flex items-center">
          {/* <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div> */}
        </div>
        <Tabs defaultValue="All">
          <div className="flex items-center my-1">
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </div>
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="All">
                <DataTable
                  data={orders}
                  columns={columns}
                  onRowClick={handleFetchingOrderDetails}
                />
              </TabsContent>
              <TabsContent value="week">
                <DataTable
                  data={ordersThisWeek}
                  columns={columns}
                  onRowClick={handleFetchingOrderDetails}
                />
              </TabsContent>
              <TabsContent value="month">
                <DataTable
                  data={ordersThisMonth}
                  columns={columns}
                  onRowClick={handleFetchingOrderDetails}
                />
              </TabsContent>
              <TabsContent value="year">
                <DataTable
                  data={ordersThisYear}
                  columns={columns}
                  onRowClick={handleFetchingOrderDetails}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
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
                <CardDescription>
                  Date:
                  {new Date(orderDetails.createdDate).toDateString()}
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Badge variant="outline" className="h-8 gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    {orderDetails.orderStatus}
                  </span>
                </Badge>
                {/* <DropdownMenu>
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
                </DropdownMenu> */}
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                  {orderItems && orderItems.length > 0 ? (
                    orderItems.map((item: any, index: number) => (
                      <li key={index}>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            {++index}. {item.productName} x{" "}
                            <span>{item.quantity}</span>
                          </span>
                          <span>Ksh {item.price}</span>
                        </div>
                        <span className="text-muted-foreground text-xs">
                          Size: {item.size}, Paper: {item.paper}, Frame:{" "}
                          {item.frame}
                        </span>
                      </li>
                    ))
                  ) : (
                    <p>No items available</p>
                  )}
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
                    <dt className="text-muted-foreground">Name</dt>
                    <dd>{orderDetails.customer.customerName}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">
                        {orderDetails.customer.customerEmail}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">{orderDetails.customer.customerPhone}</a>
                    </dd>
                  </div>
                </dl>
              </div>

              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Payment Status</dt>
                    <dd>
                      <Badge variant="default">
                        {orderDetails.paymentStatus}
                      </Badge>
                    </dd>
                  </div>
                  {orderDetails.payment && (
                    <>
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
                    </>
                  )}
                </dl>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated{" "}
                <time dateTime="2023-11-23">
                  {new Date(orderDetails.updatedDate).toDateString()}
                </time>
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
