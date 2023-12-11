"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { getStripe } from "@/libs/load-stripe";
import { RootState } from "@/redux/store";

import Button from "../ui/button";

const OrderItem = ({
  label,
  value,
  isBorderB = false,
}: {
  label: string;
  value: string;
  isBorderB?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between pb-4 mb-4 text-sm md:text-md ${
        isBorderB && "border-b border-gray-300"
      } `}>
      <span className="text-gray-700">{label}</span>
      <span className="font-bold text-gray-700">{value}</span>
    </div>
  );
};

const Order = ({ subtotal, email }: { subtotal?: number; email: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce<number>((acc, item) => {
        const itemPrice = item.price * item.gamesToBuy;
        return acc + itemPrice;
      }, 0),
    [cartItems]
  );

  const totalPriceWithTax = totalPrice + totalPrice * 0.23;

  const checkoutHandler = async () => {
    const stripe = await getStripe();

    const { data } = await axios.post("/api/stripe", {
      cartItems,
      userEmail: email,
    });

    if (!data) return;

    localStorage.removeItem("cart");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full px-4 mb-4 lg:w-1/2 ">
      <div className="p-6 border border-blue-100 bg-gray-50 md:p-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-700">Order Summary</h2>
        <OrderItem
          label="Subtotal"
          value={"$" + totalPrice.toFixed(2)}
          isBorderB
        />
        <OrderItem
          label="Shipping"
          value="Free"
        />
        <OrderItem
          label="Order Total"
          value={"$" + totalPriceWithTax.toFixed(2)}
        />
        <h2 className="text-gray-500 text-sm md:text-md">We offer:</h2>
        <div className="flex items-center gap-2 mb-4 ">
          <a href="#">
            <img
              src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
              alt=""
              className="object-cover h-16 w-26"
            />
          </a>
          <a href="#">
            <img
              src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
              alt=""
              className="object-cover h-16 w-26"
            />
          </a>
          <a href="#">
            <img
              src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
              alt=""
              className="object-cover h-16 w-26"
            />
          </a>
        </div>
        <div className="flex items-center justify-between ">
          <Button
            onClick={checkoutHandler}
            className="w-full text-sm md:text-md">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
