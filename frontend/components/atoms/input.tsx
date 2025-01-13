"use client";

import { Eye, EyeOff } from "lucide-react";
import { Input as _Input } from "../ui/input";
import { useState } from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, ...inputProps }) => {
  return (
    <div className="space-y-2">
      <_Input {...inputProps} />
      {error && <small className="text-red-500 text-xs">{error}</small>}
    </div>
  );
};

export const PasswordInput: React.FC<InputProps> = (props) => {
  const { error, ...inputProps } = props;
  const [isShow, setShow] = useState(false);

  return (
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
          {isShow ? <EyeOff /> : <Eye />}
        </div>
      </div>
      {error && <small className="text-red-500 text-xs">{error}</small>}
    </div>
  );
};
