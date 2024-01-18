import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateNestedServiceDto
  implements Prisma.CarModelServiceUncheckedCreateInput
{
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fees!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  serviceId!: number;
}

export class CreateCarServiceDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cityId!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  carModelId!: number;

  @ApiProperty({ type: [CreateNestedServiceDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateNestedServiceDto)
  services!: CreateNestedServiceDto[];
}
