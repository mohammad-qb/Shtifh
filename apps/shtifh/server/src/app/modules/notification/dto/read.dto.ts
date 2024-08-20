import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ReadNotificationDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  notificationId!: string;
}
