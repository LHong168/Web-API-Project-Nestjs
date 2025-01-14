"use client";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/atoms/input";
import { EditFormData, useEditForm } from "../hooks/use-edit.form";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateUsers } from "../api";
import { ROUTES } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useGetSingleUser } from "../hooks/use-get-single-user";
import { invalidateQuery } from "@/provider";

export const DashboardEditForm: React.FC<{ id: number }> = ({ id }) => {
  const { data } = useGetSingleUser(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useEditForm();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (data) reset({ ...data, password: "" });
  }, [data, reset]);

  const onSubmit = async (formData: EditFormData) => {
    setLoading(true);
    try {
      await updateUsers(id, formData);
      invalidateQuery();
      toast({ title: "Success", variant: "success" });
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Username"
        {...register("username")}
        error={errors.username?.message}
        placeholder="Ex: John Doe"
      />

      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message}
        placeholder="username@gmail.com"
      />

      <PasswordInput
        label="Password"
        {...register("newPassword")}
        error={errors.newPassword?.message}
        placeholder="••••••••"
      />

      <PasswordInput
        label="New Password"
        {...register("password")}
        error={errors.password?.message}
        placeholder="••••••••"
      />

      <PasswordInput
        label="Confirm password"
        {...register("confirm_password")}
        error={errors.confirm_password?.message}
        placeholder="••••••••"
      />

      <Button type="submit" className="w-full" disabled={loading}>
        Submit
      </Button>
    </form>
  );
};
