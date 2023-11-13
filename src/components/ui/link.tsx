import React, { LinkHTMLAttributes } from "react";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";
import Link, { LinkProps } from "next/link";

interface ButtonProps extends LinkProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  className?: string;
  children: React.ReactNode;
}

const CustomLink = ({
  children,
  variant = "primary",
  size = "medium",
  className,
  ...props
}: ButtonProps & { href: string }) => {
  const baseClasses =
    "px-4 py-2 rounded font-medium transition-colors duration-200";
  const variantClasses = {
    primary:
      "bg-indigo-500 text-white shadow-indigo-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
    secondary:
      "bg-indigo-50 border border-indigo-100 text-indigo-500 hover:bg-indigo-400 hover:text-white focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
    outline:
      "bg-transparent border-2 border-indigo-400 text-indigo-500 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
  };
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <Link
      className={buttonClasses}
      {...props}
      href={props.href}>
      {children}
    </Link>
  );
};

export default CustomLink;
