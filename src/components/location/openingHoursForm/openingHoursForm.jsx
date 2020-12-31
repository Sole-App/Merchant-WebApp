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
  CSwitch,
  CLabel,
} from "@coreui/react";
import * as yup from "yup";

import useSubmitForm from "../../../hooks/useSubmitForm";
import { LocationService } from "../../../services";

import "./style.css";

function OpeningHoursForm({ data, OnSubmit }) {
  const intialValues = {
    sunday: {},
    monday: {},
    tuesday: {},
    wedesnday: {},
    thursday: {},
    friday: {},
    saturday: {},
  };

  let schema = yup.object().shape({});

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
    <CRow>
      <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>

        <CRow>
          <CCol
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}            
          >
            <CRow>
              <CCol
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                xxl={1}
                className="pr-0"
              >
                <CSwitch
                  id="sunday"
                  name="sunday"
                  value={inputs.sunday}
                  onChange={handleInputChange}
                  placeholder="Sunday"
                  variant="3d"
                  labelOn="On"
                  labelOff="Off"
                  shape="square"
                  size="lg"
                />
              </CCol>
              <CCol
                xs={12}
                sm={12}
                md={1}
                lg={1}
                xl={3}
                xxl={3}
                className="pl-0"
              >
                <CLabel>Sunday</CLabel>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CRow>
              <CCol
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                xxl={1}
                className="pr-0"
              >
                <CSwitch
                  id="monday"
                  name="monday"
                  value={inputs.monday}
                  onChange={handleInputChange}
                  placeholder="Monday"
                  variant="3d"
                  labelOn="On"
                  labelOff="Off"
                  shape="square"
                  size="lg"
                />
              </CCol>
              <CCol
                xs={12}
                sm={12}
                md={1}
                lg={1}
                xl={3}
                xxl={3}
                className="pl-0"
              >
                <CLabel>Monday</CLabel>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CRow>
              <CCol
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                xxl={1}
                className="pr-0"
              >
                <CSwitch
                  id="tuesday"
                  name="tuesday"
                  value={inputs.tuesday}
                  onChange={handleInputChange}
                  placeholder="Tuesday"
                  variant="3d"
                  labelOn="On"
                  labelOff="Off"
                  shape="square"
                  size="lg"
                />
              </CCol>
              <CCol
                xs={12}
                sm={12}
                md={1}
                lg={1}
                xl={3}
                xxl={3}
                className="pl-0"
              >
                <CLabel>Tuesday</CLabel>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CRow>
              <CCol
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                xxl={1}
                className="pr-0"
              >
                <CSwitch
                  id="wednesday"
                  name="wednesday"
                  value={inputs.wednesday}
                  onChange={handleInputChange}
                  placeholder="Wednesday"
                  variant="3d"
                  labelOn="On"
                  labelOff="Off"
                  shape="square"
                  size="lg"
                />
              </CCol>
              <CCol
                xs={12}
                sm={12}
                md={1}
                lg={1}
                xl={3}
                xxl={3}
                className="pl-0"
              >
                <CLabel>Wednesday</CLabel>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CRow>
              <CCol
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                xxl={1}
                className="pr-0"
              >
                <CSwitch
                  id="thursday"
                  name="thursday"
                  value={inputs.thursday}
                  onChange={handleInputChange}
                  placeholder="Thursday"
                  variant="3d"
                  labelOn="On"
                  labelOff="Off"
                  shape="square"
                  size="lg"
                />
              </CCol>
              <CCol
                xs={12}
                sm={12}
                md={1}
                lg={1}
                xl={3}
                xxl={3}
                className="pl-0"
              >
                <CLabel>Thursday</CLabel>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CRow>
              <CCol
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                xxl={1}
                className="pr-0"
              >
                <CSwitch
                  id="friday"
                  name="friday"
                  value={inputs.friday}
                  onChange={handleInputChange}
                  placeholder="Friday"
                  variant="3d"
                  labelOn="On"
                  labelOff="Off"
                  shape="square"
                  size="lg"
                />
              </CCol>
              <CCol
                xs={12}
                sm={12}
                md={1}
                lg={1}
                xl={3}
                xxl={3}
                className="pl-0"
              >
                <CLabel>Friday</CLabel>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CRow>
              <CCol
                xs={12}
                sm={12}
                md={2}
                lg={2}
                xl={2}
                xxl={1}
                className="pr-0"
              >
                <CSwitch
                  id="saturday"
                  name="saturday"
                  value={inputs.saturday}
                  onChange={handleInputChange}
                  placeholder="Saturday"
                  variant="3d"
                  labelOn="On"
                  labelOff="Off"
                  shape="square"
                  size="lg"
                />
              </CCol>
              <CCol
                xs={12}
                sm={12}
                md={1}
                lg={1}
                xl={3}
                xxl={3}
                className="pl-0"
              >
                <CLabel>Saturday</CLabel>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

      </CCol>
    </CRow>
  );
}

export default OpeningHoursForm;
