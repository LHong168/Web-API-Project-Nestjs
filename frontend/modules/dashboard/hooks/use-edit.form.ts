import { PasswordValidation } from "@/modules/auth/hooks/use-login-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { User } from "../interface";

interface ErrorMessage {
  email_empty: string;
  email_invalid: string;
  password_empty: string;
  password_min: string;
  username_empty: string;
  username_min: string;
  newPassword_empty: string;
  confirm_empty: string;
  confirm_mismatch: string;
}

const EditFormSchema = (e: ErrorMessage) =>
  v.pipe(
    v.object({
      username: v.pipe(
        v.string(e.username_empty),
        v.nonEmpty(e.username_empty),
        v.minLength(3, e.username_min)
      ),
      email: v.pipe(v.string(e.email_empty), v.nonEmpty(e.email_invalid)),
      newPassword: PasswordValidation({
        empty: e.password_empty,
        min: e.password_min,
      }),
      password: PasswordValidation({
        empty: e.password_empty,
        min: e.password_min,
      }),
      confirm_password: v.pipe(
        v.string(e.confirm_empty),
        v.nonEmpty(e.confirm_empty)
      ),
    }),
    v.forward(
      v.partialCheck(
        [["password"], ["newPassword"]],
        (input) => !(input.password && !input.newPassword),
        "New password is required when updating password"
      ),
      ["newPassword"]
    ),
    v.forward(
      v.partialCheck(
        [["newPassword"], ["confirm_password"]],
        (input) => input.newPassword === input.confirm_password,
        e.confirm_mismatch
      ),
      ["confirm_password"]
    )
  );

export type EditFormData = v.InferInput<ReturnType<typeof EditFormSchema>>;

export const useEditForm = (data: Omit<User, "password">) => {
  return useForm<EditFormData>({
    resolver: valibotResolver(
      EditFormSchema({
        email_empty: "Email is required.",
        email_invalid: "Please enter a valid email address.",
        password_empty: "Password is required.",
        password_min: "Password must be at least 8 characters long.",
        username_empty: "Username is required.",
        username_min: "Username must be at least 3 characters long.",
        newPassword_empty: "Confirm password is required.",
        confirm_empty: "Confirm password is required.",
        confirm_mismatch: "Passwords do not match.",
      })
    ),
    defaultValues: { ...data, password: "" },
  });
};
