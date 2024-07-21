import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SwitchBlockCustomerDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  userId!: string;
}
