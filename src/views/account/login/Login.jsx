import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import useSubmitForm from "../../../hooks/useSubmitForm";
import AuthService from "../../../services/authService";
import { email as emailHelpers } from "../../../helpers";

const Login = () => {
  const intialValues = {
    username: "rafamuniz@gmail.com",
    password: "Password123$",
  };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log(inputs);

    AuthService.Login(inputs)
      .then((response) => {
        alert("Login: " + response.data.access_token);
      })
      .finally(() => {
        alert('XXXXX');
      });

    // const errorsValidation = this.validate();
    // this.setState({ errors: errorsValidation || {} });

    // if (errorsValidation) return;

    try {
      // this.showLoader();
      const data = {
        username: username,
        password: password,
      };

      await AuthService.login(data)
        .then((response) => {
          if (
            response !== null &&
            response.status === 200 &&
            response.data.succeeded
          ) {
            //AuthService.setSession(response.data.data);
            if (response.data.data !== null) {
            }

            // if (
            //   AuthService.isSuperAdmin() ||
            //   AuthService.isAdmin() ||
            //   AuthService.isVendorTeamLead() ||
            //   AuthService.isVendorAdmin()
            // ) {
            //   this.props.history.push("/admin");
            // } else if (AuthService.isUser() || AuthService.isVendorUser()) {
            //   this.props.history.push("/");
            // } else {
            //   this.props.history.push("/403");
            // }

            //this.showLoader(false);
          }
        })
        .catch((err) => {
          //data.password = "";
          // if (err.response.status === 400) {
          //   if (err.response.data.messages.length > 0) {
          //     if (err.response.data.messages[0] === "USER_INCORRECT") {
          //       errors.message = t("Username or password is incorrect.");
          //     } else if (err.response.data.messages[0] === "USER_INACTIVE") {
          //       errors.message = t(
          //         "Your account is Inactive. Please contact your administrator to make it active."
          //       );
          //     } else if (err.response.data.messages[0] === "USER_LOCKEDOUT") {
          //       errors.message = t("User is locked out");
          //     } else if (
          //       err.response.data.messages[0] === "USER_PASSWORD_NOT_SETUP"
          //     ) {
          //       errors.message = t("User hasn't set up the password");
          //     } else if (
          //       err.response.data.messages[0] === "USER_NOT_CONFIRMED"
          //     ) {
          //       errors.message = t("User hasn't comfirmed the account");
          //     } else {
          //       errors.message = t("Username or password is incorrect.");
          //     }
          //   }
          // } else if (err.response.status === 401) {
          //   const { state } = this.props.location;
          //   window.location = state ? state.from.pathname : "/403";
          // } else if (err.response.status === 500) {
          //   errors.message = t("Username or password is incorrect.");
          // } else {
          //   errors.message = t("Error processing data");
          // }
          //this.showLoader(false);
        });
    } catch (ex) {
      const errors = { message: "Error processing data" };
      //this.showLoader(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    const { data } = this.state;
    const { history } = this.props;

    if (data.username !== "" && emailHelpers.validate(data.username)) {
      history.push("/account/forgotpassword/?email=" + data.username);
    } else {
      history.push("/account/forgotpassword");
    }
  };

  const inputsUpdatedCallback = (inputs) => {
    //setInputsUpdated(!inputsUpdated);
  };

  const submit = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const { inputs, handleInputChange, handleSubmit } = useSubmitForm(
    intialValues,
    inputsUpdatedCallback,
    handleLogin
  );

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        id="name"
                        name="name"
                        value={inputs.username}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        id="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleSubmit}
                          disabled={formValid}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
