import { Game } from "@/models/game";

import Text from "../ui/text";
import AddFeaturedToCart from "./add-featured-to-cart";

interface Props {
  image: string;
  name: string;
  price: number;
  description: string;
  game: Game;
}

function FeaturedProduct({ image, name, price, description, game }: Props) {
  return (
    <article className="flex flex-col mt-10">
      <Text
        as="h2"
        variant="title">
        Featured product
      </Text>
      <div className="rounded-lg shadow-md overflow-hidden relative h-[500px]">
        <img
          src={image}
          alt={name}
          className="h-full object-cover absolute top-0 left-0 w-full object-top"
        />
        <div className="p-4 pb-6 bg-black bg-opacity-75 z-30 w-full absolute bottom-0 left-0 font-poppins">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-500">{description}</p>
          <div className="flex items-center mt-4 w-full justify-between">
            <span className="text-lg font-semibold">${price}</span>
            <AddFeaturedToCart game={game} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default FeaturedProduct;
