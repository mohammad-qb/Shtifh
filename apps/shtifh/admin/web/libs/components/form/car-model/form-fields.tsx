import { Spacer, VStack } from '@chakra-ui/react';
import React from 'react';
import { TextField } from '../../shared/inputs/TextField';
import { CarModelFormProps } from './types/car-model-form';
import { Button } from '../../shared/buttons/Button';

const FormFields = (props: CarModelFormProps) => {
  return (
    <VStack spacing={5}>
      <TextField
        label="Name (EN)"
        name="name_en"
        type="text"
        error={props.errors.name_en}
        isInvalid={(props.touched.name_en as boolean) && !!props.errors.name_en}
      />
      <TextField
        label="Name (AR)"
        name="name_ar"
        type="text"
        error={props.errors.name_ar}
        isInvalid={(props.touched.name_ar as boolean) && !!props.errors.name_ar}
      />
      <TextField
        label="Name (HB)"
        name="name_he"
        type="text"
        error={props.errors.name_he}
        isInvalid={(props.touched.name_he as boolean) && !!props.errors.name_he}
      />
      <Spacer h={10} />
      <Button isSubmit isLoading={props.loading} value="Create" fullWidth />
    </VStack>
  );
};

export default FormFields;
