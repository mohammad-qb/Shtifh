import React from 'react';
import Table from '../../../../shared/table/Table';
import { citiesTableColumns } from './constants/table-columns.constant';

const CitiesTable = () => {
  return <Table caption="المدن" columns={citiesTableColumns} />;
};

export default CitiesTable;
