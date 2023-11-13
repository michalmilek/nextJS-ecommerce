import React from "react";
import Coupon from "./coupon";
import Order from "./order";
import Table from "./table";

const Cart = ({ email }: { email: string }) => {
  return (
    <section className="py-24 font-poppins">
      <h2 className="mb-8 text-4xl font-bold text-center">Your Cart</h2>
      <Table />

      <div className="flex flex-wrap justify-between">
        <Coupon />
        <Order email={email} />
      </div>
    </section>
  );
};

export default Cart;
