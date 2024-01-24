import { Stack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../../../shared/buttons/Button';
import { useModal } from '../../../../utils/context/modal';

const CarModelHeader = () => {
  const { openModal } = useModal();
  return (
    <Stack align={'end'} w={'full'}>
      <Button
        value="New Car Model"
        onClick={() => openModal('CAR_MODEL', { mode: 'create' })}
      />
    </Stack>
  );
};

export default CarModelHeader;
