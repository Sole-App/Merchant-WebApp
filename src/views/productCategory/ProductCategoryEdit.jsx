import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CForm,
  CButton,
} from "@coreui/react";
import _ from "lodash";

import { ProductCategoryService } from "../../services";

import { ProductCategoryForm } from "../../components/productCategory";
import { ErrorMessage } from "../../components/commons";

const ProductCategoryEdit = () => {
  const { id } = useParams();

  const history = useHistory();

  const { t } = useTranslation();

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const productCategoryFormRef = useRef();

  const getProductCategory = () => {
    ProductCategoryService.Get(id)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getProductCategory();
  }, []);

  useEffect(() => {
    // if (!_.isEmpty(data)) {
    //   ProductCategoryService.Edit(data).then((response) => {
    //     history.push(`/productcategories`);
    //   });
    // }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await productCategoryFormRef?.current
      ?.isFormValid()
      .then((res) => {
        setData(res.data);
        ProductCategoryService.Edit(res.data).then((response) => {
          history.push(`/productcategories`);
        });
      })
      .catch((err) => {
        setErrors({ ...errors, ["forms"]: t("Please check all fields") });
      });
  };

  const handleInputChanged = (event) => {
    const newValue = { ...data, [event.target.name]: event.target.value };
    setData(newValue);
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
                  <div className="font-weight-bold">Edit Product Category</div>
                </CCardHeader>
                <CCardBody>
                  <ProductCategoryForm
                    ref={productCategoryFormRef}
                    data={data}
                    onInputChanged={handleInputChanged}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
              <CButton block color="primary" onClick={handleSubmit}>
                Save
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

export default ProductCategoryEdit;
