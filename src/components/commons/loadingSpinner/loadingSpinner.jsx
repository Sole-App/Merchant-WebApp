import React from "react";
import ClipLoader from "react-spinners/MoonLoader";
import "./style.css";

const LoadingSpinner = ({ show = false, text = "", color = "navy" }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <React.Fragment>
      <div
        className={`spinner-wrapper loader-wrapper ${
          show ? "d-table" : "d-none"
        }`}
      >
        <div className="content">
          <div className="content-loader">
            <ClipLoader css={override} size={60} color={color} loading={show} />
          </div>
          <div className="content-text">{text && <span>{text}</span>}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoadingSpinner;
