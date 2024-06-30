import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePrivateOrderDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  private_service_id!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  time!: string;
}
