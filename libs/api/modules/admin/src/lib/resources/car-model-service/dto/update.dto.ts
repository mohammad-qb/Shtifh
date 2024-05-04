import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCarModelServiceDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carModelServicesId!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fees!: number;
}
