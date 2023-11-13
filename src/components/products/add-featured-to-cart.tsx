"use client";

import React from "react";
import { useDispatch } from "react-redux";
import Button from "../ui/button";
import { addItemToCart } from "@/redux/cartSlice";
import { Game } from "@/models/game";

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
