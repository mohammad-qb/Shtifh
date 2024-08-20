import { ApiProperty } from '@nestjs/swagger';

export class ChangeVisibilityEntity {
  @ApiProperty()
  success!: boolean;
}
