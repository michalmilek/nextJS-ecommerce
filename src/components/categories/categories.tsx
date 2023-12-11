import { Category as CategoryType } from "@/models/category";

import Text from "../ui/text";
import Category from "./category";

const Categories = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Text
        as="h2"
        variant="title">
        Categories
      </Text>
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center items-center gap-4">
        {categories.map((category) => (
          <Category
            category={category}
            key={"category " + category._id}
          />
        ))}
      </div>{" "}
    </div>
  );
};

export default Categories;
