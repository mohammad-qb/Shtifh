import { Stack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../../../shared/buttons/Button';

const ServicesHeader = () => {
  return (
    <Stack align={'end'} w={'full'}>
      <Button value="اضافة خدمة" />
    </Stack>
  );
};

export default ServicesHeader;
