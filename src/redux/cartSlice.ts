import { GameWithQuantity } from "@/libs/types";
import { Game } from "@/models/game";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  showCart: boolean;
  cartItems: GameWithQuantity[];
}

const cartFromLocalStorage =
  typeof localStorage !== "undefined" && localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : [];

const initialState: CartState = {
  showCart: false,
  cartItems: cartFromLocalStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addItemToCart: (state, action: PayloadAction<Game>) => {
      const newItem = { ...action.payload, gamesToBuy: 1 };
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (existingItem) {
        existingItem?.gamesToBuy === existingItem?.gamesToBuy
          ? (existingItem.gamesToBuy as number) + 1
          : 1;
      } else {
        state.cartItems.push(newItem);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action: PayloadAction<{ _id: string }>) => {
      const itemId = action.payload._id;
      const updatedState = state.cartItems.filter(
        (item) => item._id !== itemId
      );
      state.cartItems.splice(0, state.cartItems.length, ...updatedState);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    incrementQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const itemId = action.payload._id;
      const game = state.cartItems.find((item) => item._id === itemId);

      if (game) {
        game.gamesToBuy++;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decrementQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const itemId = action.payload._id;
      const game = state.cartItems.find((item) => item._id === itemId);
      if (game) {
        if (game.gamesToBuy === 1) {
          return;
        } else {
          game.gamesToBuy--;
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  toggleCart,
  addItemToCart,
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
