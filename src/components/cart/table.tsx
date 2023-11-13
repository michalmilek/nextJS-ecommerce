"use client";

import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { AiOutlineDash } from "react-icons/ai";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import TableItem from "./table-item";

const Table = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="px-4 py-6 mx-auto lg:py-4 md:px-6">
      <table className="min-w-full border text-xs sm:text-md md:text-lg border-gray-200 text-left bg-white text-black overflow-x-scroll">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-2 sm:px-4 sm:py-2">Product Name</th>
            <th className="px-0 py-2 sm:px-4 sm:py-2">Price</th>
            <th className="px-0 py-2 sm:px-4 sm:py-2">Quantity</th>
            <th className="px-1 py-2 sm:px-4 sm:py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <TableItem
              _id={item._id}
              img={item.images[0].url}
              name={item.name}
              description={item.description}
              price={item.price}
              key={"cart " + item._id}
              amount={item.gamesToBuy}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
