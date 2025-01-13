import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

interface ErrorPasswordValidationProps {
  empty: string;
  min: string;
}

export const PasswordValidation = (e: ErrorPasswordValidationProps) =>
  v.pipe(v.string(e.empty), v.nonEmpty(e.empty), v.minLength(8, e.min));

interface ErrorMessage {
  email_empty: string;
  email_invalid: string;
  password_empty: string;
  password_min: string;
}

const LoginFormSchema = (e: ErrorMessage) =>
  v.pipe(
    v.object({
      email: v.pipe(v.string(e.email_empty), v.nonEmpty(e.email_invalid)),
      password: PasswordValidation({
        empty: e.password_empty,
        min: e.password_min,
      }),
    })
  );

export type LoginFormData = v.InferInput<ReturnType<typeof LoginFormSchema>>;

export const useLoginForm = () => {
  return useForm<LoginFormData>({
    resolver: valibotResolver(
      LoginFormSchema({
        email_empty: "Email is required.",
        email_invalid: "Please enter a valid email address.",
        password_empty: "Password is required.",
        password_min: "Password must be at least 8 characters long.",
      })
    ),
  });
};
