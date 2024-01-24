import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';
import { ButtonProps } from './types/buttons.type';

export const Button = ({
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <ChakraButton
      variant={variant}
      type={props.isSubmit ? 'submit' : 'button'}
      onClick={props.onClick}
      px={10}
      width={props.fullWidth ? 'full' : 'initial'}
      isLoading={props.isLoading}
      isDisabled={props.isDisabled}
      size={'size'}
      borderRadius={5}
    >
      {props.value}
    </ChakraButton>
  );
};