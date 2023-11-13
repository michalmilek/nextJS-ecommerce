"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Text from "../ui/text";
import Button from "../ui/button";
import Input from "../ui/input";
import Textarea from "../ui/text-area";
import { useEffect, useState } from "react";

type ContactFormData = {
  email: string;
  subject: string;
  message: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log(data);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="mb-10 mt-20">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md bg-gray-400 rounded-lg">
        <Text
          as="h2"
          className="text-black mt-0"
          variant="title">
          Contact form
        </Text>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="Email"
                error={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Input
                label="Subject"
                error={errors.subject?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Subject"
                error={errors.message?.message}
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            className="w-full">
            Send message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
