"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaTag } from "react-icons/fa";

import { Category } from "@/models/category";

const CategoriesGames = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );

  const handleCategoryClick = (category: string) => {
    let newParams = new URLSearchParams(searchParams);
    newParams.set("category", category);
    router.replace(`${pathname}?${newParams.toString()}`, {
      scroll: false,
    });
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 w-full justify-center items-center">
      {categories.map((category) => (
        <button
          key={category._id}
          className={`flex items-center px-2 py-1 rounded-full text-sm font-medium transition-colors ${
            category.slug.current === selectedCategory
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-indigo-600 hover:bg-primary-500 hover:text-indigo-800"
          }`}
          onClick={() => handleCategoryClick(category.slug.current)}>
          <FaTag className="w-4 h-4 mr-1" />
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoriesGames;
