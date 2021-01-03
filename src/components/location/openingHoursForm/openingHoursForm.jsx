import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CForm,
  CInput,
  CSelect,
  CTextarea,
  CFormGroup,
  CButton,
  CSwitch,
  CLabel,
} from "@coreui/react";
import * as yup from "yup";

import { useInputsChanged } from "../../../hooks";

import HourSwitcher from "./hourSwitcher";

import "./style.css";

function OpeningHoursForm({ item, onItemUpdated, onItemValid }) {
  const initialValues = {
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
  };

  let schema = yup.object().shape({});

  const [data, setData] = useState(item ? item : initialValues);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    onItemUpdated(data);
  }, [data]);

  const handleSwitchChange = (e) => {
    const name = e.name.toLowerCase();
    const newData = data[name];

    if (e.value == "false") {
      newData.hours.push({
        opensAt: "10:00 AM",
        closesAt: "05:00 PM",
      });
    } else {
      newData.hours = [];
    }

    setData({ ...data, [name]: newData });
    onItemUpdated(data);
  };

  const handleTimeChange = (e) => {
    const name = e.name.toLowerCase();
    const weekday = e.getAttribute("data-weekday");

    const newData = data[weekday.toLowerCase()];
    if (name === "opensat") {
      newData.hours[0].opensAt = e.value;
    } else {
      newData.hours[0].closesAt = e.value;
    }

    setData({ ...data, [weekday.toLowerCase()]: newData });

    // console.log(data);
    // setData(data);

    //setData({ ...data, data });
    //onItemUpdated(data);

    //console.log(data[weekday.toLowerCase()]);

    // schema
    //   .validate(data, { abortEarly: false })
    //   .then((result) => {
    //     setFormErrors({});
    //     onItemValid(true);
    //   })
    //   .catch(function (err) {
    //     if (err && err.inner && err.inner.length > 0) {
    //       const errors = { ...formErrors };
    //       err.inner.map((val) => {
    //         errors[val.path] = val.message;
    //       });
    //       setFormErrors(errors);
    //     }
    //     onItemValid(false);
    //   })
    //   .finally(() => {});
  };

  return (
    <CRow>
      <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <HourSwitcher
          item={data["sunday"]}
          onChange={handleSwitchChange}
          onTimeChange={handleTimeChange}
        />
        <HourSwitcher
          item={data["monday"]}
          onChange={handleSwitchChange}
          onTimeChange={handleTimeChange}
        />
        <HourSwitcher
          item={data["tuesday"]}
          onChange={handleSwitchChange}
          onTimeChange={handleTimeChange}
        />
        <HourSwitcher
          item={data["wednesday"]}
          onChange={handleSwitchChange}
          onTimeChange={handleTimeChange}
        />
        <HourSwitcher
          item={data["thursday"]}
          onChange={handleSwitchChange}
          onTimeChange={handleTimeChange}
        />
        <HourSwitcher
          item={data["friday"]}
          onChange={handleSwitchChange}
          onTimeChange={handleTimeChange}
        />
        <HourSwitcher
          item={data["saturday"]}
          onChange={handleSwitchChange}
          onTimeChange={handleTimeChange}
        />
      </CCol>
    </CRow>
  );
}

export default OpeningHoursForm;
