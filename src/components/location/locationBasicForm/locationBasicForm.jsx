import React, { useEffect, useState } from "react";
import { CRow, CCol, CInput, CTextarea, CFormGroup } from "@coreui/react";
import * as yup from "yup";

import { ErrorMessage } from "../../commons";
import { Schemas } from "../../../validations";
import { UseValidateFormData } from "../../../hooks";

import "./style.css";

function LocationBasicForm({ item, onItemUpdated, onItemValid }) {
  const initialValues = {
    name: "",
    description: "",
    email: "",
    phone_number: "",
    latitude: "",
    longitude: "",
  };

  // let schema = yup.object().shape({
  //   name: yup.string().required().label("Name"),
  //   description: yup.string().optional(),
  //   email: yup.string().email().optional(),
  //   phone_number: yup.string().optional(),
  //   latitude: yup.string().optional(),
  //   longitude: yup.string().optional(),
  // });

  const [data, setData] = useState(item ? item : initialValues);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    onItemUpdated(data);
  }, [data, onItemUpdated]);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    const { isValid, err } = UseValidateFormData(
      Schemas.locationBasicFormSchema,
      data
    );

    if (isValid) {
      setFormErrors({});
      onItemValid(true);
    } else {
      if (err && err.inner && err.inner.length > 0) {
        const errors = { ...formErrors };
        err.inner.map((val) => {
          errors[val.path] = val.message;
          return errors[val.path];
        });
        setFormErrors(errors);
      }
      onItemValid(false);
    }

    // Schemas.locationBasicFormSchema
    //   .validate(data, { abortEarly: false })
    //   .then((result) => {
    //     setFormErrors({});
    //     onItemValid(true);
    //   })
    //   .catch(function (err) {
    //     if (err && err.inner && err.inner.length > 0) {
    //       const errors = { ...formErrors };
    //       err.inner.map((val) => {
    //         errors[val.path] = val.message;
    //         return errors[val.path];
    //       });
    //       setFormErrors(errors);
    //     }
    //     onItemValid(false);
    //   })
    //   .finally(() => {});
  };

  return (
    <div>
      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <CFormGroup>
            <CInput
              id="name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              placeholder="Name *"
              required
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.name} />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <CFormGroup>
            <CInput
              id="email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.email} />
        </CCol>

        <CCol xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <CFormGroup>
            <CInput
              id="phone_number"
              name="phone_number"
              value={data.phone_number}
              onChange={handleInputChange}
              placeholder="Phone number"
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.phone_number} />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <CFormGroup>
            <CInput
              id="latitude"
              name="latitude"
              value={data.latitude}
              onChange={handleInputChange}
              placeholder="Latitude"
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.latitude} />
        </CCol>
        <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <CFormGroup>
            <CInput
              id="longitude"
              name="longitude"
              value={data.longitude}
              onChange={handleInputChange}
              placeholder="Longitude"
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.longitude} />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <CFormGroup>
            <CTextarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              placeholder="Description"
              plaintext={true}
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.description} />
        </CCol>
      </CRow>
    </div>
  );
}

export default LocationBasicForm;
