import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ListOrdersDto {
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  unCompleted?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  searchText?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  date!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;
}
