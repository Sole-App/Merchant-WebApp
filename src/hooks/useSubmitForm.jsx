import React, { useState } from "react";

const useSubmitForm = (initialValues, inputsUpdated, submit) => {
  const [inputs, setInputs] = React.useState(initialValues);

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
    inputs,
    handleInputChange,
    handleSubmit,    
  };
};

export default useSubmitForm;