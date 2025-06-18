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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to the PDF Converter
        </h1>

        <p className="mb-6 text-gray-600">Please log in to continue.</p>

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
                body: JSON.stringify(values),
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
            <Form className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Email:</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block font-semibold mb-1">Password:</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/register" className="text-blue-600 hover:underline mr-4">
            Create Account
          </Link>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Landing;
