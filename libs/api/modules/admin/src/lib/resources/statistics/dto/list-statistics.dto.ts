import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ListStatisticsDto {
  @ApiProperty({ nullable: true })
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiProperty({ nullable: true })
  @IsNumber()
  @IsOptional()
  month?: number;

  @ApiProperty({ nullable: true })
  @IsNumber()
  @IsOptional()
  day?: number;
}
