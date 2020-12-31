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

const LocationCreate = () => {
  const data = {
    name: "Miranda 2",
    description: "",
    email: "",
    phone_number: "",
    latitude: "",
    longitude: "",
    address: {},
    opening_hours: [],
  };

  // const handleSubmit = async (inputs) => {
  //   console.log(inputs);

  //   // LocationService.Create(inputs)
  //   //.then((response) => {
  //   //   alert("Location created: " + response.data.id);
  //   // });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("handleSubmit");
  };

  return (
    <div className="container">
      <CForm onSubmit={handleSubmit} noValidate>
        <CRow>
          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CCard>
              <CCardHeader>
                <div className="font-weight-bold">Basic</div>
              </CCardHeader>
              <CCardBody>
                <LocationBasicForm OnSubmit={handleSubmit} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CCard>
              <CCardHeader>
                <div className="font-weight-bold">Opening Hours</div>
              </CCardHeader>
              <CCardBody>
                <OpeningHoursForm />
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
                <AddressForm />
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

export default LocationCreate;
