import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class SwitchLangDto {
  @ApiProperty({ enum: $Enums.Lang })
  @IsEnum($Enums.Lang)
  @IsNotEmpty()
  lang!: $Enums.Lang;
}
