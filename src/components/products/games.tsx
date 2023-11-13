import { Game } from "@/models/game";
import React from "react";
import PCGameProduct from "./pc-game-product";

const Games = ({ games }: { games: Game[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 justify-items-center">
      {games.map((game) => (
        <PCGameProduct
          game={game}
          key={"games categories page " + game.name}
        />
      ))}
    </div>
  );
};

export default Games;
