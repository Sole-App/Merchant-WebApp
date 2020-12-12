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

import useCreateProductForm from "./useCreateProductForm";
import { ProductCategoryService } from "../../../services";

import "./style.css";

function CreateProductForm({ OnSubmit }) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [inputsUpdated, setInputsUpdated] = useState(false);

  useEffect(() => {
    ProductCategoryService.ListParent().then((response) => {
      if (response.data) {
        setCategories([{ id: "", name: "-- Select --" }, ...response.data]);

        if (response.data) {
          // const options = response.data.map((c) => ({
          //   value: c.id,
          //   label: c.name,
          // }));
          // setCategoryOptions(options);
        }
      }
    });
  }, [true]);

  useEffect(() => {
    if (inputs.category) {
      ProductCategoryService.GetsByParentId(inputs.category).then(
        (response) => {
          console.log(response.data);
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

  const inputsUpdatedCallback = (inputs) => {
    setInputsUpdated(!inputsUpdated);
  };

  const submit = (event) => {
    OnSubmit(inputs);
  };

  const { inputs, handleInputChange, handleSubmit } = useCreateProductForm(
    { name: "", price: "" },
    inputsUpdatedCallback,
    submit
  );

  return (
    <CForm onSubmit={handleSubmit}>
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
  );
}

export default CreateProductForm;
