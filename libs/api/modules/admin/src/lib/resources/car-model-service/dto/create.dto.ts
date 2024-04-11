import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarModelServiceDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cardServiceId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  serviceId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fees!: number;
}
