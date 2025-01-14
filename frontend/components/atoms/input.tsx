"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input as _Input } from "../ui/input";
import { useState } from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
  const { error, label, ...inputProps } = props;

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="space-y-2">
        <_Input {...inputProps} />
        {error && <small className="text-red-500 text-xs">{error}</small>}
      </div>
    </div>
  );
};

export const PasswordInput: React.FC<InputProps> = (props) => {
  const { error, label, ...inputProps } = props;
  const [isShow, setShow] = useState(false);

  const EyeComponent = isShow ? EyeOff : Eye;

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>

      <div className="space-y-2">
        <div className="relative">
          <_Input
            {...inputProps}
            type={isShow ? "text" : "password"}
            className="pr-10"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            <EyeComponent className="text-gray-600" />
          </div>
        </div>
        {error && <small className="text-red-500 text-xs">{error}</small>}
      </div>
    </div>
  );
};
