import { Category as CategoryType } from "@/models/category";

function Category({ category }: { category: CategoryType }) {
  return (
    <div className="cursor-pointer relative w-[150px] h-[200px] md:w-[280px] md:h-[300px] rounded-xl overflow-hidden shadow-md">
      <img
        src={category.image}
        alt={category.subtitle}
        className="absolute top-0 left-0 h-full w-full object-cover object-center"
      />
      <div className="absolute text-center bottom-0 bg-opacity-75 left-0 w-full bg-indigo-600 z-10 px-2 py-6">
        <h3 className=" text-xl font-bold text-white">{category.name}</h3>
      </div>
    </div>
  );
}

export default Category;
