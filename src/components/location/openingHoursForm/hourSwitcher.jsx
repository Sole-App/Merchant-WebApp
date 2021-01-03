import React, { useState } from "react";
import { CRow, CCol, CSelect, CSwitch, CLabel } from "@coreui/react";

import { time as timeHelper } from "../../../helpers";
import "./style.css";

function HourSwitcher({ item, onChange, onTimeChange }) {
  const [data, setData] = useState(item);

  const handleSwitchChange = (e) => {
    onChange(e.target);
  };

  const handleTimeChange = (e) => {
    onTimeChange(e.target);
  };

  return (
    <CRow>
      <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <CRow>
          <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <CRow>
              <CCol xs={12} sm={12} md={2} lg={2} xl={1} xxl={1} className="">
                <CSwitch
                  id={data.weekday_name}
                  name={data.weekday_name}
                  value={data.hours && data.hours.length > 0 ? true : false}
                  onChange={handleSwitchChange}
                  placeholder={data.weekday_name}
                  variant="3d"
                  labelOn="On"
                  labelOff="Off"
                  shape="square"
                  size="lg"
                />
              </CCol>
              <CCol xs={12} sm={12} md={1} lg={2} xl={2} xxl={1} className="">
                <CLabel>{data.weekday_name}</CLabel>
              </CCol>
              <CCol xs={12} sm={12} md={3} lg={8} xl={9} xxl={10} className="">
                {data.hours && data.hours.length > 0 && (
                  <CRow>
                    <CCol>
                      <CSelect
                        custom
                        data-weekday={data.weekday_name}
                        name="opensAt"
                        id="opensAt"
                        value={data.hours[0].opensAt}
                        onChange={handleTimeChange}
                      >
                        {timeHelper.listTimes(15).map((i) =>
                          i === data.hours[0].opensAt ? (
                            <option key={i} value={i} selected>
                              {i}
                            </option>
                          ) : (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          )
                        )}
                      </CSelect>
                    </CCol>
                    <CCol>
                      <CSelect
                        custom
                        data-weekday={data.weekday_name}
                        name="closesAt"
                        id="closesAt"
                        value={item.hours[0].closesAt}
                        onChange={handleTimeChange}
                      >
                        {timeHelper.listTimes(15).map((i) =>
                          i === item.hours[0].closesAt ? (
                            <option key={i} value={i} selected>
                              {i}
                            </option>
                          ) : (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          )
                        )}
                      </CSelect>
                    </CCol>
                  </CRow>
                )}
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
}

export default HourSwitcher;
