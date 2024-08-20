import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateCodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code!: string;
}
