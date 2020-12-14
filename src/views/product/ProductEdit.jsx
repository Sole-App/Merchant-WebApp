import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

import { ProductService } from "../../services";

const ProductEdit = () => {
  const [product, setProduct] = useState([]);

   useEffect(() => {
    ProductService.Get("qweqwewqe").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>Edit Product</CCardHeader>
          <CCardBody>      
            dqwdqwdqwdqwdwqdwq     
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProductEdit;