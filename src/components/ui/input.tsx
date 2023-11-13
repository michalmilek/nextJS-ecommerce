import React from "react";
import clsx from "clsx";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, type, placeholder, error, className, ...rest }, ref) => {
    const inputClasses = clsx(
      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
      error && "border-red-500"
    );

    return (
      <div className="mb-4">
        <label
          htmlFor={label}
          className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={label}
          placeholder={placeholder}
          className={`${inputClasses} ${className}`}
          {...rest}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
