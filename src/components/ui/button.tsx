import React from "react";
import clsx from "clsx";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  className,
  disabled,
  isLoading = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded font-medium transition-all duration-200 flex items-center justify-center";
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
    disabled ? "bg-gray-400 shadow-none cursor-not-allowed" : "",
    isLoading && "cursor-not-allowed bg-gray-400",
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}>
      {isLoading && <FaSpinner className="animate-spin mr-2" />}
      {<>{children}</>}
    </button>
  );
};

export default Button;
