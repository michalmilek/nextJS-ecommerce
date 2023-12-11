import Categories from "@/components/categories/categories";
import { getCategories } from "@/libs/api";

const CategoriesPage = async () => {
  const categories = await getCategories();

  if (!categories) {
    return null;
  }

  return (
    <div className="mt-20 mb-10">
      <Categories categories={categories} />
    </div>
  );
};

export default CategoriesPage;
