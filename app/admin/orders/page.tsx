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
} from "date-fns";

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

  // const totalRevenueThisMonth = orders
  //   .filter((order: any) => isThisMonth(parseISO(order.date)))
  //   .reduce(
  //     (total: any, order: any) => total + parseFloat(order.orderTotal),
  //     0
  //   );

  // const totalRevenueThisWeek = orders
  //   .filter((order: any) => isThisWeek(parseISO(order.date)))
  //   .reduce(
  //     (total: any, order: any) => total + parseFloat(order.orderTotal),
  //     0
  //   );

  // const startOfPrevMonth = startOfMonth(subMonths(new Date(), 1));
  // const endOfPrevMonth = endOfMonth(subMonths(new Date(), 1));

  // const startOfPrevWeek = startOfWeek(subWeeks(new Date(), 1));
  // const endOfPrevWeek = endOfWeek(subWeeks(new Date(), 1));

  // const totalRevenuePrevMonth = orders
  //   .filter((order: any) => {
  //     const orderDate = parseISO(order.date);
  //     return orderDate >= startOfPrevMonth && orderDate <= endOfPrevMonth;
  //   })
  //   .reduce(
  //     (total: any, order: any) => total + parseFloat(order.orderTotal),
  //     0
  //   );

  // const totalRevenuePrevWeek = orders
  //   .filter((order: any) => {
  //     const orderDate = parseISO(order.date);
  //     return orderDate >= startOfPrevWeek && orderDate <= endOfPrevWeek;
  //   })
  //   .reduce(
  //     (total: any, order: any) => total + parseFloat(order.orderTotal),
  //     0
  //   );
  const totalRevenueThisMonth = 0;
  const totalRevenueThisWeek = 0;
  const totalRevenuePrevMonth = 0;
  const totalRevenuePrevWeek = 0;

  return (
    <SubOrders
      orders={orders}
      user={user}
      totalRevenueThisMonth={totalRevenueThisMonth}
      totalRevenueThisWeek={totalRevenueThisWeek}
      totalRevenuePrevMonth={totalRevenuePrevMonth}
      totalRevenuePrevWeek={totalRevenuePrevWeek}
    />
  );
}
