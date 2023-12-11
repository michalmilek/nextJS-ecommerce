import Link from "next/link";

import { Category } from "@/models/category";

import Text from "../ui/text";

const CategoriesSubtitles = ({ categories }: { categories: Category[] }) => {
  return (
    <div>
      <Link href={"/categories"}>
        <Text
          as="h2"
          variant="title">
          Categories
        </Text>
      </Link>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {categories.map((category) => (
          <Link
            className="hover:underline"
            key={"category link" + category._id}
            href={`/category/${category.slug.current}`}>
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSubtitles;
