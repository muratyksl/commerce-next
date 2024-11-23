import { useState } from "react";

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export function useFormValidation(
  validations: Record<string, ValidationRules>
) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (name: string, value: string): boolean => {
    const rules = validations[name];
    if (!rules) return true;

    if (rules.required && !value) {
      setErrors((prev) => ({
        ...prev,
        [name]: "This field is required",
      }));
      return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      setErrors((prev) => ({
        ...prev,
        [name]: `Minimum length is ${rules.minLength} characters`,
      }));
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      setErrors((prev) => ({
        ...prev,
        [name]: `Maximum length is ${rules.maxLength} characters`,
      }));
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Invalid format",
      }));
      return false;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  };

  return { errors, validate };
}
