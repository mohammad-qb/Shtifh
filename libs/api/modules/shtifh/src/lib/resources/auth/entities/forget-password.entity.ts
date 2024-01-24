import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ForgetPasswordEntity {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  success!: boolean;
}
