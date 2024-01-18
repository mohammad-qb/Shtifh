import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto
  implements Pick<Prisma.ServiceUncheckedUpdateInput, 'name'>
{
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name!: string;
}
