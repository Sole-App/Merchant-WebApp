import React from "react";

const ErrorMessage = ({ messages, message, ...rest }) => {
  return (
    <React.Fragment>
      {message && (
        <div className="alert alert-danger error-message">{message}</div>
      )}

      {messages && messages.length > 0 && (
        <div className="alert alert-danger error-messages">
          <ul className="mb-0 pl-3">
            {messages.map((e, i) => {
              return (<li key={i}>{e}</li>);
            })}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default ErrorMessage;
