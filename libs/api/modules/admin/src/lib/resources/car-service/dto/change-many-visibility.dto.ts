import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class ChangeManyVisibilityDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  active!: boolean;
}
