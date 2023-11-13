import { Category } from "@/models/category";
import sanityClient from "./sanity";
import { Game } from "@/models/game";
import axios from "axios";
import { GameWithQuantity } from "./types";

export const getCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"] {
    _id,
    name,
    slug {current},
    image,
    subtitle
  }`;

  const categories: Category[] = await sanityClient.fetch({ query });

  return categories;
};

export const getGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game"] {
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
      }`;

  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};

export const getCategoryGames = async (slug: string): Promise<Game[]> => {
  const query = `*[_type == "game" && category->slug.current == "${slug}"] {
    name,
    price,
    images,
    isFeatured,
    isTrending,
    slug,
    quantity,
    description,
    category->{
      name,
      subtitle
    }
  }`;

  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const query = `*[_type == "category" && slug.current == "${slug}"][0]`;

  const category: Category = await sanityClient.fetch({ query });

  return category;
};

export const getRecentGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game"] | order(_createdAt desc)[0...4] {
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
      }`;

  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};

export const getGame = async (slug: string): Promise<Game> => {
  const query = `*[_type == "game" && slug.current == "${slug}"][0] {
        _id,
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
  }`;

  const game: Game = await sanityClient.fetch({ query });

  return game;
};

export const getGamesByName = async (name: string): Promise<Game[]> => {
  const query = `*[_type == "game" && name match "${name}*"] {
        _id,
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
  }`;

  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};

export const getFeaturedGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game" && isFeatured] {
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
      }`;

  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};


export const updateGameQuantity = async (games: GameWithQuantity[]) => {
  const mutation = {
    mutations: games.map((game) => ({
      patch: {
        id: game._id,
        set: {
          quantity: game.quantity - game.gamesToBuy,
        },
      },
    })),
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
  );

  return data;
};

export const createOrder = async (
  games: GameWithQuantity[],
  userEmail: string
) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "order",
          items: games.map((game, index) => ({
            game: {
              _key: game._id + String(new Date()) + userEmail,
              _type: "reference",
              _ref: game._id,
            },
            quantity: game.gamesToBuy,
          })),
          userEmail,
          orderStatus: "pending",
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
  );

  return data;
};

export const getOrders = async (email: string) => {
  const query = `*[_type == "order" && userEmail == "${email}"] {
        _id,
        items[] {
          _key,
          quantity,
          game -> {
            _id,
            name,
            price,
            images,
            slug {
              current
            },
            description
          }
        },
        orderStatus
  }`;

  const params = {};
  const result: any = await sanityClient.fetch({ query, params });

  return result;
};
