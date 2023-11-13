import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import Button from "../ui/button";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "@/redux/cartSlice";

type Props = {
  _id: string;
  name: string;
  price: number;
  description: string;
  img: string;
  amount: number;
};

const TableItem: React.FC<Props> = ({
  _id,
  name,
  price,
  description,
  img,
  amount,
}) => {
  const dispatch = useDispatch();
  return (
    <tr className="border-b text-xs sm:text-md md:text-lg border-gray-200 dark:border-gray-700">
      <td className="px-0 py-2 sm:px-4 sm:py-2">
        <div className="flex items-center">
          <div className="w-24 h-24 hidden sm:block">
            <img
              src={img}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-2 sm:ml-4">
            <h2 className="mb-2 text-md sm:text-xl font-bold dark:text-gray-400 whitespace-pre-wrap">
              {name}
            </h2>
            <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </td>
      <td className="px-0 py-2 sm:px-4 sm:py-2">${price.toFixed(2)}</td>
      <td className="px-0 py-2 sm:px-4 sm:py-2">
        <div className="flex items-center">
          <Button onClick={() => dispatch(decrementQuantity({ _id: _id }))}>
            <BiMinus className="text-xs sm:text-md" />
          </Button>
          <p className="px-3">{amount}</p>
          <Button onClick={() => dispatch(incrementQuantity({ _id: _id }))}>
            <BiPlus className="text-xs sm:text-md" />
          </Button>
        </div>
      </td>
      <td className="px-1 py-2 sm:px-4 sm:py-2">${price.toFixed(2)}</td>
    </tr>
  );
};

export default TableItem;
