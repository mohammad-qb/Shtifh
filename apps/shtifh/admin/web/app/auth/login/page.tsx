'use client';

import { Flex, useColorModeValue } from '@chakra-ui/react';
import LoginForm from '../../../libs/components/form/auth/login/LoginForm';

export default function LoginPage() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <LoginForm />
    </Flex>
  );
}
