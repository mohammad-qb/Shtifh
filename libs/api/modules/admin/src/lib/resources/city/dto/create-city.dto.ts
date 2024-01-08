import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDro implements Prisma.CityUncheckedCreateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
