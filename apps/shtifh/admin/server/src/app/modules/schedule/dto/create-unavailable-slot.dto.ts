import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateUnavailableSlot {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  start_time!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  end_time!: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;
}
