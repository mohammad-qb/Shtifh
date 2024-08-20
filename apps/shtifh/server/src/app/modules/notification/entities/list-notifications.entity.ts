import { ApiProperty } from '@nestjs/swagger';

class ListNotificationsDataEntity {
  @ApiProperty()
  content!: string;

  @ApiProperty()
  createAt!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  isRead!: boolean;
}

export class ListNotificationsEntity {
  @ApiProperty({ type: ListNotificationsDataEntity, isArray: true })
  result!: ListNotificationsDataEntity[];
}
