import CustomLink from "../ui/link";
import HeaderSearchbar from "./header-searchbar";

const Header2 = () => {
  return (
    <header className="bg-black mt-14">
      <div className="py-4 px-4 mx-auto max-w-screen-md flex flex-col sm:flex-row gap-4 justify-between items-center">
        <HeaderSearchbar />
        <div className="flex items-center space-x-4">
          <CustomLink
            variant="secondary"
            href={"/contact"}>
            Contact
          </CustomLink>
          <CustomLink
            variant="secondary"
            href={"/categories"}>
            Categories
          </CustomLink>
          <CustomLink
            variant="secondary"
            href={"/games"}>
            Games
          </CustomLink>
        </div>
      </div>
    </header>
  );
};

export default Header2;
