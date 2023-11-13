import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getOrders } from "@/libs/api";
import OrdersList from "@/components/orders/orders-list";

const OrdersPage = async () => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/sign-in");
  }

  const orders = await getOrders(session.user!.email as string);
 
  if (!orders) {
    redirect("/");
  }

  return (
    <div className="mt-32">
      <OrdersList orders={orders} />
    </div>
  );
};

export default OrdersPage;
