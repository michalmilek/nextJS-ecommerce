"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { confirmPassword, ...rest } = data;
      await axios.post("/api/auth/sign-up", rest);
      toast.success(
        "User succesfully registered. Now login with to your account."
      );
      redirect("/sign-in");
    } catch (error) {
      toast.error("Something went wrong");
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
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email")}
              label="Email"
              error={errors.email && errors.email.message}
            />
            <Input
              {...register("password")}
              label="Password"
              type="password"
              error={errors.password && errors.password.message}
            />
            <Input
              {...register("confirmPassword")}
              label="Confirm password"
              type="password"
              error={errors.confirmPassword && errors.confirmPassword.message}
            />
            <Button
              type="submit"
              className="w-full">
              Create an account
            </Button>
            <p className="text-sm font-light text-gray-500 ">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary-600 hover:underline ">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
