import React from "react";
import { useForm } from "react-hook-form";

interface FieldConfig {
  name: string;
  label: string;
  type: "input";
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  pattern?:string;
}

interface CustomFormProps {
  questions: FieldConfig[];
  onSubmit: (data: any) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ questions, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = (data: any) => {
    onSubmit(data);
  };

  const buildValidation = (field: FieldConfig) => {
    const rules: any = {};
    if (field.required) rules.required = `${field.label} is required!`;
    if (field.minLength)
      rules.minLength = {
        value: field.minLength,
        message: `${field.label} must be at least ${field.minLength} characters`,
      };
    if (field.maxLength)
      rules.maxLength = {
        value: field.maxLength,
        message: `${field.label} must be at most ${field.maxLength} characters`,
      };

    if (field.pattern) {
      rules.pattern = {
        value: field.pattern,
        message:`${field.label} format is invalid`
      };
    }
    return rules;
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {questions?.map((field) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name,buildValidation(field))}
          />
          {errors[field.name] && (
            <p>{errors[field.name]?.message?.toString()}</p>
          )}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}> Submit</button>
    </form>
  );
};

export default CustomForm;
