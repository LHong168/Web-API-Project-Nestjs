"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { LoginFormData, useLoginForm } from "../hooks/use-login-form";
import { Input, PasswordInput } from "@/components/atoms/input";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/navigation";

export const AuthLoginForm: React.FC = () => {
  const { register, handleSubmit, formState } = useLoginForm();
  const { login, loading } = useAuth();
  const router = useRouter();

  const { errors } = formState;

  async function onSubmit(data: LoginFormData) {
    const res = await login({ ...data });
    if (res) router.push(ROUTES.DASHBOARD);
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

      <Button type="submit" className="w-full" disabled={loading}>
        Sign in
      </Button>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don&apos;t have an account yet?{" "}
        <Link
          href={ROUTES.REGISTER}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};
