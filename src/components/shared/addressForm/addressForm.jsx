import React, { useEffect, useState } from "react";
import { CRow, CCol, CInput, CFormGroup } from "@coreui/react";
import * as yup from "yup";
import _ from "lodash";
import { ErrorMessage } from "../../commons";

import "./style.css";

function AddressForm({ item, onItemUpdated, onItemValid }) {
  const initialValues = {
    line1: "",
    line2: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
  };

  let schema = yup.object().shape({
    line1: yup.string().required().label("Line 1"),
    line2: yup.string().optional().label("Line 2"),
    zipcode: yup.string().required().label("Zipcode"),
    city: yup.string().required().label("City"),
    state: yup.string().required().label("State"),
    //country: yup.string().required().label("Country"),
  });

  const [data, setData] = useState(initialValues);

  //const [validate, setValidate] = useState(checkForm);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!_.isEmpty(item)) {
      setData(item);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);

    schema
      .validate(data, { abortEarly: false })
      .then((result) => {
        setFormErrors({});
        onItemValid(true);
      })
      .catch(function (err) {
        if (err && err.inner && err.inner.length > 0) {
          const errors = { ...formErrors };
          err.inner.map((val) => {
            errors[val.path] = val.message;
          });
          setFormErrors(errors);
        }

        onItemValid(false);
      })
      .finally(() => {});
  };

  return (
    <div>
      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <CFormGroup>
            <CInput
              id="line1"
              name="line1"
              value={data.line1}
              onChange={handleInputChange}
              placeholder="Line 1 *"
              required
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.line1} />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <CFormGroup>
            <CInput
              id="line2"
              name="line2"
              value={data.line2}
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
              value={data.zipcode}
              onChange={handleInputChange}
              placeholder="Zipcode *"
              required
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.zipcode} />
        </CCol>

        <CCol xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <CFormGroup>
            <CInput
              id="city"
              name="city"
              value={data.city}
              onChange={handleInputChange}
              placeholder="City *"
              required
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.city} />
        </CCol>

        <CCol xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <CFormGroup>
            <CInput
              id="state"
              name="state"
              value={data.state}
              onChange={handleInputChange}
              placeholder="State *"
              required
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.state} />
        </CCol>
      </CRow>
    </div>
  );
}

export default AddressForm;
