"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

import { Order } from "@/models/order";
import { RootState } from "@/redux/store";

import Button from "../ui/button";
import CustomLink from "../ui/link";
import MobileMenu from "./mobile-menu";

const Menu = ({ orders }: { orders: Order[] | undefined }) => {
  const [loading, setLoading] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const cartList = useSelector((state: RootState) => state.cart.cartItems);

  const { data: session } = useSession();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!isDesktopOrLaptop) {
    return <MobileMenu orders={orders} />;
  }
  return (
    <nav className="flex items-center gap-4">
      {cartList.length > 0 && (
        <CustomLink
          href={"/cart"}
          className="flex items-center gap-2"
          variant="secondary">
          <AiOutlineShoppingCart className="text-2xl" />
          <span>Cart</span>
        </CustomLink>
      )}
      {orders && orders.length > 0 && (
        <CustomLink href={"/orders"}>Orders</CustomLink>
      )}
      {!session && (
        <>
          <CustomLink href="/sign-up">Sign up</CustomLink>
          <CustomLink href={"/sign-in"}>Sign in</CustomLink>
        </>
      )}
      {session && (
        <Button
          isLoading={loading}
          onClick={async () => {
            try {
              setLoading(true);
              await signOut();
              toast.success("User successfully signed out");
            } catch (error) {
              toast.error(JSON.stringify(error));
            } finally {
              setLoading(false);
            }
          }}>
          Logout
        </Button>
      )}
    </nav>
  );
};

export default Menu;
