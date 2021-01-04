import React, { useEffect, useState } from "react";
import { CRow, CCol, CInput, CSelect, CFormGroup } from "@coreui/react";

import { ErrorMessage } from "../../commons";
import { ProductCategoryService } from "../../../services";
import { UseValidateFormData } from "../../../hooks";
import { Schemas } from "../../../validations";

import "./style.css";

function ProductCategoryForm({
  item,
  checkForm,
  onItemUpdated = () => {},
  onItemValid = () => {},
  onItemInvalid = () => {},  
}) {
  const initialValues = {
    name: "",
    category: undefined,
  };

  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState(item || initialValues);
  const [categories, setCategories] = useState([]);
  const [validate, setValidate] = useState(checkForm);

  useEffect(() => {
    getProductCategoryParents();
  }, []);

  useEffect(() => {
    console.log("checkForm");
    if (validate === true) {
      console.log("Not valid");
      validateForm();
    }
  }, [validate]);

  useEffect(() => {
    onItemUpdated(data);
  }, [data, onItemUpdated]);

  const getProductCategoryParents = () => {
    ProductCategoryService.ListParent().then((response) => {
      if (response.data) {
        setCategories([{ id: "", name: "-- Select --" }, ...response.data]);
      } else {
        setCategories([]);
      }
    });
  };

  useEffect(() => {
    if (data.category) {
      getProductCategoryParents();
    }
  }, [categories]);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    validateForm();

    // schema
    //   .validate(data, { abortEarly: false })
    //   .then((result) => {
    //     setFormErrors({});
    //     //onItemValid(true);
    //   })
    //   .catch(function (err) {
    //     if (err && err.inner && err.inner.length > 0) {
    //       const errors = { ...formErrors };
    //       err.inner.map((val) => {
    //         errors[val.path] = val.message;
    //       });
    //       setFormErrors(errors);
    //     }
    //     //onItemValid(false);
    //   })
    //   .finally(() => {});
  };

  const validateForm = () => {
    console.log("validateForm");
    Schemas.productCategoryFormSchema
      .validate(data, { abortEarly: false })
      .then((result) => {
        setFormErrors({});
        onItemValid(true);
      })
      .catch((errors) => {
        if (errors && errors.inner && errors.inner.length > 0) {
          const err = { ...formErrors };
          errors.inner.map((val) => {
            err[val.path] = val.message;
            return err[val.path];
          });
          console.log(errors);

          setFormErrors(err);
        }
        onItemValid(false);
      })
      .finally(() => {});
  };

  return (
    <div>
      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <CFormGroup>
            <CInput
              id="name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.name} />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <CFormGroup>
            <CSelect
              custom
              name="category"
              id="category"
              value={data.category}
              onChange={handleInputChange}
              disabled={categories.length <= 0}
            >
              {categories.map((value, index) => {
                return (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                );
              })}
            </CSelect>
          </CFormGroup>
        </CCol>
      </CRow>
    </div>
  );
}

export default ProductCategoryForm;
