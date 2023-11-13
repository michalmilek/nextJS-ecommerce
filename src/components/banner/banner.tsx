import React from "react";
import CustomLink from "../ui/link";

const Banner = () => {
  return (
    <div
      className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
      style={{
        backgroundImage:
          "url(https://preview.redd.it/0tyjjyyddwk71.png?auto=webp&s=87d03a84e96dd86ff54b6d8efe7554ef8f7d6a37)",
      }}>
      <div className="md:w-1/2">
        <p className="font-bold text-sm uppercase">Games</p>
        <p className="text-3xl font-bold">Multimedia products</p>
        <p className="text-2xl mb-10 leading-none">
          Join the tribe of gamers and nerds!
        </p>
        <CustomLink
          href={"/contact"}
          variant="primary">
          Contact us
        </CustomLink>
      </div>
    </div>
  );
};

export default Banner;
