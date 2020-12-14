import React, { useEffect, useState } from "react";
import { CSelect } from "@coreui/react";

function DropDown({ name, id, value, onChange, items, disabled = false }) {
  if (items) {
    disabled = true;
  }

  return (
    <CSelect
      custom
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {items &&
        items.map((value, index) => {
          return (
            <option key={value.id} value={value.id}>
              {value.name}
            </option>
          );
        })}
    </CSelect>
  );
}

export default DropDown;
