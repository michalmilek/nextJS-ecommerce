import clsx from "clsx";

type TextProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  children: React.ReactNode;
  variant?: "title";
  className?: string;
};

const Text = ({ as: Tag = "p", children, variant, className }: TextProps) => {
  const classNameStyling = clsx(
    {
      "text-3xl font-bold text-center my-10": variant === "title",
    },
    `${className}`
  );

  return <Tag className={classNameStyling}>{children}</Tag>;
};

export default Text;
