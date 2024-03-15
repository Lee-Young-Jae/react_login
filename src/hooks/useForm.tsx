import { useEffect, useState } from "react";

type FormValues = {
  [key: string]: string;
};
type FormErrors = {
  [key: string]: string | undefined;
};
type FormTouched = {
  [key: string]: boolean;
};

type FormValidateFunction = (value: FormValues) => FormErrors;
type FormOnSubmitFunction = (value: FormValues) => void;

interface useFormProps {
  initialState: { [key: string]: string };
  validate: FormValidateFunction;
  onSubmit: FormOnSubmitFunction;
}

const useForm = ({ initialState, validate, onSubmit }: useFormProps) => {
  const [values, setValues] = useState<FormValues>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    const nextValue = {
      ...values,
      [name]: value,
    };
    setValues(nextValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextTouched: FormTouched = {};
    for (const key in values) {
      nextTouched[key] = true;
    }

    setTouched(nextTouched);

    const errors = validate(values);
    setErrors(errors);

    if (Object.values(errors).some(Boolean)) return;
    onSubmit(values);
  };

  const getFieldProps = (name: string) => {
    return {
      name: name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
    };
  };

  useEffect(() => {
    const errors = validate(values);
    setErrors(errors);
  }, [values]);

  return {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    getFieldProps,
  };
};

export default useForm;
