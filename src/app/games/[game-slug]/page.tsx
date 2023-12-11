import BuyPanel from "@/components/buy-panel/buy-panel";
import { getGame } from "@/libs/api";

const Page = async ({ params }: { params: { "game-slug": string } }) => {
  if (!params) {
    return null;
  }

  const game = await getGame(params["game-slug"]);
  if (!game) {
    return null;
  }

  const { name, price, images, description } = game;

  return (
    <section className="overflow-hidden ">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={name}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={images[0].url}
          />
          <BuyPanel
            game={game}
            description={description}
            name={name}
            price={price}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
