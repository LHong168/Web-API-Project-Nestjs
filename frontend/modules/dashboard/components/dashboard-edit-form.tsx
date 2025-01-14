"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/atoms/input";
import { EditFormData, useEditForm } from "../hooks/use-edit.form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateUsers } from "../api";
import { User } from "../interface";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";

export const DashboardEditForm: React.FC<{ data: User }> = ({
  data: userData,
}) => {
  const { register, handleSubmit, formState } = useEditForm(userData);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { errors } = formState;

  async function onSubmit(data: EditFormData) {
    try {
      setLoading(true);
      await updateUsers(userData.id, data);
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
          {...register("newPassword")}
          error={errors.newPassword?.message}
          placeholder="••••••••"
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
