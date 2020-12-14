import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CForm,
  CInput,
  CSelect,
  CFormGroup,
  CButton,
} from "@coreui/react";

import useSubmitForm from "../../hooks/useSubmitForm";
import { ProductCategoryService } from "../../services";

import "./style.css";

function CreateProductForm({ OnSubmit }) {
  const intialValues = {
    name: "",
    category_id: null,
    subcategory_id: null,
    price: "",
  };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [inputsUpdated, setInputsUpdated] = useState(false);

  useEffect(() => {
    ProductCategoryService.ListParent().then((response) => {
      if (response.data) {
        setCategories([{ id: "", name: "-- Select --" }, ...response.data]);    
      }
    });
  }, [true]);

  useEffect(() => {
    if (inputs.category) {
      ProductCategoryService.GetsByParentId(inputs.category).then(
        (response) => {
          if (response.data) {
            setSubCategories([
              { id: "", name: "-- Select --" },
              ...response.data,
            ]);
          } else {
            setSubCategories([]);
          }
        }
      );
    }
  }, [inputsUpdated]);

  const submitForm = () => {
    OnSubmit(inputs);
  };

  const inputsUpdatedCallback = (inputs) => {
    setInputsUpdated(!inputsUpdated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submit = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
 
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);

  const { inputs, handleInputChange, handleSubmit } = useSubmitForm(
    intialValues,
    inputsUpdatedCallback,
    submit
  );

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Cannot be blank";
    }

    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">successfully</span>
      )}

      <CForm onSubmit={handleSubmit} noValidate>
        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CFormGroup>
              <CInput
                id="name"
                name="name"
                value={inputs.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </CFormGroup>
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CFormGroup>
              <CSelect
                custom
                name="category"
                id="category"
                value={inputs.category}
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
          <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <CFormGroup>
              <CSelect
                custom
                name="subcategory"
                id="subcategory"
                value={inputs.subcategory}
                onChange={handleInputChange}
                disabled={subcategories.length <= 0}
              >
                {subcategories.map((value, index) => {
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

        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CFormGroup>
              <CInput
                id="price"
                name="price"
                value={inputs.price}
                onChange={handleInputChange}
                placeholder="Price"
              />
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
            <CButton block color="primary" onClick={handleSubmit} disabled={formValid}>
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
}

export default CreateProductForm;
