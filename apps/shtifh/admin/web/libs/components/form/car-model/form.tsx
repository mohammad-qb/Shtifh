import { Formik } from 'formik';
import React from 'react';
import FormFields from './form-fields';
import { carModelInitValues } from './helper/init-values';
import { carModelDto } from './dto/car-model.dto';

const CarModelForm = () => {
  return (
    <Formik
      initialValues={carModelInitValues()}
      validationSchema={carModelDto}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        console.log({ values });
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => <FormFields loading={isSubmitting} errors={errors} touched={touched} />}
    </Formik>
  );
};

export default CarModelForm;
