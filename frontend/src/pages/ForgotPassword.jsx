// 📁 src/pages/ForgotPassword.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function ForgotPassword({ users, setMessage }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-background p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Forgot Password</h2>
        <p className="mb-6 text-gray-600">
          Enter your email and we’ll send you your password... hypothetically.
        </p>

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
            <Form className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Email:</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Recover Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
