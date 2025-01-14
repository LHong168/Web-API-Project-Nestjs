"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/atoms/input";
import { CreateFormData, useCreateForm } from "../hooks/use-create-form";
import { useState } from "react";
import { createUsers } from "../api";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";

export const DashboardCreateForm: React.FC = () => {
  const { register, handleSubmit, formState } = useCreateForm();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { errors } = formState;

  async function onSubmit(data: CreateFormData) {
    try {
      setLoading(true);
      await createUsers(data);
      toast({ title: "Success", variant: "success" });
      router.push(ROUTES.DASHBOARD);
    } catch (e) {
      toast({ title: "Something went wrong", variant: "destructive" });
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

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

      <Button type="submit" className="w-full" disabled={loading}>
        Submit
      </Button>
    </form>
  );
};
