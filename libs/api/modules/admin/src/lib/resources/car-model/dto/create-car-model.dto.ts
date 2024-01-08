import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCarModelDto implements Prisma.CarModelUncheckedCreateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cityId!: number;
}
