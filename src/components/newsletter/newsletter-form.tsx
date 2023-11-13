"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../ui/input";
import Button from "../ui/button";
import { useEffect, useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

const NewsletterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <Input
            label="First name"
            error={errors.firstName?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <Input
            label="Last name"
            error={errors.lastName?.message}
            {...field}
          />
        )}
      />

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

      <div className="mt-4 mb-2 sm:mb-4 w-full">
        <Button
          className="w-full"
          type="submit"
          variant="primary">
          Subscribe
        </Button>
      </div>

      <p className="text-xs text-gray-600 sm:text-sm">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
};

export default NewsletterForm;
