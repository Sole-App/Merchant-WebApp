import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { ErrorMessage, LoadingSpinner } from "../../components/commons";

const ProductCategoryCreate = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const productCategoryFormRef = useRef();

  const handleProductCategoryFormItemUpdated = (data) => {
    //setData(data);
  };

  const createProductCategory = () => {
    setLoading(true);
    ProductCategoryService.Create(data)
      .then((response) => {
        history.push("/productcategories");
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var result = await productCategoryFormRef?.current
      ?.isFormValid()
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        createProductCategory();
      })
      .catch((err) => {
        setErrors({ ...errors, ["forms"]: t("Please check all fields") });
      });
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
                    {t("Create Product Category")}
                  </div>
                </CCardHeader>
                <CCardBody>
                  <ProductCategoryForm
                    ref={productCategoryFormRef}
                    item={data ? data : {}}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
              <CButton block color="primary" onClick={handleSubmit}>
                {t("Create")}
              </CButton>
            </CCol>
            <CCol xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
              <CButton block color="primary">
                {t("Cancel")}
              </CButton>
            </CCol>
          </CRow>
        </CForm>
        <LoadingSpinner show={loading} text={t("Loading")} />
      </CCol>
    </CRow>
  );
};

export default ProductCategoryCreate;
