import { useState } from "react";
import * as yup from "yup";

const useValidateData = (schema, data, OnValid) => {  
  const handleValidation = () => {
    schema.validate(data).catch(function (err) {
      console.log(err.name);
    });

    OnValid(true);
  };

  return {
    handleValidation,    
  };
};

export default useValidateData;