import React from 'react';
import Table from '../../../../shared/table/Table';
import { servicesTableColumns } from './constants/table-columns.constant';

const ServicesTable = () => {
  return <Table caption="الخدمات" columns={servicesTableColumns} />;
};

export default ServicesTable;
