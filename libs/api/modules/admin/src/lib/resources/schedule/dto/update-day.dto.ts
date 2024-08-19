import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDayDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  start_time!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  end_time!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  requests_in_hour!: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_off!: boolean;

  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  scheduleId?: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;
}
