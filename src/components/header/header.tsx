import Link from "next/link";
import Button from "../ui/button";
import Menu from "./menu";
import { Order } from "@/models/order";
import Breadcrumb from "../ui/breadcrumbs";

const Header = ({ orders }: { orders: Order[] | undefined }) => {
  return (
    <header className="flex px-10 py-2 bg-gray-900 shadow-xl fixed top-0 left-0 right-0 justify-between z-50">
      <div className="flex items-center gap-3">
        <Link href={"/"}>
          <span className="font-raleway text-3xl text-white">Logo</span>
        </Link>
        <Breadcrumb />
      </div>
      <Menu orders={orders} />
    </header>
  );
};

export default Header;
