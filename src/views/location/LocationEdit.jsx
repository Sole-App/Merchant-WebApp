import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
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

import { LocationService } from "../../services";

import { AddressForm } from "../../components/shared";
import { LocationBasicForm, OpeningHoursForm } from "../../components/location";
import { ErrorMessage, LoadingSpinner } from "../../components/commons";

const LocationEdit = (props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});

  const [errors, setErrors] = useState([]);

  const { id } = useParams();
  const locationBasicFormRef = useRef();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLoading(true);
    LocationService.Get(id)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {}, [data]);

  // const handleBasicLocationFormDataUpdated = (formData) => {
  //   let newData = { ...data };
  //   const address = formData.address;
  //   const opening_hours = formData.opening_hours;

  //   newData = formData;
  //   newData.address = address;
  //   newData.opening_hours = opening_hours;

  //   setData(newData);
  // };

  // const handleBasicLocationFormValid = (valid) => {
  //   setValidLocationBasicForm(valid);
  // };

  // const handleAddressFormValid = (valid) => {
  //   setValidAddressForm(valid);
  // };

  // const handleAddressFormDataUpdated = (formData) => {
  //   const newData = { ...data };
  //   newData.address = formData;
  //   setData(newData);
  // };

  // const handleOpeningHoursFormValid = (valid) => {
  //   validOpeningHoursForm(valid);
  // };

  // const handleOpeningHoursFormUpdated = (formData) => {
  //   const newData = { ...data };
  //   newData.opening_hours = formData;
  //   setData(newData);
  // };

  const editProduct = () => {
    setLoading(true);
    LocationService.Edit(data)
      .then((response) => {
        history.push("/locations");
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var result = await locationBasicFormRef?.current
      ?.isFormValid()
      .then((res) => {
        editProduct();
      })
      .catch((err) => {
        setErrors({ ...errors, ["forms"]: "Please check all fields" });
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
            <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <CCard>
                <CCardHeader>
                  <div className="font-weight-bold">Details</div>
                </CCardHeader>
                <CCardBody>
                  <LocationBasicForm
                    ref={locationBasicFormRef}
                    item={data ? data : {}}
                  />
                </CCardBody>
              </CCard>
            </CCol>

            <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <CCard>
                <CCardHeader>
                  <div className="font-weight-bold">Opening Hours</div>
                </CCardHeader>
                <CCardBody>
                  <OpeningHoursForm
                    item={data && data.opening_hours ? data.opening_hours : {}}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <CCard>
                <CCardHeader>
                  <div className="font-weight-bold">Address</div>
                </CCardHeader>
                <CCardBody>
                  <AddressForm
                    item={data && data.address ? data.address : {}}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
              <CButton block color="primary" onClick={handleSubmit}>
                {t("Save")}
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

export default LocationEdit;
