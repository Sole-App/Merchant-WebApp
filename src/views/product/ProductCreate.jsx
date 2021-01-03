import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CCol,
  CRow,
} from "@coreui/react";

import { ProductService } from "../../services";

import ProductBasicForm from "../../components/product/productBasicForm";

const ProductCreate = () => {
  const handleSubmit = async (inputs) => {
    ProductService.Create(inputs).then((response) => {
      alert("Product created: " + response.data.id);
    });
  };

  return (
    <CForm noValidate>
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
              <div className="font-weight-bold">Details</div>
            </CCardHeader>
            <CCardBody>
              <ProductBasicForm OnSubmit={handleSubmit} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default ProductCreate;
