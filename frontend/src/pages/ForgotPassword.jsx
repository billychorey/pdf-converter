import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function ForgotPassword({ users, setMessage }) {
  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email and we’ll send you your password... hypothetically.</p>
      <Formik
        initialValues={{ email: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) errors.email = 'Required';
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const foundPassword = users[values.email];

          if (foundPassword) {
            setMessage(`Password for ${values.email} is: ${foundPassword}`);
          } else {
            setMessage("We couldn't find that email.");
          }

          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Recover Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
