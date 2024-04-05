import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';

export class ListAvailableSlotsDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
