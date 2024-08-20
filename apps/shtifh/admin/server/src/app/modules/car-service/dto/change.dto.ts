import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class ChangeVisibilityDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carServiceId!: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  active!: boolean;
}
