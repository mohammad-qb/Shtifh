import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
  } from '@chakra-ui/react';
  import { Field } from 'formik';
  import { TextFieldProps } from './types/inputs.type';
  
  export const TextField = (props: TextFieldProps) => {
    return (
      <FormControl isInvalid={props.isInvalid}>
        {props.label && <FormLabel>{props.label}</FormLabel>}
        <Field
          as={Input}
          id={props.name}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
        />
        {props.error && <FormErrorMessage>{props.error}</FormErrorMessage>}
      </FormControl>
    );
  };