import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMonthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  start_time!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  end_time!: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  year!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  month!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  requests_in_hour!: number;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  scheduleId?: string;
}
