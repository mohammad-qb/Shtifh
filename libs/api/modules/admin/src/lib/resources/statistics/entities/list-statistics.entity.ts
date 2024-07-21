import { ApiProperty } from '@nestjs/swagger';

class MoneyData {
  @ApiProperty()
  fees!: number;

  @ApiProperty()
  tip!: number;
}
export class ListStatisticsEntity {
  @ApiProperty()
  customers!: number;

  @ApiProperty()
  orders!: number;

  @ApiProperty()
  completeOrders!: number;

  @ApiProperty()
  incompleteOrders!: number;

  @ApiProperty()
  allOrders!: number;

  @ApiProperty()
  compAllOrders!: number;

  @ApiProperty()
  incompAllOrders!: number;

  @ApiProperty({ type: MoneyData })
  money!: MoneyData;
}
