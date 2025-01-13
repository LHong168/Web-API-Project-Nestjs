"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { useRegisterForm } from "../hooks/use-register-form";
import { Input, PasswordInput } from "@/components/atoms/input";

export const AuthRegisterForm: React.FC = () => {
  const { register, handleSubmit, formState } = useRegisterForm();

  const { errors } = formState;

  function onSubmit() {}

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Username
        </label>
        <Input
          {...register("username")}
          error={errors.username?.message}
          placeholder="Ex: John Doe"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your email
        </label>
        <Input
          {...register("email")}
          error={errors.email?.message}
          placeholder="username@gmail.com"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <PasswordInput
          {...register("password")}
          error={errors.password?.message}
          placeholder="••••••••"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Confirm password
        </label>
        <PasswordInput
          {...register("confirm_password")}
          error={errors.confirm_password?.message}
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" className="w-full">
        Create an account
      </Button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};
