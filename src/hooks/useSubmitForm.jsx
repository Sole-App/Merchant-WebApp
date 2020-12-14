import { useState } from "react";

const useSubmitForm = (initialValues, inputsUpdated, submit) => {
  const [inputs, setInputs] = useState(initialValues);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    submit(event);
  };

  const handleInputChange = (event) => {
    event.persist();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));

    inputsUpdated(inputs);
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useSubmitForm;
