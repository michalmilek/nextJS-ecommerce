import { Game } from "@/models/game";
import Link from "next/link";
import React from "react";

function PCGameProduct({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.slug.current}`}>
      <div
        className={
          "relative w-[120px] h-[200px] md:w-[200px] md:h-[277px] overflow-hidden rounded-2xl"
        }>
        <h3
          className={
            "absolute rounded-bl-2xl top-0 right-0 bg-indigo-600 p-3 text-lg font-semibold z-10 text-white"
          }>
          {game.price} $
        </h3>

        <img
          className={"absolute top-0 left-0 w-full h-full object-cover"}
          src={game.images[0].url}
          alt={game.name}
        />

        <div
          className={
            "absolute bottom-0 left-0 right-0 py-1 px-2 md:py-3 md:px-4 text-white font-bold text-lg bg-indigo-600 bg-opacity-75"
          }>
          {game.name}
        </div>
      </div>
    </Link>
  );
}

export default PCGameProduct;
