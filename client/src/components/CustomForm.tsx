import React from "react";
import { useForm, type FieldError } from "react-hook-form";
import {
  buildValidation,
  GRID_COLS,
  type FieldConfig,
} from "../utils/CutsomFormHelpers";
import CustomInput from "./CustomInput";
import DynamicFieldArray from "./DynamicFieldArray";

interface CustomFormProps {
  questions: FieldConfig[];
  sectionwiseForm?: boolean;
  columns?: 1 | 2 | 3 | 4;
  sectionColumns?: Record<string, number>;
  onSubmit: (data: any) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({
  questions,
  sectionwiseForm,
  sectionColumns,
  columns = 1,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = (data: any) => {
    onSubmit(data);
  };

  const groupedSections = sectionwiseForm
    ? questions.reduce((acc, field) => {
        const sectionName = field.section || "General";
        if (!acc[sectionName]) acc[sectionName] = [];
        acc[sectionName].push(field);
        return acc;
      }, {} as Record<string, FieldConfig[]>)
    : { questions };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      {Object.entries(groupedSections).map(([sectionName, fields]) => {
        const cols = sectionColumns?.[sectionName] || columns || 1;
        return (
          <div key={sectionName} className="space-y-4">
            {sectionwiseForm && (
              <h2 className="text-lg font-semibold border-b pb-1 text-gray-800">
                {sectionName}
              </h2>
            )}
            <div className={`grid gap-4 ${GRID_COLS[cols] || GRID_COLS[1]}`}>
              {fields.map((field) => {
                if (field.type === "dynamic" && field.fields)
                  return (
                    <DynamicFieldArray
                      key={field.name}
                      name={field.name}
                      label={field.name}
                      register={register}
                      fieldsConfig={field.fields}
                      errors={errors}
                      control={control}
                    />
                  );
                return (
                  <CustomInput
                    id={field.name}
                    label={field.label}
                    required={field.required}
                    type={field.type}
                    placeholder={field.placeholder}
                    register={register(field.name, buildValidation(field))}
                    error={errors[field.name] as FieldError}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CustomForm;
