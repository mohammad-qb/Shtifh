import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationEntity {
  @ApiProperty()
  success!: boolean;
}
