import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterForm = (props) => {
  if (props.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <h1 className="title is-1">Register</h1>
      <hr />
      <br />
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          props.handleRegisterFormSubmit(values);
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Name is required.")
            .min(6, "Name must be at least 6 characters."),
          email: Yup.string()
            .email("Enter a valid email.")
            .required("Email is required.")
            .min(6, "Email must be at least 6 characters."),
          password: Yup.string()
            .required("Password is required.")
            .min(8, "Password must be at least 8 characters."),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="input-name">
                  Name
                </label>
                <input
                  name="name"
                  id="input-name"
                  className={
                    errors.name && touched.name
                      ? "input error"
                      : "input"
                  }
                  type="text"
                  placeholder="Enter a name"
                  required
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <div className="input-feedback" data-testid="errors-name">
                    {errors.name}
                  </div>
                )}
              </div>
              <div className="field">
                <label className="label" htmlFor="input-email">
                  Email
                </label>
                <input
                  name="email"
                  id="input-email"
                  className={
                    errors.email && touched.email ? "input error" : "input"
                  }
                  type="email"
                  placeholder="Enter an email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback" data-testid="errors-email">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="field">
                <label className="label" htmlFor="input-password">
                  Password
                </label>
                <input
                  name="password"
                  id="input-password"
                  className={
                    errors.password && touched.password
                      ? "input        error"
                      : "input"
                  }
                  type="password"
                  placeholder="Enter a password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback" data-testid="errors-password">
                    {errors.password}
                  </div>
                )}
              </div>
              <input
                type="submit"
                className="button is-primary"
                value="Submit"
                disabled={isSubmitting}
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

RegisterForm.propTypes = {
  handleRegisterFormSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
};

export default RegisterForm;
