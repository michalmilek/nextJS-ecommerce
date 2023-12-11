import Banner from "@/components/banner/banner";
import CategoriesSubtitles from "@/components/categories/categories-subitles";
import Newsletter from "@/components/newsletter/newsletter";
import FeaturedProduct from "@/components/products/featured-product";
import LandingProducts from "@/components/products/landing-products";
import {
  getCategories,
  getFeaturedGames,
  getGames,
  getGamesByName,
} from "@/libs/api";
import { Game } from "@/models/game";

export default async function Home({
  _,
  searchParams,
}: {
  _: never;
  searchParams?: { name?: string };
}) {
  const categories = await getCategories();
  const games = await getGames();
  const featuredGames = await getFeaturedGames();
  let gamesByU: undefined | Game[] = undefined;
  if (searchParams?.name) {
    gamesByU = await getGamesByName(searchParams?.name);
    console.log("🚀 ~ gamesByU:", gamesByU);
  }

  if (!categories || !games || !featuredGames) {
    return null;
  }

  return (
    <div>
      <Banner />
      <CategoriesSubtitles categories={categories} />
      <LandingProducts
        searchGames={gamesByU}
        games={games}
      />
      <FeaturedProduct
        game={featuredGames[0]}
        name={featuredGames[0].name}
        price={featuredGames[0].price}
        image={featuredGames[0].images[0].url}
        description={featuredGames[0].description}
      />
      <Newsletter />
    </div>
  );
}
