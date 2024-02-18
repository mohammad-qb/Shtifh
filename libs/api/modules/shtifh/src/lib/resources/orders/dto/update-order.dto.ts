import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiPropertyOptional({ default: '10/10/2022:13:55:10' })
  @IsString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ default: '12:00:00' })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  address!: string;

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
  @IsNotEmpty()
  cityId!: string;

  @ApiPropertyOptional()
  @IsMongoId()
  @IsNotEmpty()
  carModelServiceId!: string;
}
