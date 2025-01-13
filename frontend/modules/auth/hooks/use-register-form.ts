import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { PasswordValidation } from "./use-login-form";

interface ErrorMessage {
  email_empty: string;
  email_invalid: string;
  password_empty: string;
  password_min: string;
  username_empty: string;
  username_min: string;
  confirm_empty: string;
  confirm_mismatch: string;
}

const RegisterFormSchema = (e: ErrorMessage) =>
  v.pipe(
    v.object({
      username: v.pipe(
        v.string(e.username_empty),
        v.nonEmpty(e.username_empty),
        v.minLength(3, e.username_min)
      ),
      email: v.pipe(v.string(e.email_empty), v.nonEmpty(e.email_invalid)),
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
        [["password"], ["confirm_password"]],
        (input) => input.password === input.confirm_password,
        e.confirm_mismatch
      ),
      ["confirm_password"]
    )
  );

export type RegisterFormData = v.InferInput<
  ReturnType<typeof RegisterFormSchema>
>;

export const useRegisterForm = () => {
  return useForm<RegisterFormData>({
    resolver: valibotResolver(
      RegisterFormSchema({
        email_empty: "Email is required.",
        email_invalid: "Please enter a valid email address.",
        password_empty: "Password is required.",
        password_min: "Password must be at least 8 characters long.",
        username_empty: "Username is required.",
        username_min: "Username must be at least 3 characters long.",
        confirm_empty: "Confirm password is required.",
        confirm_mismatch: "Passwords do not match.",
      })
    ),
  });
};
