import React from "react";
import {
  useFieldArray,
  type Control,
  type FieldError,
  type UseFormRegister,
} from "react-hook-form";
import {
  buildValidation,
  GRID_COLS,
  type FieldConfig,
} from "../utils/CutsomFormHelpers";
import CustomInput from "./CustomInput";

interface DynamicFieldArray {
  name: string;
  label: string;
  fieldsConfig: FieldConfig[];
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: any;
}

const DynamicFieldArray: React.FC<DynamicFieldArray> = ({
  name,
  fieldsConfig,
  register,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  return (
    <div className="space-y-4">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className={`relative grid ${GRID_COLS[2]} gap-4 p-4 rounded-lg bg-gray-50 border`}
        >
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Remove"
            >
              ✕
            </button>
          )}

          {fieldsConfig.map((subField) => (
            <CustomInput
              key={subField.name}
              id={`${name}[${index}].${subField.name}`}
              label={subField.label}
              type={subField.type}
              placeholder={subField.placeholder}
              required={subField.required}
              register={register(
                `${name}[${index}].${subField.name}`,
                buildValidation(subField)
              )}
              error={errors?.[name]?.[index]?.[subField.name] as FieldError}
            />
          ))}
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            append(Object.fromEntries(fieldsConfig.map((f) => [f.name, ""])))
          }
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Row
        </button>
      </div>
    </div>
  );
};

export default DynamicFieldArray;
