"use client";

import "swiper/css";
import "swiper/css/pagination";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Game } from "@/models/game";

import Text from "../ui/text";
import PCGameProduct from "./pc-game-product";
import SearchGame from "./search-game";

const LandingProducts = ({
  games,
  searchGames,
}: {
  games: Game[];
  searchGames: undefined | Game[];
}) => {
  const is420px = useMediaQuery({
    query: "(max-width: 420px)",
  });
  const is550px = useMediaQuery({
    query: "(max-width: 550px)",
  });
  const is1024px = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const is1280px = useMediaQuery({
    query: "(max-width: 1280px)",
  });
  const isFullHd = useMediaQuery({
    query: "(max-width: 1600px)",
  });

  const GenerateSlidesPerRow = (): number => {
    if (is420px) {
      return 2;
    } else if (is550px) {
      return 3;
    } else if (is1024px) {
      return 3;
    } else if (is1280px) {
      return 4;
    } else if (isFullHd) {
      return 6;
    } else {
      return 6;
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="flex flex-col items-center w-full">
      <Link href={"/games"}>
        <Text
          as="h2"
          variant="title">
          Games
        </Text>
      </Link>
      <SearchGame searchGames={searchGames} />
      <article className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 justify-items-center items-center justify-center gap-4 mt-4 w-full">
        <Swiper
          slidesPerView={GenerateSlidesPerRow()}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper">
          {games.map((game) => (
            <SwiperSlide key={`game ${game._id}`}>
              <PCGameProduct game={game} />
            </SwiperSlide>
          ))}
        </Swiper>
      </article>
    </section>
  );
};

export default LandingProducts;
