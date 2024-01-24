import {
  Box,
  Center,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Form } from 'formik';
import React from 'react';
import { TextField } from '../../../shared/inputs/TextField';
import { LoginFormProps } from './types/login.type';
import { Button } from '../../../shared/buttons/Button';

const LoginFormFields = (props: LoginFormProps) => {
  return (
    <Form>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Center>
          <Heading fontSize={'4xl'}>تسجيل الدخول الى لوحة التحكم</Heading>
        </Center>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <TextField
              label="البريد الاكتروني"
              type="email"
              name="email"
              error={props.errors.email}
              isInvalid={
                (props.touched.email as boolean) && !!props.errors.email
              }
            />
            <TextField
              label="كلمة المرور"
              type="password"
              name="password"
              error={props.errors.password}
              isInvalid={
                (props.touched.password as boolean) && !!props.errors.password
              }
            />
            <Button
              isSubmit
              isLoading={props.loading}
              value="تسجيل الدخول"
              isDisabled={props.loading}
              fullWidth
            />
          </Stack>
        </Box>
      </Stack>
    </Form>
  );
};

export default LoginFormFields;
