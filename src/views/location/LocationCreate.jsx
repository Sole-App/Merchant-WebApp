import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,  
  CRow,
} from "@coreui/react";

import { LocationService } from "../../services";

import CreateProductForm from "../../components/product/CreateProductForm";

const LocationCreate = () => {
  const handleSubmit = async (inputs) => {
    LocationService.Create(inputs).then((response) => {
      alert("Location created: " + response.data.id);
    });
  };

  return (
    <CRow>
      <CCol
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        xxl={6}
        className="offset-xs-0 offset-sm-0 offset-md-3 offset-lg-3 offset-xl-3 offset-xxl-3"
      >
        <CCard>
          <CCardHeader>
            <div className="font-weight-bold">Create Location</div>
          </CCardHeader>
          <CCardBody>
            <CreateProductForm OnSubmit={handleSubmit} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default LocationCreate;
