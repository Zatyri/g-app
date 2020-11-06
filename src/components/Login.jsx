import React from "react";
import { Formik } from "formik";

const Login = () => {
  return (
    <>
      <h2>Login</h2>

      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Käyttäjänimi puuttuu";
          } else if (values.username.length < 4) {
            errors.username = "Käyttäjänimi liian lyhyt";
          }
          if (!values.password) {
            errors.password = "Salasana puuttuu";
          } else if (values.password.length < 8) {
            errors.password = "Salasana liian lyhyt";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,          
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && errors.username}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
