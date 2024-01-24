import Table from '../../../../shared/table/Table';
import { customersTableColumns } from './constants/table-columns.constant';

const CustomersTable = () => {
  return <Table caption="الزبائن" columns={customersTableColumns} />;
};

export default CustomersTable;
