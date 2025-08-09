export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "date";
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  pattern?: RegExp;
  section?: string;
}
export const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export const buildValidation = (field: FieldConfig) => {
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
        message: `${field.label} format is invalid`,
      };
    }
    return rules;
  };