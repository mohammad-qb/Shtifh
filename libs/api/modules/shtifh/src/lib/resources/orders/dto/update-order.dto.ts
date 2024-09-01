import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateOrderDto {
  @ApiPropertyOptional({ default: '2024-08-21' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ default: '06:00 - 07:00' })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  lat_lng?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string | null | undefined;

  @ApiPropertyOptional()
  @IsMongoId()
  @IsNotEmpty()
  carId!: string;

  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  cityId!: string;

  @ApiPropertyOptional()
  @IsMongoId()
  @IsNotEmpty()
  carModelServiceId!: string;
}
