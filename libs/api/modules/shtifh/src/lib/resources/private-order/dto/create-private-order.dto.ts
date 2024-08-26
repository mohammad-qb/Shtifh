import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePrivateOrderDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  private_service_id!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carId!: string;

  @ApiProperty()
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
  note?: string;
}
