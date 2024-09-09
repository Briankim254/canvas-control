import { getSession } from "@/auth";
import SubOrders from "./sub-orders";
import {
  parseISO,
  isThisMonth,
  isThisWeek,
  subMonths,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isThisYear,
} from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Orders() {
  const session = await getSession();
  const user = session?.user;

  const orders = await fetch(`${process.env.BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${user?.token}` || "",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });

  const totalRevenueThisMonth = orders
    .filter((order: any) => isThisMonth(parseISO(order.createdDate)))
    .reduce(
      (total: any, order: any) => total + parseFloat(order.orderTotal),
      0
    );

  const totalRevenueThisWeek = orders
    .filter((order: any) => isThisWeek(parseISO(order.createdDate)))
    .reduce(
      (total: any, order: any) => total + parseFloat(order.orderTotal),
      0
    );

  const startOfPrevMonth = startOfMonth(subMonths(new Date(), 1));
  const endOfPrevMonth = endOfMonth(subMonths(new Date(), 1));

  const startOfPrevWeek = startOfWeek(subWeeks(new Date(), 1));
  const endOfPrevWeek = endOfWeek(subWeeks(new Date(), 1));

  const totalRevenuePrevMonth = orders
    .filter((order: any) => {
      const orderDate = parseISO(order.createdDate);
      return orderDate >= startOfPrevMonth && orderDate <= endOfPrevMonth;
    })
    .reduce(
      (total: any, order: any) => total + parseFloat(order.orderTotal),
      0
    );

  const totalRevenuePrevWeek = orders
    .filter((order: any) => {
      const orderDate = parseISO(order.createdDate);
      return orderDate >= startOfPrevWeek && orderDate <= endOfPrevWeek;
    })
    .reduce(
      (total: any, order: any) => total + parseFloat(order.orderTotal),
      0
    );

  const ordersThisMonth = orders.filter((order: any) =>
    isThisMonth(parseISO(order.createdDate))
  );
  const ordersThisWeek = orders.filter((order: any) =>
    isThisWeek(parseISO(order.createdDate))
  );
  const ordersThisYear = orders.filter((order: any) =>
    isThisYear(parseISO(order.createdDate))
  );
  return (
    <SubOrders
      orders={orders}
      ordersThisMonth={ordersThisMonth}
      ordersThisWeek={ordersThisWeek}
      ordersThisYear={ordersThisYear}
      user={user}
      totalRevenueThisMonth={totalRevenueThisMonth}
      totalRevenueThisWeek={totalRevenueThisWeek}
      totalRevenuePrevMonth={totalRevenuePrevMonth}
      totalRevenuePrevWeek={totalRevenuePrevWeek}
    />
  );
}
