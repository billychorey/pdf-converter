// 📁 src/pages/Landing.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Landing({ users, setIsLoggedIn, setMessage, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch('http://localhost:5001/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                email: values.email, // if using email as username
                password: values.password,
              }),
            });

            if (response.ok) {
              setIsLoggedIn(true);
              setMessage('');
              navigate('/dashboard');
            } else {
              const data = await response.json();
              setMessage(data.error || 'Login failed.');
            }
          } catch (error) {
            setMessage('Error logging in.');
            console.error('Login error:', error);
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
