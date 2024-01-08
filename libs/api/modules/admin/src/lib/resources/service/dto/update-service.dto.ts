import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto
  implements Pick<Prisma.ServiceUncheckedUpdateInput, 'name' | 'price'>
{
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name!: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  price!: number;
}
