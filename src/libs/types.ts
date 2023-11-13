import { Game } from "@/models/game";

export interface GameWithQuantity extends Game {
  gamesToBuy: number;
}
