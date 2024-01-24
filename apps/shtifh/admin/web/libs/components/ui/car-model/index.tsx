import { VStack } from '@chakra-ui/react'
import React from 'react'
import CarModelHeader from './header/CarModelHeader'
import CarModelTable from './main/car-model-table/CarModelTable'

const CarModelsUI = () => {
  return (
    <VStack bg={'white'} align={'start'} p={5}>
      <CarModelHeader />
      <CarModelTable />
    </VStack>
  )
}

export default CarModelsUI
