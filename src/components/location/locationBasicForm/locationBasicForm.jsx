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

import useSubmitForm from "../../../hooks/useSubmitForm";
import { LocationService } from "../../../services";

import "./style.css";

function LocationBasicForm({ data, OnSubmit }) {
  const intialValues = {
    name: "Miranda 2",
    description: "",
    email: "",
    phone_number: "",
    latitude: "",
    longitude: "",
  };

  let schema = yup.object().shape({
    name: yup
      .string()
      .label("Name")
      .required()
      .oneOf([yup.ref('name'), null], 'Name is required'),
    description: yup.string().optional(),
    email: yup.string().email().optional(),
    phone_number: yup.string().optional(),
    latitude: yup.string().optional(),
    longitude: yup.string().optional(),
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

      console.log( err.name );
      // err.name; // => 'ValidationError'
      // err.errors; // => [{ key: 'field_too_short', values: { min: 18 } }]
    });

    OnSubmit(formValues);
    //console.log( formValues );
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
                id="name"
                name="name"
                value={inputs.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </CFormGroup>
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </CCol>
        </CRow>
      
        <CRow>
          <CCol xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <CFormGroup>
              <CInput
                id="email"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </CFormGroup>
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </CCol>

          <CCol xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <CFormGroup>
              <CInput
                id="phone_number"
                name="phone_number"
                value={inputs.phone_number}
                onChange={handleInputChange}
                placeholder="Phone number"
              />
            </CFormGroup>
            {formErrors.phone_number && (
              <span className="error">{formErrors.phone_number}</span>
            )}
          </CCol>
        </CRow>
        
        <CRow>
          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CFormGroup>
              <CInput
                id="latitude"
                name="latitude"
                value={inputs.latitude}
                onChange={handleInputChange}
                placeholder="Latitude"
              />
            </CFormGroup>
            {formErrors.latitude && (
              <span className="error">{formErrors.latitude}</span>
            )}
          </CCol>
          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CFormGroup>
              <CInput
                id="longitude"
                name="longitude"
                value={inputs.longitude}
                onChange={handleInputChange}
                placeholder="Longitude"
              />
            </CFormGroup>
            {formErrors.longitude && (
              <span className="error">{formErrors.longitude}</span>
            )}
          </CCol>
        </CRow>
       
        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CFormGroup>
              <CTextarea
                id="description"
                name="description"
                value={inputs.description}
                onChange={handleInputChange}
                placeholder="Description"
                plaintext={true}
              />
            </CFormGroup>
            {formErrors.description && (
              <span className="error">{formErrors.description}</span>
            )}
          </CCol>
        </CRow>
            
      </CForm>
    </div>
  );
}

export default LocationBasicForm;
