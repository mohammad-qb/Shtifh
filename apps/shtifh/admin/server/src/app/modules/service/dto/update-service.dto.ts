import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto
  implements
    Pick<Prisma.ServiceUncheckedUpdateInput, 'name_ar' | 'name_en' | 'name_he'>
{
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name_ar!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name_en!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name_he!: string;
}
