import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Landing({ users, setIsLoggedIn, setMessage }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the PDF Converter</h1>

      <p>Please log in to continue.</p>

      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) errors.email = 'Required';
          if (!values.password) errors.password = 'Required';
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const storedPassword = users[values.email];

          if (storedPassword && storedPassword === values.password) {
            setIsLoggedIn(true);
            setMessage('');
            navigate('/dashboard');
          } else {
            setMessage('Invalid login credentials.');
          }

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

            <div>
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Log In
            </button>
          </Form>
        )}
      </Formik>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/register" style={{ marginRight: '1rem' }}>Create Account</Link>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default Landing;
