import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto
  implements
    Pick<Prisma.ServiceUncheckedCreateInput, 'name' | 'price' | 'carModelId'>
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  carModelId!: number;
}
