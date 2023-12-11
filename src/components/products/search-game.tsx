"use client";

import { debounce } from "lodash";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Game } from "@/models/game";

import Button from "../ui/button";

const SearchGame = ({ searchGames }: { searchGames: undefined | Game[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const debouncedHandleSearch = useCallback(
    debounce(handleSearchInput, 500),
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("name", debouncedInputValue);
      router.replace(`${pathname}?${newParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams, debouncedInputValue]
  );

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(searchTerm);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedInputValue) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("name", debouncedInputValue);
      router.replace(`${pathname}?${newParams.toString()}`, {
        scroll: false,
      });
    } else if (!debouncedInputValue) {
      router.replace(`${pathname}`, {
        scroll: false,
      });
    }
  }, [searchParams, pathname, router, debouncedInputValue]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <form
      className="w-full px-4"
      onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only ">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineSearch
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
          />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search game..."
          value={searchTerm}
          onChange={handleSearchInput}
        />
        <Button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2">
          Search
        </Button>
        <ul className="mt-4 space-y-4 bg-white absolute top-full left-0 z-20 shadow-2xl w-full">
          {searchGames?.map((game) => (
            <li
              key={"searchList " + game._id}
              className="border-b border-gray-200 hover:bg-gray-300 transition-colors duration-200 px-4 py-2">
              <Link
                href={`/games/${game.slug.current}`}
                className="block py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    {game.name}
                  </h2>
                  <span className="text-gray-500">
                    ${game.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <img
                    src={game.images[0].url}
                    alt={game.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">
                      {game.category.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {game.quantity} in stock
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SearchGame;
