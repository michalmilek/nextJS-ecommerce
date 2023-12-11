import Button from "../ui/button";

const Coupon = () => {
  return (
    <div className="w-full px-4 mb-4 lg:w-1/2 text-sm md:text-md">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-gray-200 text-xs md:text-md">Apply Coupon</span>
        <input
          type="text"
          className="w-full px-8 py-4 font-normal placeholder-gray-400 border lg:flex-1"
          placeholder="x304k45"
          required
        />
        <Button className="h-full w-full text-sm md:text-md">Apply</Button>
      </div>
    </div>
  );
};

export default Coupon;
