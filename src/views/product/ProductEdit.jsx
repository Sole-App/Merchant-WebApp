import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

import { ProductService } from "../../services";

const ProductEdit = () => {
  const history = useHistory();
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    getProduct();
    history.push(`/products`);
  }, []);

  const getProduct = () => {
    ProductService.Get(id)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {});
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>Edit Product</CCardHeader>
          <CCardBody>dqwdqwdqwdqwdwqdwq</CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProductEdit;
