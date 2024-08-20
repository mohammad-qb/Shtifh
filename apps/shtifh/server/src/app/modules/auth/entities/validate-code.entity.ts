import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ValidateCodeEntity {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  success!: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token!: string;
}
