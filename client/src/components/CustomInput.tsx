import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { InputType } from "../utils/CutsomFormHelpers";

interface CustomInputProps {
  id: string;
  label: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  label,
  type,
  placeholder,
  required,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}:
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
