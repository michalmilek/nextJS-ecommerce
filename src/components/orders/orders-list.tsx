import { Order } from "@/models/order";
import React from "react";

const OrdersList = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-3xl text-center">Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full my-8">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Order Status</th>
              <th className="px-4 py-2">Game Name</th>
              <th className="px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="bg-gray-100 text-black text-center">
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.orderStatus}</td>
                {order.items.map((item) => (
                  <React.Fragment key={item.game._id}>
                    <td className="border px-4 py-2">{item.game.name}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
