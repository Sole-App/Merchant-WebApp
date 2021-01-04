import React, { useEffect, useState } from "react";
import { CRow, CCol, CInput, CSelect, CFormGroup, CTextarea } from "@coreui/react";
import * as yup from "yup";

import { ErrorMessage } from "../commons";
import { ProductCategoryService } from "../../services";

import "./style.css";

function ProductBasicForm({ item, OnSubmit }) {
  const intialValues = {
    name: "",
    description: "",
    category_id: undefined,
    subcategory_id: undefined,
    cost: undefined,
    price: undefined,
  };

  const [data, setData] = useState(item != null ? item : intialValues);

  //const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [formValid, setFormValid] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [inputsUpdated, setInputsUpdated] = useState(false);

  let schema = yup.object().shape({
    name: yup.string().required().label("Name"),
    description: yup.string().optional(),
    category_id: yup.string().optional(),
    subcategory_id: yup.string().optional(),
    cost: yup.number().optional(),
    price: yup.number().optional(),
  });

  useEffect(() => {
    getParentCategories();
  }, []);

  const getParentCategories = () => {
    ProductCategoryService.ListParent().then((response) => {
      if (response.data && response.data.length > 0) {
        setCategories([{ id: "", name: "-- Select --" }, ...response.data]);
      }
    });
  };

  useEffect(() => {
    if (data.category) {
      ProductCategoryService.GetsByParentId(data.category).then((response) => {
        if (response.data && response.data.length > 0) {
          setSubCategories([
            { id: "", name: "-- Select --" },
            ...response.data,
          ]);
        } else {
          setSubCategories([]);
        }
      });
    }
  }, [inputsUpdated]);

  // const submitForm = () => {
  //   OnSubmit(inputs);
  // };

  // const inputsUpdatedCallback = (inputs) => {
  //   setInputsUpdated(!inputsUpdated);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // const submit = (event) => {
  //   const { name, value } = event.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmitting) {
  //     submitForm();
  //   }
  // }, [formErrors]);

  // const { inputs, handleInputChange, handleSubmit } = useSubmitForm(
  //   intialValues,
  //   inputsUpdatedCallback,
  //   submit
  // );

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    schema
      .validate(data, { abortEarly: false })
      .then((result) => {
        setFormErrors({});
        //onItemValid(true);
      })
      .catch(function (err) {
        if (err && err.inner && err.inner.length > 0) {
          const errors = { ...formErrors };
          err.inner.map((val) => {
            errors[val.path] = val.message;
          });
          setFormErrors(errors);
        }
        //onItemValid(false);
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
        <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
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
          <ErrorMessage message={formErrors.category} />
        </CCol>
        <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <CFormGroup>
            <CSelect
              custom
              name="subcategory"
              id="subcategory"
              value={data.subcategory}
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
          <ErrorMessage message={formErrors.subcategory} />
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <CFormGroup>
            <CInput
              id="cost"
              name="cost"
              value={data.cost}
              onChange={handleInputChange}
              placeholder="Cost"
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.cost} />
        </CCol>
        <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <CFormGroup>
            <CInput
              id="price"
              name="price"
              value={data.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.price} />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <CFormGroup>
            <CTextarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleInputChange}
              placeholder="Description"
              plaintext={true}
            />
          </CFormGroup>
          <ErrorMessage message={formErrors.description} />
        </CCol>
      </CRow>
    </div>
  );
}

export default ProductBasicForm;