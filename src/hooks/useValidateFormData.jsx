import { useState } from "react";

const useValidateFormData = (schema, data) => {
  // onValid = () => {},  // onInvalid = () => {}

  const [isValid, setIsValid] = useState(false);
  //const [errors, setErrors] = useState({});

  schema
    .validate(data, { abortEarly: false })
    .then((result) => {
      //setIsValid(true);
      //onValid();
    })
    .catch((err) => {
      //setIsValid(false);
      //setErrors(errors);
      //onInvalid(err);
    })
    .finally(() => {});

  return {
    isValid: true,
    errors: {},
  };
};

export default useValidateFormData;
