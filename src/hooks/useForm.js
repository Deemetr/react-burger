import { useState } from "react";

export function useForm(formValues) {
  const [values, setValues] = useState(formValues);

  const inputChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return [values, inputChange, setValues];
}
