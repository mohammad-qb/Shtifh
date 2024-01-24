import Table from '../../../../shared/table/Table';
import { employeesTableColumns } from './constant/table-columns.constant';

const EmployeesTable = () => {
  return <Table caption="الموظفين" columns={employeesTableColumns} />;
};

export default EmployeesTable;
