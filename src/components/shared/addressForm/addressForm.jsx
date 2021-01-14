import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CRow, CCol, CInput, CFormGroup } from "@coreui/react";
import _ from "lodash";

import { Schemas } from "../../../validations";
import { ErrorMessage } from "../../commons";

import "./style.css";

const AddressForm = forwardRef(({ data, onInputChanged = () => {} }, ref) => {
  const initialValues = {
    line1: "",
    line2: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
  };

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {}, [data]);

  useImperativeHandle(ref, () => ({
    isFormValid: async () => {
      return new Promise((resolve, reject) => {
        Schemas.addressFormSchema
          .validate(data, { abortEarly: false })
          .then((result) => {
            resolve({
              valid: true,
              data: data,
              errors: {},
            });
          })
          .catch((err) => {
            let errors = {};
            if (err && err.inner && err.inner.length > 0) {
              err.inner.map((val) => {
                errors[val.path] = val.message;
                return errors[val.path];
              });
            }
            setFormErrors(errors);
            reject({
              valid: true,
              data: {},
              errors: {},
            });
          })
          .finally(() => {});
      });
    },
  }));

  const handleInputChange = (event) => {
    validateForm();

    onInputChanged(event);
  };

  const validateForm = () => {
    Schemas.addressFormSchema
      .validate(data, { abortEarly: false })
      .then((result) => {
        setFormErrors({});
      })
      .catch((errors) => {
        if (errors && errors.inner && errors.inner.length > 0) {
          const err = { ...formErrors };
          errors.inner.map((val) => {
            err[val.path] = val.message;
            return err[val.path];
          });

          setFormErrors(err);
        }
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
              value={data && data.line1 ? data.line1 : ""}
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
              value={data && data.line2 ? data.line2 : ""}
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
              value={data && data.zipcode ? data.zipcode : ""}
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
              value={data && data.state ? data.city : ""}
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
              value={data && data.state ? data.state : ""}
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
});

export default AddressForm;
