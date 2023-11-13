"use client";

import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import clsx from "clsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface ComponentProps {
  className?: string;
}

const components: { [key: string]: React.FC<ComponentProps> } = {
  FaArrowLeft,
  FaArrowRight,
};

const Breadcrumb = () => {
  const router = useRouter();
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const iconClasses = clsx("w-3 h-3 text-white mx-1");
  const linkClasses = clsx(
    "ms-1 text-sm font-medium text-white hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
  );


    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }


  return (
    <nav
      className="flex"
      aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-white">
        {pathNames.map((item, index) => {
          const Component =
            components[index === 0 ? "FaArrowLeft" : "FaArrowRight"];
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          return (
            <li key={item + "breadcrumb"}>
              <div className="flex items-center">
                <button
                  className={`${index !== 0 && "cursor-not-allowed"}`}
                  onClick={() => {
                    if (index === 0) {
                      router.back();
                    }
                  }}>
                  <Component className={iconClasses} />
                </button>
                <Link
                  href={href}
                  className={linkClasses}>
                  {item}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
