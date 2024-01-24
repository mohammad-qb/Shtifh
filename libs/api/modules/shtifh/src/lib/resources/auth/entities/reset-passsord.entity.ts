import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ResetPasswordEntity {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  success!: boolean;
}
