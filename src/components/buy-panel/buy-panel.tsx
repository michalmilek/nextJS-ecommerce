"use client";

import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { Game } from "@/models/game";
import { addItemToCart } from "@/redux/cartSlice";
import { store } from "@/redux/store";

import Button from "../ui/button";

const BuyPanel = ({
  name,
  description,
  price,
  game,
}: {
  name: string;
  description: string;
  price: number;
  game: Game;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h1 className="text-gray-100 text-3xl title-font font-medium mb-1">
          {name}
        </h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <AiFillHeart className="w-4 h-4 text-red-500" />
            <AiFillHeart className="w-4 h-4 text-red-500" />
            <AiFillHeart className="w-4 h-4 text-red-500" />
            <AiFillHeart className="w-4 h-4 text-red-500" />
            <span className="text-gray-300 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <AiOutlineHeart className="w-5 h-5 text-gray-500" />
            <AiOutlineShoppingCart className="w-5 h-5 text-gray-500 ml-2" />
          </span>
        </div>
        <p className="leading-relaxed">{description}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Edition</span>
            <div className="relative">
              <select className="rounded border appearance-none text-black border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Digital</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-200 pointer-events-none flex items-center justify-center">
                <AiOutlineShoppingCart className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="title-font font-medium text-2xl text-gray-400">
            ${price.toFixed(2)}
          </span>
          <Button
            onClick={() => store.dispatch(addItemToCart(game))}
            className="px-8">
            Buy
          </Button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <AiOutlineShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BuyPanel;
