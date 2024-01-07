import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  readonly email!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  readonly full_name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly mobile!: string;
}
