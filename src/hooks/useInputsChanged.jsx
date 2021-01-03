import { useState } from "react";

const useInputsChanged = (initialValues, OnInputsUpdated) => {
  const [inputs, setInputs] = useState(initialValues);

  const handleInputChange = (event) => {
    event.persist();
    
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));

    //console.log(inputs);
    OnInputsUpdated(inputs, event);
  };

  return {
    inputs,
    handleInputChange,    
  };
};

export default useInputsChanged;