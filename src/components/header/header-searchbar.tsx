"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const sites = [
  "games",
  "categories",
  "cart",
  "orders",
  "contact",
  "newsletter",
  "footer",
];

const HeaderSearchbar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${query}`);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredSites =
    query === ""
      ? []
      : sites.filter((site) =>
          site.toLowerCase().includes(query.toLowerCase())
        );

  const handleRedirect = useCallback((site: string) => {
    switch (site) {
      case "newsletter":
        return `#newsletter`;
      case "footer":
        return "#footer";
      default:
        return `/${site}`;
    }
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 relative">
      <FaSearch className="h-6 w-6 text-gray-300" />
      <form
        autoComplete="new-password"
        onSubmit={handleSearch}>
        <input
          autoComplete="new-password"
          type="text"
          name="q"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
        />
      </form>
      {filteredSites.length > 0 && (
        <ul className="absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-md z-50 w-full">
          {filteredSites.map((site) => (
            <li key={site + "static pages available"}>
              <Link
                href={`${handleRedirect(site)}`}
                className="block text-black hover:underline hover:bg-indigo-600 hover:text-white transition-all py-2 px-4 ">
                {site[0].toUpperCase() + site.substring(1)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderSearchbar;
