import React from 'react';
import Table from '../../../../shared/table/Table';
import { carModelsTableColumns } from './constants/table-columns.constant';

const CarModelTable = () => {
  return <Table caption="انواع السيارات" columns={carModelsTableColumns} />;
};

export default CarModelTable;
