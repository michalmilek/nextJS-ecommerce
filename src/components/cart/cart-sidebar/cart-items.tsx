import Button from "@/components/ui/button";
import { GameWithQuantity } from "@/libs/types";
import { Game } from "@/models/game";
import {
  decrementQuantity,
  incrementQuantity,
  removeItemFromCart,
} from "@/redux/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

const CartItems = ({ items }: { items: GameWithQuantity[] }) => {
  const dispatch = useDispatch();
  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 mt-4">
      {items.map((item) => (
        <li
          className="flex hover:bg-gray-300 transition-all w-full p-2"
          key={"dialog cart " + item._id}>
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={item.images[0].url}
              alt={item.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>{item.name}</h3>
                <p className="ml-4">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    dispatch(decrementQuantity({ _id: item._id }));
                  }}
                  type="button">
                  -
                </Button>
                <p className="text-gray-500 text-xl px-4">{item.gamesToBuy}</p>
                <Button
                  onClick={() => {
                    dispatch(incrementQuantity({ _id: item._id }));
                  }}
                  type="button">
                  +
                </Button>
              </div>
              <div className="flex">
                <Button
                  onClick={() =>
                    dispatch(removeItemFromCart({ _id: item._id }))
                  }
                  type="button">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
