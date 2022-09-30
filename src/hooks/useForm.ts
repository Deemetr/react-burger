import { ChangeEvent, useState } from "react";

export function useForm<T>(formValues: T): [T,(event: ChangeEvent<HTMLInputElement>) => void,  ] {
  const [values, setValues] = useState<T>(formValues);

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return [values, inputChange, setValues];
}
