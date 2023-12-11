"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../ui/button";
import Input from "../ui/input";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LoginCredentials = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await signIn("credentials", {
        callbackUrl: "/",
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((res) => {
        if (res?.error === null) {
          toast.success("User logged in successfully");
          router.push("/");
        } else {
          console.log(res);
          toast.error(res?.error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            error={errors.email && errors.email.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            label="Password"
            type="password"
            error={errors.password && errors.password.message}
          />
        )}
      />
      <Button
        isLoading={isSubmitting}
        type="submit"
        className="w-full">
        Submit
      </Button>
      <p className="text-sm font-light text-gray-500 ">
        Dont you have an account?
        <Link
          href="/sign-up"
          className="font-medium text-primary-600 hover:underline ">
          {" "}
          Register here
        </Link>
      </p>
      <p>Test account: test1234@test.com / test1234</p>
    </form>
  );
};

export default LoginCredentials;
