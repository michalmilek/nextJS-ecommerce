import { Game } from "@/models/game";
import React from "react";
import { AiOutlineDash } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";

const CartProduct = ({ game }: { game: Game }) => {
  const { name, price, quantity, images } = game;
  return (
    <div className="flex items-center -mx-4 w-full">
      <div className="w-full px-4 mb-3 md:w-1/3">
        <div className="w-full h-96 md:h-24 md:w-24">
          <img
            src={images[0].url}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="w-2/3 px-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-500 ">Picture frame</p>
      </div>
      <div className="hidden px-4 lg:block lg:w-2/12">
        <p className="text-lg font-bold text-indigo-600 ">{price}</p>
        <span className="text-xs text-gray-500 line-through ">$1500</span>
      </div>
      <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
        <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md ">
          <button className="py-2 hover:text-gray-700">
            <AiOutlineDash />
          </button>
          <input
            type="number"
            className="w-12 px-2 py-4 text-center border-0 rounded-md  bg-gray-50 md:text-right"
            placeholder="1"
            value={quantity}
          />
          <button className="py-2 hover:text-gray-700 ">
            <BiPlus />
          </button>
        </div>
      </div>
      <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
        <p className="text-lg font-bold text-indigo-600">432432</p>
      </div>
    </div>
  );
};

export default CartProduct;
