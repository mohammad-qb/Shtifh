import { ApiProperty } from '@nestjs/swagger';

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
  money!: number;
}
