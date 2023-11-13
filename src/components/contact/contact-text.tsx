import React from "react";
import { FaEnvelope, FaPhone, FaTwitter } from "react-icons/fa";
import Text from "../ui/text";
import ContactIcon from "./contact-icon";

const ContactText = () => {
  return (
    <section className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <Text
        as="h2"
        variant="title">
        Contact us
      </Text>
      <Text
        as="p"
        className="mb-8 lg:mb-16 font-light text-center text-gray-300 sm:text-xl">
        Got a technical issue? Want to send feedback about a beta feature? Need
        details about our Business plan? Let us know.
      </Text>
      <div className="flex flex-col space-y-4">
        <ContactIcon
          href="tel:+1234567890"
          icon={FaPhone}
          number="+48 666-666-666"
        />
        <ContactIcon
          href="mailto:info@company.com"
          icon={FaEnvelope}
          number="info@company.com"
        />
        <ContactIcon
          href="https://twitter.com/company"
          icon={FaTwitter}
          number="@company"
        />
      </div>
    </section>
  );
};

export default ContactText;
