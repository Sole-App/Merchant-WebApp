import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CButton,
} from "@coreui/react";

import { ProductCategoryService } from "../../services";

import { ProductCategoryForm } from "../../components/productCategory";
import { ErrorMessage } from "../../components/commons";

const ProductCategoryCreate = () => {
  const initialValues = {
    name: "",
    category: undefined,
  };

  const history = useHistory();
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const [productCategoryFormIsValid, setProductCategoryFormIsValid] = useState(
    false
  );
  const [checkProductCategoryForm, setCheckProductCategoryForm] = useState(
    false
  );

  const handleProductCategoryFormItemUpdated = (data) => {
    setData(data);
  };

  const handleProductCategoryFormValid = (valid) => {
    setProductCategoryFormIsValid(valid);
  };

  useEffect(() => {}, [checkProductCategoryForm]);

  const handleSubmit = (e) => {
    if (productCategoryFormIsValid === true) {
      ProductCategoryService.Create(data).then((response) => {
        history.push(`/productcategories`);
      });
    } else {
      //setCheckProductCategoryForm(true);
      setErrors({ ...errors, ["forms"]: "Please check all fields" });
    }
  };

  return (
    <CRow>
      <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="p-0">
        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <ErrorMessage message={errors.forms} />
          </CCol>
        </CRow>

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
                  <div className="font-weight-bold">
                    Create Product Category
                  </div>
                </CCardHeader>
                <CCardBody>
                  <ProductCategoryForm
                    data={data}
                    checkForm={checkProductCategoryForm}
                    onItemValid={handleProductCategoryFormValid}
                    onItemUpdated={handleProductCategoryFormItemUpdated}
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
      </CCol>
    </CRow>
  );
};

export default ProductCategoryCreate;
