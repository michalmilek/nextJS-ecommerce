"use client";

import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import { toast } from "react-toastify";

import { Order } from "@/models/order";

import Button from "../ui/button";
import CustomLink from "../ui/link";

const MobileMenu = ({ orders }: { orders: Order[] | undefined }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuClasses = clsx(
    "fixed top-0 left-0 right-0 bottom-0 bg-primary-gradient z-10",
    isOpen ? "flex justify-center items-center" : "hidden"
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
      <Button
        className="md:hidden text-white"
        onClick={toggleMenu}>
        {isOpen ? (
          <AiOutlineClose className="text-2xl" />
        ) : (
          <AiOutlineMenu className="text-2xl" />
        )}
      </Button>
      <nav className={menuClasses}>
        <ul className="flex flex-col justify-center h-full gap-4">
          {orders && orders.length > 0 && (
            <li>
              <CustomLink
                href={"/orders"}
                className="text-white border-0"
                variant="outline"
                onClick={toggleMenu}>
                Orders
              </CustomLink>
            </li>
          )}
          {session && (
            <li>
              <Button
                className="text-white border-0"
                variant="outline"
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
                    toggleMenu();
                  }
                }}>
                Logout
              </Button>
            </li>
          )}
          {!session && (
            <>
              <li>
                <Button
                  className="text-white border-0"
                  variant="outline"
                  onClick={toggleMenu}>
                  Sign up
                </Button>
              </li>
              <li>
                <Button
                  className="text-white border-0"
                  variant="outline"
                  onClick={toggleMenu}>
                  Sign in
                </Button>
              </li>
            </>
          )}
        </ul>
        <button
          type="button"
          className="absolute top-2 right-2 -m-2 p-2 text-gray-400 hover:text-gray-500 transition-all"
          onClick={toggleMenu}>
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Close panel</span>
          <HiXMark className="text-3xl" />
        </button>
      </nav>
    </>
  );
};

export default MobileMenu;
