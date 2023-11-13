"use client";

import Button from "@/components/ui/button";
import { toggleCart } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./cart-items";
import { HiXMark } from "react-icons/hi2";
import CustomLink from "@/components/ui/link";

const CartSidebar = () => {
  const isCartOpen = useSelector((state: RootState) => state.cart.showCart);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const cartToggle = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce<number>((acc, item) => {
        const itemPrice = item.price * item.gamesToBuy;
        return acc + itemPrice;
      }, 0),
    [cartItems]
  );

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }


  return (
    <>
      {isCartOpen && (
        <div
          className="relative z-50"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true">
          <div
            className={`fixed inset-0 ${clsx(
              isCartOpen && "bg-gray-500 bg-opacity-75"
            )}  transition-all`}></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <aside
                  className={`pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                  }`}>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title">
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 transition-all"
                            onClick={cartToggle}>
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <HiXMark className="text-3xl" />
                          </button>
                        </div>
                      </div>

                      <CartItems items={cartItems} />
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice * 1.23}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <CustomLink
                          onClick={cartToggle}
                          href="/cart"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                          Checkout
                        </CustomLink>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={cartToggle}>
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isCartOpen && cartItems.length > 0 && (
        <Button
          type="button"
          className="fixed bottom-4 right-4 z-50"
          onClick={cartToggle}>
          <AiOutlineShoppingCart className="text-3xl" />
        </Button>
      )}
    </>
  );
};

export default CartSidebar;
