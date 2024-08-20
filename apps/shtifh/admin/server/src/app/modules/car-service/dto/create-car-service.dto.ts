import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateNestedServiceDto
  implements Prisma.CarModelServiceUncheckedCreateInput
{
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fees!: number;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  serviceId!: string;
}

export class CreateCarServiceDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carModelId!: string;

  @ApiProperty({ type: [CreateNestedServiceDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateNestedServiceDto)
  services!: CreateNestedServiceDto[];
}
