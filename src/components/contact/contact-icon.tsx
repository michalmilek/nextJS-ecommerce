import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  number: string;
  href: string;
}

const ContactIcon = ({ icon: Icon, number, href }: Props) => {
  const iconClasses = clsx("h-6 w-6 text-gray-300");
  const linkClasses = clsx("text-gray-300 hover:text-primary-500");

  return (
    <div className="flex items-center space-x-4">
      <Icon className={iconClasses} />
      <Link
        href={href}
        className={linkClasses}>
        {number}
      </Link>
    </div>
  );
};

export default ContactIcon;
