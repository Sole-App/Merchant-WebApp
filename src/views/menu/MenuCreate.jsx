import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CButton,
} from "@coreui/react";

import { LocationService } from "../../services";

import { AddressForm } from "../../components/shared";
import { LocationBasicForm, OpeningHoursForm } from "../../components/location";
import { ErrorMessage } from "../../components/commons";

const MenuCreate = (props) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    email: "",
    phone_number: "",
    latitude: "",
    longitude: "",
    address: {},
    opening_hours: {
      sunday: {
        weekday: 1,
        weekday_name: "Sunday",
        hours: [],
      },
      monday: {
        weekday: 2,
        weekday_name: "Monday",
        hours: [],
      },
      tuesday: {
        weekday: 3,
        weekday_name: "Tuesday",
        hours: [],
      },
      wednesday: {
        weekday: 4,
        weekday_name: "Wednesday",
        hours: [],
      },
      thursday: {
        weekday: 5,
        weekday_name: "Thursday",
        hours: [],
      },
      friday: {
        weekday: 6,
        weekday_name: "Friday",
        hours: [],
      },
      saturday: {
        weekday: 7,
        weekday_name: "Saturday",
        hours: [],
      },
    },
  });

  const [errors, setErrors] = useState([]);

  const [validLocationBasicForm, setValidLocationBasicForm] = useState(false);
  const [validAddressForm, setValidAddressForm] = useState(false);
  const [validOpeningHoursForm, setValidOpeningHoursForm] = useState(true);

  useEffect(() => {}, [data]);

  const handleBasicLocationFormDataUpdated = (formData) => {
    let newData = { ...data };
    const address = formData.address;
    const opening_hours = formData.opening_hours;

    newData = formData;
    newData.address = address;
    newData.opening_hours = opening_hours;

    setData(newData);
  };

  const handleBasicLocationFormValid = (valid) => {
    setValidLocationBasicForm(valid);
  };

  const handleAddressFormValid = (valid) => {
    setValidAddressForm(valid);
  };

  const handleAddressFormDataUpdated = (formData) => {
    const newData = { ...data };
    newData.address = formData;
    setData(newData);
  };

  const handleOpeningHoursFormValid = (valid) => {
    validOpeningHoursForm(valid);
  };

  const handleOpeningHoursFormUpdated = (formData) => {
    const newData = { ...data };
    newData.opening_hours = formData;
    setData(newData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(validLocationBasicForm);
    // console.log(validAddressForm);
    // console.log(validOpeningHoursForm);

    if (validLocationBasicForm && validAddressForm && validOpeningHoursForm) {
      LocationService.Create(data)
        .then((response) => {
          props.history.push("/locations");
        })
        .catch((err) => {})
        .finally(() => {});
    } else {
      console.log("Forms are not valid");
      setErrors({ ...errors, ["forms"]: "Please check all fields" });
    }
  };

  return (
    <div>
      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <ErrorMessage message={errors.forms} />
        </CCol>
      </CRow>

      <CForm noValidate>
        <CRow>
          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CCard>
              <CCardHeader>
                <div className="font-weight-bold">Details</div>
              </CCardHeader>
              <CCardBody>
                <LocationBasicForm
                  //item={locationBasicFormData}
                  onItemValid={handleBasicLocationFormValid}
                  onItemUpdated={handleBasicLocationFormDataUpdated}
                />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CCard>
              <CCardHeader>
                <div className="font-weight-bold">Opening Hours</div>
              </CCardHeader>
              <CCardBody>
                <OpeningHoursForm
                  item={data.opening_hours}
                  onValidForm={handleOpeningHoursFormValid}
                  onItemUpdated={handleOpeningHoursFormUpdated}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CCard>
              <CCardHeader>
                <div className="font-weight-bold">Address</div>
              </CCardHeader>
              <CCardBody>
                <AddressForm
                  onItemValid={handleAddressFormValid}
                  onItemUpdated={handleAddressFormDataUpdated}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
            <CButton block color="primary" onClick={handleSubmit}>
              Create
            </CButton>
          </CCol>
          <CCol xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
            <CButton block color="primary">
              Back
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </div>
  );
};

export default MenuCreate;
