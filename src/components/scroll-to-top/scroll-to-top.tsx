"use client";

import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <button
      className={`fixed z-50 bottom-20 right-4 p-2 rounded-full bg-indigo-600 text-white transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleScrollToTop}>
      <FaArrowCircleUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;
