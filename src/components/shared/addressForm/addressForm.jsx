import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CForm,
  CInput,
  CSelect,
  CTextarea,
  CFormGroup,
  CButton,
} from "@coreui/react";
import * as yup from "yup";

import { ErrorMessage } from "../../commons";
import useSubmitForm from "../../../hooks/useSubmitForm";

import "./style.css";

function AddressForm({ data, OnSubmit }) {
  const intialValues = {
    line1: "",
    line2: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
  };

  let schema = yup.object().shape({
    line1: yup.string().label("Line 1").required(),
    line2: yup.string().optional().label("Line 2"),
    zipcode: yup.string().optional().label("Zipcode"),
    city: yup.string().optional().label("City"),
    state: yup.string().optional().label("State"),
    country: yup.string().optional().label("Country"),
  });

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inputsUpdated, setInputsUpdated] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {}, [inputsUpdated]);

  const inputsUpdatedCallback = (inputs) => {
    setInputsUpdated(!inputsUpdated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submit = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });

    schema.validate(formValues).catch(function (err) {
      console.log(err.name);
      // err.name; // => 'ValidationError'
      // err.errors; // => [{ key: 'field_too_short', values: { min: 18 } }]
    });

    OnSubmit(formValues);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  const { inputs, handleInputChange, handleSubmit } = useSubmitForm(
    intialValues,
    inputsUpdatedCallback,
    submit
  );

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">successfully</span>
      )}

      <CForm onSubmit={handleSubmit} noValidate>
        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CFormGroup>
              <CInput
                id="line1"
                name="line1"
                value={inputs.line1}
                onChange={handleInputChange}
                placeholder="Line 1"
                required
              />
            </CFormGroup>
            <ErrorMessage message={formErrors.line1} />
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <CFormGroup>
              <CInput
                id="line2"
                name="line2"
                value={inputs.line2}
                onChange={handleInputChange}
                placeholder="Line 2"
              />
            </CFormGroup>
            <ErrorMessage message={formErrors.line2} />
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <CFormGroup>
              <CInput
                id="zipcode"
                name="zipcode"
                value={inputs.zipcode}
                onChange={handleInputChange}
                placeholder="Zipcode"
              />
            </CFormGroup>
            <ErrorMessage message={formErrors.zipcode} />
          </CCol>

          <CCol xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <CFormGroup>
              <CInput
                id="city"
                name="city"
                value={inputs.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </CFormGroup>
            <ErrorMessage message={formErrors.city} />
          </CCol>

          <CCol xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <CFormGroup>
              <CInput
                id="state"
                name="state"
                value={inputs.state}
                onChange={handleInputChange}
                placeholder="State"
              />
            </CFormGroup>
            <ErrorMessage message={formErrors.state} />
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
}

export default AddressForm;
