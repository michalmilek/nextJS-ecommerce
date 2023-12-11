"use client";

import { useDispatch } from "react-redux";

import { Game } from "@/models/game";
import { addItemToCart } from "@/redux/cartSlice";

import Button from "../ui/button";

const AddFeaturedToCart = ({ game }: { game: Game }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(addItemToCart(game))}
      variant="primary">
      Add to cart
    </Button>
  );
};

export default AddFeaturedToCart;
