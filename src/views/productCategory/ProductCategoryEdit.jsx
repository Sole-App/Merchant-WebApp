import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,  
  CRow,
} from "@coreui/react";


import { ProductCategoryService } from "../../services";

import { ProductCategoryForm } from "../../components/productCategory";

const ProductCategoryEdit = () => {

  const handleSubmit = async (inputs) => {
    ProductCategoryService.Create(inputs).then((response) => {
      alert("ProductCategory created: " + response.data.id);
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
            <div className="font-weight-bold">Edit Product Category</div>
          </CCardHeader>
          <CCardBody>
            <ProductCategoryForm OnSubmit={handleSubmit} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProductCategoryEdit;
