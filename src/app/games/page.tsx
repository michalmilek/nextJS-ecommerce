import CategoriesGames from "@/components/categories/categories-games";
import Games from "@/components/products/games";
import SearchGame from "@/components/products/search-game";
import {
  getCategories,
  getCategory,
  getCategoryGames,
  getGames,
  getGamesByName,
} from "@/libs/api";
import { Game } from "@/models/game";
import React from "react";

type Props = {
  params?: {
    _?: never;
  };
  searchParams?: {
    category?: string;
    name?: string;
  };
};

const GamesPage = async (props: Props) => {
  const categories = await getCategories();

  if (!categories) {
    return null;
  }

  let games: undefined | Game[];
  let gamesFilteredByName: undefined | Game[];

  if (props.searchParams?.category) {
    games = await getCategoryGames(props.searchParams?.category);
  } else {
    games = await getGames();
  }

  if (props.searchParams?.name) {
    gamesFilteredByName = await getGamesByName(props.searchParams.name);
  } else {
  }

  return (
    <section className="flex flex-col my-10 gap-8">
      <CategoriesGames categories={categories} />
      <SearchGame searchGames={gamesFilteredByName} />
      <Games games={games} />
    </section>
  );
};

export default GamesPage;
