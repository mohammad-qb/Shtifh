import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto implements Prisma.ServiceUncheckedCreateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_ar!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_en!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_he!: string;
}
