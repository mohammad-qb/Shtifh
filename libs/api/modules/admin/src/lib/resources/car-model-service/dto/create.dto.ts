import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarModelServiceDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carServiceId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  serviceId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fees!: number;
}
