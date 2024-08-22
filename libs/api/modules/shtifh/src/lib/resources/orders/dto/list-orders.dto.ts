import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ListOrdersDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isDone!: boolean;


  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isPaid!: boolean;
}
