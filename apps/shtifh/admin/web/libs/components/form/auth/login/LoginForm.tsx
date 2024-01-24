import { Formik } from 'formik';
import React from 'react';
import { LoginFormInitialValues } from './helper/initial-values';
import LoginFormFields from './LoginFormFields';
import { loginSchema } from './dto/login.dto';

const LoginForm = () => {
  return (
      <Formik
      initialValues={LoginFormInitialValues()}
      validationSchema={loginSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          console.log({ values });
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <LoginFormFields
            loading={isSubmitting}
            errors={errors}
            touched={touched}
          />
        )}
      </Formik>
  );
};

export default LoginForm;
