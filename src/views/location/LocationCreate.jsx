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
import _ from "lodash";

import { LocationService } from "../../services";

import { AddressForm } from "../../components/shared";
import { LocationBasicForm, OpeningHoursForm } from "../../components/location";
import { ErrorMessage, LoadingSpinner } from "../../components/commons";

const LocationCreate = (props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    description: "",
    email: "",
    phone_number: "",
    latitude: "",
    longitude: "",
    address: {},
    opening_hours: {
      sunday: {
        weekday: 1,
        weekday_name: "Sunday",
        hours: [],
      },
      monday: {
        weekday: 2,
        weekday_name: "Monday",
        hours: [],
      },
      tuesday: {
        weekday: 3,
        weekday_name: "Tuesday",
        hours: [],
      },
      wednesday: {
        weekday: 4,
        weekday_name: "Wednesday",
        hours: [],
      },
      thursday: {
        weekday: 5,
        weekday_name: "Thursday",
        hours: [],
      },
      friday: {
        weekday: 6,
        weekday_name: "Friday",
        hours: [],
      },
      saturday: {
        weekday: 7,
        weekday_name: "Saturday",
        hours: [],
      },
    },
  };

  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);

  const basicLocationFormRef = useRef();
  const addressFormRef = useRef();
  const openingHoursFormRef = useRef();

  useEffect(() => {}, [data]);

  const handleBasicLocationFormDataUpdated = (formData) => {
    let newData = { ...data };
    const address = formData.address;
    const opening_hours = formData.opening_hours;

    newData = formData;
    newData.address = address;
    newData.opening_hours = opening_hours;

    setData(newData);
  };

  const createLocation = () => {
    setLoading(true);

    LocationService.Create(data)
      .then((response) => {
        props.history.push("/locations");
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    Promise.all([
      basicLocationFormRef?.current?.isFormValid(),
      addressFormRef?.current?.isFormValid(),
    ]).then((values) => {
      console.log(values);
    });
  };

  const handleCancel = async (event) => {
    event.preventDefault();

    history.push("/locations");
  };

  const handleBasicLocationInputChanged = (event) => {
    const newValue = { ...data, [event.target.name]: event.target.value };
    setData(newValue);
  };

  const handleAddressInputChanged = (event) => {
    const newValue = {
      ...data.address,
      [event.target.name]: event.target.value,
    };
    setData(newValue);
  };

  const handleOpeningHoursInputChanged = (event) => {
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
            <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <CCard>
                <CCardHeader>
                  <div className="font-weight-bold">{t("Details")}</div>
                </CCardHeader>
                <CCardBody>
                  <LocationBasicForm
                    ref={basicLocationFormRef}
                    data={data}
                    onInputChanged={handleBasicLocationInputChanged}
                  />
                </CCardBody>
              </CCard>
            </CCol>

            <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <CCard>
                <CCardHeader>
                  <div className="font-weight-bold">{t("Opening Hours")}</div>
                </CCardHeader>
                <CCardBody>
                  <OpeningHoursForm
                    ref={openingHoursFormRef}
                    data={data.opening_hours}
                    onInputChanged={handleOpeningHoursInputChanged}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <CCard>
                <CCardHeader>
                  <div className="font-weight-bold">{t("Address")}</div>
                </CCardHeader>
                <CCardBody>
                  <AddressForm
                    ref={addressFormRef}
                    data={data.address}
                    onInputChanged={handleAddressInputChanged}
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
              <CButton block color="primary" onClick={handleCancel}>
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

export default LocationCreate;
