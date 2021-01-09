import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CRow, CCol, CInput, CSelect, CFormGroup } from "@coreui/react";

import { ErrorMessage } from "../../commons";
import { ProductCategoryService } from "../../../services";
import { Schemas } from "../../../validations";
import _ from "lodash";

import "./style.css";

const ProductCategoryForm = forwardRef(
  ({ item, onItemUpdated = () => {} }, ref) => {
    const initialValues = {
      name: "",
      category: undefined,
    };

    const [formErrors, setFormErrors] = useState({});
    const [data, setData] = useState(initialValues);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getProductCategoryParents();
    }, []);

    useEffect(() => {
      if (!_.isEmpty(item)) {
        setData(item);
      }
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

    useImperativeHandle(ref, () => ({
      isFormValid: async () => {
        return new Promise((resolve, reject) => {
          Schemas.productCategoryFormSchema
            .validate(data, { abortEarly: false })
            .then((result) => {
              resolve({
                valid: true,
                data: data,
                errors: {},
              });
            })
            .catch((err) => {
              let errors = {};
              if (err && err.inner && err.inner.length > 0) {
                err.inner.map((val) => {
                  errors[val.path] = val.message;
                  return errors[val.path];
                });
              }
              reject({
                valid: true,
                data: {},
                errors: {},
              });
            })
            .finally(() => {});
        });
      },
    }));

    const handleInputChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });

      validateForm();
    };

    const validateForm = () => {
      Schemas.productCategoryFormSchema
        .validate(data, { abortEarly: false })
        .then((result) => {
          setFormErrors({});
        })
        .catch((errors) => {
          if (errors && errors.inner && errors.inner.length > 0) {
            const err = { ...formErrors };
            errors.inner.map((val) => {
              err[val.path] = val.message;
              return err[val.path];
            });
            setFormErrors(err);
          }
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
                value={data.name ? data.name : ""}
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
);

export default ProductCategoryForm;
